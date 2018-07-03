

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

return Framework

