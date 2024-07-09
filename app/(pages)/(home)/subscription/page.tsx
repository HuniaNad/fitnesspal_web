'use client'
import images from '@/public/export'
import React from 'react'
import Image from 'next/image'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { colors } from '@/public/colors/colors';
import Link from 'next/link';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import requireAuth from '@/config/auth';

const perks = [
    {
        free: [
            {
                title: 'Different Workouts',
                description: 'Diverse workouts for your fitness goals'
            },
            {
                title: 'Calorie Trackor',
                description: 'Track calories, stay healthy.'
            }
        ]
    },
    {
        premium: [
            {
                title: 'Better Health Analytics',
                description: 'Effortless nutrition planning'
            },
            {
                title: 'Meal Planner',
                description: 'Smart insights for a healthier you'
            },
        ]
    }
]

const SubscriptionScreen = () => {
    return (
        <div className='main-container'>
            <div className="subscription-content">
                <div className="heading">
                    <h1 className="primary-heading">
                        You currently have the <span>Free</span> Plan
                    </h1>
                    <p className="secondary-heading">
                        Unlock the <span>premium</span> benefits today!
                    </p>
                </div>

                <Image src={images.running_avatar} alt="Subscription" />

            </div>

            <div className="subscription-features">
                <div className="card">
                    <div className="heading">
                        <h1 className="primary-heading">
                            Enjoy the <span>Premium</span> Features
                        </h1>
                    </div>

                    <div className="perks">
                        {perks[1].premium?.map(
                            (perk, index) => {
                                return (
                                    <div key={index} className="perk">
                                        <div className="icon">
                                            <DiamondOutlinedIcon fontSize='large' />
                                        </div>
                                        <div className="text">
                                            <h1>{perk.title}</h1>
                                            <p>{perk.description}</p>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
                <Link href='/subscription/manage-cards'>
                    <button className="custom-btn gradient-button-green">Subscribe Rs.1000/month</button>
                </Link>
            </div>

        </div>
    )
}

export default requireAuth(SubscriptionScreen)