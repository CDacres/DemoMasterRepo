// this
const fs = require('fs');

module.exports.default = function(aliases) {

  const aliasString = Object.keys(aliases).map((alias) => {
    const path = aliases[alias];
    return `"@${alias}": "./src/${path}"`
  }).concat([`"@src": "./src"`]).join(',\n                            ');

  const output =
  `{
    // This file is automatically created - to update use the templates in './buildConfigs'
    "env": {
        "development": {
            "presets": [
                [
                    "next/babel",
                    {
                        "@babel/preset-env": {
                            "targets": {
                                "browsers": "defaults"
                            },
                            "useBuiltIns": "usage",
                            "corejs": "3"
                        }
                    }
                ]
            ],
            "plugins": [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
                [
                    "module-resolver",
                    {
                        "root": [
                            "./"
                        ],
                        "alias": {
                            ${aliasString}
                        }
                    }
                ]
            ]
        },
        "production": {
            "presets": [
                [
                    "next/babel",
                    {
                        "@babel/preset-env": {
                            "targets": {
                                "browsers": "defaults"
                            },
                            "useBuiltIns": "usage",
                            "corejs": "3"
                        }
                    }
                ]
            ],
            "plugins": [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
                [
                    "module-resolver",
                    {
                        "root": [
                            "./"
                        ],
                        "alias": {
                          ${aliasString}
                       }
                    }
                ]
            ]
        },
        "test": {
            "presets": [
                [
                    "@babel/env",
                    {
                        "modules": "commonjs",
                        "useBuiltIns": "usage",
                        "debug": false,
                        "corejs": "3"
                    }
                ],
                "@babel/react"
            ],
            "plugins": [
                [
                    "module-resolver",
                    {
                        "root": [
                            "./"
                        ],
                        "alias": {
                          ${aliasString}
                      }
                    }
                ],
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose": true }],
                "@babel/plugin-proposal-object-rest-spread"
            ]
        }
    }
}
`

  fs.writeFile('.babelrc', output, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('BabelRc saved!');
  });
}



