/*
 * @fileOverview: 代码构建
 * @author: xuzengqiang
 * @date: 2018-07-03 11:19:53
 */

module.exports = function (grunt) {
	var requirejs = require('requirejs'),
		config = {
			baseUrl: 'source',
			name: "core",
			out: 'dist/core.js',
			/**
			 * 不进行代码的压缩
			 */
			optimize: 'none',
			/**
			 * r.js会在每一个文件末尾插入一个;
			 * @description 去掉文件末尾的;
			 */
			skipSemiColonInsertion: true
		}

	grunt.task.registerTask('builder', function () {
		var done = this.async()

		requirejs.optimize(config, function (buildResponse) {
			done()
		}, function (error) {
			done(error)
		})
	})

}
