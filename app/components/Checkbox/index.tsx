import React, { useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface CheckboxProps extends ViewProps {
  active?: boolean;
  size?: number;
  color?: string;
  darkIcon?: boolean;
  onChange?: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  active,
  size = 24,
  color,
  darkIcon = false,
  onChange,
  style,
}) => {
  const theme = useTheme();
  const animatedActive = useSharedValue<number>(active ? 1 : 0);
  const transition = useDerivedValue(() => {
    return withTiming(animatedActive.value, { duration: 320 });
  });

  const animatedStyle = useAnimatedStyle(() => ({
    width: interpolate(transition.value, [0, 1], [0, size - 4]),
  }));

  const animatedColor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      transition.value,
      [0, 1],
      ['#CCCCCC', color || theme.colors.primary],
    ),
  }));

  useEffect(() => {
    animatedActive.value = active ? 1 : 0;
  }, [active, animatedActive]);

  return (
    <TouchableWithoutFeedback onPress={onChange}>
      <Animated.View
        style={[
          {
            height: size,
            width: size,
            borderRadius: theme.roundness,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#CCCCCC',
          },
          style,
          animatedColor,
        ]}>
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              justifyContent: 'center',
              marginLeft: 2,
            },
            animatedStyle,
          ]}>
          <MaterialCommunityIcons
            name="check"
            size={size - 4}
            color={darkIcon ? '#121212' : '#FFFFFF'}
          />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Checkbox;
