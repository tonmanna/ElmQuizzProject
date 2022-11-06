module.exports = {
    env: {
        browser: false,
        es6: true,
        node: true
    },
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2018
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    rules: {
        "new-cap": "off",
        "no-console": "off",
        camelcase: "off",
        "no-return-await": "off",
        eqeqeq: "off",
        quotes: ["error", "single"],
        semi: ["error", "always"],
        "no-unused-vars": ["warn"]
    },
    globals: {
        jest: true
    }
};