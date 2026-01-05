'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import '@/styles/admin.scss'
import Cookies from "js-cookie";


export default function DashBoradLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/login');
        } else {
            setAuthChecked(true);
        }
    }, []);

    if (!authChecked) return null;

    return (
        <>
            <div className="admin">
                <div className="nav-bar">
                    <Navbar />
                </div>
                <div className="main">
                    <main className="flex-1">{children}</main>
                </div>
            </div>
        </>
    );
}