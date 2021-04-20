import React, { useMemo } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackNavigatorParamsList } from '../Navigator';
import { Body, CreditCard, ScreenContainer } from '../../components';

type NavigationProp = StackNavigationProp<
  StackNavigatorParamsList,
  'BasicTransition'
>;

type BasicTransitionsProps = {
  navigation: NavigationProp;
};

const BasicTransition: React.FC<BasicTransitionsProps> = ({ navigation }) => {
  const header = useMemo(
    () => ({
      title: 'Basic Transition',
      backAction: navigation.goBack,
    }),
    [navigation],
  );

  return (
    <ScreenContainer header={header} style={{ padding: 16 }}>
      <Body style={{ marginBottom: 16 }}>
        Basic transition from one state to another
      </Body>
      <View style={{ flex: 1, justifyContent: 'center' }}>
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

export default BasicTransition;
