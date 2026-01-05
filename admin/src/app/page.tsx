'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token'); 
    if (token) {
      router.push('/managerHome');
    } else {
      router.push('/login');
    }
  }, [router]);

  // useEffect(() => {
  //   const token = Cookies.get('token'); 
  //   if (token) {
  //     router.push('/login');
  //   } else {
  //     router.push('/managerHome');
  //   }
  // }, [router]);

  return null;
}
