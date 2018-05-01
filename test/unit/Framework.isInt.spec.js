/**
 * @copyright (c) 2018, www.wicoder.net. All rights reserved.
 * @fileOverview 判断是否为int配置
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-05-01 04:54:39
 * @version 1.0.0
 */
describe("Framework.isInt", function() {
	it("123", function() {
		expect(Framework.isInt(123)).toEqual(true);
	});

	it("123.0", function() {
		expect(Framework.isInt(123.0)).toEqual(true);
	});

	it("123.1", function() {
		expect(Framework.isInt(123.1)).toEqual(false);
	});

	it("'123'", function() {
		expect(Framework.isInt("123")).toEqual(true);
	});

	it("isFunction", function() {
		expect(Framework.isFunction(function() {})).toEqual(true);
	});
});
