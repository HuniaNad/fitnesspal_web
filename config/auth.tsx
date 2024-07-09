// auth.ts - Custom route handler for authentication
import Loading from '@/components/Loading/loading';
import { selectUser } from '@/redux/features/userSlice';
import { useRouter } from 'next/navigation';

import { useSelector } from 'react-redux';
import React, {useEffect, useMemo} from "react";

const requireAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const HOC: React.FC<P> = (props) => {
        const router = useRouter();
        const [isLoading, setIsLoading] = React.useState(true);
        const userData = localStorage.getItem('userData');
        const user = useMemo(() => userData ? JSON.parse(userData) : {}, [userData]);

        useEffect(() => {  
            // If user is not authenticated, redirect to the login page
            if (user.name === undefined) {
                router.push('/login');
            } else {
                setIsLoading(false);
            }
        }, [user, router]);

        // If authentication is still in progress, render a loading indicator
        if (isLoading) {
            return <Loading />;
        }

        // If user is authenticated, render the wrapped component
        return <WrappedComponent {...props} />;
    };

    return HOC;
};

export default requireAuth;
