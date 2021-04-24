import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackNavigatorParamsList } from '../Navigator';
import {
  AnimatedButton,
  Body,
  ScreenContainer,
  Button,
} from '../../components';

type NavigationProp = StackNavigationProp<
  StackNavigatorParamsList,
  'AnimatedButton'
>;

type AnimatedButtonProps = {
  navigation: NavigationProp;
};

const AnimatedButtonScreen: React.FC<AnimatedButtonProps> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(false);
  const header = useMemo(
    () => ({
      title: 'Animated Button',
      backAction: navigation.goBack,
    }),
    [navigation.goBack],
  );

  return (
    <ScreenContainer header={header} style={{ padding: 16 }}>
      <Body style={{ marginTop: -4 }}>Animated loading state button</Body>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AnimatedButton loading={loading} onPress={() => null}>
          Submit
        </AnimatedButton>
        <Button
          style={{ marginTop: 16 }}
          onPress={() => {
            setLoading(!loading);
          }}>
          Toggle Loading
        </Button>
      </View>
    </ScreenContainer>
  );
};

export default AnimatedButtonScreen;
