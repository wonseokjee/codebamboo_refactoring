import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import '@/styles/globals.css';
//아래 css모듈은 초기 빌드시 번들에 연관 없는 듯. 번들 분석기로 봤을때 차이없음.
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import { Layout } from '@/components/common/Layout';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Head>
          <title>Code Bamboo</title>
          <link rel='icon' href='/codebamboo.ico' />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
