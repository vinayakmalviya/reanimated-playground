import React from 'react';
import { SafeAreaView, StatusBar, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackNavigatorParamsList } from './Navigator';

type HomeNavigationProp = StackNavigationProp<StackNavigatorParamsList, 'Home'>;

type HomeProps = {
  navigation: HomeNavigationProp;
};

const Home = ({ navigation }: HomeProps) => {
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <StatusBar backgroundColor="#ABABAB" barStyle="dark-content" />
      <Text
        style={{
          fontFamily: 'Quicksand-Bold',
          fontSize: 24,
          color: '#2b2d42',
        }}>
        Home
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Transitions');
        }}>
        <Text
          style={{
            fontFamily: 'Quicksand-Regular',
            fontSize: 16,
            color: 'salmon',
            marginTop: 12,
          }}>
          Go to Transitions
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
