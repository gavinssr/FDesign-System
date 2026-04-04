/**
 * Boundary enforcement rules.
 *
 * These rules are the mechanical enforcement of the hard constraints
 * listed in AGENTS.md. They prevent:
 *
 *  1. packages/components/ from importing apps/stage/
 *  2. anything outside apps/stage/ from importing apps/stage/shell/
 *  3. projects/ from importing apps/stage/
 *  4. consumer apps from importing stage shell internals
 */

const stageShellPattern = '**/apps/stage/shell/**';
const stagePattern = '**/apps/stage/**';

const componentsBoundary = {
  files: ['packages/components/**/*.{ts,tsx}'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: [stagePattern],
            message: 'components must NOT import from apps/stage/ — this violates the architecture boundary.',
          },
          {
            group: ['**/projects/**'],
            message: 'components must NOT import from projects/ — components are generic.',
          },
        ],
      },
    ],
  },
};

const projectsBoundary = {
  files: ['projects/**/*.{ts,tsx}'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: [stagePattern],
            message: 'projects must NOT import from apps/stage/ — stage is not a production dependency.',
          },
        ],
      },
    ],
  },
};

const consumerBoundary = {
  files: ['apps/example-*/**/*.{ts,tsx}'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: [stageShellPattern],
            message: 'consumer apps must NOT import stage shell internals.',
          },
        ],
      },
    ],
  },
};

module.exports = [componentsBoundary, projectsBoundary, consumerBoundary];
