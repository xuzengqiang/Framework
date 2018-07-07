/**
 * @copyright www.wicoder.net
 * @fileOverview: wrapper.js
 * @author: xuzengqiang
 * @date: 2018-07-07 19:04:15
 */

; (function (global, factory) {
	factory(global)
})(window, function (window) {
  var document = window.document

  var location = window.location

  var objProto = Object.prototype

  var arrayProto = Array.prototype

  var toString = objProto.toString

  var hasOwnProperty = objProto.hasOwnProperty

  var slice = arrayProto.slice

  var rint = /^[1-9]\d*$/

  var noop = function () { }



	var Framework = {}

	/**
	 * 版本号
	 */
	var VERSION = '1.0.0'

	Framework.VERSION = VERSION



	/**
	 * 判断是否为一个方法
	 * @author: xuzengqiang
	 * @date: 2018-07-03 14:48:44
	 */
	Framework.isFunction = function isFunction (obj) {
		return typeof obj === 'function' && typeof obj.nodeType !== 'number'
	}



	Framework.isType = function isType (type) {
		return function (obj) {
			return toString.call(obj) === '[object ' + type + ']'
		}
	}



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



	/**
	 * 判断是否属于字符串
	 * @date 2018-07-07 19:01:59
	 * @since 1.0.0
	 */
	var isString = Framework.isType('String')

	Framework.isString = function (string) {
		return isString(string)
	}



	/**
	 * 判断对象是否为undefined
	 * @param {mixed} obj - 需要验证的对象
	 * @date 2018-07-07 19:03:41
	 * @since 1.0.0
	 */
	Framework.isUndefined = function isUndefined (obj) {
		return obj === void 0
	}





	window.Framework = Framework

})
