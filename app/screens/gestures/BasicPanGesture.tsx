import React, { useMemo } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Body, ScreenContainer } from '../../components';
import { StackNavigatorParamsList } from '../Navigator';

type NavigationProp = StackNavigationProp<
  StackNavigatorParamsList,
  'BasicPanGesture'
>;

type BasicPanGestureProps = {
  navigation: NavigationProp;
};

const BasicPanGesture: React.FC<BasicPanGestureProps> = ({ navigation }) => {
  const header = useMemo(
    () => ({
      title: 'Basic Pan Gesture',
      backAction: navigation.goBack,
    }),
    [navigation],
  );

  return (
    <ScreenContainer header={header} style={{ padding: 16 }}>
      <Body>Basic Pan Gesture</Body>
    </ScreenContainer>
  );
};

export default BasicPanGesture;
