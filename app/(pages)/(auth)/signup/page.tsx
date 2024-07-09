'use client'

import Heading from '@/components/Auth/Heading/authHeading'
import ErrorPrompt from '@/components/ErrorAlert/error'
import Input from '@/components/Input/input'
import { colors } from '@/public/colors/colors'
import images from '@/public/export'
import { validateEmail, validateName, validatePassword, validateConfirmPassword } from '@/utils/Validations/authHandler'
import { requiredFieldsHandler } from '@/utils/Validations/requiredHandler'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

const Signup = () => {
  const baseURL = process.env.BASE_URL;
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('userData');
    localStorage.removeItem('healthProfileData');
    localStorage.removeItem('waterIntakeData');
    localStorage.removeItem('stepData');
    localStorage.removeItem('calorieData');
    // localStorage.clear();
  }, []);

  const handleSignup = async () => {
    const fields = [
      { label: 'Full Name', value: name },
      { label: 'Email', value: email },
      { label: 'Password', value: password },
      { label: 'Confirm Password', value: confirmPassword }
    ];

    const requiredFieldsHandlerResult = requiredFieldsHandler(fields);
    // Check if all fields are filled
    if (validateConfirmPassword(password, confirmPassword) !== null) {
      setError(validateConfirmPassword(password, confirmPassword) as string);
    } else if (requiredFieldsHandlerResult === true && validateEmail(email) === null && validateName(name) === null && validatePassword(password) === null) {
      handleSendOTP();
    } else {
      setError(requiredFieldsHandlerResult as string);
    }
  }

  const handleSendOTP = async () => {
    try {
      const userData = { name, email, password };

      const response = await fetch('http://localhost:8080/user/send-signup-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        localStorage.setItem('userData', JSON.stringify(userData));
        router.push('/signup/verify');
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message);
      }
      
    } catch (error) {
      console.error('Error signing up:', error);
      setError('An error occurred while signing up. Please try again later.');
    }
  }

  return (
    <main className='container'>
      <section className="content">
        <Heading
          title='Register Now'
          subtitle='Let&apos;s get connected'
          color={colors.purple}
        />

        <div className="input-fields">
          <Input
            type="text"
            label='Name'
            placeholder="Enter your name"
            value={name}
            setValue={setName}
            error={validateName(name)}
          />
          <Input
            type="email"
            label='Email'
            placeholder="Enter your email"
            value={email}
            setValue={setEmail}
            error={validateEmail(email)}
          />
          <Input
            type="password"
            label='Password'
            placeholder="Enter your password"
            value={password}
            setValue={setPassword}
            error={validatePassword(password)}
          />
          <Input
            type="password"
            label='Confirm Password'
            placeholder="Re-enter password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            error={validateConfirmPassword(password, confirmPassword)}
          />
        </div>

        <div className="vertical-divider">
          <button
            className="custom-btn auth-purple"
            // style={{ width: '215px' }}
            onClick={() => handleSignup()}
          >Sign up
          </button>

          {/* <span></span>
          <button className='custom-btn google-auth'>
            <Image src={images.google_icon} alt="Google" />
          </button> */}
        </div>

        <div className="redirect purple">
          <p>Already have an account?</p>
          <Link href="/login">Sign in</Link>
        </div>
      </section>

      <section className="svg">
        <Image src={images.signup_avatar} alt="Signup Image" />
      </section>

      {error && <ErrorPrompt message={error} />}

    </main>
  )
}

export default Signup
