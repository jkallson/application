/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'

export default [
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}'],
    },

    {
        name: 'app/files-to-ignore',
        ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
    },

    ...pluginVue.configs['flat/recommended'],
    ...vueTsEslintConfig(),

    {
        rules: {
            '@typescript-eslint/no-unused-expressions': [
                'error',
                {
                    allowShortCircuit: true,
                    allowTernary: true,
                },
            ],
            'vue/html-self-closing': ['error', {
                html: {
                    void: 'never',
                    normal: 'never',
                    component: 'never'
                },
                svg: 'never',
                math: 'never'
            }],
            'vue/multi-word-component-names': 'off',
            'vue/valid-v-slot': ['error', { allowModifiers: true }],
            'vue/v-slot-style': ['error', {
                'atComponent': 'longform',
                'default': 'longform',
                'named': 'longform',
            }],
            'indent': ['error', 4],
            'quotes': ['error', 'single'],
            'object-curly-spacing': ['error', 'always'],
            'vue/html-indent': ['error', 4]
        }
    }
]
