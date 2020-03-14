module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
  },
  "extends": "standard",
  "globals": {
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
  },
  "rules": {
    "semi": [2,"always"],
    "camelcase": 1,
    "no-path-concat": 0,
    "comma-dangle": [2, "always-multiline"],
  }
};