define([
	'../define',
	'../utils/isType'
], function (Framework) {
	'use strict'

	/**
	 * 判断对象是否为时间
	 * @param {mixed} date - 需要验证的对象
	 * @date 2018-07-09 20:44:48
	 * @since 1.0.0
	 */
	var __isDate = Framework.isType('Date')
	Framework.isDate = function isDate (date) {
		return __isDate(date) && date.toString() !== 'Invalid Date' && !isNaN(date)
	}
})
