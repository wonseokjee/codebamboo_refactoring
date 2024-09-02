// 'use client';
import { Intro } from '@/components/main/Intro';
// import Main from '@/components/main/Main';
import { useEffect, useState } from 'react';
import { isHomeState } from '@/recoil/isHome';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginModalState, userState } from '@/recoil/user';
import { isBrowser } from 'browser-or-node';
import dynamic from 'next/dynamic';

export const scrollTo700vh = () => {
  window.scrollTo({
    top: window.innerHeight * 7,
  });
};
const DynamicLoginModal = dynamic(
  () => import('@/components/common/LoginModal')
);
const DynamicMainModal = dynamic(() => import('@/components/main/Main'));
if (isBrowser) {
  require('codemirror/mode/htmlmixed/htmlmixed');
  require('codemirror/mode/css/css');
  require('codemirror/mode/javascript/javascript');
}

export default function Home() {
  const setIsHome = useSetRecoilState(isHomeState);
  const user = useRecoilValue(userState);
  const isLoginModalOpen = useRecoilValue(loginModalState);
  const [onMainBundle, setOnMainBundle] = useState(false);

  if (onMainBundle) {
    //여기서 require 해버리면 이미 codemirror.js 가 번들에 포함됨.
    //이부분을 lazyloading하는게 중요함.
    // require('codemirror/mode/htmlmixed/htmlmixed');
    // require('codemirror/mode/css/css');
    // require('codemirror/mode/javascript/javascript');
  }

  useEffect(() => {
    setIsHome(true);
    if (user.isLoggedIn) scrollTo700vh();
    const onScroll = () => {
      const wheelscroll = document.documentElement.scrollTop;
      if (wheelscroll > 500) {
        window.removeEventListener('scroll', onScroll);
        setOnMainBundle(true);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      setIsHome(false);
    };
  }, []);
  return (
    <div className='w-full h-[500vh]'>
      <Intro />
      {onMainBundle ? <DynamicMainModal /> : <></>}
      {isLoginModalOpen ? <DynamicLoginModal /> : <></>}
    </div>
  );
}
