import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../UI/Button/Button';

export const CheckAuthModal = () => {
  const { push } = useRouter();
  return (
    <div className='flex flex-col gap-[24px]'>
      <h1 className='text-[24px] font-bold'>
        Sign In to Have Access to All Materials of the Tyrian Community
      </h1>
      <div className='flex w-full gap-[10px] justify-center h-[44px]'>
        <Button
          className='min-w-[165px] border border-regaliaPurple bg-transparent text-[#B0B0B0] text-[15px] font-bold'
          onClick={() => {
            const baseUrl = process.env.NEXT_PUBLIC_AUTH_URL || 'https://auth.tyriantrade.com/';
            push(`${baseUrl}marketplace`);
          }}
        >
          Sign Up
        </Button>
        <Button
          className='min-w-[165px]  bg-[linear-gradient(270deg,#A06AFF_0%,#482090_100%)] text-[15px] font-bold'
          onClick={() => {
            const baseUrl = process.env.NEXT_PUBLIC_AUTH_URL || 'https://auth.tyriantrade.com/';
            push(`${baseUrl}marketplace`);
          }}
        >
          Sing In
        </Button>
      </div>
    </div>
  );
};
