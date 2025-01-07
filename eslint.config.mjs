import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';
import eslintPluginReactNative from 'eslint-plugin-react-native';
import eslintConfigPrettier from 'eslint-config-prettier';
import tsParser from '@typescript-eslint/parser';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.node,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      ['react']: pluginReact,
      ['react-native']: eslintPluginReactNative,
      ['@typescript-eslint']: tseslint,
      ['prettier']: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...eslintPluginReactNative.configs.all.rules,
      ...eslintConfigPrettier.rules,
      'react-native/no-raw-text': [
        'error',
        {
          skip: ['ThemedText'],
        },
      ],
    },
  },
];
