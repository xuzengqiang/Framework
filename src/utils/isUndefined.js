define([
	'../define'
], function (Framework) {
	'use strict'

	/**
	 * 判断对象是否为undefined
	 * @param {mixed} obj - 需要验证的对象
	 * @date 2018-07-07 19:03:41
	 * @since 1.0.0
	 */
	Framework.isUndefined = function isUndefined (obj) {
		return obj === void 0
	}
})
