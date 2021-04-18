import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import Transitions from './Transitions';

export type StackNavigatorParamsList = {
  Home: undefined;
  Transitions: undefined;
};

const Stack = createStackNavigator<StackNavigatorParamsList>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Transitions" component={Transitions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
