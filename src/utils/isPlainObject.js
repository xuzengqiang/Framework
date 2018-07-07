define([
	'../var/toString',
	'../var/hasOwnProperty',
	'../define',
], function (toString, hasOwnProperty, Framework) {
	'use strict'

	/**
   * 判断是否为一个纯粹的对象
   * @param {mixed} obj - 需要验证的对象
   * @since 1.0.0
   * @see jQuery.isPlainObject
   */
	Framework.isPlainObject = function isPlainObject (obj) {
		var proto, Ctor

		if (!obj || toString.call(obj) !== '[object Object]') {
			return false
		}

		proto = Object.getPrototypeOf(obj)
		if (!proto) {
			return true
		}

		Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor
		return typeof Ctor === 'function' && hasOwnProperty.toString.call(Ctor) === hasOwnProperty.toString.call(Object)
	}
})
