import config from '@better-qr/config/eslint.config.js'
import { globalIgnores } from 'eslint/config'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

config.push(globalIgnores(['**/.sst/**/*', '**/.react-router/**/*']))
config.push(pluginReact.configs.flat['jsx-runtime'])
config.push({
  files: ['**/*.{ts,tsx}'],
  plugins: {
    'react-hooks': reactHooks,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react/self-closing-comp': ['error', { component: true, html: true }],
  },
})

export default config
