import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';

import { StackNavigatorParamsList } from '../Navigator';
import { Body, ScreenContainer, Checkbox } from '../../components';

type NavigationProp = StackNavigationProp<
  StackNavigatorParamsList,
  'AnimatedCheckbox'
>;

interface AnimatedCheckboxProps {
  navigation: NavigationProp;
}

const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({ navigation }) => {
  const theme = useTheme();
  const [active, setActive] = useState<boolean>(false);
  const header = useMemo(
    () => ({
      title: 'Animated Checkbox',
      backAction: navigation.goBack,
    }),
    [navigation.goBack],
  );

  return (
    <ScreenContainer header={header} style={{ padding: 16 }}>
      <Body>Customizable animated checkbox</Body>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Checkbox
          active={active}
          onChange={() => {
            setActive(!active);
          }}
          size={69}
        />
        <Checkbox
          active={active}
          onChange={() => {
            setActive(!active);
          }}
          size={56}
          style={{ marginTop: 16 }}
          color={theme.colors.accent}
        />
        <Checkbox
          active={active}
          onChange={() => {
            setActive(!active);
          }}
          size={44}
          style={{ marginTop: 16 }}
          color="teal"
        />
        <Checkbox
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

export default AnimatedCheckbox;
