import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import useThemeToggler from '@/hooks/useThemeToggler';
import { GlobalStyle } from '@/styles/GlobalStyle';

import { darkTheme, defaultTheme } from '../styles';

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
