import assert from 'assert'
import HashMap from '../src/HashMap'
const hashCode = Symbol.for('hashCode')

suite('HashMap', () => {
	class Test {
		constructor(id) {
			this.id = id
		}
		[hashCode]() {
			return this.id
		}
	}
	let map1
	setup(() => {
		map1 = new HashMap
		map1.set(undefined, 'undefined')
		map1.set(NaN, 'NaN')
		map1.set([1], '[1]')
		map1.set(new Test(1), 'obj')
	})
	test('simple', () => {
		assert(map1.size === 4)
		assert(map1.has(undefined))
		assert(map1.has(NaN))
		assert(!map1.has([1]))
	})
	test('has/get', () => {
		assert(map1.has(new Test(1)))
		assert(map1.get(new Test(1)), 'obj')
	})
	test('set', () => {
		map1.set(new Test(1), 'obj1')
		assert(map1.size === 4)
		assert(map1.get(new Test(1)), 'obj1')
	})
	test('delete', () => {
		map1.delete(new Test(1))
		assert(!map1.has(new Test(1)))
		assert(map1.size === 3)
	})
})
