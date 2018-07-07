/*
 * @fileOverview: 代码构建
 * @author: xuzengqiang
 * @date: 2018-07-03 11:19:53
 */

module.exports = function (grunt) {
	var requirejs = require('requirejs'),
		rdefineEnd = /\}\s*?\)[^}\w]*$/,
		moment = require('moment'),
		srcFloder = __dirname + '/../../src/',

		/**
		 * 读取src目录下的指定文件
		 * @param {String} fileName - 文件名称
		 */
		read = function (fileName) {
			return grunt.file.read(srcFloder + fileName)
		},

		wrapper = read('wrapper.js').split(/[\x20\t]*\/\/ @CODE\n(?:[\x20\t]*\/\/[^\n]+\n)*/),
		config = {
			baseUrl: 'src',
			name: 'framework',
			// out: 'dist/framework.js',
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
				// 如果是变量
				if (/.\/var\//.test(path.replace(process.cwd(), ''))) {
					contents = contents
						.replace(
							/define\([\w\W]*?return/,
							"  var " +
							(/var\/([\w-]+)/.exec(moduleName)[1]) +
							" ="
						)
						.replace(rdefineEnd, '')
				} else {
					contents = contents
						.replace(/define\([^{]*?{\s*(?:("|')use strict\1(?:;|))?/, '')
						.replace(rdefineEnd, '')
				}
				return contents
			},
			/**
			 * 包装
			 */
			wrap: {
				start: wrapper[0].replace(/\/\*\s*eslint(?: |-).*\s*\*\/\n/, ""),
				end: wrapper[1]
			}
		}

	grunt.task.registerTask('builder', function () {
		var done = this.async()
		var version = grunt.config('pkg.version')

		/**
		 * 最终输出的时候会执行
		 * @param {String} compiled - 最终编译后的代码
		 * @description
		 * 1、替换版本号
		 */
		config.out = function (compiled) {

			compiled = compiled
				.replace(/(@VERSION@)/g, version)
				.replace(/(@DATE@)/g, moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))

			grunt.file.write('dist/framework.js', compiled)
		}

		requirejs.optimize(config, function (buildResponse) {
			done()
		}, function (error) {
			done(error)
		})
	})
}
