import React, { useMemo, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackNavigatorParamsList } from '../Navigator';
import { Body, ScreenContainer, CircularSlider } from '../../components';

type NavigationProp = StackNavigationProp<
  StackNavigatorParamsList,
  'CircularSlider'
>;

type CircularSliderScreenProps = {
  navigation: NavigationProp;
};

const { width } = Dimensions.get('window');

const CircularSliderScreen: React.FC<CircularSliderScreenProps> = ({
  navigation,
}) => {
  const [value, setValue] = useState<number>(0);
  const header = useMemo(
    () => ({
      title: 'Circular Slider',
      backAction: navigation.goBack,
    }),
    [navigation.goBack],
  );

  return (
    <ScreenContainer header={header} style={{ padding: 16 }}>
      <Body>Smooth animated circular slider</Body>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CircularSlider
          value={value}
          size={width - 64}
          strokeWidth={24}
          knobSize={24}
          onChange={v => {
            setValue(v);
          }}
        />
      </View>
    </ScreenContainer>
  );
};

export default CircularSliderScreen;
