/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { View, ViewProps, Dimensions } from 'react-native';
import { FAB, Surface, useTheme } from 'react-native-paper';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Tab from './Tab';

interface TabbarProps extends ViewProps {
  items?: { name: string; icon: string }[];
  centerItems: { icon: string; color: string; onPress?: () => void }[];
  activeIndex: number;
  changeIndex: (index: number) => void;
}

const { width } = Dimensions.get('window');

const ANIMATION_RADIUS = 96;

const Tabbar: React.FC<TabbarProps> = ({
  style,
  centerItems,
  items,
  activeIndex,
  changeIndex,
}) => {
  const theme = useTheme();
  const [centerActive, setCenterActive] = useState<boolean>(false);
  const animatedActive = useSharedValue<number>(0);
  const transition = useDerivedValue(() => {
    return withSpring(animatedActive.value);
  });

  useEffect(() => {
    animatedActive.value = centerActive ? 1 : 0;
  }, [animatedActive, centerActive]);

  return (
    <View>
      <Surface
        style={[
          {
            height: 56,
            width,
            borderTopRightRadius: theme.roundness,
            borderTopLeftRadius: theme.roundness,
            elevation: 4,
            flexDirection: 'row',
            overflow: 'hidden',
            ...(!theme.dark && { backgroundColor: '#FFFFFF' }),
          },
          style,
        ]}>
        {items?.map((item, index) => (
          <Tab
            {...item}
            key={index}
            active={index === activeIndex}
            onPress={() => changeIndex(index)}
          />
        ))}
      </Surface>
      {/* <View style={{ position: 'absolute', elevation: 5, overflow: 'visible' }}> */}
      {centerItems.map((item, index) => {
        const cy = -23 + (centerItems.length - index) * 4;

        // TODO: Solve equal spacing and radius calculation

        const baseLength = (ANIMATION_RADIUS * Math.PI) / centerItems.length;

        const lengthArc = baseLength + baseLength * index;
        // ((ANIMATION_RADIUS * Math.PI) / centerItems.length / 2) * (index + 1);

        const endAngle = lengthArc / ANIMATION_RADIUS + Math.PI - 0.31944;

        /* const angle = useDerivedValue(() => {
              return interpolate(
                transition.value,
                [0, 0.5, 1],
                [Math.PI / 2, Math.PI, endAngle],
              );
            }); */

        const animatedPathRadius = useDerivedValue(() => {
          return interpolate(
            transition.value,
            [0, 1],
            [0, 24 * centerItems.length],
          );
        });

        const angle = useDerivedValue(() => {
          return interpolate(
            animatedPathRadius.value,
            [0, 24 * centerItems.length],
            [Math.PI / 2, endAngle],
          );
        });

        const animatedTransform = useAnimatedStyle(() => ({
          transform: [
            {
              translateX: animatedPathRadius.value * Math.cos(angle.value),
            },
            {
              translateY: animatedPathRadius.value * Math.sin(angle.value),
            },
          ],
        }));

        return (
          <Animated.View
            style={[
              {
                position: 'absolute',
                left: (width - 56) / 2,
                top: cy,
                borderRadius: 23,
                elevation: 4,
              },
              animatedTransform,
            ]}
            key={index}>
            <FAB
              icon={item.icon}
              style={{
                elevation: 0,
                backgroundColor: item.color,
              }}
              color="#FFFFFF"
              onPress={item.onPress}
            />
          </Animated.View>
        );
      })}
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: (width - 56) / 2,
            top: -23,
            borderRadius: 23,
            elevation: 4,
          },
        ]}>
        <FAB
          icon={centerActive ? 'close' : 'plus'}
          style={{
            elevation: 0,
          }}
          onPress={() => {
            setCenterActive(!centerActive);
          }}
          color="#FFFFFF"
        />
      </Animated.View>
      {/* </View> */}
    </View>
  );
};

export default Tabbar;
