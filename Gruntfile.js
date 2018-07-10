/**
 * @copyright (c) 2018, www.wicoder.net. All rights reserved.
 * @fileOverview Grunt配置文件
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-04-30 07:14:22
 * @version 1.0.0
 * @param {Object} grunt grunt
 * @return {void}
 *
 * @update xuzengqiang
 * @date 2018-07-05 12:11:11
 * @since 1.0.1
 * @description
 * 1、删除concat任务,通过r.js合并文件
 * @return {void}
 */
module.exports = function (grunt) {
	'use strict'

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			all: {
				files: {
					'dist/<%= pkg.name %>.min.js':
						'dist/<%= pkg.name %>.js'
				}
			},
			options: {
				stripBanners: true,
				banner:
					'/**\n' +
					' * @copyright www.wicoder.net \n' +
					' * @fileOverview <%= pkg.name %> v<%= pkg.version %> \n' +
					' * @author xuzengqiang <25394113@qq.com>\n' +
					' * @date <%= grunt.template.today(\'yyyy-mm-dd HH:mm:ss\') %> \n' +
					' */\n'
			}
		},

		/**
		 * 新增自动化插件
		 * @since 1.0.0
		 */
		watch: {
			build: {
				files: ['src/*.js'],
				/**
				 * 代码更新时执行的任务
				 * @date 2018-07-04 17:03:40
				 * @description
				 * 1、新增代码自动构建
				 * 2、自动生成压缩代码
				 * 3、删除concat任务
				 */
				tasks: ['builder'],
				options: {
					spawn: false
				}
			}
		},

		/**
		 * 新增karma配置
		 * @since 1.0.0
		 */
		karma: {
			unit: {
				configFile: 'test/karma.config.js'
				// singleRun: true
			}
		},

		/**
		 * eslint任务
		 * @date 2018-07-10 10:39:18
		 * @since 1.0.0
		 */
		eslint: {
			options: {

			},
			target: [
				'src/*.js',
				'Gruntfile.js',
				'build/**/*.js'
			]
		},

		/**
		 * 新增compare_size任务
		 * @date 2018-07-10 15:25:32
		 * @since 1.0.0
		 * @see {@link https://www.npmjs.com/package/grunt-compare-size}
		 */
		compare_size: {
			files: [
				'dist/framework.js',
				'dist/framework.min.js'
			],
			options: {
				cache: '.sizecache.json',
				compress: {
					gz: function (fileContents) {
						return require("gzip-js").zip(fileContents, {}).length;
					}
				}
			}
		}
	})

	/**
	 * 加载从npm安装的grunt任务
	 * @description
	 * 相当于:
	 * grunt.loadNpmTask('grunt-contrib-uglify')
	 * grunt.loadNpmTask('grunt-contrib-watch')
	 * grunt.loadNpmTasks('grunt-eslint')
	 * ...
	 */
	require('load-grunt-tasks')(grunt)

	/**
	 * 加载build/tasks下的所有任务
	 * @since 1.0.0
	 */
	grunt.loadTasks('build/tasks')

	/**
	 * 加载文件合并插件
	 * grunt.loadNpmTasks('grunt-contrib-concat')
	 * @deprecated
	 * @description 采用r.js合并文件
	 */

	/**
	 * 执行grunt unit命令时自动执行karma插件
	 * @since 1.0.0
	 */
	grunt.registerTask('unit', [
		'watch',
		'eslint',
		'karma'
	])

	/**
	 * 项目启动命令
	 * @since 1.0.0
	 * @description
	 * 1、新增eslint任务
	 */
	grunt.registerTask('start', [
		'watch',
		'eslint',
		'compare_size'
	])

	/**
	 * 新增代码打包命令
	 * @date 2018-07-05 12:30:35
	 * @since 1.0.1
	 */
	grunt.registerTask('build', [
		'builder',
		'compare_size'
	])
}
