module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },

  env: {
    es6: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src/'],
        ],
      },
    },
  },
};
