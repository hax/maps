export const isObject = v => Object(v) === v
export const own = Object.prototype.hasOwnProperty

export const readonly = (target, name, descriptor) => {
	descriptor.writable = false
}

export const getSpeciesConstructor = (O, defaultConstructor) => {
	// assert(isObject(O))
	const C = O.constructor
	if (C === undefined) return defaultConstructor
	if (!isObject(C)) throw new TypeError
	const S = C[Symbol.species]
	if (S == null) return defaultConstructor
	// if (!isConstructor(S)) throw new TypeError
	return S
}
