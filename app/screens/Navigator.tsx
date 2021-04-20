import React, { useMemo } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';

import Home from './Home';
import Transitions from './Transitions';
import BasicTransition from './transitions/BasicTransition';

export type StackNavigatorParamsList = {
  Home: undefined;
  Transitions: undefined;
  BasicTransition: undefined;
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
        <Stack.Screen name="BasicTransition" component={BasicTransition} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
