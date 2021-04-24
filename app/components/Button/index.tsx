import React from 'react';
import { TextStyle, ViewProps, ViewStyle } from 'react-native';
import { Button as RNButton } from 'react-native-paper';

interface ButtonProps extends ViewProps {
  mode?: 'contained' | 'outlined' | 'text';
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  labelStyle?: TextStyle;
  compact?: boolean;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  mode = 'contained',
  style,
  contentStyle,
  labelStyle,
  compact = false,
  children,
  onPress,
  ...props
}) => {
  return (
    <RNButton
      mode={mode}
      style={style}
      contentStyle={{ height: 48, ...contentStyle }}
      labelStyle={{
        fontFamily: 'Quicksand-SemiBold',
        fontSize: 14,
        marginTop: 6,
        ...labelStyle,
      }}
      compact={compact}
      onPress={onPress}
      {...props}>
      {children}
    </RNButton>
  );
};

export default Button;
