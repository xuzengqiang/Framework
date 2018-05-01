/**
 * @copyright (c) 2018, www.wicoder.net. All rights reserved.
 * @fileOverview Framework.js
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-04-30 10:05:42
 * @version 1.0.0
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
	var slice = arrayProto.slice;
	var NOOP = function() {};
	var Framework = {};

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
			(toString.call(number) === "[object Number]" ||
				toString.call(number) === "[object String]") &&
			!isNaN(number - parseFloat(number))
		);
	};

	/**
	 * 判断是否为Function
	 * @param {mixed} obj - 需要验证的对象
	 * @since 1.0.0
	 */
	Framework.isFunction = function(obj) {
		return toString.call(obj) === "[object Function]";
	};

	/**
	 * 判断是否为一个纯粹的对象
	 * @param {mixed} obj - 需要验证的对象
	 * @since 1.0.0
	 */
	Framework.isPlainObject = function(obj) {};

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
		var Class = function FrameworkClass(args) {
			if (this instanceof _Class) {
				this.initialize = Framework.isFunction(this.initialize)
					? this.initialize
					: NOOP;

				return this.initialize.apply(
					this,
					args && args.hasOwnProperty("callee") ? args : arguments
				);
			}
			return new FrameworkClass(arguments);
		};

		Class.extend = function() {};
		Class.prototype.extend = function() {};
		Class.prototype.constructor = Class;

		return Class;
	};

	/**
	 * 对外暴露接口
	 * @since 1.0.0
	 */
	window.Framework = Framework;
});
