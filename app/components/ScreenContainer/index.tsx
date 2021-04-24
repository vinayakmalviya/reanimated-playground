import React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import Appbar, { APPBAR_HEIGHT } from '../Appbar';
import clamp from '../../helpers/clamp';

type ScreenContainerProps = {
  statusBarColor?: string;
  noScroll?: boolean;
  header?: {
    title: string;
    actions?: {
      icon: string;
      color?: string;
      size?: number;
      onPress?: () => void;
    }[];
    backAction?: () => void;
  };
  style?: ViewStyle;
};

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  noScroll = false,
  statusBarColor,
  style,
  header,
  children,
}) => {
  const theme = useTheme();
  const scrollY = useSharedValue<number>(0);
  const scrollDiff = useSharedValue<number>(0);
  const isScrolledUp = useDerivedValue(() => {
    return scrollY.value - scrollDiff.value;
  });
  const elevation = useDerivedValue(() => {
    return interpolate(
      isScrolledUp.value,
      [0, APPBAR_HEIGHT],
      [0, 4],
      Extrapolate.CLAMP,
    );
  });

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      const diff = y - scrollY.value;

      scrollDiff.value = clamp(scrollDiff.value + diff, 0, APPBAR_HEIGHT);

      scrollY.value = y;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      elevation: elevation.value,
      transform: [
        {
          translateY: interpolate(
            scrollDiff.value,
            [0, APPBAR_HEIGHT],
            [0, -APPBAR_HEIGHT],
          ),
        },
      ],
    };
  });

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(elevation.value, [0, 4], [0, 0.09]),
  }));

  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <StatusBar
        backgroundColor={statusBarColor || theme.colors.background}
        animated
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      {header && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 4,
          }}>
          <Appbar
            {...{
              animatedStyle,
              opacityStyle,
            }}
            {...header}
          />
        </View>
      )}
      {noScroll ? (
        <View
          style={{
            flexGrow: 1,
            backgroundColor: theme.colors.background,
            ...style,
          }}>
          {children}
        </View>
      ) : (
        <Animated.ScrollView
          onScroll={onScroll}
          overScrollMode="never"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            ...style,
            ...(header && {
              paddingTop: style
                ? style.paddingTop && typeof style.paddingTop === 'string'
                  ? style.paddingTop + APPBAR_HEIGHT
                  : style.paddingVertical &&
                    typeof style.paddingVertical === 'string'
                  ? style.paddingVertical + APPBAR_HEIGHT
                  : APPBAR_HEIGHT
                : APPBAR_HEIGHT,
            }),
          }}>
          {children}
        </Animated.ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ScreenContainer;
