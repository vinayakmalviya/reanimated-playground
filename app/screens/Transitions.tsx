import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackNavigatorParamsList } from './Navigator';

type TransitionsNavigationProp = StackNavigationProp<
  StackNavigatorParamsList,
  'Transitions'
>;

type TransitionsProps = {
  navigation: TransitionsNavigationProp;
};

const Transitions = ({ navigation }: TransitionsProps) => {
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <StatusBar backgroundColor="#ABABAB" barStyle="dark-content" />
      <Text
        style={{
          fontFamily: 'Quicksand-Regular',
          fontSize: 16,
          color: 'teal',
        }}>
        Transitions
      </Text>
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text
          style={{
            fontFamily: 'Quicksand-Regular',
            fontSize: 16,
            color: 'salmon',
            marginTop: 12,
          }}>
          Go to Home
        </Text>
      </TouchableNativeFeedback>
    </SafeAreaView>
  );
};

export default Transitions;
