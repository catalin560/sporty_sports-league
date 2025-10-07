import js from "@eslint/js";
import globals from "globals";
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default defineConfig([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactX.configs["recommended-typescript"],
            reactDom.configs.recommended
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                project: ["./tsconfig.app.json", "./tsconfig.node.json"],
                tsconfigRootDir: import.meta.dirname
            }
        }
    },
    ...pluginQuery.configs["flat/recommended"]
]);
