import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Divider, List } from 'react-native-paper';

import { ScreenContainer } from '../components';
import { StackNavigatorParamsList } from './Navigator';

import gestures from './gestures/gesturesList';

type GesturesNavigationProp = StackNavigationProp<
  StackNavigatorParamsList,
  'Gestures'
>;

type GesturesProps = {
  navigation: GesturesNavigationProp;
};

const Gestures: React.FC<GesturesProps> = ({ navigation }) => {
  const header = useMemo(
    () => ({
      title: 'Gestures',
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

  const renderItem: ListRenderItem<{
    name: string;
    navigate: keyof StackNavigatorParamsList;
  }> = useCallback(
    ({ item: { name, navigate } }) => (
      <List.Item
        title={name}
        titleStyle={{ fontFamily: 'Quicksand-Medium' }}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {
          navigation.navigate(navigate);
        }}
      />
    ),
    [navigation],
  );

  return (
    <ScreenContainer header={header} style={{ padding: 16 }}>
      <FlatList
        data={gestures}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={Divider}
      />
    </ScreenContainer>
  );
};

export default Gestures;
