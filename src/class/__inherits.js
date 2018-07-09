define([
	'../define',
	'../core'
], function (Framework) {
	'use strict'

	/**
	 * 创建一个对象
	 * @private
	 * @param {Object} klass - 对象
	 * @description 同Object.create
	 */
	function createObject (klass) {
		if (Object.create) {
			return Object.create(klass.prototype)
		}
		var Surrogate = function () { }
		Surrogate.prototype = klass.prototype
		return new Surrogate()
	}

	/**
	 * 继承
	 * @private
	 * @author xuzengqiang
	 * @date 2018-5-3 00:42:26
	 * @param {Object} Super 父类
	 * @param {Object} Child 子类
	 * @param {Object|Function} protos - 子类或者对象。如果对象中包含constructor，子类将是用此属性值。
	 * @param {Object} staticProtos - 静态属性或方法
	 * @since 1.0.0
	 */
	function __inherits (Super, Child, protos, staticProtos) {
		var copyPrototype = createObject(Super)

		// 拷贝静态方法
		Framework.extend(true, Child, Super, staticProtos || {})

		// 让子类的__super__属性指向父类
		Child.__super__ = Super
		Child.__owner__ = copyPrototype
		Child.prototype = copyPrototype
		Framework.extend(true, Child.prototype, protos || {})
		return Child
	}
})
