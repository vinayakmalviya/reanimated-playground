import React, { useMemo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'react-native-paper';

import { GestureButton, ScreenContainer } from '../components';

import { StackNavigatorParamsList } from './Navigator';

type HomeNavigationProp = StackNavigationProp<StackNavigatorParamsList, 'Home'>;

type HomeProps = {
  navigation: HomeNavigationProp;
};

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const header = useMemo(
    () => ({
      title: 'Home',
    }),
    [],
  );

  return (
    <ScreenContainer header={header} style={{ padding: 16 }}>
      <Text>Welcome to Reanimated Playground</Text>
      <GestureButton
        style={{ marginTop: 16 }}
        onPress={() => {
          navigation.navigate('Transitions');
        }}>
        Transitions
      </GestureButton>
    </ScreenContainer>
  );
};

export default Home;
