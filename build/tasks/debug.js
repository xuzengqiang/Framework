/*
 * @fileOverview: grunt debug
 * @author: xuzengqiang
 * @date: 2018-07-03 11:19:53
 */

module.exports = function (grunt) {

	grunt.task.registerTask('debug', function () {

		grunt.log.oklns('uglify')
		grunt.log.writeflags(grunt.config('uglify'), 'uglify')

		/**
		 * 支持路径写法
		 */
		grunt.log.oklns('uglify.options')
		grunt.log.writeflags(grunt.config('uglify.options'), 'uglify.options')

		/**
		 * 两个参数相当于设置值
		 * grunt.config.set('uglify.options.stripBanners', false)
		 */
		grunt.config('uglify.options.stripBanners', false)
		grunt.log.writeflags(grunt.config('uglify.options.stripBanners'), 'uglify.options.stripBanners')

		/**
		 * 通过get获取指定参数值
		 */
		grunt.log.writeflags(grunt.config.get('uglify'), 'uglify')
		grunt.log.writeflags(grunt.config.get('uglify.options'), 'uglify.options')

		/**
		 * 通过process获取指定参数值
		 * grunt.config.process(templateString)
		 */
		grunt.log.writeflags(grunt.config.process('<%=uglify.options%>'), 'uglify.options')

		grunt.log.writeflags(grunt.config.process('<%=uglify.options%>'), 'uglify.options')

		grunt.log.writeflags(grunt.config('uglify.options'), 'uglify.options')
		grunt.log.writeflags(grunt.config('uglify').options, 'uglify.options')
	})
}
