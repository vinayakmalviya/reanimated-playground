import React from 'react';
import { View, ViewProps } from 'react-native';
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Body from '../Typography/Body';

interface GestureButtonProps extends ViewProps {
  primaryColor?: string;
  secondaryColor?: string;
  onPress?: () => void;
}

const GestureButton: React.FC<GestureButtonProps> = ({
  style,
  primaryColor = '#3253B6',
  secondaryColor = '#31B4A9',
  onPress = () => null,
  children,
}) => {
  const theme = useTheme();
  const animatedState = useSharedValue<number>(0);
  const transition = useDerivedValue(() => {
    return withTiming(animatedState.value, {
      duration: 160,
      easing: Easing.in(Easing.ease),
    });
  });
  const gestureHandler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onStart: () => {
        animatedState.value = 1;
      },
      onEnd: () => {
        animatedState.value = 0;

        runOnJS(onPress)();
      },
      onCancel: () => {
        animatedState.value = 0;
      },
      onFail: () => {
        animatedState.value = 0;
      },
    },
  );

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      transition.value,
      [0, 1],
      [primaryColor, secondaryColor],
    ),
    elevation: interpolate(transition.value, [0, 1], [2, 8]),
  }));

  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: transition.value,
  }));

  return (
    <View style={style}>
      <TapGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              padding: 16,
              minHeight: 168,
              borderRadius: theme.roundness,
              elevation: 2,
            },
            animatedStyle,
          ]}>
          <Body
            style={{
              marginTop: -4,
              textTransform: 'uppercase',
              letterSpacing: 0.48,
              fontFamily: 'Quicksand-SemiBold',
              color: '#FFFFFF',
            }}>
            {children}
          </Body>
          <Animated.View
            style={[
              {
                flex: 1,
                alignSelf: 'flex-end',
                justifyContent: 'flex-end',
              },
              animatedOpacity,
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                marginTop: -4,
              }}>
              <Body
                style={{
                  marginBottom: 8,
                  marginRight: 6,
                  fontSize: 18,
                  fontFamily: 'Quicksand-Medium',
                  color: '#FFFFFF',
                }}>
                at
              </Body>
              <Body
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: 0.48,
                  fontFamily: 'Quicksand-Bold',
                  fontSize: 48,
                  color: '#FFFFFF',
                }}>
                60 FPS
              </Body>
            </View>
          </Animated.View>
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};

export default GestureButton;
