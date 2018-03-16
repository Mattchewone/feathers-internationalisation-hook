# feathers-hooks-i18n

[![Build Status](https://travis-ci.org/mattchewone/feathers-hooks-i18n.png?branch=master)](https://travis-ci.org/mattchewone/feathers-hooks-i18n)
[![Code Climate](https://codeclimate.com/github/mattchewone/feathers-hooks-i18n/badges/gpa.svg)](https://codeclimate.com/github/mattchewone/feathers-hooks-i18n)
[![Test Coverage](https://codeclimate.com/github/mattchewone/feathers-hooks-i18n/badges/coverage.svg)](https://codeclimate.com/github/mattchewone/feathers-hooks-i18n/coverage)
[![Dependency Status](https://img.shields.io/david/mattchewone/feathers-hooks-i18n.svg?style=flat-square)](https://david-dm.org/mattchewone/feathers-hooks-i18n)
[![Download Status](https://img.shields.io/npm/dm/feathers-hooks-i18n.svg?style=flat-square)](https://www.npmjs.com/package/feathers-hooks-i18n)

> Parse i18n nested data for query and results

## Installation

```
npm install feathers-hooks-i18n --save
```

## Documentation

TBD

## Complete Example

Here's an example of a Feathers server that uses `feathers-hooks-i18n`. 

```js
const feathers = require('@feathersjs/feathers');
const plugin = require('feathers-hooks-i18n');

// Initialize the application
const app = feathers();

// Initialize the plugin
app.configure(plugin());
```

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
