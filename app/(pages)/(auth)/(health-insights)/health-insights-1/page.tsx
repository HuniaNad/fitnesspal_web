'use client'

import Heading from '@/components/Auth/Heading/authHeading'
import ErrorPrompt from '@/components/ErrorAlert/error'
import Input from '@/components/Input/input'
import ProgressBar from '@/components/ProgressBar/progressbar'
import requireAuth from '@/config/auth'
import images from '@/public/export'
import { validateAge, validateWeight, validateGender, validateHeight } from '@/utils/Validations/healthprofileHandler'
import { requiredFieldsHandler } from '@/utils/Validations/requiredHandler'
import { FormControl, MenuItem, Select } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const HealthInsightsPage1 = () => {
  const [gender, setGender] = React.useState('');
  const [age, setAge] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [error, setError] = React.useState('');
  const router = useRouter();
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData) : {};
  const healthProfileData = localStorage.getItem('healthProfileData');
  const healthProfile = healthProfileData ? JSON.parse(healthProfileData) : {};

  const handleHealthData = async () => {
    try {
      const fields = [
        { label: 'Weight', value: weight },
        { label: 'Height', value: height },
        { label: 'Age', value: age },
        { label: 'Gender', value: gender }
      ];

      const requiredFieldsHandlerResult = requiredFieldsHandler(fields);
      if (requiredFieldsHandlerResult !== true && validateAge(age) !== null && validateWeight(weight) !== null && validateHeight(height) !== null && validateGender(gender) !== null) {
        setError(requiredFieldsHandlerResult as string);
        return;
      }

      console.log('user:', user);
      const updatedUser = {
        ...user,
        age: parseInt(age),
        gender
      }

      const updatedHealthProfile = {
        ...healthProfile,
        userId: user.id,
        weight: parseInt(weight),
        height: parseInt(height),
      }

      if (updatedUser && updatedHealthProfile) {
        const response = await fetch('http://localhost:8080/user/update-profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: updatedUser.id,
            age: updatedUser.age,
            gender: updatedUser.gender
          }),
        });

        if (response.ok) {
          localStorage.setItem('userData', JSON.stringify(updatedUser));
          localStorage.setItem('healthProfileData', JSON.stringify(updatedHealthProfile));
          
          router.push('/health-insights-2');
        } else {
          const errorMessage = await response.json();
          setError(errorMessage.message);
        }
      }

    } catch (error) {
      console.error('Error setting up health profile:', error);
      setError('An error occurred while setting up health profile. Please try again later.');
    }
  }

  return (
    <main className='container'>
      <section className="content">
        <ProgressBar step={1} />
        <Heading 
          title='health insights' 
          subtitle='Customize your health journey by selecting diseases and disabilities for personalized fitness and wellness guidance' 
        />

        <div className="input-fields mt-5">
          <FormControl>
              <label htmlFor='gender' className="block capitalize text-sm font-medium">Gender</label>
              <Select
                style={{width: '350px', height: '40px'}}
                className='field-border border-0 sm:text-sm sm:leading-6'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value={'female'}>Female</MenuItem>
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'neutral'}>Neutral</MenuItem>
              </Select>
          </FormControl>
          <Input 
            type="number" 
            label='Age'
            placeholder="Enter your age"
            value={age}
            setValue={setAge}
            error={validateAge(age)}
          />
        </div>
        <div className='two-fields flex gap-5 '>
          <Input 
            type="number" 
            label='Weight'
            placeholder="48"
            value={weight}
            setValue={setWeight}
            rightPlaceholder='kg'
            error={validateWeight(weight)}
          />
          <Input 
            type="number" 
            label='Height'
            placeholder="50"
            value={height}
            setValue={setHeight}
            rightPlaceholder='cm'
            error={validateHeight(height)}
          />
        </div>

        <button 
          onClick={() => handleHealthData()}
          className="custom-btn auth-purple mt-2"
        >Next</button>
      </section>

      <section className="svg">
        <Image src={images.signup_avatar} alt="Health Insights Image" />
      </section>

      {error && <ErrorPrompt message={error} />}
      
    </main>
  )
}

export default requireAuth(HealthInsightsPage1);
