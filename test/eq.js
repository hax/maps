import assert from 'assert'
import eq from '../src/eq'

suite('eq', () => {
	test('simple values', () => {
		assert(eq(null, null))
		assert(eq('hello', 'hello'))
		assert(!eq(null, undefined))
		assert(!eq(true, 1))
		assert(!eq(false, 0))
	})
	test('+0 not eq -0', () => {
		assert(!eq(+0, -0))
	})
	test('NaN eq NaN', () => {
		assert(eq(NaN, NaN))
	})
	test('arrays', () => {
		assert(eq([1, 2, 3], [1, 2, 3]))
		assert(!eq([1, 2, 3], [3, 2, 1]))
		assert(eq([1, 2, [3, [4]]], [1, 2, [3, [4]]]))
		assert(!eq([1, 2, [3, [4]]], [1, 2, [3, [4, []]]]))
	})
	test('objects', () => {
		assert(eq({x: 1, y: 2}, {y: 2, x: 1}))
		assert(!eq({x: 1, y: 2}, {x: 1, y: 3}))
		assert(eq({x: 1, y: 2}, {x: 1, get y() { return 2 }}))
	})
	test('objects with prototype', () => {
		assert(!eq(Object.create({}), Object.create({})))
		const proto = {x: 1, y: 2}
		assert(eq(Object.create(proto), Object.create(proto)))
		assert(!eq(Object.create(proto), Object.create({})))
	})
	test('object with equals method', () => {
		assert(eq({[Symbol.for('equals')]: function () { return true }}, {}))
		class Test {
			constructor(id) {
				this.id = id
			}
			equals(x) {
				return this.id === x.id
			}
		}
		assert(eq(new Test(1), new Test(1)))
		assert(!eq(new Test(1), new Test(2)))
	})
	test('Set', () => {
		const set1 = new Set([1, 2, 3])
		const set2 = new Set([3, 2, 1])
		const set3 = new Set([1, 2])
		assert(eq(set1, set2))
		assert(!eq(set1, set3))
	})
	test('Map', () => {
		const map1 = new Map()
		map1.set('x', [0, 1, 2])
		map1.set('y', NaN)
		map1.set('z', undefined)
		const map2 = new Map()
		map2.set('z', undefined)
		map2.set('y', NaN)
		map2.set('x', [0, 1, 2])
		const map3 = new Map()
		map3.set('x', [0, 1, 2])
		map3.set('y', NaN)
		map3.set('z1', undefined)
		const map4 = new Map()
		map4.set('x', [-0, 1, 2])
		map4.set('y', NaN)
		map4.set('z', undefined)
		assert(eq(map1, map2))
		assert(!eq(map1, map3))
		assert(!eq(map1, map4))
	})
})
