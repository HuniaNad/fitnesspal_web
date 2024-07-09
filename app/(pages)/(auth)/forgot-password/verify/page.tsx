'use client'

import Heading from '@/components/Auth/Heading/authHeading'
import ErrorPrompt from '@/components/ErrorAlert/error'
import Input from '@/components/Input/input'
import { colors } from '@/public/colors/colors'
import images from '@/public/export'
import { Alert } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const OTPVerification = () => {
  const [otp, setotp] = React.useState('');
  const [optConfirmation, setOtpConfirmation] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const user = localStorage.getItem('userData');
  const { email } = user ? JSON.parse(user) : { email: '' };

  useEffect(() => {
    if (!email) {
      router.push('/forgot-password');
    }
  }, [email, router]);

  const handleVerifyOTP = async () => {
    if (otp.length === 6) {
      try {
        // Verify OTP api call
        const response = await fetch('http://localhost:8080/user/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            otp: otp,
          }),
        });

        if (response.ok) {
          const user = { email: email, otp: otp };
          localStorage.setItem('userData', JSON.stringify(user));

          router.push('/change-password');
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

  const handleResendOTP = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/reset-password-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
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
    <main className='container mt-16'>
      <section className="content">
        <Heading title='otp verification' subtitle='verify with OTP' color={colors.pink} />

        <div className="mt-10">
          <p className="text-center mb-3">Enter check your email and enter the OTP</p>
          <Input 
            type="otp"
            value={otp}
            setValue={setotp} 
          />
          <a 
            onClick={() => handleResendOTP()} 
            className="font-bold float-right text-custom hover:underline"
          >Resend OTP</a>
        </div>

        { optConfirmation && <p className="text-center mt-5">OTP sent successfully!</p>}

        <div className="my-10">
          <Link href='/change-password'>
            <button 
                className="custom-btn auth-pink"
                onClick={() => handleVerifyOTP()}
            >Next</button>
          </Link>
        </div>
      </section>

      <section className="svg">
        <Image src={images.forgotpassword_avatar} alt="Forgot Password Image" />
      </section>

      {error && <ErrorPrompt message={error} />}
      
    </main>
  )
}

export default OTPVerification;
