/*
 * @fileOverview: 代码构建
 * @author: xuzengqiang
 * @date: 2018-07-03 11:19:53
 */

module.exports = function (grunt) {
	console.error('执行任务!')
	var requirejs = require('requirejs'),
		config = {
			baseUrl: 'source',
			name: "core",
			optimize: "none",
			out: 'dist/core.js',
			/**
			 * 当每个文件被读取的时候调用这个方法来改变文件内容
			 */
			onBuildRead: function (moduleName, path, contents) {
				console.error('read')
			},
			/**
			 * 允许写入目标文件前执行方法改变内容
			 */
			onBuildWrite: function (moduleName, path, contents) {
				console.error('write')
			}
		}

	grunt.task.registerTask('builder', function () {
		var done = this.async()

		try {
			console.error('code builder')
			requirejs.optimize(config, function (buildResponse) {
				console.error('debug', buildResponse)
				done()
			}, function (error) {
				console.error(error)
				done(error)
			})

			/**
			 * 写入文件
			 */
			grunt.file.write('dist/framework.js', '(function(){})();')
		} catch (e) {
			console.error(e)
		}
	})

}
