import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';

import { StackNavigatorParamsList } from '../Navigator';
import { Body, ScreenContainer, Tabbar } from '../../components';

type NavigationProp = StackNavigationProp<
  StackNavigatorParamsList,
  'AnimatedTabbar'
>;

type AnimatedTabbarProps = {
  navigation: NavigationProp;
};

const AnimatedTabbar: React.FC<AnimatedTabbarProps> = ({ navigation }) => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const header = useMemo(
    () => ({
      title: 'Animated Tabbar',
      backAction: navigation.goBack,
    }),
    [navigation.goBack],
  );

  return (
    <ScreenContainer header={header}>
      <Body style={{ margin: 16, marginTop: -4 }}>
        Customizable animated tabbar (work in progress)
      </Body>
      <Body
        style={{
          marginHorizontal: 16,
          marginTop: -4,
          fontFamily: 'Quicksand-Medium',
        }}>
        Todo:
      </Body>
      <Body style={{ marginHorizontal: 16 }}>- Refactor angle calculation</Body>
      <Body style={{ marginHorizontal: 16 }}>
        - Refactor animation radius calculation
      </Body>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Tabbar
          activeIndex={activeIndex}
          items={[
            { icon: 'firework', name: 'Firework' },
            { icon: 'check', name: 'Wieee' },
          ]}
          centerItems={[
            {
              icon: 'google-photos',
              color: theme.colors.primary,
              onPress: () => null,
            },
            {
              icon: 'file-image',
              color: 'salmon',
              onPress: () => null,
            },
            {
              icon: 'bluetooth',
              color: 'orange',
              onPress: () => null,
            },
            {
              icon: 'menu',
              color: 'grey',
              onPress: () => null,
            },
          ]}
          changeIndex={index => {
            setActiveIndex(index);
          }}
        />
      </View>
    </ScreenContainer>
  );
};

export default AnimatedTabbar;
