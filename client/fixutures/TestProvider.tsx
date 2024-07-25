import { ThemeProvider } from 'styled-components';

import { defaultTheme } from '@/src/app/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type ProviderProps = {
    children: React.ReactNode;
}

export default function TestProvider({ children }: ProviderProps) {
  const theme = defaultTheme;
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
