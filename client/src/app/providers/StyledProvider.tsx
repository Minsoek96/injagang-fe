import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';

import { useThemeToggler } from '@/src/shared/hooks';

import { GlobalStyle, darkTheme, defaultTheme } from '../styles';

type ProviderProps = {
    children: React.ReactNode;
}

export default function StyledProvider({ children }: ProviderProps) {
  const [isDarkMode] = useThemeToggler();
  const theme = isDarkMode ? darkTheme : defaultTheme;

  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
