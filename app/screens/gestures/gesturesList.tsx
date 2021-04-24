import { StackNavigatorParamsList } from '../Navigator';

const transitions: {
  name: string;
  navigate: keyof StackNavigatorParamsList;
}[] = [{ name: 'Basic Pan Gesture', navigate: 'BasicPanGesture' }];

export default transitions;
