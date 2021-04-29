import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Divider, List } from 'react-native-paper';

import { ScreenContainer } from '../components';
import { StackNavigatorParamsList } from './Navigator';

import transistions from './transitions/transitonsList';

type TransitionsNavigationProp = StackNavigationProp<
  StackNavigatorParamsList,
  'Transitions'
>;

interface TransitionsProps {
  navigation: TransitionsNavigationProp;
}

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
        data={transistions}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={Divider}
      />
    </ScreenContainer>
  );
};

export default Transitions;
