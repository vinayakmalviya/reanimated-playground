import React, { useMemo } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Body, CreditCard, ScreenContainer } from '../components';

import { StackNavigatorParamsList } from './Navigator';

type TransitionsNavigationProp = StackNavigationProp<
  StackNavigatorParamsList,
  'Transitions'
>;

type TransitionsProps = {
  navigation: TransitionsNavigationProp;
};

const Transitions: React.FC<TransitionsProps> = ({ navigation }) => {
  const header = useMemo(
    () => ({
      title: 'Transitions',
      actions: [
        {
          icon: 'home',
          color: 'salmon',
          onPress: () => navigation.navigate('Home'),
        },
      ],
    }),
    [navigation],
  );

  return (
    <ScreenContainer header={header} style={{ padding: 16 }}>
      <Body style={{ marginBottom: 16 }}>Transitions coming soon</Body>
      <View>
        <CreditCard
          balance="₹ 16,000"
          cardNumber="6942 0168 4200 0690"
          expiry="08/24"
          paymentNetwork="visa"
        />
        <CreditCard
          balance="₹ 54,000"
          cardNumber="4321 8765 0987 2468"
          expiry="12/21"
          paymentNetwork="mastercard"
          backgroundColor="teal"
          // style={{ position: 'absolute', left: 0, right: 0 }}
          style={{ marginTop: 16 }}
        />
        <CreditCard
          balance="₹ 4,000"
          cardNumber="1608 2428 1568 0428"
          expiry="07/22"
          paymentNetwork="visa"
          backgroundColor="#577399"
          // style={{ position: 'absolute', left: 0, right: 0 }}
          style={{ marginTop: 16 }}
        />
      </View>
    </ScreenContainer>
  );
};

export default Transitions;
