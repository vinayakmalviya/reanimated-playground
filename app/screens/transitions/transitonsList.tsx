import { StackNavigatorParamsList } from '../Navigator';

const transitions: {
  name: string;
  navigate: keyof StackNavigatorParamsList;
}[] = [
  { name: 'Basic Transition', navigate: 'BasicTransition' },
  { name: 'Animated Switch', navigate: 'AnimatedSwitch' },
  { name: 'Animated Checkbox', navigate: 'AnimatedCheckbox' },
  { name: 'Animated Tabbar', navigate: 'AnimatedTabbar' },
];

export default transitions;
