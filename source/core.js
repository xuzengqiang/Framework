define([
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
