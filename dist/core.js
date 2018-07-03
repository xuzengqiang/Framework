/*
 * @fileOverview: 判断是否为一个方法
 * @author: xuzengqiang
 * @date: 2018-07-03 14:48:44
 */
define('lang/isFunction',[],function () {
	return function isFunction (obj) {
		return typeof obj === 'function' && typeof obj.nodeType !== 'number'
	}
})

/*
 * @fileOverview: 获取数组中指定值的索引
 * @author: xuzengqiang
 * @date: 2018-07-03 16:54:37
 */
define('array/indexOf',[], function () {
	return function () {
		return 1
	}
})

define('core',[
	'./lang/isFunction',
	'./array/indexOf'
],
	function (
		isFunction,
		indexOf
	) {
		var Class = {}
		Class.isFunction = isFunction
		Class.indexOf = indexOf
		return Class
	})

