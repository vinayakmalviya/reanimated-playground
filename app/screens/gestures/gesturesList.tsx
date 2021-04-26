import { StackNavigatorParamsList } from '../Navigator';

const transitions: {
  name: string;
  navigate: keyof StackNavigatorParamsList;
}[] = [
  { name: 'Basic Pan Gesture', navigate: 'BasicPanGesture' },
  { name: 'Draggable Switch', navigate: 'DraggableSwitch' },
];

export default transitions;
