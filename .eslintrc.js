import bannedWordsRule from "./eslint/no-banned-words.js";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,tsx}"],
    plugins: {
      "no-banned-words": bannedWordsRule,
    },
    rules: {
      // Chỉ có rule này được bật, tất cả rule khác đều OFF
      "no-banned-words/no-banned-words": "error",
    },
  },
];
