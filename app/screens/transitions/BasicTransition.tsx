/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackNavigatorParamsList } from '../Navigator';
import { Body, CreditCard, ScreenContainer, Button } from '../../components';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type NavigationProp = StackNavigationProp<
  StackNavigatorParamsList,
  'BasicTransition'
>;

type BasicTransitionsProps = {
  navigation: NavigationProp;
};

const cards = [
  {
    balance: '₹ 8,000',
    cardNumber: '1608 2428 1568 0428',
    expiry: '07/22',
    paymentNetwork: 'visa' as const,
    backgroundColor: '#577399',
  },
  {
    balance: '₹ 54,000',
    cardNumber: '4321 8765 0987 2468',
    expiry: '12/21',
    paymentNetwork: 'mastercard' as const,
    backgroundColor: 'teal',
  },
  {
    balance: '₹ 16,000',
    cardNumber: '6942 0168 4200 0690',
    expiry: '08/24',
    paymentNetwork: 'visa' as const,
  },
];

const { width } = Dimensions.get('window');

const angle = Math.PI / 6;

const origin = {
  x: width / 2 - 24 * 2,
  y: 0,
};

const BasicTransition: React.FC<BasicTransitionsProps> = ({ navigation }) => {
  const [toggled, setToggled] = useState<boolean>(false);
  const header = useMemo(
    () => ({
      title: 'Basic Transition',
      backAction: navigation.goBack,
    }),
    [navigation],
  );
  const animatedToggle = useSharedValue<number>(0);
  const transition = useDerivedValue(() => {
    return withSpring(animatedToggle.value);
  });

  useEffect(() => {
    animatedToggle.value = toggled ? 1 : 0;
  }, [animatedToggle, toggled]);

  return (
    <ScreenContainer header={header} style={{ padding: 16 }}>
      <Body style={{ marginBottom: 16 }}>
        Basic transition from one state to another
      </Body>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {cards.map((cardData, index) => {
          const animatedStyle = useAnimatedStyle(() => {
            const rotation = interpolate(
              transition.value,
              [0, 1],
              [0, (index - 1) * angle],
            );

            return {
              transform: [
                { translateX: -origin.x },
                { rotate: `${rotation}rad` },
                { translateX: origin.x },
              ],
            };
          });

          return (
            <Animated.View
              style={[
                {
                  ...StyleSheet.absoluteFillObject,
                  justifyContent: 'center',
                  paddingHorizontal: 8,
                },
                animatedStyle,
              ]}
              key={cardData.cardNumber}>
              <CreditCard {...cardData} />
            </Animated.View>
          );
        })}
      </View>
      <Button
        onPress={() => {
          setToggled(!toggled);
        }}>
        Toggle Transition
      </Button>
    </ScreenContainer>
  );
};

export default BasicTransition;
