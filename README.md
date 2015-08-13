[![NPM Version](https://img.shields.io/npm/v/maps.svg)][npm-url]
[![Build Status](https://travis-ci.org/hax/maps.svg?branch=master)](https://travis-ci.org/hax/maps)
[![Coverage Status](https://coveralls.io/repos/hax/maps/badge.svg?branch=master&service=github)](https://coveralls.io/github/hax/maps?branch=master)
[![Downloads](http://img.shields.io/npm/dm/maps.svg)][npm-url]

[npm-url]: https://npmjs.org/package/maps

# maps

Some special Map implementations for ES6+

## Install

```sh
npm install maps
```

## Usage

```js
import {HashMap} from 'maps'

class Entity {
	constructor(id) {
		this.id = id
	}
	[Symbol.for('hashCode')]() {
		return this.id
	}
	[Symbol.for('equals')](x) {
		return x instanceof Entity && x.id === this.id
	}
}

const m = new HashMap
const e1 = new Entity(42)
const e2 = new Entity(42)
const test = {}
assert(e1 !== e2)
m.set(e1, test)
assert(m.get(e2) === test)
```

## API

Same as standard [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).
