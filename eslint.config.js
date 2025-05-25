import jsxiaosi from '@jsxiaosi/eslint-config';

export default jsxiaosi({
  typescript: true,
  react: true,
  prettier: {
    usePrettierrc: true
  },
  rules: {
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    // 'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react-refresh/only-export-components': 'off',
    '@typescript-eslint/consistent-type-imports': ['off'],
    // 关闭定义变量未使用提示/报错
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prefer-spread': ['off'],
    '@typescript-eslint/no-empty-interface': ['off'],
    'no-var': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-constant-condition': 'off',
    'no-unsafe-finally': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'prefer-const': 'off',
    'ts/no-unused-vars': 'off',
    'no-console': 'off',
    'no-cond-assign': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-prototype-builtins': 'off',
    'ts/no-duplicate-enum-values': 'off',
    'ts/consistent-type-definitions': 'off'
  }
});
