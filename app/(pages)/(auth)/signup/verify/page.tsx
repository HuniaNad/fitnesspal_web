'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Heading from '@/components/Auth/Heading/authHeading';
import Input from '@/components/Input/input';
import { colors } from '@/public/colors/colors';
import images from '@/public/export';
import Image from 'next/image';
import ErrorPrompt from '@/components/ErrorAlert/error';

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState<string>('');
  const [otpConfirmation, setOtpConfirmation] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const data = localStorage.getItem('userData');
  const user = data ? JSON.parse(data) : {};

  const handleVerifyOTP = async () => {
    if (otp.length === 6) {
      try {
        const response = await fetch('http://localhost:8080/user/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            otp: otp,
          }),
        });

        if (response.ok) {
          handleSignup();
        } else {
          const errorMessage = await response.json();
          setError(errorMessage.message);
        }
      } catch (error) {
        console.error('Error signing up:', error);
        setError('An error occurred while signing up. Please try again later.');
      }
    }
  };

  const handleSignup = async () => {
    try {
      const responseBody = {
        name: user.name,
        email: user.email,
        password: user.password,
        otp: otp,
        age: 20,
        gender: 'female',
        emergencyContacts: []
      }

      const response = await fetch('http://localhost:8080/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responseBody),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        setError(errorMessage.message);
        return;
      }

      const newUser = await response.json();

      const subscriptionResponse = await fetch(`http://localhost:8080/subscription/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: newUser.userId,
          card: [],
          status: 'false',
        }),
      });
      if (!subscriptionResponse.ok) {
        const errorMessage = await subscriptionResponse.json();
        setError(errorMessage.message);
        return;
      }

      const nutritionalProfileResponse = await fetch(`http://localhost:8080/nutritional-profile/create-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: newUser.userId
        }),
      });
      if (!nutritionalProfileResponse.ok) {
        const errorMessage = await nutritionalProfileResponse.json();
        setError(errorMessage.message);
        return;
      }

      localStorage.removeItem('userData');
      router.push('/login');
    } catch (error) {
      console.error('Error signing up:', error);
      setError('An error occurred while signing up. Please try again later.');
    }
  }

  const handleResendOTP = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/send-signup-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
        }),
      });

      if (response.ok) {
        setOtpConfirmation(true);        
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('An error occurred while sending OTP. Please try again later.');
    }
  };

  return (
    <main className="container mt-16">
      <section className="content">
        <Heading title="account verification" subtitle="verify with OTP" color={colors.pink} />
        
        <div className="mt-10">
          <p className="text-center mb-3">Enter check your email and enter the OTP</p>
          <Input type="otp" value={otp} setValue={setOtp} />
          { !otpConfirmation && <a onClick={() => handleResendOTP()} className="font-bold float-right text-custom hover:underline cursor-pointer">
            Resend OTP
          </a>}
        </div>

        { otpConfirmation && <p className="text-center mt-5">OTP sent successfully!</p>}

        <div className="my-10">
          <button className="custom-btn auth-pink" onClick={() => handleVerifyOTP()}>
            Next
          </button>
        </div>
      </section>

      <section className="svg">
        <Image src={images.forgotpassword_avatar} alt="Forgot Password Image" />
      </section>

      {error && <ErrorPrompt message={error} />}
    </main>
  );
};

export default OTPVerification;
