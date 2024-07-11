import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { Reset } from 'styled-reset';

import darkTheme from '@/styles/darkTheme';
import defaultTheme from '@/styles/defaultTheme';

import useThemeToggler from '@/hooks/useThemeToggler';

type ProviderProps = {
    children: React.ReactNode;
}

export default function StyledProvider({ children }: ProviderProps) {
  const [isDarkMode] = useThemeToggler();
  const theme = isDarkMode ? darkTheme : defaultTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Reset />
      {children}
    </ThemeProvider>
  );
}
