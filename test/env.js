import assert from 'assert'

suite('env', () => {
	test('symbol', () => {
		assert(Symbol.iterator)
		assert(Symbol.for('equals') === Symbol.for('equals'))
		assert(Symbol.for('hashCode') === Symbol.for('hashCode'))
	})
	test('map', () => {
		const o = {x: 1}
		const m = new Map
		m.set(o, 1)
		assert(m.get(o) === 1)
	})
})
