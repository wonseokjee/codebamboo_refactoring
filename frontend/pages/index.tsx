import { Intro } from '@/components/main/Intro';
import Main from '@/components/main/Main';
import { useEffect } from 'react';
import { isHomeState } from '@/recoil/isHome';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginModalState, userState } from '@/recoil/user';
import dynamic from 'next/dynamic';

export const scrollTo700vh = () => {
  window.scrollTo({
    top: window.innerHeight * 7,
  });
};
const DynamicLoginModal = dynamic(
  () => import('@/components/common/LoginModal')
);

export default function Home() {
  const setIsHome = useSetRecoilState(isHomeState);
  const user = useRecoilValue(userState);
  const isLoginModalOpen = useRecoilValue(loginModalState);

  useEffect(() => {
    setIsHome(true);
    if (user.isLoggedIn) scrollTo700vh();
    return () => {
      setIsHome(false);
    };
  }, []);
  return (
    <div className='w-full h-[800vh]'>
      <Intro />
      <Main />
      {isLoginModalOpen ? <DynamicLoginModal /> : <></>}
    </div>
  );
}
