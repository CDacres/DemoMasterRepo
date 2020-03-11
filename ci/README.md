# [Zipcube](https://www.zipcube.com/) &middot; ![CircleCI Master Status](https://circleci.com/gh/guillaume008/zipcube/tree/master.svg?style=shield&circle-token=4d11598158776eab830a354913efc19f2880de53) [![Codacy Status](https://api.codacy.com/project/badge/Grade/45235688840c402cb66a9de4ed8f856c)](https://coveralls.io/github/facebook/react?branch=master)

## Developent Guide

### Git

#### Project Branching

Projects should be branched from development with the following naming convection:

*project-** e.g. *project-seo*

#### Bug Branching

Bugs should be branched off development and have the following naming convention:

*bug-** e.g. *bug-venues not showing correctly*

#### Hotfix Branching

A hotfix can be done off development (or master in extreme circumstances) with the following format:

*hotfix-** e.g. *hotfix-venue comission updated*

### PHP

TBD

### Frontend Development - 30/12/2016

The local environment for future frontend development uses webpack as a module bundler, transpiler, uglifier/minifier and preprocessor for Stylus (CSS extension library).

#### Requirements for Mac OS X

* [Node.js](https://nodejs.org/) v6.5 or newer (use nvm to install and set v6.5 or newer)
* `npm` v3.10 or newer (new to [npm](https://docs.npmjs.com/)?)
* Yarn for better package management ([learn more](https://yarnpkg.com/))

#### Set up project

* `yarn install` to install project dependencies

#### Development

* `yarn dev` to launch webpack in watch mode to bundle automatically when watched files are saved

#### Production Build

* `yarn prod` to bundle, minify and chunkhash the filenames for production
