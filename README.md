# peer-deps

## Problem

There is [a well-known Meteor issue](https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies) for handling peer dependencies for our apps and packages. Defining all dependencies across our packages and application results in a unnecessary time for loading the dependencies several times, affecting significatively to the app performance. The common solution relies on moving all NPM dependencies to the app level and use `check-npm-dependencies` for tracking the version needs. But this solution led us to move and execute all our packages tests in a separate application, which can raise complexity to your project infrastructure and affect negatively to your feature delivering process. Besides, `check-npm-dependencies` has proved to include extra issues for making its work.

## Solution
I propose to create a separate Meteor package that contains all the shared dependencies for your apps and packages as happens in this repository. Then you expose all of them lazily by using `api.addFiles(PATH_TO_FILE_EXPORTING, ..., { isAsset: true })` (`PATH_TO_FILE_EXPORTING` can be in our package context or `node_modules` one). Using this way the apps and packages that need to use such dependencies will import the package (`peer-deps` at `.meteor/package` for apps/`api.use('peer-deps')` at `package.js` for packages) and then reference the needed modules by demand in the next manner:

``` javascript
import _ from 'meteor/peer-modules/lodash';
import React from 'meteor/peer-modules/react';
import cheerio from 'meteor/peer-modules/cheerio';
// [...]
```

By this, we achieve:

- Load lazily the shared dependencies (avoid extra loading)
- Keep our tests defined along with the implementation (no separate app for tests)
- Handle peer NPM deps versions in a single spot
