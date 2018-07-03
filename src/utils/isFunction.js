define(function () {
	'use strict'

	/**
	 * 判断是否为一个方法
	 * @author: xuzengqiang
	 * @date: 2018-07-03 14:48:44
	 */
	var isFunction = function isFunction (obj) {
		return typeof obj === 'function' && typeof obj.nodeType !== 'number'
	}
})
