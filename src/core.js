define([
	'./define',
	'./utils/isFunction',
	'./utils/isPlainObject',
	'./utils/isArray'
], function (Framework) {
	'use strict'

	/**
	 * 对象拷贝
	 * @date 2016-10-27 21:22:50
	 * @since 1.0.0
	 * @see jQuery.extend
	 * @return {Object} 拷贝的对象
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
			if ((options = arguments[i]) !== null) {
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
})
