/**
 * @copyright (c) 2018, www.wicoder.net. All rights reserved.
 * @fileOverview Framework.isPlainObject测试
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-05-02 11:34:50
 * @version 1.0.0
 */
describe("基础接口测试", function() {
	it("Framework.isInt", function() {
		expect(Framework.isInt(123)).toEqual(true);
		expect(Framework.isInt(123.0)).toEqual(true);
		expect(Framework.isInt(123.0001)).toEqual(false);
		expect(Framework.isInt("123.0.0")).toEqual(false);
		expect(Framework.isInt(123.1)).toEqual(false);
		expect(Framework.isInt("123")).toEqual(true);
	});

	it("Framework.isFunction", function() {
		expect(Framework.isFunction(function() {})).toEqual(true);
		expect(Framework.isFunction(new Function("return true;"))).toEqual(true);
		expect(Framework.isFunction(true)).toEqual(false);
	});

	it("Framework.isArray", function() {
		expect(Framework.isArray([10])).toEqual(true);
		expect(Framework.isArray(new Array(10))).toEqual(true);

		// 伪数组
		expect(Framework.isArray(document.querySelectorAll("div"))).toEqual(false);
		expect(Framework.isArray(arguments)).toEqual(false);

		var mockArray = {
			0: 1,
			1: 2,
			length: 2
		};
		expect(Framework.isArray(mockArray)).toEqual(false);
	});

	it("Framework.isPlainObject", function() {
		expect(Framework.isPlainObject({})).toEqual(true);
		expect(Framework.isPlainObject(new Object())).toEqual(true);
		expect(Framework.isPlainObject({ name: "xzqiang" })).toEqual(true);
		expect(Framework.isPlainObject(true)).toEqual(false);
		expect(Framework.isPlainObject(12)).toEqual(false);
		expect(Framework.isPlainObject([])).toEqual(false);
		expect(Framework.isPlainObject(function() {})).toEqual(false);

		var Person = function(name, age) {
			this.name = name;
			this.age = age;
		};

		expect(Framework.isPlainObject(new Person("xuzengqiang", 18))).toEqual(false);
	});

	it("Framework.extend", function() {
		Framework.extend({
			hello: function() {
				return "hello";
			}
		});

		expect(Framework.hello()).toEqual("hello");

		var data1 = Framework.extend(
			{},
			{
				hello: function() {
					return "hello";
				}
			}
		);
		expect(data1.hello()).toEqual("hello");

		var user = {
			info: {
				name: "xuzengqiang"
			}
		};
		var searchUser = Framework.extend(user, {
			info: {
				age: 18
			}
		});

		expect(user.info.name).toEqual(void 0);
		expect(user.info.age).toEqual(18);
		expect(searchUser.info.name).toEqual(void 0);
		expect(searchUser.info.age).toEqual(18);

		var user2 = {
			info: {
				name: "xuzengqiang"
			}
		};
		var searchUser2 = Framework.extend(true, user2, {
			info: {
				age: 18
			}
		});

		expect(user2.info.name).toEqual("xuzengqiang");
		expect(user2.info.age).toEqual(18);
		expect(searchUser2.info.name).toEqual("xuzengqiang");
		expect(searchUser2.info.age).toEqual(18);

		var user3 = {
			info: {
				name: "xuzengqiang"
			}
		};
		var searchUser3 = Framework.extend(true, {}, user3, {
			info: {
				age: 18
			}
		});

		expect(user3.info.name).toEqual("xuzengqiang");
		expect(user3.info.age).toEqual(void 0);
		expect(searchUser3.info.name).toEqual("xuzengqiang");
		expect(searchUser3.info.age).toEqual(18);
	});
});
