define([
	'../define',
	'../var/rint'
], function (Framework, rint) {
	'use strict'

	/**
	 * 判断是否为正整数
	 * @param {mixed} number - 需要验证的数据
	 * @since 1.0.0
	 */
	Framework.isInt = function isInt (number) {
		return rint.test(number)
	}
})
