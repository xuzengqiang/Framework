/*
 * @fileOverview: 代码构建
 * @author: xuzengqiang
 * @date: 2018-07-03 11:19:53
 */

module.exports = function (grunt) {
	var requirejs = require('requirejs'),
		rdefineEnd = /\}\s*?\)[^}\w]*$/,
		config = {
			baseUrl: 'src',
			name: 'framework',
			out: 'dist/framework.js',
			/**
			 * 不进行代码的压缩
			 */
			optimize: 'none',
			/**
			 * r.js会在每一个文件末尾插入一个;
			 * @description 去掉文件末尾的;
			 */
			skipSemiColonInsertion: true,
			/**
			 * 不自动加上define占位符
			 */
			skipModuleInsertion: true,
			/**
			 * 当每个文件读取的时候回调用这个方法
			 * @param {String} moduleName - 模块名称
			 * @param {String} path - 路径
			 * @param {String} contents - 文本内容
			 */
			onBuildWrite: function (moduleName, path, contents) {
				contents = contents
					.replace(/define\([^{]*?{\s*(?:("|')use strict\1(?:;|))?/, '')
					.replace(rdefineEnd, '')

				return contents
			},
			/**
			 * 包装
			 */
			wrap: {
				start: '(function(){',
				end: '})()'
			}
		}

	grunt.task.registerTask('builder', function () {
		var done = this.async()

		requirejs.optimize(
			config,
			function (buildResponse) {
				done()
			},
			function (error) {
				done(error)
			}
		)
	})
}
