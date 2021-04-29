import React from 'react';
import {
  View,
  Image,
  ViewProps,
  ImageProps,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import Body from '../Typography/Body';
import Subtitle from '../Typography/Subtitle';
import Title from '../Typography/Title';

interface VerticalCardProps extends ViewProps {
  image: ImageProps['source'];
  title: string;
  subtitle: string;
  content?: string;
  translateX?: Animated.SharedValue<number>;
}

const { height, width } = Dimensions.get('window');

export const VERTICAL_CARD_HEIGHT = height - 152;

const VerticalCard: React.FC<VerticalCardProps> = ({
  image,
  title,
  subtitle,
  content,
  translateX = { value: 0 },
  style,
}) => {
  const theme = useTheme();

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX?.value, [-width / 2, 0], [0, 1]),
    transform: [
      { scale: interpolate(translateX?.value, [0, width / 2], [1, 1.4]) },
    ],
  }));

  const cancelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX?.value, [0, width / 2], [1, 0]),
    transform: [
      { scale: interpolate(translateX?.value, [-width / 2, 0], [1.4, 1]) },
    ],
  }));

  return (
    <View
      style={[
        {
          maxHeight: VERTICAL_CARD_HEIGHT,
          borderRadius: theme.roundness,
          backgroundColor: theme.dark ? theme.colors.surface : '#FFFFFF',
          elevation: 2,
          overflow: 'hidden',
          flex: 1,
        },
        style,
      ]}>
      <Image
        source={image}
        style={{ width: '100%', height: VERTICAL_CARD_HEIGHT / 1.48 }}
        resizeMode="cover"
      />
      <View style={{ padding: 12 }}>
        <Title
          style={{
            marginTop: -4,
            marginBottom: 4,
            fontFamily: 'Quicksand-Bold',
          }}>
          {title}
        </Title>
        <Subtitle
          style={{
            fontSize: 16,
            marginTop: -4,
            marginBottom: 8,
            color: theme.colors.textLight,
          }}>
          {subtitle}
        </Subtitle>
        {content && (
          <Body
            style={{
              marginTop: -4,
              marginBottom: 4,
              fontFamily: 'Quicksand-Light',
            }}
            numberOfLines={2}
            ellipsizeMode="tail">
            {content}
          </Body>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}>
        <Animated.View style={cancelStyle}>
          <IconButton
            icon="cancel"
            onPress={() => null}
            color={theme.colors.accent}
            size={48}
            style={{ marginRight: 8 }}
          />
        </Animated.View>
        <Animated.View style={likeStyle}>
          <IconButton
            icon="heart"
            onPress={() => null}
            color={theme.colors.primary}
            size={48}
            style={{ marginLeft: 8 }}
          />
        </Animated.View>
      </View>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#FFFFFF',
          borderRadius: theme.roundness,
          opacity: 0.07,
          zIndex: 0,
        }}
      />
    </View>
  );
};

export default VerticalCard;
