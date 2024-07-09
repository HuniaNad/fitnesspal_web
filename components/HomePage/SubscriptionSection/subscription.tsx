import React from 'react'
import Heading from '../Heading/heading'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { colors } from '@/public/colors/colors';
import Link from 'next/link';

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
            {
                title: 'Different Workouts',
                description: 'Diverse workouts for your fitness goals'
            },
            {
                title: 'Calorie Trackor',
                description: 'Track calories, stay healthy.'
            }
        ]
    }
]

const SubscriptionPerks = ({ title, desc }: { title: string, desc: string}) => {
    return (
        <>
            <div className="text">
                <h1>{title}</h1>
                <p>{desc}</p>
            </div>
        </>
    )
}

const SubscriptionCard = ({ plan, cost }: { plan: string, cost: string }) => {
    const customClass = `subscription-container ${plan}`;

    return (
        <div className={customClass}>
            <div className="pricing">
                <p className='capitalize'>{plan}</p>
                <h1>Rs. {cost}/<span>month</span></h1>
            </div>

            { plan === 'free' ?
                <div className="perks">
                    {perks[0].free?.map(
                        (perk, index) => {
                            return (
                                <div key={index} className="perk">
                                    <div className="icon">
                                        <CheckCircleRoundedIcon fontSize='large' style={{color: colors.green}} />
                                    </div>
                                    <SubscriptionPerks 
                                        title={perk.title} 
                                        desc={perk.description}
                                    />
                                </div>
                            )
                        }
                    )}

                    {perks[1].premium?.map(
                        (perk, index) => {
                            if (index < 2) {
                                return (
                                    <div key={index} className="perk">
                                        <div className="icon">
                                            <CancelRoundedIcon fontSize='large' style={{color: colors.red}} />
                                        </div>
                                        <SubscriptionPerks 
                                            title={perk.title} 
                                            desc={perk.description}
                                        />
                                    </div>
                                )
                            }
                        }
                    )}
                </div>
                :
                <div className="perks">
                    {perks[1].premium?.map(
                        (perk, index) => {
                            return (
                                <div key={index} className="perk">
                                    <div className="icon">
                                        <CheckCircleRoundedIcon fontSize='large' style={{color: colors.white}} />
                                    </div>
                                    <SubscriptionPerks 
                                        title={perk.title} 
                                        desc={perk.description}
                                    />
                                </div>
                            )
                        }
                    )}
                </div>
            }
            <Link href="/subscription">
                <button className="custom-btn gradient-button-green">Choose Now</button>
            </Link>
        </div>
    )

}

const Subscription = () => {
  return (
    <div id='subscription' className='section-layout'>
        <Heading title="our subscription plans" subtitle="unlock premium benefits" />

        <div className="subscription-cards">
            <SubscriptionCard plan='free' cost='0' />
            <SubscriptionCard plan='premium' cost='1000' />
        </div>
    </div>
  )
}

export default Subscription
