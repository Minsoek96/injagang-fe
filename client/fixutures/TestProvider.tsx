import { ThemeProvider } from 'styled-components';

import { defaultTheme } from '@/src/app/styles';

type ProviderProps = {
    children: React.ReactNode;
}

export default function TestProvider({ children }: ProviderProps) {
  const theme = defaultTheme;

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
