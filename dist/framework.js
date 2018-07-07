/**
 * @copyright www.wicoder.net
 * @fileOverview: wrapper.js
 * @author: xuzengqiang
 * @date: 2018-07-07 17:47:51
 */

; (function (global, factory) {
	factory(global)
})(window, function (window) {


	var Framework = {}

	/**
	 * 版本号
	 */
	var VERSION = '1.0.0'

	Framework.VERSION = VERSION



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
	 */
	Framework.isPlainObject = function () {
		console.error('debuggerr')
	}





	window.Framework = Framework

})
