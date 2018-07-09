define([
	'../define',
	'../var/toString'
], function (Framework, toString) {
	'use strict'

	/**
	 * 判断是否为数字
	 * @param {mixed} number - 需要验证的数据
	 * @since 1.0.0
	 */
	Framework.isNumber = function isNumber (number) {
		return (
			(toString.call(number) === '[object Number]' || toString.call(number) === '[object String]') && !isNaN(number - parseFloat(number))
		)
	}
})
