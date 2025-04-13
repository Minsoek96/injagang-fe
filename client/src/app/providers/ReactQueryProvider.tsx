import { useState } from 'react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';

type Props = {
  children: React.ReactNode;
};

function ReactQueryProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          staleTime: 1000 * 60 * 5, // 5분 동안 데이터는 최신 상태로 간주됩니다.
          refetchOnWindowFocus: false,
          retryOnMount: true,
          refetchOnReconnect: false,
          throwOnError: true,
          retry: (count, error) => {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
              return false;
            }
            return count > 2;
          },
        },
        mutations: {
          throwOnError: (error: unknown) => {
            if (axios.isAxiosError(error)) {
              return error.response?.status === 401;
            }
            return false;
          },
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'}
      />
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
