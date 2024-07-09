'use client'

import Title from '@/components/Title/title'
import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import requireAuth from '@/config/auth'
import './profile.css'
import { Avatar, Modal, Popconfirm } from 'antd'
import { AntDesignOutlined } from '@ant-design/icons'
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import { colors } from '@/public/colors/colors'
import Link from 'next/link'
import ErrorPrompt from '@/components/ErrorAlert/error'
import images from '@/public/export'
import Heading from '@/components/Auth/Heading/authHeading'
import Input from '@/components/Input/input'
import { validateName, validatePassword } from '@/utils/Validations/authHandler'
import { validateAge, validateHeight, validateWeight } from '@/utils/Validations/healthprofileHandler'
import { calculateBMI } from '@/utils/bmiCalculator'
import { Router } from 'next/router'

const Profile = () => {
    const pathname = usePathname().split('/');
    const [error, setError] = React.useState('');
    const [toggleProfileModal, setToggleProfileModal] = React.useState(false);
    const [toggleResetPasswordModal, setToggleResetPasswordModal] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const router = useRouter();
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : {};
    const healthProfileData = localStorage.getItem('healthProfileData');
    const healthProfile = healthProfileData ? JSON.parse(healthProfileData) : {};

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        handleAccountDeletion();
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const handleAccountDeletion = async () => {
        try {

            const response = await fetch(`http://localhost:8080/user/delete-account/${user?.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                setTimeout(() => {
                    setOpen(false);
                    setConfirmLoading(false);
                }, 2000);

                localStorage.removeItem('userData');
                localStorage.removeItem('healthProfileData');
                router.push('/login');
            } else {
                const errorMessage = await response.json();
                setError(errorMessage.message);
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            setError('An error occurred while deleting account. Please try again later.');
        }
    }

    const handleProfileModalState = (state: boolean) => {
        setToggleProfileModal(state);
    }

    const handlePasswordModalState = (state: boolean) => {
        setToggleResetPasswordModal(state);
    }

    return (
        <>
            <Title name={pathname[pathname.length - 1]} />
            <div className="profile-container">
                <div className="edit-container">
                    <button className="custom-btn gradient-button-purple" onClick={() => setToggleProfileModal(!toggleProfileModal)}>Edit Profile</button>
                </div>

                <div className="profile-details">
                    <div className="profile-image">
                        <Avatar
                            className='avatar-img'
                            size={100}
                            icon={<AntDesignOutlined />}
                            src={user?.profileImage ?? images.login_avatar}
                        />
                    </div>
                    <div className="profile-info mt-4">
                        <div className="name">
                            <p className="value capitalize">{user?.name ?? 'Hunia'}</p>
                        </div>
                        <div className="email">
                            <p className="value">{user?.email ?? 'nadeem.h9696@gmail.com'}</p>
                        </div>

                        <div className="premium-status">
                            {user?.isPremium ?
                                <span className='mb-5 flex'>
                                    <DiamondOutlinedIcon style={{ color: colors.green, fontSize: '20px' }} />
                                    <Link href={'/subscription'}>
                                        <p className="value">Premium</p>
                                    </Link>
                                </span>
                                :
                                <Link href={'/subscription'}>
                                    <button className='custom-btn subscribe-btn'>Subscribe Now</button>
                                </Link>
                            }
                        </div>

                        <div className="cards">
                            <div className="card">
                                <p className="value">{healthProfile?.height ?? '150'} cm</p>
                                <p className="title">Height</p>
                            </div>
                            <div className="card">
                                <p className="value">{healthProfile?.weight ?? '50'} kg</p>
                                <p className="title">Weight</p>
                            </div>
                            <div className="card">
                                <p className="value">{user?.age ?? '20'} yrs</p>
                                <p className="title">Age</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="delete-container">
                    <Popconfirm
                        title="Delete Account"
                        description="Are you sure you want to delete your account? This action cannot be undone."
                        open={open}
                        onConfirm={handleOk}
                        okButtonProps={{ loading: confirmLoading }}
                        onCancel={handleCancel}
                    >
                        <button onClick={() => showPopconfirm()} className="custom-btn gradient-button-green">Delete Account</button>
                    </Popconfirm>


                    <button className="custom-btn button-border" onClick={() => setToggleResetPasswordModal(!toggleResetPasswordModal)}>Reset Password</button>
                </div>

                {error && <ErrorPrompt message={error} />}
                {toggleProfileModal && 
                <ResetProfileModal 
                    modalState={toggleProfileModal} 
                    setModalState={handleProfileModalState} 
                    setError={(errorMsg) => setError(errorMsg)} 
                    user={user} 
                    healthProfile={healthProfile} 
                />}

                {toggleResetPasswordModal && 
                <ResetPasswordModal 
                    modalState={toggleResetPasswordModal} 
                    setModalState={handlePasswordModalState} 
                    setError={(errorMsg) => setError(errorMsg)} 
                    user={user}
                />}
            </div>
        </>

    )
}

const ResetProfileModal = ({ modalState, setModalState, setError, user, healthProfile }:
    { modalState: boolean, setModalState: (state: boolean) => void, setError: (errorMsg: string) => void, user: any, healthProfile: any }) => {
    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [height, setHeight] = React.useState('');
    const [bmi, setBMI] = React.useState(0);
    const router = useRouter();

    useEffect(() => {
        if (user && healthProfile && healthProfile.weight && healthProfile.height) {
            setName(user.name);
            setAge(user.age);
            setWeight(healthProfile.weight);
            setHeight(healthProfile.height);
        }
    }, [healthProfile, user]);

    useEffect(() => {
        setBMI(calculateBMI(parseInt(weight), parseInt(height)));
    }, [weight, height])

    const handleResetProfile = async () => {
        try {
            if (validateName(name) !== null || validateAge(age) !== null || validateWeight(weight) !== null || validateHeight(height) !== null) {
                setError('Please fill in all fields');
                return;
            }

            const responseUser = await fetch(`http://localhost:8080/user/update-profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user?.id,
                    name,
                    age: parseInt(age)
                }),
            });
            if (!responseUser.ok) {
                const errorMessage = await responseUser.json();
                setError(errorMessage.message);
                return;
            }

            const responseWeight = await fetch(`http://localhost:8080/health-profile/update-weight`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user?.id,
                    weight: parseInt(weight),
                    bmi: bmi
                }),
            });
            if (!responseWeight.ok) {
                const errorMessage = await responseWeight.json();
                setError(errorMessage.message);
                return;
            }

            const responseHeight = await fetch(`http://localhost:8080/health-profile/update-height`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user?.id,
                    height: parseInt(height),
                    bmi: bmi
                }),
            });
            if (!responseHeight.ok) {
                const errorMessage = await responseHeight.json();
                setError(errorMessage.message);
                return;
            }

            if (responseUser.ok && responseWeight.ok && responseHeight.ok) {
                const updatedUserData = {
                    ...user,
                    name,
                    age: parseInt(age)
                };
                const updatedHealthData = {
                    ...healthProfile,
                    weight: parseInt(weight),
                    height: parseInt(height),
                    bmi: bmi
                };
                localStorage.setItem('userData', JSON.stringify(updatedUserData));
                localStorage.setItem('healthProfileData', JSON.stringify(updatedHealthData));
                setModalState(!modalState);
                router.refresh();
            }

        } catch (error) {
            console.error('Error resetting profile:', error);
            setError('An error occurred while resetting profile. Please try again later.');
        }
    }

    return (
        <Modal
            centered
            open={modalState}
            onCancel={() => setModalState(!modalState)}
            onOk={() => setModalState(!modalState)}
            footer={null}
            width={'600px'}
            className='bmi-modal'
        >
            <Heading
                title='Reset Profile'
                color={colors.purple}
            />

            <div className="input-fields flex flex-col justify-center items-center">
                <div className="flex gap-5">
                    <Input
                        type="name"
                        label='Name'
                        placeholder="Enter new name"
                        value={name}
                        setValue={setName}
                        error={validateName(name)}
                    />
                    <Input
                        type="number"
                        label='Age'
                        placeholder="Enter your age"
                        value={age}
                        setValue={setAge}
                        error={validateAge(age)}
                    />
                </div>

                <div className="flex gap-5">
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
            </div>

            <div className='flex justify-center items-center w-100 mt-10'>
                <button onClick={() => handleResetProfile()} className="custom-btn gradient-button-purple">Save</button>
            </div>


        </Modal>
    )
}
const ResetPasswordModal = ({ modalState, setModalState, setError, user }:
    { modalState: boolean, setModalState: (state: boolean) => void, setError: (errorMsg: string) => void, user: any}) => {
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');

    const handleResetPassword = async () => {
        try {
            if (validatePassword(oldPassword) !== null || validatePassword(newPassword) !== null) {
                setError('Please fill in all fields');
                return;
            }

            const responseUser = await fetch(`http://localhost:8080/user/update-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user?.id,
                    oldPassword,
                    newPassword
                }),
            });
            if (!responseUser.ok) {
                const errorMessage = await responseUser.json();
                setError(errorMessage.message);
                return;
            }

            setModalState(!modalState);
        } catch (error) {
            console.error('Error resetting password:', error);
            setError('An error occurred while resetting password. Please try again later.');
        }
    }

    return (
        <Modal
            centered
            open={modalState}
            onCancel={() => setModalState(!modalState)}
            onOk={() => setModalState(!modalState)}
            footer={null}
            width={'600px'}
            className='bmi-modal'
        >
            <Heading
                title='Reset Password'
                color={colors.purple}
            />

            <div className="input-fields flex flex-col justify-center items-center">
                <Input 
                    type="password" 
                    label='Old Password'
                    placeholder="Old password"
                    value={oldPassword}
                    setValue={setOldPassword} 
                />
                <Input 
                    type="password" 
                    label='New Password'
                    placeholder="New password"
                    value={newPassword}
                    setValue={setNewPassword}
                    error={validatePassword(newPassword)}
                />
            </div>

            <div className='flex justify-center items-center w-100 mt-10'>
                <button onClick={() => handleResetPassword()} className="custom-btn gradient-button-purple">Change Password</button>
            </div>


        </Modal>
    )
}

export default requireAuth(Profile);