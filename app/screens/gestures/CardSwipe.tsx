import React, { cloneElement, useCallback, useMemo, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackNavigatorParamsList } from '../Navigator';
import { Body, ScreenContainer, VerticalCard } from '../../components';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type NavigationProp = StackNavigationProp<
  StackNavigatorParamsList,
  'CardSwipe'
>;

type CardSwipeProps = {
  navigation: NavigationProp;
};

const { width, height } = Dimensions.get('window');

const ROTATION_ANGLE = Math.PI / 12;
const A = width * Math.cos(ROTATION_ANGLE) + height * Math.sin(ROTATION_ANGLE);

const snapPoints = [-1 * A, 0, A];

const cards = [
  <VerticalCard
    image={{
      uri:
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=714&q=80',
    }}
    title="Pancakes"
    subtitle="with syrup..of course!"
    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At varius vel pharetra vel turpis nunc eget lorem dolor. Ornare suspendisse sed nisi lacus. Mattis enim ut tellus elementum sagittis. Lectus nulla at volutpat diam ut venenatis."
  />,
  <VerticalCard
    image={{
      uri:
        'https://images.unsplash.com/photo-1617364066121-8a26d640130f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80',
    }}
    title="Burger"
    subtitle="Multiple patties!"
    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At varius vel pharetra vel turpis nunc eget lorem dolor. Ornare suspendisse sed nisi lacus. Mattis enim ut tellus elementum sagittis. Lectus nulla at volutpat diam ut venenatis."
  />,
  <VerticalCard
    image={{
      uri:
        'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    }}
    title="Dessert"
    subtitle="Roasted almond chocolates"
    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At varius vel pharetra vel turpis nunc eget lorem dolor. Ornare suspendisse sed nisi lacus. Mattis enim ut tellus elementum sagittis. Lectus nulla at volutpat diam ut venenatis."
  />,
];

const CardSwipe: React.FC<CardSwipeProps> = ({ navigation }) => {
  const [index, setIndex] = useState<number>(0);
  const header = useMemo(
    () => ({
      title: 'Card Swipe',
      backAction: navigation.goBack,
    }),
    [navigation.goBack],
  );

  const onChangeIndex = useCallback(newIndex => {
    setIndex(newIndex);
  }, []);

  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);
  const rotate = useDerivedValue(() => {
    return interpolate(
      translateX.value,
      [-width, width],
      [-Math.PI / 12, Math.PI / 12],
      Extrapolate.CLAMP,
    );
  });

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>(
    {
      onActive: e => {
        translateX.value = e.translationX;
        translateY.value = e.translationY;
      },
      onEnd: ({ translationX, velocityX }) => {
        const currentPosition = translationX + 0.2 * velocityX;

        const deltas = snapPoints.map(p => Math.abs(currentPosition - p));

        const nearestPoint = Math.min.apply(null, deltas);

        const finalPoint = snapPoints.filter(
          p => Math.abs(currentPosition - p) === nearestPoint,
        )[0];

        translateX.value = withSpring(finalPoint);

        if (finalPoint !== 0) {
          runOnJS(onChangeIndex)((index + 1) % 3);

          translateX.value = withTiming(0);
          translateY.value = withTiming(0);
        }
      },
    },
  );

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      // { translateY: translateY.value },
      { rotateZ: `${rotate.value}rad` },
    ],
  }));

  return (
    <ScreenContainer header={header} style={{ padding: 16 }}>
      <Body>Card swipe gesture</Body>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          marginTop: 16,
        }}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[StyleSheet.absoluteFill, animatedStyles]}>
            {cloneElement(cards[index], { translateX: translateX })}
          </Animated.View>
        </PanGestureHandler>
      </View>
    </ScreenContainer>
  );
};

export default CardSwipe;
