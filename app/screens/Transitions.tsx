import React, { useMemo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'react-native-paper';

import { ScreenContainer } from '../components';

import { StackNavigatorParamsList } from './Navigator';

type TransitionsNavigationProp = StackNavigationProp<
  StackNavigatorParamsList,
  'Transitions'
>;

type TransitionsProps = {
  navigation: TransitionsNavigationProp;
};

const Transitions: React.FC<TransitionsProps> = ({ navigation }) => {
  const header = useMemo(
    () => ({
      title: 'Transitions',
      actions: [
        {
          icon: 'home',
          color: 'salmon',
          onPress: () => navigation.navigate('Home'),
        },
      ],
    }),
    [navigation],
  );

  return (
    <ScreenContainer header={header} style={{ padding: 16 }}>
      <Text>Transitions coming soon</Text>
    </ScreenContainer>
  );
};

export default Transitions;
