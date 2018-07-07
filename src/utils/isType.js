define([
	'../define'
], function (Framework) {
	'use strict'

	Framework.isType = function isType (type) {
		return function (obj) {
			return toString.call(obj) === '[object ' + type + ']'
		}
	}
})
