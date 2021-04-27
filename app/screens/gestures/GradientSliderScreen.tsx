import React, { useMemo, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackNavigatorParamsList } from '../Navigator';
import { Body, ScreenContainer, GradientSlider } from '../../components';

type NavigationProp = StackNavigationProp<
  StackNavigatorParamsList,
  'GradientSlider'
>;

type GradientSliderScreenProps = {
  navigation: NavigationProp;
};

const { width } = Dimensions.get('window');

const GradientSliderScreen: React.FC<GradientSliderScreenProps> = ({
  navigation,
}) => {
  const [value, setValue] = useState<number>(0);
  const header = useMemo(
    () => ({
      title: 'Gradient Slider',
      backAction: navigation.goBack,
    }),
    [navigation.goBack],
  );

  return (
    <ScreenContainer header={header} style={{ padding: 16 }}>
      <Body>Smooth animated circular slider with an angular gradient</Body>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <GradientSlider
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

export default GradientSliderScreen;
