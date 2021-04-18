import React from 'react';
import { SafeAreaView, StatusBar, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';

import { StackNavigatorParamsList } from './Navigator';

type TransitionsNavigationProp = StackNavigationProp<
  StackNavigatorParamsList,
  'Transitions'
>;

type TransitionsProps = {
  navigation: TransitionsNavigationProp;
};

const Transitions = ({ navigation }: TransitionsProps) => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: theme.colors.background,
      }}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <Text
        style={{
          fontFamily: 'Quicksand-Bold',
          fontSize: 24,
          color: '#3253B6',
        }}>
        Transitions
      </Text>
      <TouchableOpacity
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
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Transitions;
