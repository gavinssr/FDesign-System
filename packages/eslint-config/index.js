const js = require('@eslint/js');
const tseslint = require('typescript-eslint');

const boundaryRules = require('./rules/boundaries');

module.exports = {
  base: tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
      rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ),

  boundaries: boundaryRules,
};
