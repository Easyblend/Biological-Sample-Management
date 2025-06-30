import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  {
    languageOptions: {
      parser: tseslint.parser,
      // parserOptions: {
      //   ecmaVersion: "latest",
      //   sourceType: "module",
      //   project: true,
      // },
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: pluginReact,
    },
    files: ["**/*.{ts,tsx,js,jsx}"],
  },
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-console": "error",
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 0 }],
    },
  },
]);
