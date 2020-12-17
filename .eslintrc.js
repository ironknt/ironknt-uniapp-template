module.exports = {
  root: true,
  extends: [
    'plugin:vue/recommended',
    'airbnb-base',
  ],
  parserOptions: {
    // 'parse': 'babel-eslint',
    // 'ecmaVersion': '2018',
    // 'sourceType': 'module'
  },
  rules: {
    'no-alert': 0,
    'no-multi-spaces': 'error', // 禁止多个空格
    'import/no-extraneous-dependencies': 0,
    'no-restricted-syntax': 0,
    'no-undef': 0,
    'no-plusplus': 0,
    'no-multi-assign': 0,
    'vue/html-self-closing': 0,
    'vue/max-attributes-per-line': 0,
    'import/no-unresolved': 0,
    'func-names': 0,
    'no-console': 0,
    // 'semi': [2, 'always'] ,// 自动补充分号
    // 'quotes': ['error', 'single'] // 使用单引号
  },
};
