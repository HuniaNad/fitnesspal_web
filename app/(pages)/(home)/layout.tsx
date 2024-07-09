import React from 'react';
import SideNavigation from '@/components/SideNavigation/sideNavigation';
import { usePathname } from 'next/navigation';
import Title from '@/components/Title/title';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex flex-row h-full mainSetting'>
            <header className='mr-10'>
                <SideNavigation />
            </header>
            <div className={"px-20 py-10 w-full h-full overflow-y-scroll max-h-screen mainSetting"} >
                {children}
            </div>
        </div>
    );
};

export default Layout;