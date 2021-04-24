const clamp = (value: number, minValue: number, maxValue: number) => {
  'worklet';
  return Math.min(Math.max(value, minValue), maxValue);
};

export default clamp;
