import Image from 'next/image';
import Link from 'next/link';
import images from '@/public/export';
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    const menuLinks = [
        { href: '/', label: 'Home' },
        { href: '#bmicalculation', label: 'BMI Calculation' },
        { href: '#features', label: 'Features' },
        { href: '#subscription', label: 'Subscription' }
    ];

  return (
    <div className='footer-container'>
        <div className="content">
            <div className='footer-col1'>
                <Link href="/">
                    <Image src={images.logo_white} alt="app logo" />
                </Link>
                <p className='mt-2 mb-4'>An ultimate destination for your health and wellness needs.</p>

                <div className="socials">
                    <Link href="https://www.facebook.com/" target='_blank'>
                        <FacebookIcon />
                    </Link>
                    <Link href="https://www.intagram.com/" target='_blank'>
                        <InstagramIcon />
                    </Link>
                    <Link href="https://www.linkedin.com/" target='_blank'>
                        <LinkedInIcon />
                    </Link>
                </div>
            </div>

            <div className="footer-col2">
                <h3>Quick Links</h3>
                <ul>
                { 
                    menuLinks.map((link) => (
                        <Link key={link.label} href={link.href}>{link.label}</Link>
                    )) 
                }
                </ul>
            </div>
        </div>

        <div className="copyright">
            <p>&copy; 2024 FitnessPal - All Rights Reserved</p>
        </div>
      
    </div>
  )
}

export default Footer
