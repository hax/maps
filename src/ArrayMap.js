import MapBase from './MapBase'
import {getSpeciesConstructor} from './util'

export default class ArrayMap extends MapBase {
	_init() {
		this._tri = []
	}
	clear() {
		this._tri = []
		super.clear()
	}
	has(key) {
		if (super.has(key)) return true
		if (!Array.isArray(key)) return false
		let node = this._tri[key.length]
		if (!node) return false
		for (let i = 0; i < key.length; ++i) {
			node = node.get(key[i])
			if (!node) return false
		}
		return super.has(node)
	}
	get(key) {
		const result = super.get(key)
		if (result !== undefined) return result
		if (super.has(key)) return undefined
		if (!Array.isArray(key)) return undefined
		let node = this._tri[key.length]
		if (!node) return undefined
		for (let i = 0; i < key.length; ++i) {
			node = node.get(key[i])
			if (!node) return undefined
		}
		return super.get(node)
	}
	set(key, value) {
		if (!Array.isArray(key)) return super.set(key, value)
		const SC = getSpeciesConstructor(this, ArrayMap)
		let node = this._tri[key.length], i = 0
		const add = () => {
			const n = key.length - 1
			while (i < n) {
				const newNode = new SC
				node.set(key[i], newNode)
				node = newNode
				++i
			}
			node.set(key[n], key)
			node = key
		}
		if (!node) {
			this._tri[key.length] = node = new SC
			add()
		} else {
			while (i < key.length) {
				const n = node.get(key[i])
				if (!n) {
					add()
					break
				}
				node = n
				++i
			}
		}
		return super.set(node, value)
	}
	delete(key) {
		if (!Array.isArray(key)) return super.delete(key)
		const refs = []
		let node = this._tri[key.length]
		if (!node) return false
		for (let i = 0; i < key.length; ++i) {
			const k = key[i]
			refs.push([node, k])
			node = node.get(k)
			if (!node) return false
		}
		const result = super.delete(node)
		while (refs.length > 0) {
			const [node, key] = refs.pop()
			node.delete(key)
			if (node.size > 0) break
		}
		return result
	}
}
