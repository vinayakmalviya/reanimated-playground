import React, { useCallback, useEffect } from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  ViewStyle,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Body from '../Typography/Body';

interface AnimatedButtonProps extends TouchableNativeFeedbackProps {
  loading?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  loading = false,
  fullWidth = false,
  onPress,
  style,
  contentStyle,
  textStyle,
  ...props
}) => {
  const theme = useTheme();
  const transition = useSharedValue<number>(0);
  const animatedLoading = useSharedValue<number>(0);

  const loadingTransition = useDerivedValue(() => {
    return withTiming(animatedLoading.value, { duration: 200 });
  });

  const onPressIn = useCallback(() => {
    transition.value = withTiming(1, { duration: 200 });
  }, [transition]);

  const onPressOut = useCallback(() => {
    transition.value = withTiming(0, { duration: 140 });
  }, [transition]);

  const elevationStyle = useAnimatedStyle(() => ({
    elevation: interpolate(transition.value, [0, 1], [2, 8]),
  }));

  const rootContentStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(loadingTransition.value, [0, 1], [0, 48]) },
    ],
  }));

  const loadingStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(loadingTransition.value, [0, 1], [-48, 0]) },
    ],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    opacity: withRepeat(
      withTiming(animatedLoading.value, { duration: 980 }),
      -1,
      true,
    ),
  }));

  useEffect(() => {
    animatedLoading.value = loading ? 1 : 0;
  }, [animatedLoading, loading]);

  return (
    <Animated.View
      style={[
        {
          overflow: 'hidden',
          borderRadius: theme.roundness,
          width: fullWidth ? '100%' : 169,
        },
        style,
        elevationStyle,
      ]}>
      <TouchableNativeFeedback
        {...{ onPressIn, onPress, onPressOut }}
        {...props}>
        <Animated.View
          style={[
            {
              height: 48,
              minWidth: 169,
              borderRadius: theme.roundness,
              backgroundColor: theme.colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 16,
            },
            contentStyle,
            rootContentStyle,
          ]}>
          <Body
            style={[
              {
                marginTop: -4,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                fontFamily: 'Quicksand-SemiBold',
              },
              textStyle,
            ]}>
            {children}
          </Body>
        </Animated.View>
      </TouchableNativeFeedback>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: theme.colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            flexDirection: 'row',
            flex: 1,
          },
          loadingStyle,
        ]}>
        <AnimatedIcon
          name="progress-download"
          size={18}
          style={[{ marginRight: 8 }, iconStyle]}
        />
        <Body
          style={[
            {
              marginTop: -4,
              color: '#FFFFFF',
              textTransform: 'uppercase',
              fontFamily: 'Quicksand-SemiBold',
            },
            textStyle,
          ]}>
          Loading
        </Body>
      </Animated.View>
    </Animated.View>
  );
};

export default AnimatedButton;
