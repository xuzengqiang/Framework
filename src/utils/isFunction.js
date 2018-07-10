define([
	'../define'
], function (Framework) {
	'use strict'

	/**
	 * 判断是否为一个方法
	 * @date 2018-07-03 14:48:44
	 * @param {mixed} obj 需要校验的对象
	 * @return {Boolean} true/false
	 */
	Framework.isFunction = function isFunction (obj) {
		return typeof obj === 'function' && typeof obj.nodeType !== 'number'
	}
})
