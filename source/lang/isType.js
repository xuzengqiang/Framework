define('../class', function (Class) {
	'use strict'

	Class.isType = function (type) {
		return function (obj) {
			return toString.call(obj) === '[object ' + type + ']'
		}
	}
})
