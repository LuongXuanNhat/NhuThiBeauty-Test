import bannedWordsRule from "./eslint/no-banned-words.mjs";
import typescriptParser from "@typescript-eslint/parser";

export default [
  // Chỉ scan src/ folder
  {
    files: ["src/**/*.{js,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "no-banned-words": bannedWordsRule,
    },
    rules: {
      "no-banned-words/no-banned-words": "error",
    },
  },
];
