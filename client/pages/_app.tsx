/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import { Router } from 'next/router';
import type { AppProps } from 'next/app';

import {
  onFCP, onLCP, onCLS, onTTFB,
} from 'web-vitals';

import { Layout } from '@/src/app/layout/index';
import GlobalLoading from './GlobalLoading';

const LOADING_DELAY = 500;
const isDevelopment = process.env.NODE_ENV === 'development';

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleStart = () => {
      timeoutId = setTimeout(() => {
        setLoading(true);
      }, LOADING_DELAY);
    };

    const handleComplete = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setLoading(false);
    };

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  useEffect(() => {
    if (!isDevelopment) return;

    const renderType = pageProps.dehydratedState ? 'SSR' : 'CSR';
    onFCP((metric) => console.log(`${renderType} FCP:`, metric.value));
    onLCP((metric) => console.log(`${renderType} LCP:`, metric.value));
    onTTFB((metric) => console.log(`${renderType} TTFB:`, metric.value));
    onCLS((metric) => console.log(`${renderType} CLS:`, metric.value));
  }, [pageProps.dehydratedState]);

  return (
    <Layout>
      {loading && <GlobalLoading />}
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
