import js from "@eslint/js";
import html from "@html-eslint/eslint-plugin";
import htmlParser from "@html-eslint/parser";

export default [
  js.configs.recommended,
  {
    plugins: {
      "@html-eslint": html,
    },
    files: ["**/*.html"],
    languageOptions: {
      parser: htmlParser,
    },
  }
];
