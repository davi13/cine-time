const { defineConfig, globalIgnores } = require("eslint/config");

const globals = require("globals");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const react = require("eslint-plugin-react");
const reactNative = require("eslint-plugin-react-native");
const reactHooks = require("eslint-plugin-react-hooks");

const { fixupPluginRules } = require("@eslint/compat");

const tsParser = require("@typescript-eslint/parser");
const js = require("@eslint/js");

const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

module.exports = defineConfig([
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},

		plugins: {
			"@typescript-eslint": typescriptEslint,
			react,
			"react-native": reactNative,
			"react-hooks": fixupPluginRules(reactHooks),
		},

		extends: compat.extends("prettier"),
	},
	{
		files: ["**/*.ts", "**/*.tsx"],

		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2021,
			sourceType: "module",

			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},

				project: "./tsconfig.eslint.json",
				tsconfigRootDir: __dirname,
			},
		},

		extends: compat.extends(
			"eslint:recommended",
			"plugin:@typescript-eslint/recommended",
			"plugin:react/recommended",
			"plugin:react-native/all",
			"prettier"
		),

		rules: {
			"no-debugger": "error",
			"no-console": "warn",
			"react/prop-types": "off",
			"react/react-in-jsx-scope": "off",
			"react-native/no-inline-styles": "off",
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
			"@typescript-eslint/no-require-imports": "off",
			"react-native/no-color-literals": "off",
			"react/no-unescaped-entities": "off",
			"react-native/no-raw-text": "off",
		},

		settings: {
			react: {
				version: "detect",
			},
		},
	},
	{
		files: ["**/*.js", "**/*.jsx"],

		languageOptions: {
			ecmaVersion: 2021,
			sourceType: "module",

			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},

		extends: compat.extends("eslint:recommended", "plugin:react/recommended", "plugin:react-native/all", "prettier"),

		rules: {
			"no-debugger": "error",
			"no-console": "warn",
			"react/react-in-jsx-scope": "off",
			"react-native/no-inline-styles": "off",
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
			"react-native/no-color-literals": "off",
			"react/no-unescaped-entities": "off",
		},

		settings: {
			react: {
				version: "detect",
			},
		},
	},
	globalIgnores([
		"**/node_modules",
		"**/.devcontainer",
		"**/.expo",
		"**/.idea",
		"**/.vscode",
		"**/tsconfig.json",
		"**/.eslintrc.js",
		"**/.prettierrc",
		"**/app.json",
		"**/jest.config.ts",
		"**/package-lock.json",
		"**/package.json",
		"**/ios",
		"**/android",
		"**/metro.config.js",
	]),
]);
