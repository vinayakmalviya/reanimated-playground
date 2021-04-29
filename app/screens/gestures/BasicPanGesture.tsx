import React, { useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Body, CreditCard, ScreenContainer } from '../../components';
import { StackNavigatorParamsList } from '../Navigator';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import clamp from '../../helpers/clamp';

type NavigationProp = StackNavigationProp<
  StackNavigatorParamsList,
  'BasicPanGesture'
>;

interface BasicPanGestureProps {
  navigation: NavigationProp;
}

const { width, height } = Dimensions.get('window');

const CARD_WIDTH = width - 32;

const maxX = width - CARD_WIDTH;
const maxY = height - 184 - 56 - 48;

const BasicPanGesture: React.FC<BasicPanGestureProps> = ({ navigation }) => {
  const header = useMemo(
    () => ({
      title: 'Basic Pan Gesture',
      backAction: navigation.goBack,
    }),
    [navigation],
  );
  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { offsetX: number; offsetY: number }
  >({
    onStart: (__, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (e, ctx) => {
      translateX.value = clamp(ctx.offsetX + e.translationX, 0, maxX);
      translateY.value = clamp(ctx.offsetY + e.translationY, 0, maxY);
    },
    onEnd: ({ velocityX, velocityY }) => {
      translateX.value = withDecay({ velocity: velocityX, clamp: [0, maxX] });
      translateY.value = withDecay({ velocity: velocityY, clamp: [0, maxY] });
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <ScreenContainer header={header} style={{ flex: 1 }}>
      <Body style={{ margin: 16, marginTop: -4 }}>
        Smooth pan gesture with decay
      </Body>
      <View style={{ flex: 1 }}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={animatedStyle}>
            <CreditCard
              balance="₹ 16,000"
              cardNumber="6942 0168 4200 0690"
              expiry="08/24"
              paymentNetwork="visa"
              style={{
                width: CARD_WIDTH,
              }}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </ScreenContainer>
  );
};

export default BasicPanGesture;
