import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from 'react-native-paper';

const Caption: React.FC<TextProps> = ({ children, style, ...props }) => {
  const theme = useTheme();

  return (
    <Text
      style={[
        {
          fontFamily: 'Quicksand-Light',
          fontSize: 12,
          letterSpacing: 0.4,
          color: theme.colors.text,
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default Caption;
