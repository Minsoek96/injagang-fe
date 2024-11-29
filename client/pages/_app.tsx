/* eslint-disable no-console */
import type { AppProps } from 'next/app';

import { Layout } from '@/src/app/layout/index';
import { useEffect } from 'react';
import {
  onFCP, onLCP, onCLS, onTTFB,
} from 'web-vitals';

function App({ Component, pageProps }: AppProps) {
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
      <Component {...pageProps} />
    </Layout>
  );
}
export default App;
