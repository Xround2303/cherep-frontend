module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2021
  },
  "rules": {
    "semi": "error",
    "quotes": [2, "double", { "avoidEscape": true }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "vue/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
};
