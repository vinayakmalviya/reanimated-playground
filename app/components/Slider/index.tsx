import React, { useMemo } from 'react';
import { ViewProps } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';

interface CircularSliderProps extends ViewProps {
  value?: number;
  size?: number;
  knobSize?: number;
  strokeWidth?: number;
  color?: string;
  backgroundCircleColor?: string;
  onChange?: (value: number) => void;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularSlider: React.FC<CircularSliderProps> = ({
  style,
  value = 0,
  size = 96,
  knobSize = 10,
  strokeWidth = 10,
  color = '#3253B6',
  backgroundCircleColor = '#CCCCCC',
  onChange = () => null,
  ...props
}) => {
  const theme = useTheme();
  const { cx, cy, r } = useMemo(
    () => ({
      cx: (size + knobSize) / 2,
      cy: (size + knobSize) / 2,
      r: (size - strokeWidth) / 2,
    }),
    [knobSize, size, strokeWidth],
  );

  const circumference = useMemo(() => 2 * Math.PI * r, [r]);

  const angle = useSharedValue<number>(
    interpolate(value, [0, 1], [2 * Math.PI, 0]),
  );

  const circleProps = useAnimatedProps(() => {
    return { strokeDashoffset: angle.value * r };
  });

  const translateX = useSharedValue<number>(
    cx + ((size - strokeWidth) / 2) * Math.cos(angle.value),
  );

  const translateY = useSharedValue<number>(
    cy - ((size - strokeWidth) / 2) * Math.sin(angle.value),
  );

  const knobProps = useAnimatedProps(() => ({
    cx: translateX.value,
    cy: translateY.value,
  }));

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { theta: number }
  >({
    onStart: (__, ctx) => {
      ctx.theta = angle.value;
    },
    onActive: ({ x, y }, ctx) => {
      const actualX = x - cx;
      const actualY = -1 * (y - cy);

      const newAngle = Math.atan2(actualY, actualX);

      translateX.value = cx + ((size - strokeWidth) / 2) * Math.cos(newAngle);

      translateY.value = cy - ((size - strokeWidth) / 2) * Math.sin(newAngle);

      angle.value = (newAngle + 2 * Math.PI) % (2 * Math.PI);

      ctx.theta = newAngle;
    },
    onEnd: () => {
      const newValue = interpolate(angle.value, [0, 2 * Math.PI], [1, 0]);

      runOnJS(onChange)(newValue);
    },
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View {...props}>
        <Svg width={size + knobSize} height={size + knobSize} style={style}>
          <Circle
            stroke={backgroundCircleColor}
            fill="none"
            {...{
              strokeWidth,
              cx,
              cy,
              r,
            }}
          />
          <AnimatedCircle
            animatedProps={circleProps}
            stroke={color}
            fill="none"
            strokeDasharray={`${circumference}, ${circumference}`}
            {...{
              strokeWidth,
              cx,
              cy,
              r,
            }}
          />
          <AnimatedCircle
            animatedProps={knobProps}
            r={knobSize}
            fill={theme.dark ? 'white' : '#747575'}
          />
        </Svg>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default CircularSlider;
