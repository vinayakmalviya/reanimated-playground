import React, { useEffect } from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  View,
  ViewProps,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Caption from '../Typography/Caption';

interface TabProps extends ViewProps {
  name: string;
  icon: string;
  active: boolean;
  onPress: () => void;
}

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

const Tab: React.FC<TabProps> = ({ name, icon, active, onPress }) => {
  const theme = useTheme();
  const animatedActive = useSharedValue<number>(0);
  const transition = useDerivedValue(() => {
    return withTiming(animatedActive.value);
  });

  useEffect(() => {
    animatedActive.value = active ? 1 : 0;
  }, [active, animatedActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: transition.value,
  }));

  const animatedIcon = useAnimatedStyle(() => ({
    width: interpolate(transition.value, [0, 1], [0, 24]),
    transform: [{ translateY: interpolate(transition.value, [0, 1], [1, -2]) }],
  }));

  const animatedColor = useAnimatedStyle(() => ({
    opacity: interpolate(transition.value, [0.8, 1], [1, 0]),
    transform: [{ translateY: interpolate(transition.value, [0, 1], [1, -2]) }],
  }));

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <AnimatedIcon
            name={icon}
            size={24}
            style={animatedColor}
            color="#CCCCCC"
          />
          <AnimatedIcon
            name={icon}
            size={24}
            color={theme.colors.primary}
            style={[
              {
                ...StyleSheet.absoluteFillObject,
                alignItems: 'center',
                justifyContent: 'center',
              },
              animatedIcon,
            ]}
          />
        </View>
        <Animated.View style={animatedStyle}>
          <Caption style={{ marginTop: -4, marginBottom: -6 }}>{name}</Caption>
        </Animated.View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Tab;
