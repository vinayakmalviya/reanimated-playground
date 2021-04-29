import React from 'react';
import { ViewProps } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import clamp from '../../helpers/clamp';

interface DraggableSwitchProps extends ViewProps {
  active?: boolean;
  size?: number;
  color?: string;
  onChange?: (value: boolean) => void;
}

const DraggableSwitch: React.FC<DraggableSwitchProps> = ({
  active = false,
  size = 36,
  color,
  onChange = () => null,
  style,
}) => {
  const theme = useTheme();
  const translateX = useSharedValue<number>(active ? size * 1.8 - size : 0);
  const transition = useDerivedValue(() => {
    return withTiming(translateX.value);
  });

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { active: boolean }
  >({
    onActive: (e, ctx) => {
      if (ctx.active) {
        if (e.translationX < 0) {
          translateX.value =
            size * 1.8 - size - clamp(-e.translationX, 0, size * 1.8 - size);
        }
      } else {
        translateX.value = clamp(e.translationX, 0, size * 1.8 - size);
      }
    },
    onEnd: (__, ctx) => {
      if (translateX.value === 0) {
        if (active) {
          runOnJS(onChange)(false);

          ctx.active = false;
        }
      } else if (translateX.value === size * 1.8 - size) {
        if (!active) {
          runOnJS(onChange)(true);

          ctx.active = true;
        }
      } else {
        if (active) {
          translateX.value = withTiming(size * 1.8 - size, { duration: 240 });
        } else {
          translateX.value = withTiming(0, { duration: 240 });
        }
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
    borderColor: interpolateColor(
      transition.value,
      [0, size * 1.8 - size],
      ['#CCCCCC', color || theme.colors.primary],
    ),
  }));

  const animatedBackground = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      transition.value,
      [0, size * 1.8 - size],
      ['#CCCCCC', color || theme.colors.primary],
    ),
  }));

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
      <PanGestureHandler onGestureEvent={gestureHandler}>
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
      </PanGestureHandler>
    </Animated.View>
  );
};

export default DraggableSwitch;
