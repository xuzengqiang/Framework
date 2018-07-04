/**
 * @copyright (c) 2018, www.wicoder.net. All rights reserved.
 * @fileOverview Grunt配置文件
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-04-30 07:14:22
 * @version 1.0.0
 */
module.exports = function (grunt) {
	'use strict'

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			options: {
				separator: ';',
				stripBanners: true,
				banner: '/*! hello - v1.2.3 - 2014-2-4 */'
			},
			dist: {
				src: ['src/string.js', 'src/array.js', 'src/inherits.js'],
				dest: 'dist/<%=pkg.name%>-<%=pkg.version%>.js'
			}
		},

		builder: {
			all: {
				dist: 'build/framework.js'
			}
		},

		uglify: {
			options: {
				stripBanners: true,
				banner:
					'/**\n' +
					' * @copyright www.wicoder.net \n' +
					' * @fileOverview <%= pkg.name %> v<%= pkg.version %> \n' +
					' * @date <%= grunt.template.today(\'yyyy-mm-dd HH:mm:ss\') %> \n' +
					' * @author xuzengqiang <25394113@qq.com>\n' +
					' */\n'
			},
			build: {
				src: 'src/framework.js',
				dest: 'dist/<%=pkg.name%>-<%=pkg.version%>.min.js'
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
				 */
				tasks: ['uglify', 'concat', 'build'],
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
		 * requirejs配置
		 */
		requirejs: {

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
	 * 加载文件合并插件
	 */
	grunt.loadNpmTasks('grunt-contrib-concat')

	grunt.registerTask('default', ['uglify', 'watch', 'concat'])

	/**
	 * 执行grunt unit命令时自动执行karma插件
	 * @since 1.0.0
	 */
	grunt.registerTask('unit', ['karma'])

	/**
	 * 项目启动命令
	 * @since 1.0.0
	 */
	grunt.registerTask('start', ['uglify', 'watch', 'concat'])
}
