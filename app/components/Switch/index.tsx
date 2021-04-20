import React, { useEffect } from 'react';
import { TouchableWithoutFeedback, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface SwitchProps extends ViewProps {
  active?: boolean;
  size?: number;
  color?: string;
  onChange?: () => void;
}

const Switch: React.FC<SwitchProps> = ({
  active = false,
  size = 36,
  color,
  onChange,
  style,
}) => {
  const theme = useTheme();
  const animatedActive = useSharedValue<number>(active ? 1 : 0);
  const translateX = useDerivedValue(() => {
    return withTiming(animatedActive.value, { duration: 240 });
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          translateX.value,
          [0, 1],
          [0, size * 1.8 - size],
          Extrapolate.CLAMP,
        ),
      },
    ],
    borderColor: interpolateColor(
      translateX.value,
      [0, 1],
      ['#CCCCCC', color || theme.colors.primary],
    ),
  }));

  const animatedBackground = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      translateX.value,
      [0, 1],
      ['#CCCCCC', color || theme.colors.primary],
    ),
  }));

  useEffect(() => {
    animatedActive.value = active ? 1 : 0;
  }, [active, animatedActive, size]);

  return (
    <Animated.View
      style={[
        {
          width: size * 1.8,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color || theme.colors.primary,
          justifyContent: 'center',
        },
        style,
        animatedBackground,
      ]}>
      <TouchableWithoutFeedback onPress={onChange}>
        <Animated.View
          style={[
            {
              height: size,
              width: size,
              borderRadius: size / 2,
              borderWidth: 3.6,
              borderColor: color || theme.colors.primary,
              backgroundColor: '#FFFFFF',
            },
            animatedStyle,
          ]}
        />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default Switch;
