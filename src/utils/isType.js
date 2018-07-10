define([
	'../define'
], function (Framework) {
	'use strict'

	/**
	 * 根据type生成类型判断方法
	 * @param {String} type 类型名称
	 * @example
	 * var isString = Framework.isType('String')
	 * isString('abc') => true
	 * @return {Boolean} true/false
	 */
	Framework.isType = function isType (type) {
		return function (obj) {
			return toString.call(obj) === '[object ' + type + ']'
		}
	}
})
