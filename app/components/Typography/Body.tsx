import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from 'react-native-paper';

const Body: React.FC<TextProps> = ({ children, style, ...props }) => {
  const theme = useTheme();

  return (
    <Text
      style={[
        {
          fontFamily: 'Quicksand-Regular',
          fontSize: 16,
          color: theme.colors.text,
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default Body;
