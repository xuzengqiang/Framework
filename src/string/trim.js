define([
	'../define',
	'../utils/isUndefined'
], function (Framework) {
	'use strict'

	/**
	 * 过滤掉字符串的前后空格
	 * @param {mixed} string - 字符串
	 */
	Framework.trim = function trim (string) {
		return Framework.isUndefined(string) || string === null ?
			'' : (string + '').trim()
	}
})
