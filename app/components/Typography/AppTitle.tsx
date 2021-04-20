import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from 'react-native-paper';

const AppTitle: React.FC<TextProps> = ({ children, style, ...props }) => {
  const theme = useTheme();

  return (
    <Text
      style={[
        {
          fontFamily: 'Quicksand-Bold',
          fontSize: 32,
          color: theme.colors.primary,
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default AppTitle;
