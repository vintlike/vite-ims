import prettierConfig from '@jsxiaosi/eslint-config-prettier';

export default {
  ...prettierConfig,
  arrowParens: 'always',
  bracketSameLine: false,
  printWidth: 120,
  proseWrap: 'preserve',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none'
};
