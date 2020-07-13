module.exports = {
      "env": {
                "browser": true,
                "node": true
            },
      "extends": [
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking"
            ],
      "ignorePatterns": [],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
                "project": "tsconfig.json",
                "sourceType": "module"
            },
      "plugins": [
                "@typescript-eslint",
            ],
      "rules": {
                "@typescript-eslint/adjacent-overload-signatures": [
                              "error"
                          ],
                "camelcase": "error",
                "@typescript-eslint/consistent-type-assertions": [
                              "error"
                          ],
                "@typescript-eslint/explicit-function-return-type": [
                              "off"
                          ],
                "@typescript-eslint/member-delimiter-style": [
                              "error",
                              {
                                                "multiline": {
                                                                      "delimiter": "semi",
                                                                      "requireLast": true
                                                                  },
                                                "singleline": {
                                                                      "delimiter": "semi",
                                                                      "requireLast": false
                                                                  }
                                            }
                          ],
                "no-array-constructor": [
                              "off"
                          ],
                "@typescript-eslint/no-array-constructor": [
                              "error"
                          ],
                "no-empty-function": [
                              "off"
                          ],
                "@typescript-eslint/no-empty-function": [
                              "error"
                          ],
                "@typescript-eslint/no-empty-interface": "off",
                "@typescript-eslint/no-explicit-any": "error",
                "@typescript-eslint/no-inferrable-types": [
                              "off"
                          ],
                "@typescript-eslint/no-misused-new": [
                              "error"
                          ],
                "@typescript-eslint/no-namespace": "off",
                "@typescript-eslint/no-non-null-assertion": [
                              "warn"
                          ],
                "@typescript-eslint/no-this-alias": [
                              "error"
                          ],
                "no-unused-vars": [
                              "off"
                          ],
                "@typescript-eslint/no-unused-vars": [
                              "error",
                              {
                                                "varsIgnorePattern": "^_",
                                                "argsIgnorePattern": "^_"
                                            }
                          ],
                "no-use-before-define": [
                              "off"
                          ],
                "@typescript-eslint/no-use-before-define": "off",
                "@typescript-eslint/no-var-requires": [
                              "error"
                          ],
                "@typescript-eslint/prefer-namespace-keyword": [
                              "error"
                          ],
                "@typescript-eslint/triple-slash-reference": [
                              "error"
                          ],
                "@typescript-eslint/type-annotation-spacing": [
                              "error"
                          ],
                "no-var": [
                              "error"
                          ],
                "prefer-const": [
                              "error"
                          ],
                "prefer-rest-params": [
                              "error"
                          ],
                "prefer-spread": [
                              "error"
                          ],
                "@typescript-eslint/array-type": [
                              "error",
                              {
                                                "default": "array-simple",
                                                "readonly": "array-simple"
                                            }
                          ],
                "@typescript-eslint/consistent-type-definitions": "error",
                "@typescript-eslint/explicit-member-accessibility": [
                              "off",
                              {
                                                "accessibility": "explicit"
                                            }
                          ],
                "@typescript-eslint/indent": [
                              "warn",
                              4,
                              {
                                                "CallExpression": {
                                                                      "arguments": "first"
                                                                  },
                                                "ArrayExpression": "first",
                                                "ObjectExpression": "first",
                                                "FunctionDeclaration": {
                                                                      "parameters": "first"
                                                                  },
                                                "FunctionExpression": {
                                                                      "parameters": "first"
                                                                  }
                                            }
                          ],
                "@typescript-eslint/require-await": "off",
                "@typescript-eslint/member-ordering": "error",
                "@typescript-eslint/no-parameter-properties": "off",
                "@typescript-eslint/prefer-for-of": "off",
                "@typescript-eslint/prefer-function-type": "error",
                "@typescript-eslint/quotes": [
                              "error",
                              "double",
                              { "avoidEscape": true }
                          ],
                "@typescript-eslint/semi": [
                              "error",
                              "always"
                          ],
                "@typescript-eslint/unified-signatures": "error",
                "arrow-body-style": "error",
                "arrow-parens": [
                              "error",
                              "as-needed"
                          ],
                "object-curly-spacing": [
                              "warn",
                              "always"
                          ],
                "comma-dangle": "error",
                "complexity": "off",
                "constructor-super": "error",
                "curly": [
                              "error",
                              "multi",
                              "consistent"
                          ],
                "default-case": "error",
                "dot-notation": "error",
                "eol-last": "error",
                "eqeqeq": [
                              "error",
                              "always"
                          ],
                "guard-for-in": "error",
                "id-blacklist": "off",
                "id-match": "error",
                "import/order": "off",
                "max-classes-per-file": "off",
                "max-len": [
                              "error",
                              {
                                                "code": 100
                                            }
                          ],
                "new-parens": "error",
                "no-bitwise": "error",
                "no-caller": "error",
                "no-cond-assign": "error",
                "no-console": [
                              "warn",
                              {
                                                "allow": [
                                                                      "warn",
                                                                      "dir",
                                                                      "timeLog",
                                                                      "assert",
                                                                      "clear",
                                                                      "count",
                                                                      "countReset",
                                                                      "group",
                                                                      "groupEnd",
                                                                      "table",
                                                                      "info",
                                                                      "dirxml",
                                                                      "error",
                                                                      "groupCollapsed",
                                                                      "Console",
                                                                      "profile",
                                                                      "profileEnd",
                                                                      "timeStamp",
                                                                      "context"
                                                                  ]
                                            }
                          ],
                "no-debugger": "error",
                "no-empty": "error",
                "no-eval": "error",
                "no-fallthrough": "error",
                "no-invalid-this": "off",
                "no-multiple-empty-lines": [
                              "error",
                              {
                                                "max": 1
                                            }
                          ],
                "no-new-wrappers": "error",
                "no-redeclare": "error",
                "no-shadow": [
                              "error",
                              {
                                                "hoist": "all"
                                            }
                          ],
                "no-throw-literal": "error",
                "no-trailing-spaces": "off",
                "no-undef-init": "error",
                "no-unsafe-finally": "error",
                "no-unused-expressions": "error",
                "no-unused-labels": "error",
                "object-shorthand": "error",
                "one-var": [
                              "error",
                              "never"
                          ],
                "prefer-arrow-callback": "error",
                "quote-props": [
                              "error",
                              "consistent-as-needed"
                          ],
                "radix": [
                              "error",
                              "as-needed"
                          ],
                "space-before-function-paren": [
                              "error",
                              {
                                                "anonymous": "never",
                                                "asyncArrow": "always",
                                                "named": "never"
                                            }
                          ],
                "spaced-comment": [
                              "error",
                              "always"
                          ],
                "use-isnan": "error",
                "valid-typeof": "off",
            },
      "settings": {}
};

