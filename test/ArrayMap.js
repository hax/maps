import assert from 'assert'
import ArrayMap from '../src/ArrayMap'

suite('ArrayMap', () => {
	let map1
	setup(() => {
		map1 = new ArrayMap
		map1.set(undefined, 'undefined')
		map1.set(NaN, 'NaN')
		map1.set([1], '[1]')
		map1.set([0, 1, 2], '[0, 1, 2]')
	})
	test('simple', () => {
		assert(map1.size === 4)
		assert(map1.has(undefined))
		assert(map1.has(NaN))
	})
	test('has/get', () => {
		assert(map1.has([1]))
		assert(map1.has([0, 1, 2]))
		assert(map1.get([0, 1, 2]) === '[0, 1, 2]')
	})
	test('set', () => {
		map1.set([0, 1, 2], 'ok')
		assert(map1.size === 4)
		assert(map1.get([0, 1, 2]) === 'ok')
	})
	test('delete', () => {
		map1.delete([0, 1, 2])
		assert(!map1.has([0, 1, 2]))
		assert(map1.size === 3)
	})
	test('nest arrays', () => {
		map1.set([0, [1, [2]]], 'a')
		assert(map1.size === 5)
		assert(map1.get([0, [1, [2]]]) === 'a')
		map1.set([0, [1, [2]]], 'b')
		assert(map1.size === 5)
		assert(map1.get([0, [1, [2]]]) === 'b')
	})
	test('tri arrays', () => {
		map1
			.set([0, 1, 3], 'a')
			.set([0, 1, 4], 'b')
			.set([0, 2, 1], 'c')
			.set([0, 2, 2], 'd')
		assert(map1.size === 8)
		// assert(map1.get([0, 1, 2]) === '[0, 1, 2]')
		// assert(map1.get([0, 1, 3]) === 'a')
		// assert(map1.get([0, 1, 4]) === 'b')
		// assert(map1.get([0, 2, 1]) === 'c')
		// assert(map1.get([0, 2, 2]) === 'd')
	})
})
