define([
	'../define',
	'../utils/isType'
], function (Framework) {
	'use strict'

	Framework.isString = function (string) {
		return Framework.isType('String')(string)
	}
})
