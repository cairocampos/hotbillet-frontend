module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // 'eslint:recommended',
    "@vue/typescript/recommended",
    "plugin:vue/vue3-recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "vue/html-self-closing": "off",
  },
};
