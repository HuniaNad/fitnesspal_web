import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import images from '@/public/export';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <header className='auth-header'>
                <Link href="/">
                    <Image src={images.logo_black} alt="app logo" />
                </Link>   
            </header>
            <main>
                {children}
            </main>
        </>
    );
};

export default Layout;