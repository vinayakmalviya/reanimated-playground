import React, { useMemo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'react-native-paper';

import { ScreenContainer } from '../components';

import { StackNavigatorParamsList } from './Navigator';

type HomeNavigationProp = StackNavigationProp<StackNavigatorParamsList, 'Home'>;

type HomeProps = {
  navigation: HomeNavigationProp;
};

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const header = useMemo(
    () => ({
      title: 'Home',
      actions: [
        {
          icon: 'firework',
          color: 'salmon',
          onPress: () => navigation.navigate('Transitions'),
        },
      ],
    }),
    [navigation],
  );

  return (
    <ScreenContainer header={header} style={{ padding: 16 }}>
      <Text>Welcome to Reanimated Playground</Text>
    </ScreenContainer>
  );
};

export default Home;
