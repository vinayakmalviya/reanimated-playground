import React, { useMemo } from 'react';
import { ViewProps } from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';
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
import colorInterpolate from 'color-interpolate';

interface GradientSliderProps extends ViewProps {
  value?: number;
  size?: number;
  knobSize?: number;
  strokeWidth?: number;
  color?: string;
  gradientStart?: string;
  gradientEnd?: string;
  backgroundCircleColor?: string;
  onChange?: (value: number) => void;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SAMPLING = 2;
const STEPS = (2 * Math.PI) / SAMPLING;

const p2x = (theta: number, cx: number, r: number) => cx - r * Math.cos(theta);
const p2y = (theta: number, cy: number, r: number) => cy - r * Math.sin(theta);

const arc = (theta: number, cx: number, cy: number, r: number) =>
  `A ${r} ${r} 0 0 1 ${p2x(theta, cx, r)} ${p2y(theta, cy, r)}`;

const GradientSlider: React.FC<GradientSliderProps> = ({
  style,
  value = 0,
  size = 96,
  knobSize = 10,
  strokeWidth = 10,
  backgroundCircleColor = '#CCCCCC',
  gradientStart = '#3253B6',
  gradientEnd = 'rgb(255, 128, 171)',
  onChange = () => null,
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

  const arcs = useMemo(() => {
    return new Array(SAMPLING).fill(0).map((_, i) => {
      const arcAngle = i * STEPS;

      return `M ${p2x(arcAngle, cx, r)} ${p2y(arcAngle, cy, r)} ${arc(
        arcAngle + STEPS,
        cx,
        cy,
        r,
      )}`;
    });
  }, [cx, cy, r]);

  const gradientPalette = useMemo(() => {
    return colorInterpolate([gradientStart, gradientEnd]);
  }, [gradientEnd, gradientStart]);

  const circumference = useMemo(() => 2 * Math.PI * r, [r]);

  const angle = useSharedValue<number>((1 - value) * -Math.PI * 2);

  const circleProps = useAnimatedProps(() => {
    return { strokeDashoffset: circumference - angle.value * r };
  });

  const translateX = useSharedValue<number>(
    cx + ((size - strokeWidth) / 2) * Math.cos(-angle.value),
  );

  const translateY = useSharedValue<number>(
    cy - ((size - strokeWidth) / 2) * Math.sin(-angle.value),
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

      angle.value = -((newAngle + 2 * Math.PI) % (2 * Math.PI));

      ctx.theta = newAngle;
    },
    onEnd: () => {
      const newValue = interpolate(angle.value, [0, -2 * Math.PI], [1, 0]);

      runOnJS(onChange)(newValue);
    },
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View>
        <Svg width={size + knobSize} height={size + knobSize} style={style}>
          <Defs>
            {arcs.map((_d, key) => {
              const isReversed = key / SAMPLING >= 0.5;
              return (
                <LinearGradient key={key} id={`gradient-${key}`}>
                  <Stop
                    stopColor={gradientPalette(key / SAMPLING)}
                    offset={`${isReversed ? 100 : 0}%`}
                  />
                  <Stop
                    stopColor={gradientPalette((key + 1) / SAMPLING)}
                    offset={`${isReversed ? 0 : 100}%`}
                  />
                </LinearGradient>
              );
            })}
          </Defs>
          <G
            transform={`translate(${cx}, ${cy}) rotate(180) translate(${-cx}, ${-cy})`}>
            {arcs.map((d, key) => (
              <Path
                key={key}
                fill="transparent"
                stroke={`url(#gradient-${key})`}
                {...{ strokeWidth, d }}
              />
            ))}
          </G>
          <AnimatedCircle
            animatedProps={circleProps}
            stroke={backgroundCircleColor}
            fill="transparent"
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

export default GradientSlider;
