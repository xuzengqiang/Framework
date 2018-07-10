define([
	'../define',
	'./__inherits',
	'../var/noop',
	'../utils/isFunction',
	'../utils/isString',
	'../utils/isPlainObject',
	'../utils/isArray',
	'../utils/isObject',
	'../core',
	'./inherits'
], function (Framework, __inherits) {
	'use strict'

	/**
	 * 类的创建,并自动执行initialize()方法
	 * @date 2016-11-18 10:26:12
	 * @param {Object} [Super] 需要继承的父类
	 * @param {Object} [protos] 原型方法
	 * @param {Object} [staticProtos] 静态方法.
	 * @return {Object} 创建的对象
	 * @since 1.0.0
	 */
	Framework.create = function (Super, protos, staticProtos) {
		var Class = function BaseClass (args) {
			if (this instanceof BaseClass) {
				this.initialize = Framework.isFunction(this.initialize) ? this.initialize : noop
				return this.initialize.apply(this, args && args.hasOwnProperty('callee') ? args : arguments)
			}
			return new BaseClass(arguments)
		}

		/**
		 * 新增静态方法拷贝
		 * @param {Object} [staticProtos] 静态属性
		 * @date 2017-6-29 17:40:01
		 * @return {void}
		 * @since 1.1.0
		 */
		Class.extend = function (staticProtos) {
			Framework.extend(true, Class, staticProtos || {})
		}

		/**
		 * 属性拷贝
		 * @description
		 * 1、如果super存在,则按继承处理,否则直接拷贝静态方法和原型
		 * 2、因为继承的时候重新了原型链,此时需要重新赋值.
		 * 3、只有方法才允许被继承
		 */
		if (Framework.isFunction(Super)) {
			Class = __inherits(Super, Class, null, staticProtos || {})
		} else {
			staticProtos = protos
			protos = Super
			Super = null
			Class.extend(staticProtos)
		}

		/**
		 * 新增原型方法拷贝
		 * @param {Object|String} protos 原型方法列表或者名称
		 * @param {Function} method 单个方法
		 * @date 2017-6-29 14:13:14
		 * @since 1.1.0
		 * @example
		 * var Animal = Framework.create();
		 * Animal.prototype.extend({
		 *     initialize:function(){}
		 * });
		 * or
		 * Animal.prototype.extend('initialize', function(){});
		 * @return {void}
		 */
		Class.prototype.extend = function (protos, method) {
			protos = protos || {}

			if (Framework.isString(protos)) {
				var property = protos.trim()
				if (!property) { return }

				/**
				 * 如果是对象或者数组,需要进行深拷贝
				 * @since 1.0.0
				 */
				if (method && (Framework.isPlainObject(method) || Framework.isArray(method))) {
					Class.prototype[property] = Framework.extend(true, {}, method)
					return
				}

				if (Framework.isFunction(method)) {
					Class.prototype[property] = function () {
						var self = this
						var _super = noop

						// 如果存在有效的父类
						if (this.__super__ && Framework.isFunction(this.__super__) && Framework.isObject(this.__super__.prototype)) {
							var superClass = this.__super__.prototype
							// 如果父类上存在该方法
							if (Framework.isFunction(superClass[property])) {
								_super = function () {
									return superClass[property].apply(self, arguments)
								}
							}

							/**
							 * 同时将所有父类原型链上的方法拷贝到_super上
							 * @date 2018-07-09 20:23:38
							 * @since 1.0.0
							 */
							var Surrogate = new this.__super__()
							for (var _prop in Surrogate) {
								(function (prop) {
									if (Surrogate.hasOwnProperty(prop) && Framework.isFunction(Surrogate[prop])) {
										_super[prop] = function () {
											return Surrogate[prop].apply(self, arguments)
										}
									}
								})(_prop)
							}
							Surrogate = null
						}

						return method.apply(this, arguments)
					}
				} else {
					Class.prototype[property] = method
				}
				return
			}

			for (var property in protos) {
				this.extend(property, protos[property])
			}
		}

		/**
		 * 拓展super方法
		 * @todo 后续完成
		 */
		Class.prototype.extend('_super', function () {

		})

		/**
		 * 拷贝原型方法
		 * @since 1.0.0
		 */
		Class.prototype.extend(protos)
		Class.prototype.constructor = Class

		return Class
	}
})
