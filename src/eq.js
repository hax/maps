import {isObject, own} from './util'
const equals = Symbol.for('equals')

const eq = (a, b) => {
	if (Object.is(a, b)) return true
	const at = typeof a, bt = typeof b
	if (at !== bt) return false
	if (at !== 'object') return false
	if (a === null || b === null) return false
	if (typeof a[equals] === 'function') return a[equals](b)
	return false
}
export default eq

Object.prototype[equals] = function (x) {
	if (!isObject(x)) return false
	const p = Object.getPrototypeOf(this), xp = Object.getPrototypeOf(x)
	if (p !== xp) return false
	const keys = Object.getOwnPropertySymbols(this).concat(Object.getOwnPropertyNames(this))
	for (let i = 0; i < keys.length; ++i) {
		const k = keys[i]
		if (/^Symbol\(id\)_/.test(k)) continue // bypass core-js Map hack
		if (!eq(this[k], x[k])) return false
	}
	return true
}

Array.prototype[equals] = function (x) {
	if (!Array.isArray(x)) return false
	if (this.length !== x.length) return false
	for (let i = 0; i < this.length; ++i) {
		if (!(eq(this[i], x[i]))) return false
	}
	return true
}

Map.prototype[equals] = function (x) {
	if (!(x instanceof Map)) return false
	if (this.size !== x.size) return false
	for (const [key, value] of this) {
		if (!eq(x.get(key), value)) return false
		if (value === undefined && !x.has(key)) return false
	}
	return true
}

Set.prototype[equals] = function (x) {
	if (!(x instanceof Set)) return false
	if (this.size !== x.size) return false
	for (const value of this) {
		if (!x.has(value)) return false
	}
	return true
}
