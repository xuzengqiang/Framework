define([
	'../define'
], function (Framework) {
	'use strict'

	/**
	 * 判断是否为对象
	 * @param {mixed} obj - 需要验证的对象
	 * @date 2018-07-09 20:52:09
	 * @since 1.0.0
	 */
	Framework.isObject = function isObject (obj) {
		var type = typeof obj
		return type === 'function' || type === 'object' && !!obj
	}
})
