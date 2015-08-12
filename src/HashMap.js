import MapBase from './MapBase'
import eq from './eq'
import {isObject} from './util'
const hashCode = Symbol.for('hashCode')

export default class HashMap extends MapBase {
	_init() {
		this._store = new Map
	}
	clear() {
		this._store.clear()
		super.clear()
	}
	has(key) {
		if (super.has(key)) return true
		if (!(typeof key[hashCode] === 'function')) return false
		const code = key[hashCode]()
		const list = this._store.get(code)
		if (!list) return false
		return list.some(x => eq(x, key))
	}
	get(key) {
		const result = super.get(key)
		if (result !== undefined) return result
		if (super.has(key)) return undefined
		if (!(typeof key[hashCode] === 'function')) return undefined
		const code = key[hashCode]()
		const list = this._store.get(code)
		if (!list) return undefined
		key = list.find(x => eq(x, key))
		if (key === undefined) return undefined
		return super.get(key)
	}
	set(key, value) {
		if (!(isObject(key) && typeof key[hashCode] === 'function')) return super.set(key, value)
		const code = key[hashCode]()
		let list = this._store.get(code)
		if (!list) this._store.set(code, list = [key])
		else {
			const k = list.find(x => eq(x, key))
			if (!k) list.push(key)
			else key = k
		}
		return super.set(key, value)
	}
	delete(key) {
		if (!(isObject(key) && typeof key[hashCode] === 'function')) return super.delete(key)
		const code = key[hashCode]()
		const list = this._store.get(code)
		if (!list) return false
		const i = list.findIndex(x => eq(x, key))
		if (!(i >= 0)) return false
		const [k] = list.splice(i, 1)
		return super.delete(k)
	}
}
