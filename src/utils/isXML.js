define([
	'../define',
	'../utils/isType'
], function (Framework) {
	'use strict'

	/**
	 * 判断是否为XML文档
	 * @param {mixed} element 需要验证的元素
	 * @date 2018-07-09 20:49:08
	 * @since 1.0.0
	 * @return {Boolean} true/false
	 */
	Framework.isXML = function isXML (element) {
		var documentElement = element && (element.ownerElement || element).documentElement
		return documentElement ? documentElement.nodeName !== 'HTML' : false
	}
})
