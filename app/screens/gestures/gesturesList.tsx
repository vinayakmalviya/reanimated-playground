import { StackNavigatorParamsList } from '../Navigator';

const transitions: {
  name: string;
  navigate: keyof StackNavigatorParamsList;
}[] = [
  { name: 'Basic Pan Gesture', navigate: 'BasicPanGesture' },
  { name: 'Draggable Switch', navigate: 'DraggableSwitch' },
  { name: 'Circular Slider', navigate: 'CircularSlider' },
  { name: 'Gradient Slider', navigate: 'GradientSlider' },
  { name: 'Card Swipe', navigate: 'CardSwipe' },
];

export default transitions;
