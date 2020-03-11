# Zipcube Express

## Stack

* Next.js with Express custom server
* TypeScript
* React
* Redux
* Redux Observables

## Introduction

This repository is a Next.js project that uses a custom Express server to handle server-side
routing as well as API authentication claims.

The frontend is predominantly built in TypeScript, although there are probably still
remnants of the old codebase written in standard ES6.

## Routing

The `index.js` file found in the `src/routes` folder contains the universal routes which
are applied to both the Express server and passed on to Next.js.

These routes are transpiled automatically during development, the output of which can be
found in the `dist/routes` folder. This transpilation is necessary so that we can use ES6
module imports for the clientside code, while still being able to use the same routes with
the Express server.

In the unlikely event the automatic transpilation doesn't happen, run `yarn babel` in the
project root to have babel transpile the files manually.

## TypeScript

Typing files can be found in `src/typings`.

Use Types for everything concrete - interfaces describe a contract and make sense in very
rare and particular situations.

## Redux + Redux Observables

### Modules

A module (found in `src/store/modules`) contains:

* Action constants
* Reducer
* Action Creators

### Epics

Epics are redux-observable asynchronous action handlers that manage any asynchronous
action logic for the application. These are kept at the bottom of each module and are
combined and exported as a single module epic.

### Connectors + Selectors

A connector (found in `src/store/connectors`) is a composable functional utility for
connecting a React component to a particular part of the store. It is essentially an
abstraction of the `connect` method from the `react-redux` package that allows for reuse
of `connect` code.

These connectors use memorized selectors to fetch data from the store. These selectors
can be found in `src/store/selectors`.

### Extensions

The store is extended with the following:

* Dynamic Reducers

The dynamic reducers extension allows the attachment of a reducer at the page level so
that the state object is generally clean of unnecessary members until particular pages
are accessed.

## Import Aliases

Imports should use aliases, i.e. `import Component from '@src/components';`

This allows for the free movement of files around the directory structure without causing
module resolution errors in files that use them.

Aliases can be added by adding the necessary entries to the following files (examples provided):

`tsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@bobbins/*": ["bobbins/*"],
    },
  },
}
```

`.babelrc`

```json
  "env": {
    "development": {
      "plugins": [
        [
          "module-resolver",
          {
            "alias": {
              "@bobbins": "./bobbins",
            }
          }
        ]
      ],
    },
    "production": {
      "plugins": [
        [
          "module-resolver",
          {
            "alias": {
              "@bobbins": "./bobbins",
            }
          }
        ]
      ],
    },
    "test": {
      "plugins": [
        [
          "module-resolver",
          {
            "alias": {
              "@bobbins": "./bobbins",
            }
          }
        ]
      ],
    }
  }
```

`webpack.config.js`

```js
  module.exports = {
    resolve: {
      alias: {
        '@bobbins': path.resolve(__dirname, 'bobbins'),
      },
    }
  };
```
