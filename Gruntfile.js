/**
 * @copyright (c) 2018, www.wicoder.net. All rights reserved.
 * @fileOverview Grunt配置文件
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-04-30 07:14:22
 * @version 1.0.0
 *
 * @update xuzengqiang
 * @date 2018-07-05 12:11:11
 * @since 1.0.1
 * @description
 * 1、删除concat任务,通过r.js合并文件
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
		}
	})

	/**
	 *
	 */
	require('load-grunt-tasks')(grunt)

	/**
	 * 加载build/tasks下的所有任务
	 * @since 1.0.0
	 */
	grunt.loadTasks('build/tasks')

	/**
	 * 使用Uglify插件
	 * @since 1.0.0
	 */
	grunt.loadNpmTasks('grunt-contrib-uglify')

	/**
	 * 使用Watch插件
	 * @since 1.0.0
	 */
	grunt.loadNpmTasks('grunt-contrib-watch')

	/**
	 * 使用Karma插件
	 * @since 1.0.0
	 */
	grunt.loadNpmTasks('grunt-karma')

	/**
	 * 加载eslint组件
	 * @date 2018-07-10 10:38:09
	 */
	grunt.loadNpmTasks('grunt-eslint')

	/**
	 * 加载文件合并插件
	 * grunt.loadNpmTasks('grunt-contrib-concat')
	 * @deprecated
	 * @description 采用r.js合并文件
	 */

	// grunt.registerTask('default', ['watch'])

	/**
	 * 执行grunt unit命令时自动执行karma插件
	 * @since 1.0.0
	 */
	grunt.registerTask('unit', ['karma'])

	/**
	 * 项目启动命令
	 * @since 1.0.0
	 * @description
	 * 1、新增eslint任务
	 */
	grunt.registerTask('start', [
		'watch',
		'eslint'
	])

	/**
	 * 新增代码打包命令
	 * @date 2018-07-05 12:30:35
	 * @since 1.0.1
	 */
	grunt.registerTask('build', [
		'builder'
	])
}
