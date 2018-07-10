define([
	'../define',
	'./__inherits',
	'../utils/isFunction'
], function (Framework, __inherits) {
	'use strict'

	/**
	 * 类的继承
	 * @public
	 * @author xuzengqiang
	 * @date 2016-11-18 10:26:18
	 * @param {Class} Super 父类
	 * @param {Object|Function} protos 子类或者对象。如果对象中包含constructor，子类将是用此属性值。
	 * @param {Object} staticProtos 静态属性或方法
	 * @since 1.0.0
	 * @return {Object} 继承的对象
	 */
	Framework.inherits = function inherits (Super, protos, staticProtos) {
		var child

		if (Framework.isFunction(protos)) {
			child = protos
			protos = null
		} else if (protos && protos.hasOwnProperty('constructor')) {
			child = protos.constructor
		} else {
			child = function () {
				return Super.apply(this, arguments)
			}
		}

		return __inherits(Super, child, protos, staticProtos)
	}
})
