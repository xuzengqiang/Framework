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
});
