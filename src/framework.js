/**
 * @copyright (c) 2018, www.wicoder.net. All rights reserved.
 * @fileOverview Framework.js
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-04-30 10:05:42
 * @version 1.0.0
 * @description 不考虑IE9以下浏览器
 */
(function(global, factory) {
	factory(global);
})(typeof window !== "undefined" ? window : this, function(window) {
	"use strict";
	var document = window.document;
	var location = window.location;
	var rint = /^[1-9]\d*$/;
	var objProto = Object.prototype;
	var arrayProto = Array.prototype;
	var toString = objProto.toString;
	var hasOwnProperty = objProto.hasOwnProperty;
	var slice = arrayProto.slice;
	var NOOP = function() {};
	var Framework = {};

	/**
	 * 指定类型的判断
	 * @author xuzengqiang
	 * @date 2018-5-3 00:23:02
	 * @since 1.0.0
	 * @description curry
	 * @example
	 * Framework.isString = Framework.isType("String");
	 */
	Framework.isType = function(type) {
		return function(obj) {
			return toString.call(obj) === "[object " + type + "]";
		};
	};

	/**
	 * 判断是否为正整数
	 * @param {mixed} number - 需要验证的数据
	 * @since 1.0.0
	 */
	Framework.isInt = function(number) {
		return rint.test(number);
	};

	/**
	 * 判断是否为数字
	 * @param {mixed} number - 需要验证的数据
	 * @since 1.0.0
	 */
	Framework.isNumber = function(number) {
		return (
			(toString.call(number) === "[object Number]" || toString.call(number) === "[object String]") && !isNaN(number - parseFloat(number))
		);
	};

	/**
	 * 判断是否为Function
	 * @param {mixed} obj - 需要验证的对象
	 * @since 1.0.0
	 */
	Framework.isFunction = Framework.isType("Function");

	/**
	 * 判断是否为Array
	 * @param {mixed} array - 需要验证的对象
	 * @since 1.0.0
	 */
	Framework.isArray = Array.isArray || Framework.isType("Array");

	/**
	 * 判断是否为字符串
	 * @param {mixed} string - 需要验证的对象
	 * @since 1.0.0
	 */
	Framework.isString = Framework.isType("String");

	/**
	 * 判断是否为一个纯粹的对象
	 * @param {mixed} obj - 需要验证的对象
	 * @since 1.0.0
	 * @see jQuery.isPlainObject
	 */
	Framework.isPlainObject = function(obj) {
		var proto, Ctor;

		if (!obj || toString.call(obj) !== "[object Object]") {
			return false;
		}

		proto = Object.getPrototypeOf(obj);
		if (!proto) {
			return true;
		}

		Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
		return typeof Ctor === "function" && hasOwnProperty.toString.call(Ctor) === hasOwnProperty.toString.call(Object);
	};

	/**
	 * 对象拷贝
	 * @author xuzengqiang
	 * @date 2016-10-27 21:22:50
	 * @since 1.0.0
	 * @see jQuery.extend
	 */
	Framework.extend = function() {
		var options,
			name,
			src,
			copy,
			copyIsArray,
			clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// 如果第一个参数为boolean类型,且为true,则为深拷贝
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[i] || {};
			i++;
		}

		if (typeof target !== "object" && !Framework.isFunction(target)) {
			target = {};
		}

		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {
			if ((options = arguments[i]) != null) {
				for (name in options) {
					src = target[name];
					copy = options[name];

					if (target === copy) {
						continue;
					}

					// 如果是深拷贝,copy必须为一个纯粹的对象或者数组
					if (deep && copy && (Framework.isPlainObject(copy) || (copyIsArray = Framework.isArray(copy)))) {
						// 如果是数组
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Framework.isArray(src) ? src : [];
						} else {
							clone = src && Framework.isPlainObject(src) ? src : {};
						}

						// 递归
						target[name] = Framework.extend(deep, clone, copy);
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}
		return target;
	};

	/**
	 * 创建一个对象
	 * @private
	 * @param {Object} klass - 对象
	 * @description 同Object.create
	 */
	function createObject(klass) {
		if (Object.create) {
			return Object.create(klass.prototype);
		}
		var Surrogate = function() {};
		Surrogate.prototype = klass.prototype;
		return new Surrogate();
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
	function inherits(Super, Child, protos, staticProtos) {
		var copyPrototype = createObject(Super);

		// 拷贝静态方法
		Framework.extend(true, Child, Super, staticProtos || {});

		// 让子类的__super__属性指向父类
		Child.__super__ = Super;
		Child.__owner__ = copyPrototype;
		Child.prototype = copyPrototype;
		Framework.extend(true, Child.prototype, protos || {});
		return Child;
	}

	/**
	 * 类的继承
	 * @public
	 * @author xuzengqiang
	 * @date 2016-11-18 10:26:18
	 * @param  {Class} super 父类
	 * @param  {Object|Function} protos - 子类或者对象。如果对象中包含constructor，子类将是用此属性值。
	 * @param  {Object} staticProtos - 静态属性或方法
	 * @since 1.0.0
	 */
	Framework.inherits = function(Super, protos, staticProtos) {
		var child;

		if (Framework.isFunction(protos)) {
			child = protos;
			protos = null;
		} else if (protos && protos.hasOwnProperty("constructor")) {
			child = protos.constructor;
		} else {
			child = function() {
				return Super.apply(this, arguments);
			};
		}

		return inherits(Super, child, protos, staticProtos);
	};

	/**
	 * 类的创建,并自动执行initialize()方法
	 * @date 2016-11-18 10:26:12
	 * @param {Object} [Super] - 需要继承的父类
	 * @param {Object} [protos] - 原型方法
	 * @param {Object} [staticProtos] - 静态方法.
	 * @return 如果返回false,那么表示对象创建失败.
	 * @since 1.0.0
	 */
	Framework.create = function(Super, protos, staticProtos) {
		var Class = function BaseClass(args) {
			if (this instanceof BaseClass) {
				this.initialize = Framework.isFunction(this.initialize) ? this.initialize : NOOP;
				return this.initialize.apply(this, args && args.hasOwnProperty("callee") ? args : arguments);
			}
			return new BaseClass(arguments);
		};

		/**
		 * 新增静态方法拷贝
		 * @author xuzengqiang
		 * @date 2017-6-29 17:40:01
		 * @since 1.1.0
		 */
		Class.extend = function(staticProtos) {
			Framework.extend(true, Class, staticProtos || {});
		};

		/**
		 * 属性拷贝
		 * @description
		 * 1、如果super存在,则按继承处理,否则直接拷贝静态方法和原型
		 * 2、因为继承的时候重新了原型链,此时需要重新赋值.
		 * 3、只有方法才允许被继承
		 */
		if (Framework.isFunction(Super)) {
			Class = inherits(Super, Class, null, staticProtos || {});
		} else {
			staticProtos = protos;
			protos = Super;
			Super = null;
			Class.extend(staticProtos);
		}

		/**
		 * 新增原型方法拷贝
		 * @param {Object|String} protos - 原型方法列表或者名称
		 * @param {Function} method - 单个方法
		 * @author xuzengqiang
		 * @date 2017-6-29 14:13:14
		 * @since 1.1.0
		 * var Animal = Framework.create();
		 * Animal.prototype.extend({
		 *     initialize:function(){}
		 * });
		 * or
		 * Animal.prototype.extend('initialize', function(){});
		 */
		Class.prototype.extend = function(protos, method) {
			protos = protos || {};

			if (Framework.isString(protos)) {
				var property = protos.trim();
				if (!property) return;

				/**
				 * 如果是对象或者数组,需要进行深拷贝
				 * @since 1.0.0
				 */
				if (method && (Framework.isPlainObject(method) || Framework.isArray(method))) {
					Class.prototype[property] = Framework.extend(true, {}, method);
					return;
				}

				Class.prototype[property] = method;
				return;
			}

			for (var property in protos) {
				this.extend(property, protos[property]);
			}
		};

		/**
		 * 拓展super方法
		 * @todo 后续完成
		 */
		Class.prototype.extend("_super", function() {});

		/**
		 * 拷贝原型方法
		 * @since 1.0.0
		 */
		Class.prototype.extend(protos);
		Class.prototype.constructor = Class;

		return Class;
	};

	Framework.String = (function() {
		var LangString = Framework.inherits(String, {
			isBlank() {
				if (this == null) return true;
				var string = this.trim();
				return string.length === 0;
			}
		});

		return String;
	})();

	/**
	 * 对外暴露接口
	 * @since 1.0.0
	 */
	window.Framework = Framework;
});
