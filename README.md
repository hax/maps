[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][npm-url]


# maps

-- Some specical Map implementations for ES6+

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





[npm-image]: https://img.shields.io/npm/v/maps.svg?style=flat-square
[npm-url]: https://npmjs.org/package/maps
[travis-image]: https://img.shields.io/travis/hax/maps.svg?style=flat-square
[travis-url]: https://travis-ci.org/hax/maps
[coveralls-image]: https://img.shields.io/coveralls/hax/maps.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/hax/maps
[downloads-image]: http://img.shields.io/npm/dm/maps.svg?style=flat-square
