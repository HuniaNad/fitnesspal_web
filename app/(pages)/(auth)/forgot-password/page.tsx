'use client'

import Heading from '@/components/Auth/Heading/authHeading'
import ErrorPrompt from '@/components/ErrorAlert/error'
import Input from '@/components/Input/input'
import { colors } from '@/public/colors/colors'
import images from '@/public/export'
import { validateEmail } from '@/utils/Validations/authHandler'
import { Alert } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const router = useRouter();

  const handleForgotPassword = async () => {
    try {
      console.log('email', email);
      if (email.length === 0) {
        setError('Email is required');
        return;
      }

      const response = await fetch('http://localhost:8080/user/reset-password-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      console.log(response)

      if (response.ok) {
        const user = { email };
        localStorage.setItem('userData', JSON.stringify(user));

        router.push('/forgot-password/verify');
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message);
      }
    } catch (error) {
      console.error('Error changing password in:', error);
      setError('An error occurred while changing password. Please try again later.');
    }
  }

  return (
    <main className='container mt-16'>
      <section className="content">
        <Heading title='forgot password' subtitle='unlock your access' color={colors.pink} />

        <div className="input-fields mt-10">
          <Input 
            type="email" 
            label='Email'
            placeholder="Enter your email"
            value={email}
            setValue={setEmail} 
            error={validateEmail(email)}
          />
        </div>

        <div className="my-10 otp-msg">
          <p>An OTP will be shared with you on your email</p>  
          <button 
              className="custom-btn auth-pink"
              onClick={() => handleForgotPassword()}
          >Next</button>
        </div>

        <div className="redirect pink">
          <p>Do you remember your password?</p>
          <Link href="/login">Sign in</Link>
        </div>
      </section>

      <section className="svg">
        <Image src={images.forgotpassword_avatar} alt="Forgot Password Image" />
      </section>

      {error && <ErrorPrompt message={error} />}
      
    </main>
  )
}

export default ForgotPassword;
