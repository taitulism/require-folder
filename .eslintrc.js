module.exports = {
	root: true,
	env: {
		node: true,
		commonjs: true,
		es6: true,
		mocha: true,
	},
	extends: 'eslint:recommended',
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
		// "sourceType": "module"
	},
	overrides: [
		{
			files: 'tests/**',
			env: {
				mocha: true,
			},
			rules: {
				'no-unused-expressions': 'off',
				'no-magic-numbers': 'off',
				// 'max-lines-per-function': 'off',
				'max-statements': 'off',
				'func-names': 'off',
				'prefer-arrow-callback': 'off',
				'global-require': 'off',
				'no-new': 'off',
				'no-shadow': 'off',
			},
		},
	],
	rules: {
		'accessor-pairs': 'error',
		'array-bracket-newline': 'error',
		'array-bracket-spacing': 'error',
		'array-callback-return': 'error',
//		"array-element-newline": ["off", { "minItems": 4, "multiline": true, }],
		'arrow-body-style': 'error',
		'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
		'arrow-spacing': 'error',
		'block-scoped-var': 'error',
		'block-spacing': 'error',
		'brace-style': ['error', 'stroustrup'],
		'callback-return': 'warn',
		camelcase: [
			'error', {
				allow: ['^REGEX_'],
			},
		],
//		"capitalized-comments": "off",
		'class-methods-use-this': 'error',
		'comma-dangle': ['error', 'always-multiline'],
		'comma-spacing': 'error',
		'comma-style': 'error',
		complexity: 'error',
		'computed-property-spacing': 'error',
//		"consistent-return": "off",
		'consistent-this': 'error',
		curly: ['error', 'multi-line'],
		'default-case': 'error',
		'dot-location': ['error', 'property'],
		'dot-notation': 'error',
		'eol-last': 'error',
		eqeqeq: ['error', 'smart'],
		'func-call-spacing': 'error',
		'func-name-matching': 'error',
		'func-names': [
			'error',
			'as-needed',
		],
//		"func-style": "off",
		'function-paren-newline': 'error',
		'generator-star-spacing': 'error',
//		"global-require": "off",
		'guard-for-in': 'error',
		'handle-callback-err': 'error',
		'id-blacklist': 'error',
//		"id-length": "off",
		'id-match': 'error',
		'implicit-arrow-linebreak': 'error',
		indent: ['error', 'tab', {ignoreComments: true}],
//		"indent-legacy": "off",
//		"init-declarations": "off",
		'jsx-quotes': 'error',
//		"key-spacing": ["off", { "align": "value" }],
		'keyword-spacing': 'error',
//		"line-comment-position": "off",
		'linebreak-style': [
			'error',
			'unix',
		],
		'lines-around-comment': 'error',
		'lines-around-directive': 'error',
		'lines-between-class-members': 'error',
		'max-classes-per-file': 'error',
		'max-depth': 'error',
		'max-len': [
			'error', {
				code: 100,
				tabWidth: 4,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
			},
		],
//		'max-lines': 'off',
//		'max-lines-per-function': 'off',
		'max-nested-callbacks': 'error',
		'max-params': ['error', { max: 4 }],
//		'max-statements': 'off',
		'max-statements-per-line': 'error',
//		"multiline-comment-style": "off",
		'multiline-ternary': ['error', 'always-multiline'],
		'new-cap': [
			'error', {
				capIsNew: false,
			},
		],
		'new-parens': 'error',
		'newline-after-var': [
			'error',
			'always',
		],
		'newline-before-return': 'error',
		'newline-per-chained-call': [
			'error', {
				ignoreChainWithDepth: 3,
			},
		],
		'no-alert': 'error',
		'no-array-constructor': 'error',
		'no-async-promise-executor': 'error',
		'no-await-in-loop': 'error',
		'no-bitwise': 'error',
		'no-buffer-constructor': 'error',
		'no-caller': 'error',
		'no-catch-shadow': 'error',
		'no-confusing-arrow': 'error',
		'no-console': 'error',
		'no-continue': 'error',
		'no-div-regex': 'error',
		'no-duplicate-imports': 'error',
		'no-else-return': 'error',
		'no-empty-function': 'error',
		'no-eq-null': 'error',
		'no-eval': 'error',
		'no-extend-native': 'error',
		'no-extra-bind': 'error',
		'no-extra-label': 'error',
//		"no-extra-parens": "off",
		'no-floating-decimal': 'error',
		'no-global-assign': 'error',
		'no-implicit-coercion': 'error',
		'no-implicit-globals': 'error',
		'no-implied-eval': 'error',
//		"no-inline-comments": "off",
		'no-invalid-this': 'error',
		'no-iterator': 'error',
		'no-label-var': 'error',
		'no-labels': 'error',
		'no-lone-blocks': 'error',
		'no-lonely-if': 'error',
		'no-loop-func': 'error',
		'no-magic-numbers': ['error', { ignore: [0, 1] }],
		'no-misleading-character-class': 'error',
		'no-mixed-operators': 'error',
		'no-mixed-requires': 'error',
		'no-multi-assign': 'error',
//		"no-multi-spaces": ["off", {
//			"exceptions": {
//				"VariableDeclarator": true,
//				"ImportDeclaration": true,
//				"Property": true
//			}
//		}],
		'no-multi-str': 'error',
		'no-multiple-empty-lines': [
			'error', {
				max: 4,
				maxEOF: 1,
			},
		],
		'no-native-reassign': 'error',
		'no-negated-condition': 'error',
		'no-negated-in-lhs': 'error',
		'no-nested-ternary': 'error',
		'no-new': 'error',
		'no-new-func': 'error',
		'no-new-object': 'error',
		'no-new-require': 'error',
		'no-new-wrappers': 'error',
		'no-octal-escape': 'error',
//		"no-param-reassign": "off",
		'no-path-concat': 'error',
//		"no-plusplus": "off",
		'no-process-env': 'error',
		'no-process-exit': 'error',
		'no-proto': 'error',
		'no-prototype-builtins': 'error',
		'no-restricted-globals': 'error',
		'no-restricted-imports': 'error',
		'no-restricted-modules': 'error',
		'no-restricted-properties': 'error',
		'no-restricted-syntax': 'error',
		'no-return-assign': 'error',
		'no-return-await': 'error',
		'no-script-url': 'error',
		'no-self-compare': 'error',
		'no-sequences': 'error',
		'no-shadow': 'error',
		'no-shadow-restricted-names': 'error',
		'no-spaced-func': 'error',
//		"no-sync": "off",
//		"no-tabs": "off",
		'no-template-curly-in-string': 'error',
//		"no-ternary": "off",
		'no-throw-literal': 'error',
		'no-trailing-spaces': 'error',
		'no-undef-init': 'error',
		'no-undefined': 'error',
		'no-underscore-dangle': [
			'error', {
				allowAfterThis: true,
				allow: ['_INDEX_ONLY'],
			},
		],
		'no-unmodified-loop-condition': 'error',
		'no-unneeded-ternary': 'error',
		'no-unsafe-negation': 'error',
		'no-unused-expressions': [
			'error', {
				allowShortCircuit: true,
			},
		],
		'no-use-before-define': [
			'error', {
				functions: false,
				classes: false,
			},
		],
		'no-useless-call': 'error',
		'no-useless-catch': 'error',
		'no-useless-computed-key': 'error',
		'no-useless-concat': 'error',
		'no-useless-constructor': 'error',
		'no-useless-escape': 'error',
		'no-useless-rename': 'error',
		'no-useless-return': 'error',
		'no-var': 'error',
		'no-void': 'error',
//		"no-warning-comments": "off",
		'no-whitespace-before-property': 'error',
		'no-with': 'error',
		'nonblock-statement-body-position': 'error',
		'object-curly-newline': 'error',
//		'object-curly-spacing': 'off',
		'object-property-newline': 'error',
		'object-shorthand': 'error',
//		"one-var": "off",
		'one-var-declaration-per-line': 'error',
		'operator-assignment': 'error',
		'operator-linebreak': 'error',
//		"padded-blocks": "off",
		'padding-line-between-statements': 'error',
		'prefer-arrow-callback': 'error',
		'prefer-const': 'error',
		'prefer-destructuring': 'error',
//		"prefer-named-capture-group": "off",
		'prefer-numeric-literals': 'error',
		'prefer-object-spread': 'error',
		'prefer-promise-reject-errors': 'error',
//		"prefer-reflect": "off", // Deprecated
		'prefer-rest-params': 'error',
		'prefer-spread': 'error',
		'prefer-template': 'error',
		'quote-props': ['error', 'as-needed'],
		quotes: [
			'error',
			'single',
		],
		radix: 'error',
		'require-atomic-updates': 'error',
		'require-await': 'error',
//		"require-jsdoc": "off",
		'require-unicode-regexp': 'error',
		'rest-spread-spacing': 'error',
		semi: 'error',
		'semi-spacing': 'error',
//		"semi-style": [ "off", "last" ],
		'sort-imports': [
			'error', {
				ignoreCase: true,
				ignoreMemberSort: true,
				memberSyntaxSortOrder: [
					'single',
					'multiple',
					'all',
					'none',
				],
			},
		],
//		"sort-keys": "off",
//		"sort-vars": "off",
		'space-before-blocks': 'error',
		'space-before-function-paren': 'error',
		'space-in-parens': [
			'error',
			'never',
		],
		'space-infix-ops': 'error',
		'space-unary-ops': 'error',
		'spaced-comment': [
			'error',
			'always',
		],
		strict: [
			'error',
			'never',
		],
		'switch-colon-spacing': 'error',
		'symbol-description': 'error',
		'template-curly-spacing': 'error',
		'template-tag-spacing': 'error',
		'unicode-bom': [
			'error',
			'never',
		],
		'valid-jsdoc': 'error',
		'vars-on-top': 'error',
		'wrap-iife': 'error',
		'wrap-regex': 'error',
		'yield-star-spacing': 'error',
		yoda: 'error',
	},
};
