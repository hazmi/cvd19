module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  // add your custom rules here
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'any'
        }
      }
    ]
  }
};
