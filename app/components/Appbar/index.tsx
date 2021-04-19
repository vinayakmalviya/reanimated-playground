import React from 'react';
import { Appbar as PaperAppbar, useTheme } from 'react-native-paper';
import Animated from 'react-native-reanimated';

type AnimatedStyle = {
  elevation: number;
  transform: [{ translateY: number }];
};

type OpacityStyle = {
  opacity: number;
};

type AppbarProps =
  | {
      title: string;
      subtitle?: string;
      actions?: {
        icon: string;
        color?: string;
        size?: number;
        onPress?: () => void;
      }[];
      backAction?: () => void;
      animatedStyle: Animated.AnimateStyle<AnimatedStyle>;
      opacityStyle: Animated.AnimateStyle<OpacityStyle>;
    }
  | undefined;

export const APPBAR_HEIGHT = 56;

const Appbar: React.FC<AppbarProps> = ({
  title,
  subtitle,
  actions,
  backAction,
  animatedStyle,
  opacityStyle,
}) => {
  const theme = useTheme();

  return (
    <Animated.View
      style={[{ backgroundColor: theme.colors.surface }, animatedStyle]}>
      <PaperAppbar.Header
        style={{ backgroundColor: 'transparent', elevation: 0, zIndex: 2 }}>
        {backAction && (
          <PaperAppbar.BackAction
            onPress={backAction}
            color={theme.colors.text}
          />
        )}
        <PaperAppbar.Content
          style={{ elevation: 0 }}
          titleStyle={{
            fontFamily: 'Quicksand-Bold',
            fontSize: 22,
            marginTop: -4,
          }}
          color={theme.colors.text}
          title={title}
          subtitle={subtitle}
        />
        {actions?.map(item => (
          <PaperAppbar.Action {...item} key={item.icon} />
        ))}
      </PaperAppbar.Header>
      {theme.dark && (
        <Animated.View
          style={[
            {
              backgroundColor: '#FFFFFF',
              height: APPBAR_HEIGHT,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1,
            },
            opacityStyle,
          ]}
        />
      )}
    </Animated.View>
  );
};

export default Appbar;
