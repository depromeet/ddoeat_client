'use client';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    document.addEventListener('onAppleLoginSuccess', (e) => {
      console.log(e);
    });
  }, []);
  return <></>;
}
