import React, { useMemo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';

import { Body, GestureButton, ScreenContainer } from '../components';

import { StackNavigatorParamsList } from './Navigator';

type HomeNavigationProp = StackNavigationProp<StackNavigatorParamsList, 'Home'>;

type HomeProps = {
  navigation: HomeNavigationProp;
};

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const theme = useTheme();
  const header = useMemo(
    () => ({
      title: 'Home',
    }),
    [],
  );

  return (
    <ScreenContainer header={header} style={{ padding: 16 }}>
      <Body>Welcome to Reanimated Playground</Body>
      <GestureButton
        style={{ marginTop: 16 }}
        secondaryColor="rgb(255, 128, 171)"
        onPress={() => {
          navigation.navigate('Transitions');
        }}>
        Transitions
      </GestureButton>
      <GestureButton
        style={{ marginTop: 16 }}
        primaryColor={theme.colors.accent}
        secondaryColor="salmon"
        onPress={() => {
          navigation.navigate('Gestures');
        }}>
        Gestures
      </GestureButton>
    </ScreenContainer>
  );
};

export default Home;
