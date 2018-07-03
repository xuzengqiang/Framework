define(['../core', '../utils/isType'], function(Framework, isType) {
	'use strict'

	Framework.isString = function(string) {
		return isType('String')(string)
	}
})
