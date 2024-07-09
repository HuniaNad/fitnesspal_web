'use client';
import Image from 'next/image';
// import { GiHamburgerMenu } from 'react-icons/gi';
// import { MdOutlineRestaurantMenu } from 'react-icons/md';

import images from '@/public/export';
import Link from 'next/link';

const Navbar = () => {
  //   const [toggleMenu, setToggleMenu] = React.useState(false);
  const userData = localStorage.getItem('userData');

  const menuLinks = [
    { href: '#bmicalculation', label: 'BMI Calculation' },
    { href: '#features', label: 'Features' },
    { href: '#subscription', label: 'Subscription' }
  ];


  //   const handleToggleMenu = (flag) => {
  //     setToggleMenu(flag);
  //   }

  return (
    <nav className='navbar-container'>
      <div className='navbar-logo'>
        <Link href="/">
          <Image src={images.logo_white} alt="app logo" />
        </Link>
      </div>

      <ul className='navbar-links'>
        {menuLinks.map((link) => (
          <Link key={link.label} href={link.href}>{link.label}</Link>
        ))}
      </ul>

      {!userData ? <div className='navbar-auth'>
        <Link href="/signup" className='signup'>Sign up</Link>
        <Link href="/login">
          <button className="custom-btn gradient-button-purple">Login</button>
        </Link>
      </div> :
        <div className='navbar-auth'>
          <Link href="/homepage">
            <button className="custom-btn gradient-button-purple">Go to Dashboard</button>
          </Link>
        </div>}
    </nav>
  )
};

export default Navbar;
