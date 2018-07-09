define([
	'../define'
], function (Framework) {
	'use strict'

	/**
	 * 判断是否为一个空的obj
	 * @param {mixed} obj - 需要验证的对象
	 * @since 1.0.0
	 */
	Framework.isEmptyObject = function isEmptyObject (obj) {
		var property
		for (property in obj) {
			return false
		}
		return true
	}
})
