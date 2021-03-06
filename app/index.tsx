import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import {
  DefaultTheme,
  DarkTheme,
  configureFonts,
  Provider as PaperProvider,
} from 'react-native-paper';

import Navigator from './screens/Navigator';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      textLight: string;
    }
  }
}

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Quicksand-Regular',
      fontWeight: 'normal' as const,
    },
    medium: {
      fontFamily: 'Quicksand-Medium',
      fontWeight: 'normal' as const,
    },
    light: {
      fontFamily: 'Quicksand-Light',
      fontWeight: 'normal' as const,
    },
    thin: {
      fontFamily: 'Quicksand-Light',
      fontWeight: 'normal' as const,
    },
  },
};

const lightTheme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  dark: false,
  mode: 'adaptive' as const,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3253B6',
    accent: '#31B4A9',
    background: '#EDF5FC',
    surface: '#EDF5FC',
    text: '#333333',
    textLight: '#525252',
    error: '#EA0B43',
  },
};

const darkTheme = {
  ...DarkTheme,
  fonts: configureFonts(fontConfig),
  dark: true,
  mode: 'adaptive' as const,
  roundness: 8,
  colors: {
    ...DarkTheme.colors,
    primary: '#3253B6',
    accent: '#31B4A9',
    background: '#121212',
    surface: '#121212',
    text: '#FFFFFF',
    textLight: '#F1F1F1',
    error: '#EA0B43',
  },
};

const App = () => {
  const colorScheme = useColorScheme();

  const theme = useMemo(() => {
    switch (colorScheme) {
      case 'dark':
        return darkTheme;
      default:
        return lightTheme;
    }
  }, [colorScheme]);

  return (
    <PaperProvider {...{ theme }}>
      <Navigator />
    </PaperProvider>
  );
};

export default App;
