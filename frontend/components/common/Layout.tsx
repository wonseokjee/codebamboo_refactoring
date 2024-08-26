import React, { useEffect, useState } from 'react';
import { Bar } from './Bar';
import { userState } from '@/recoil/user';
import { useSetRecoilState } from 'recoil';
import authApi from '@/hooks/api/axios.authorization.instance';
import { scrollTo700vh } from '@/pages';
import dynamic from 'next/dynamic';

interface Props {
  children: React.ReactNode;
}
const DynamicBar = dynamic(() => import('@/components/common/Bar'));

export const Layout = ({ children }: Props) => {
  const setUser = useSetRecoilState(userState);
  const [isBarBundle, setIsBarBundle] = useState(false);
  const keepLoggedIn = async () => {
    const response = await authApi.get('auth/keep-login-state');
    if (response.status !== 200) throw new Error('로그인 상태 유지 실패');
    const user = response.data.data;
    // console.log(user);
    setUser({
      ...user,
      isLoggedIn: true,
    });
    scrollTo700vh();
    console.log('로그인 유지 성공');
  };

  // 로그인 상태 유지. 여기서는 반환되는 리스폰스 data가 필요없으므로, 쿼리사용하지 않았음.
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      keepLoggedIn();
    }
    const onScroll = () => {
      const wheelscroll = document.documentElement.scrollTop;
      
      if (wheelscroll > 500) {
        window.removeEventListener('scroll', onScroll);
        setIsBarBundle(true);
      }
    };

    window.addEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className='flex h-screen w-screen
                  flex-col 
                  md:flex-row'
    >
      {isBarBundle ? <DynamicBar /> : <></>}
      <main className='h-full w-full'>{children}</main>
    </div>
  );
};
