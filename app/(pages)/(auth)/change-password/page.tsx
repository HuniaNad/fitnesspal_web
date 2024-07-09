'use client'

import Heading from '@/components/Auth/Heading/authHeading'
import ErrorPrompt from '@/components/ErrorAlert/error'
import Input from '@/components/Input/input'
import { colors } from '@/public/colors/colors'
import images from '@/public/export'
import { validateConfirmPassword, validatePassword } from '@/utils/Validations/authHandler'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const ChangePassword = () => {
  const [password, setPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const router = useRouter();
  const user = localStorage.getItem('userData');
  const { email, otp } = user ? JSON.parse(user) : { email: '', otp: '' };

  useEffect(() => {
    if (!email || !otp) {
      router.push('/forgot-password');
      localStorage.removeItem('userData');
    }
  }, [email, otp, router]);

  const handleChangePassword = async () => {
    if (validatePassword(password) === null && validateConfirmPassword(password, newPassword) === null) {
      try {
        const response = await fetch('http://localhost:8080/user/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            newPassword,
            otp
          }),
        });

        if (response.ok) {
          localStorage.removeItem('userData');
          router.push('/login');
        } else {
          const errorMessage = await response.json();
          setError(errorMessage.message);
        }
      } catch (error) {
        console.error('Error changing password:', error);
        setError('An error occurred while changing password. Please try again later.');
      }
    }
  }

  return (
    <main className='container mt-14'>
      <section className="content">
        <Heading title='Change password' subtitle='refresh your security' color={colors.pink} />

        <div className="input-fields mt-10">
          <Input 
            type="password" 
            label='New Password'
            placeholder="New password"
            value={password}
            setValue={setPassword} 
            error={validatePassword(password)}
          />
          <Input 
            type="password" 
            label='Confirm New Password'
            placeholder="Re enter new password"
            value={newPassword}
            setValue={setNewPassword} 
            error={validateConfirmPassword(password, newPassword)}
          />
        </div>

        <button 
            onClick={() => handleChangePassword()}
            className="custom-btn auth-pink mt-5"
        >Next</button>

        <div className="redirect pink">
          <p>Continue without</p>
          <Link href="/forgot-password">Changing Your Password</Link>
        </div>
      </section>

      <section className="svg">
        <Image src={images.forgotpassword_avatar} alt="Change Password Image" />
      </section>

      {error && <ErrorPrompt message={error} />}
      
    </main>
  )
}

export default ChangePassword;
