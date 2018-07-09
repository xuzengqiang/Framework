/**
 * @copyright (c) 2018, www.wicoder.net. All rights reserved.
 * @fileOverview karma配置文件
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-05-01 04:33:25
 * @version 1.0.0
 */
module.exports = function (config) {
	config.set({
		/**
		 * 基础路径
		 */
		basePath: "",

		/**
		 * 使用的测试框架
		 * @see {@link https://npmjs.org/browse/keyword/karma-adapter}
		 * @description
		 * 可用:jasmine, qunit, mocha...
		 */
		frameworks: ["jasmine"],

		/**
		 * 需要加载到浏览器的文件列表
		 */
		files: ["../dist/framework.js", "unit/*.spec.js"],

		/**
		 * 需要排除的文件列表
		 */
		exclude: [],

		/**
		 * 在浏览器使用之前处理匹配的文件
		 */
		preprocessors: [],

		/**
		 * 使用测试结果报告
		 * 可能值: "dots", "progress"
		 */
		reporters: [],

		/**
		 * 使用reporters为"converage"时报告输出的类型和目录
		 */
		conerageReporter: [],

		/**
		 * 服务器端口号
		 */
		port: 9201,

		/**
		 * 启用或禁用输出报告日志中的颜色
		 */
		colors: true,

		/**
		 * 日志等级
		 * 可能值
		 * config.LOG_DISABLE - 不输出信息
		 * config.LOG_ERROR - 只输出错误信息
		 * config.LOG_WARN - 只输出警告信息
		 * config.LOG_INFO - 输出全部信息
		 * config.LOG_DEBUG - 输出调试信息
		 */
		logLevel: config.LOG_INFO,

		/**
		 * 启用或禁用自动检测文件的变化进行测试
		 */
		autoWatch: true,

		/**
		 * 启动测试浏览器
		 * @see {@link https://npmjs.org/browse/keyword/karma-launcher}
		 */
		browsers: ["Chrome"],

		/**
		 * 开启或禁用持续集成模式
		 * @description 如果设置为true,则Karma将打开浏览器,执行测试并退出
		 */
		singleRun: false,

		/**
		 * 并发级别(启动浏览器数)
		 */
		concurrency: Infinity
	});
};
