define([
	'../define',
	'./isType'
], function (Framework) {
	'use strict'

	/**
	 * 判断是否为一个数组
	 * @param {mixed} array - 需要验证的对象
	 * @since 1.0.0
	 */
	var __isArray = Framework.isType('Array')
	Framework.isArray = Array.isArray || function isArray (array) {
		return __isArray(array)
	}
})
