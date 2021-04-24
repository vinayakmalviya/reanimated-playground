import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from 'react-native-paper';

const Subtitle: React.FC<TextProps> = ({ children, style, ...props }) => {
  const theme = useTheme();

  return (
    <Text
      style={[
        {
          fontFamily: 'Quicksand-Medium',
          fontSize: 24,
          color: theme.colors.text,
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default Subtitle;
