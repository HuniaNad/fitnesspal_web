'use client'

import React from 'react'
import Image from 'next/image'
import images from '@/public/export'
import Link from 'next/link'
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import PaymentIcon from '@mui/icons-material/Payment';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import { useRouter } from 'next/navigation';

const SideNavigation = () => {
    const [active, setActive] = React.useState('Dashboard');
    const [showMenu, setShowMenu] = React.useState(true);
    const router = useRouter();
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : {};

    const menuShowClasses = showMenu ? "sidebar hide" : "sidebar";

    const handleLogout = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('healthProfileData');
        localStorage.removeItem('waterIntakeData');
        localStorage.removeItem('stepData');
        router.push('/');
    }

  return (
    <div className="sidebar-container h-full ">
        <div className={menuShowClasses}>
            <div className="menu-btn">
                {
                    showMenu ? 
                    <ArrowRightOutlinedIcon onClick={() => setShowMenu(!showMenu)} /> : 
                    <ArrowLeftOutlinedIcon onClick={() => setShowMenu(!showMenu)} />
                }
            </div>

            <div className="head">
                <div className="user-img">
                    <Image src={images.user} alt='user image'/>
                </div>

                <div className="user-details">
                    <p className="title">{user.name}</p>
                    <Link href="/profile">
                        <button className="custom-btn gradient-button-purple">Profile</button>
                    </Link>
                </div>
            </div>

            <div className="nav">
                <div className="menu">
                    <p className="title">Main</p>

                    <ul>
                        <li className={active === 'Dashboard' ? 'active' : ''} onClick={() => setActive('Dashboard')}>
                            <Link href="/homepage">
                                <HomeIcon />
                                <span className="text">Dashboard</span>
                            </Link>
                        </li>
                        <li className={active === 'Workout Planner' ? 'active' : ''} onClick={() => setActive('Workout Planner')}>
                            <Link href="/workout-planner">
                                <FitnessCenterIcon />
                                <span className="text">Workout Planner</span>
                            </Link>
                        </li>
                        {/* <li className={active === 'Meal Planner' ? 'active' : ''} onClick={() => setActive('Meal Planner')}>
                            <Link href="/meal-planner">
                                <LocalDiningIcon />
                                <span className="text">Meal Planner</span>
                            </Link>
                        </li> */}
                        {/* <li className={active === 'Progress Insights' ? 'active' : ''} onClick={() => setActive('Progress Insights')}>
                            <Link href="/progress-insights">
                                <TroubleshootIcon />
                                <span className="text">Progress Insights</span>
                            </Link>
                        </li> */}
                        <li className={active === 'Subscription' ? 'active' : ''} onClick={() => setActive('Subscription')}>
                            <Link href="/subscription">
                                <PaymentIcon />
                                <span className="text">Subscription</span>
                            </Link>
                        </li>
                        <li className={active === 'Step Tracker' ? 'active' : ''} onClick={() => setActive('Step Tracker')}>
                            <Link href="/step-tracker">
                                <DirectionsRunOutlinedIcon />
                                <span className="text">Step Tracker</span>
                            </Link>
                        </li>
                    </ul>

                </div>
                {/* <div className="menu">
                    <p className="title">Settings</p>

                    <ul>
                        <li className={active === 'Settings' ? 'active' : ''} onClick={() => setActive('Settings')}>
                            <Link href="#">
                                <SettingsIcon />
                                <span className="text">Settings</span>
                            </Link>
                        </li>
                    </ul>

                </div> */}
            </div>

            <div className="menu">
                <p className="title">Account</p>

                <ul>
                    <li className={active === 'Landing Page' ? 'active' : ''} onClick={() => setActive('Landing Page')}>
                        <Link href="/">
                            <HelpOutlineOutlinedIcon />
                            <span className="text">Landing Page</span>
                        </Link>
                    </li>
                    <li className={active === 'Logout' ? 'active' : ''} onClick={() => setActive('Logout')}>
                        <Link href='/'>
                            <LogoutIcon />
                            <span className="text" onClick={() => handleLogout()}>Log out</span>
                        </Link>
                    </li>
                </ul>

            </div>
        </div>
    </div>
  )
}

export default SideNavigation