import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';

import { StackNavigatorParamsList } from '../Navigator';
import { Body, ScreenContainer, Switch } from '../../components';

type NavigationProp = StackNavigationProp<
  StackNavigatorParamsList,
  'AnimatedSwitch'
>;

interface AnimatedSwitchProps {
  navigation: NavigationProp;
}

const AnimatedSwitch: React.FC<AnimatedSwitchProps> = ({ navigation }) => {
  const theme = useTheme();
  const [active, setActive] = useState<boolean>(false);
  const header = useMemo(
    () => ({
      title: 'Animated Switch',
      backAction: navigation.goBack,
    }),
    [navigation.goBack],
  );

  return (
    <ScreenContainer header={header} style={{ padding: 16 }}>
      <Body>Smooth customizable animated switch</Body>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Switch
          active={active}
          onChange={() => {
            setActive(!active);
          }}
          size={69}
        />
        <Switch
          active={active}
          onChange={() => {
            setActive(!active);
          }}
          size={56}
          style={{ marginTop: 16 }}
          color={theme.colors.accent}
        />
        <Switch
          active={active}
          onChange={() => {
            setActive(!active);
          }}
          size={44}
          style={{ marginTop: 16 }}
          color="teal"
        />
        <Switch
          active={active}
          onChange={() => {
            setActive(!active);
          }}
          style={{ marginTop: 16 }}
          color="salmon"
        />
      </View>
    </ScreenContainer>
  );
};

export default AnimatedSwitch;
