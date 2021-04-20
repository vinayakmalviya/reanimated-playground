import React from 'react';
import Animated from 'react-native-reanimated';

export default function withAnimated(
  WrappedComponent: React.ComponentType<unknown>,
): React.ComponentType {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  class WithAnimated extends React.Component {
    static displayName = `WithAnimated(${displayName})`;

    render(): React.ReactNode {
      return <WrappedComponent {...this.props} />;
    }
  }

  return Animated.createAnimatedComponent(WithAnimated);
}
