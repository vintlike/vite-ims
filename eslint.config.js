import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi({
  typescript: true,
  react: true,
  prettier: {
    usePrettierrc: true
  },
  rules: {
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'ts/no-unused-vars': 'off',
    'no-console': 'off'
  }
});
