/**
 * @copyright www.wicoder.net
 * @fileOverview: wrapper.js
 * @author: xuzengqiang
 * @date: 2018-07-09 20:54:38
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
	 * 根据type生成类型判断方法
	 * @param {String} type - 类型名称
	 * @example
	 * var isString = Framework.isType('String')
	 * isString('abc') => true
	 */
	Framework.isType = function isType (type) {
		return function (obj) {
			return toString.call(obj) === '[object ' + type + ']'
		}
	}



	/**
	 * 判断是否为一个方法
	 * @author: xuzengqiang
	 * @date: 2018-07-03 14:48:44
	 */
	Framework.isFunction = function isFunction (obj) {
		return typeof obj === 'function' && typeof obj.nodeType !== 'number'
	}



	/**
	 * 判断是否为一个数组
	 * @param {mixed} array - 需要验证的对象
	 * @since 1.0.0
	 */
	var __isArray = Framework.isType('Array')
	Framework.isArray = Array.isArray || function isArray (array) {
		return __isArray(array)
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
	var __isString = Framework.isType('String')
	Framework.isString = function isString (string) {
		return __isString(string)
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



	/**
	 * 判断是否为数字
	 * @param {mixed} number - 需要验证的数据
	 * @since 1.0.0
	 */
	Framework.isNumber = function isNumber (number) {
		return (
			(toString.call(number) === '[object Number]' || toString.call(number) === '[object String]') && !isNaN(number - parseFloat(number))
		)
	}



	/**
	 * 判断是否为正整数
	 * @param {mixed} number - 需要验证的数据
	 * @since 1.0.0
	 */
	Framework.isInt = function isInt (number) {
		return rint.test(number)
	}



	/**
	 * 判断是否为一个空的obj
	 * @param {mixed} obj - 需要验证的对象
	 * @since 1.0.0
	 */
	Framework.isEmptyObject = function isEmptyObject (obj) {
		var property
		for (property in obj) {
			return false
		}
		return true
	}



	/**
	 * 判断对象是否为时间
	 * @author xuzengqiang
	 * @date 2018-07-09 20:44:48
	 * @since 1.0.0
	 */
	var __isDate = Framework.isType('Date')
	Framework.isDate = function isDate (date) {
		return __isDate(date) && date.toString() !== 'Invalid Date' && !isNaN(date)
	}



	/**
	 * 判断是否为XML文档
	 * @author xuzengqiang
	 * @date 2018-07-09 20:49:08
	 * @since 1.0.0
	 */
	Framework.isXML = function isXML (element) {
		var documentElement = element && (element.ownerElement || element).documentElement
		return documentElement ? documentElement.nodeName !== 'HTML' : false
	}



	/**
	 * 判断是否为对象
	 * @param {mixed} obj - 需要验证的对象
	 * @date 2018-07-09 20:52:09
	 * @since 1.0.0
	 */
	Framework.isObject = function isObject (obj) {
		var type = typeof obj
		return type === 'function' || type === 'object' && !!obj
	}





	/**
	 * 过滤掉字符串的前后空格
	 * @param {mixed} string - 字符串
	 */
	Framework.trim = function trim (string) {
		return Framework.isUndefined(string) || string === null ?
			'' : (string + '').trim()
	}





	/**
	 * 对象拷贝
	 * @author xuzengqiang
	 * @date 2016-10-27 21:22:50
	 * @since 1.0.0
	 * @see jQuery.extend
	 */
	Framework.extend = function () {
		var options,
			name,
			src,
			copy,
			copyIsArray,
			clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false

		// 如果第一个参数为boolean类型,且为true,则为深拷贝
		if (typeof target === 'boolean') {
			deep = target
			target = arguments[i] || {}
			i++
		}

		if (typeof target !== 'object' && !Framework.isFunction(target)) {
			target = {}
		}

		if (i === length) {
			target = this
			i--
		}

		for (; i < length; i++) {
			if ((options = arguments[i]) != null) {
				for (name in options) {
					src = target[name]
					copy = options[name]

					if (target === copy) {
						continue
					}

					// 如果是深拷贝,copy必须为一个纯粹的对象或者数组
					if (deep && copy && (Framework.isPlainObject(copy) || (copyIsArray = Framework.isArray(copy)))) {
						// 如果是数组
						if (copyIsArray) {
							copyIsArray = false
							clone = src && Framework.isArray(src) ? src : []
						} else {
							clone = src && Framework.isPlainObject(src) ? src : {}
						}

						// 递归
						target[name] = Framework.extend(deep, clone, copy)
					} else if (copy !== undefined) {
						target[name] = copy
					}
				}
			}
		}
		return target
	}



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



	/**
	 * 类的创建,并自动执行initialize()方法
	 * @date 2016-11-18 10:26:12
	 * @param {Object} [Super] - 需要继承的父类
	 * @param {Object} [protos] - 原型方法
	 * @param {Object} [staticProtos] - 静态方法.
	 * @return 如果返回false,那么表示对象创建失败.
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
		 * @author xuzengqiang
		 * @date 2017-6-29 17:40:01
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
		Class.prototype.extend = function (protos, method) {
			protos = protos || {}

			if (Framework.isString(protos)) {
				var property = protos.trim()
				if (!property) return

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





	window.Framework = Framework

})
