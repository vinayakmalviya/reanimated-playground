module.exports = {
  root: true,
  plugins: ['import'],
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/typescript',
  ],
  rules: {
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react-native/no-unused-styles': 2,
    'react-native/no-inline-styles': 0,
    'react-native/no-color-literals': 0,
    'import/no-extraneous-dependencies': 2,
    'import/no-duplicates': 2,
    'import/no-useless-path-segments': 2,
  },
};
