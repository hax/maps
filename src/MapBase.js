import {readonly} from './util'

// Babel currently not support extends built-in Map, so use delegation instead
export default class MapBase {

	static get [Symbol.species]() {
		return this
	}

	constructor(iterable = undefined) {
		this._super = new Map
		this._init()
		if (iterable != null) for (const v of iterable) this.set(v[0], v[1])
	}
	_init() {}

	// Currently no way to declare data properties on class prototype
	// And class properties not support computed property names, see https://gist.github.com/jeffmo/054df782c05639da2adb
	// And problematic use decorator with computed property names, see https://github.com/wycats/javascript-decorators/issues/10

	// @readonly proto [Symbol.toStringTag] = 'Map'

	get size() {
		return this._super.size
	}
	forEach(callbackfn, thisArg = undefined) {
		this._super.forEach(callbackfn, thisArg)
	}
	[Symbol.iterator]() {
		return this._super[Symbol.iterator]()
	}

	entries() {
		return this._super.entries()
	}
	keys() {
		return this._super.keys()
	}
	values() {
		return this._super.values()
	}

	has(key) {
		return this._super.has(key)
	}
	get(key) {
		return this._super.get(key)
	}
	set(key, value) {
		this._super.set(key, value)
		return this
	}
	delete(key) {
		return this._super.delete(key)
	}
	clear() {
		this._super.clear()
	}

}
