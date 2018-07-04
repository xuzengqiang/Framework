/**
 * @copyright www.wicoder.net
 * @fileOverview: wrapper.js
 * @author: xuzengqiang
 * @date: 2018-07-04 17:12:46
 */

; (function (global, factory) {
	factory(global)
})(window, function (window) {


	/**
	 * 判断是否为一个方法
	 * @author: xuzengqiang
	 * @date: 2018-07-03 14:48:44
	 */
	var isFunction = function isFunction (obj) {
		return typeof obj === 'function' && typeof obj.nodeType !== 'number'
	}



	var isType = function isType (type) {
		return function (obj) {
			return toString.call(obj) === '[object ' + type + ']'
		}
	}



	var Framework = {}

	/**
	 * 版本号
	 */
	var VERSION = '1.0.0'

	Framework.VERSION = VERSION



	Framework.isString = function (string) {
		return isType('String')(string)
	}



	return Framework

})
