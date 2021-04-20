import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ScreenContainer } from '../components';

import { StackNavigatorParamsList } from './Navigator';
import { Divider, List } from 'react-native-paper';

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
        data={[
          { name: 'Basic Transition', navigate: 'BasicTransition' },
          { name: 'Animated Switch', navigate: 'AnimatedSwitch' },
        ]}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={Divider}
      />
    </ScreenContainer>
  );
};

export default Transitions;
