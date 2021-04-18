import React, { useMemo } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import Transitions from './Transitions';
import { useTheme } from 'react-native-paper';

export type StackNavigatorParamsList = {
  Home: undefined;
  Transitions: undefined;
};

const Stack = createStackNavigator<StackNavigatorParamsList>();

const Navigator = () => {
  const theme = useTheme();

  const navigationTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: theme.colors.background,
        primary: theme.colors.primary,
        text: theme.colors.text,
      },
      dark: theme.dark,
    }),
    [
      theme.colors.background,
      theme.colors.primary,
      theme.colors.text,
      theme.dark,
    ],
  );

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: { backgroundColor: theme.colors.background },
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Transitions" component={Transitions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
