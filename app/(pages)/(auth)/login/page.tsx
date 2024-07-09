'use client'

import Heading from '@/components/Auth/Heading/authHeading'
import Input from '@/components/Input/input'
import { colors } from '@/public/colors/colors'
import images from '@/public/export'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { Alert } from 'antd'
import { validateEmail } from '@/utils/Validations/authHandler'
import ErrorPrompt from '@/components/ErrorAlert/error'
import { setUser } from '@/redux/features/userSlice'
import { UserT } from '@/types/ReduxTypes/userType'
import { useDispatch } from 'react-redux'
import { setHealthProfile } from '@/redux/features/healthProfileSlice'
import { requiredFieldsHandler } from '@/utils/Validations/requiredHandler'

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('userData');
    localStorage.removeItem('healthProfileData');
    localStorage.removeItem('waterIntakeData');
    localStorage.removeItem('stepData');
    localStorage.removeItem('calorieData');
    // localStorage.clear();
  }, []);

  const handleSignIn = async () => {
    try {
      const fields = [
        { label: 'Email', value: email },
        { label: 'Password', value: password }
      ];

      const requiredFieldsHandlerResult = requiredFieldsHandler(fields)

      if (requiredFieldsHandlerResult !== true && validateEmail(email) !== null) {
        setError(requiredFieldsHandlerResult as string);
        return;
      }

      const response = await fetch('http://localhost:8080/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);

        const existingUserProfileResponse = await fetch(`http://localhost:8080/user/${responseData.userId}`,  {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!existingUserProfileResponse.ok) {
          const errorMessage = await existingUserProfileResponse.json();
          setError(errorMessage.message as string);
          return;
        }

        const data = (await existingUserProfileResponse.json()).user;
        const updatedUserData = {
          id: data._id,
          email: data.email,
          name: data.name,
          age: data.age,
          gender: data.gender,
          isPremium: data.googleAuth
        }

        localStorage.setItem('userData', JSON.stringify(updatedUserData));

        const userHealthProfileResponse = await fetch(`http://localhost:8080/health-profile/get-profile/${updatedUserData?.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!userHealthProfileResponse.ok) {
          router.push('/health-insights-1');
          return;
        }

        const userHealthProfileData = await userHealthProfileResponse.json();
        localStorage.setItem('healthProfileData', JSON.stringify(userHealthProfileData));
        router.push('/homepage');
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message as string);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred while logging in. Please try again later.');
    }
  }

  return (
    <main className='container'>
      <section className="content">
        <Heading
          title='Welcome Back'
          subtitle='Login to your account'
          color={colors.purple}
        />

        <div className="input-fields">
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
          />

          <Link href="/forgot-password">Forgot password?</Link>
        </div>

        <button onClick={() => handleSignIn()} className="custom-btn auth-purple">Sign in</button>


        {/* <div className="horizontal-divider">
          <span></span>
          <p>or</p>
          <span></span>
        </div>

        <button className='custom-btn google-auth'>
          <Image src={images.google_icon} alt="Google" />
          Continue with Google
        </button> */}

        <div className="redirect purple">
          <p>Don&apos;t have an account?</p>
          <Link href="/signup">Sign up for free!</Link>
        </div>
      </section>

      <section className="svg">
        <Image src={images.login_avatar} alt="Login Image" />
      </section>

      {error && <ErrorPrompt message={error} />}
    </main>
  )
}

export default Login
