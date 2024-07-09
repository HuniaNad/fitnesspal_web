'use client'

import Heading from '@/components/Auth/Heading/authHeading'
import Input from '@/components/Input/input'
import ProgressBar from '@/components/ProgressBar/progressbar'
import { colors } from '@/public/colors/colors'
import images from '@/public/export'
import { Checkbox, FormControl, ListItemText, MenuItem, Select } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import requireAuth from '@/config/auth'
import CustomBMIModal from '@/components/CustomBMIModal/modal'
import { calculateBMI } from '@/utils/bmiCalculator'
import { useRouter } from 'next/navigation'
import ErrorPrompt from '@/components/ErrorAlert/error'
import { useSelector } from 'react-redux'
import { selectHealthProfile } from '@/redux/features/healthProfileSlice'
import { parse } from 'path'
import { Modal } from 'antd'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { validateTargetWeight, validateWeight } from '@/utils/Validations/healthprofileHandler'

const HealthInsightsPage3 = () => {
    const [bmi, setBmi] = React.useState(0);
    const [weight, setWeight] = React.useState('');
    const [toggle, setToggle] = React.useState(false);
    const [weightModalToggle, setWeightModalToggle] = React.useState(false);
    const [error, setError] = React.useState('');
    const healthProfileData = localStorage.getItem('healthProfileData');
    const healthProfile = React.useMemo(() => healthProfileData ? JSON.parse(healthProfileData) : {}, [healthProfileData]);
    const router = useRouter();

    const handleModalState = (state: boolean) => {
        setToggle(state);
    }

    useEffect(() => {
        if (healthProfile && healthProfile.weight && healthProfile.height) {
            setBmi(calculateBMI(healthProfile.weight, healthProfile.height));
        }
    }, [healthProfile]);

    const handleProfileSetup = async () => {
        try {
            if (healthProfile) {
                const updatedhealthProfile = {
                    ...healthProfile,
                    bmi: bmi,
                    targetWeight: parseInt(weight),
                    toningAreas: [],
                    isPound: false
                }

                // create user health profile
                const response = await fetch('http://localhost:8080/health-profile/create-profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedhealthProfile),
                });

                if (response.ok) {
                    localStorage.setItem('healthProfileData', JSON.stringify(updatedhealthProfile));
                    router.push('/homepage');
                } else {
                    console.error('Error setting up health profile:', response)
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
        <main>
            <div className='drinkingwater-avatar'>
                <Image src={images.drinkingwater_avatar} alt='drinking water avatar' />
            </div>

            <section className="content">
                <ProgressBar step={3} />
                <Heading
                    title='what is your health goal?'
                    subtitle='Define your path to better health with personalized goals, empowering you to achieve optimal wellness and fitness'
                />

                <div className="input-fields mt-5">
                    <div className="bmi-analysis-container mb-7">
                        <div className="current-bmi text-white">
                            <p className="text-sm">Current BMI</p>
                            <p className="bmi font-bold text-lg">{bmi} kg/m<sup>2</sup></p>
                        </div>
                        <div className="analysis-btn">
                            <button onClick={() => setToggle(!toggle)}>Show Analysis <ChevronRightIcon /> </button>
                        </div>
                    </div>

                    <div className="field-row my-5">
                        <div className="left capitalize">
                            Be healthier
                        </div>

                        <div className="right capitalize" onClick={() => setWeightModalToggle(!weightModalToggle)}>
                            Lose or Gain Weight
                        </div>
                    </div>
                </div>

                {weight && <div className='flex align-middle justify-center'>Target Weight: {weight} kg</div>}
                <div className='flex align-middle justify-center'>

                    <button
                        onClick={() => handleProfileSetup()}
                        className="custom-btn auth-purple mt-2"
                    >{weight ? 'Next' : 'Skip'}</button>
                </div>
            </section>

            {weightModalToggle &&
                <CustomModal
                    modalState={weightModalToggle}
                    setModalState={setWeightModalToggle}
                    weight={weight}
                    setWeight={setWeight}
                />
            }
            {toggle && <CustomBMIModal modalState={toggle} setModalState={handleModalState} />}
            {error && <ErrorPrompt message={error} />}

        </main>
    )
}

const CustomModal = ({ modalState, setModalState, weight, setWeight }:
    {
        modalState: boolean,
        setModalState: (state: boolean) => void
        weight: string,
        setWeight: (weight: string) => void
    }) => {

    const modalStyles = {
        header: {
            paddingTop: 30,
            textAlign: 'center',
        },
        body: {
            padding: '40px'
        },
    };

    return (
        <>
            <Modal
                title="Enter Your Target Weight"
                centered
                open={modalState}
                onCancel={() => setModalState(!modalState)}
                onOk={() => setModalState(!modalState)}
                footer={null}
                styles={modalStyles}
                className='bmi-modal'
                closeIcon={
                    <CheckCircleIcon
                        style={{
                            fontSize: '30px',
                            color: colors.purple,
                        }}
                    />
                }
            >
                <div className="flex justify-center items-center w-100">
                    <Input
                        type="number"
                        label='Target Weight'
                        placeholder="48"
                        value={weight}
                        setValue={setWeight}
                        rightPlaceholder='kg'
                        error={validateTargetWeight(weight)}
                        classNames='width-full'
                    />
                </div>
            </Modal>
        </>
    );

}

export default requireAuth(HealthInsightsPage3);
