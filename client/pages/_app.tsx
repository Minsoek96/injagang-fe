/* eslint-disable no-console */
import type { AppProps } from 'next/app';

import { Layout } from '@/src/app/layout/index';
import { useEffect, useState } from 'react';
import {
  onFCP, onLCP, onCLS, onTTFB,
} from 'web-vitals';
import { Router } from 'next/router';
import GlobalLoading from '@/pages/GlobalLoading';

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  Router.events.on('routeChangeStart', () => setLoading(true));
  Router.events.on('routeChangeComplete', () => setLoading(false));
  Router.events.on('routeChangeError', () => setLoading(false));

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const renderType = pageProps.dehydratedState ? 'SSR' : 'CSR';

      onFCP((metric) => console.log(`${renderType} FCP:`, metric.value));
      onLCP((metric) => console.log(`${renderType} LCP:`, metric.value));
      onTTFB((metric) => console.log(`${renderType} TTFB:`, metric.value));
      onCLS((metric) => console.log(`${renderType} CLS:`, metric.value));
    }
  }, [pageProps]);

  return (
    <Layout>
      {loading && <GlobalLoading />}
      <Component {...pageProps} />
    </Layout>
  );
}
export default App;
