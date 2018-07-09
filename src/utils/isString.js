define([
	'../define',
	'../utils/isType'
], function (Framework) {
	'use strict'

	/**
	 * 判断是否属于字符串
	 * @date 2018-07-07 19:01:59
	 * @since 1.0.0
	 */
	var __isString = Framework.isType('String')
	Framework.isString = function isString (string) {
		return __isString(string)
	}
})
