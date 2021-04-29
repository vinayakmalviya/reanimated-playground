import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackNavigatorParamsList } from '../Navigator';
import { Body, ScreenContainer, DraggableSwitch } from '../../components';

type NavigationProp = StackNavigationProp<
  StackNavigatorParamsList,
  'DraggableSwitch'
>;

interface DraggableSwitchScreenProps {
  navigation: NavigationProp;
}

const DraggableSwitchScreen: React.FC<DraggableSwitchScreenProps> = ({
  navigation,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const header = useMemo(
    () => ({
      title: 'Draggable Switch',
      backAction: navigation.goBack,
    }),
    [navigation.goBack],
  );

  return (
    <ScreenContainer header={header} style={{ padding: 16 }}>
      <Body>Smooth customizable animated switch</Body>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <DraggableSwitch
          active={active}
          onChange={value => {
            setActive(value);
          }}
          size={69}
        />
      </View>
    </ScreenContainer>
  );
};

export default DraggableSwitchScreen;
