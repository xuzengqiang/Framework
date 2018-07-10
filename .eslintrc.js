/*
 * @fileOverview eslint配置
 * @author xuzengqiang
 * @date 2018-07-10 10:54:13
 */
module.exports = {
	/**
	 * 默认情况下,ESlint会在所有父级目录中寻找配置文件,一直到根目录.
	 * 为了将ESlint限制到一个特定的项目,可以设置root:true
	 * ESlint一旦发现配置文件中有root:true,则会停止在父级目录中查找.
	 */
	root: true,
	/**
	 * 属性配置
	 */
	parserOptions: {
		/**
		 * 用于指定ECMAScript版本
		 * @description 这里只考虑IE9+
		 * @see {@link http://kangax.github.io/compat-table/es5/}
		 */
		ecmaVersion: 5
	},
	/**
	 * 环境变量配置
	 * @see {@link http://eslint.cn/docs/user-guide/configuring}
	 */
	env: {
		/**
		 * 是否支持浏览器环境中的全局变量
		 */
		browser: true
	},
	/**
	 * ESlint支持使用第三方插件,可以使用npm安装.通过plugins关键字来存放插件名字列表
	 * 插件名称可以省略'eslint-plugin-'前缀
	 */
	plugins: [
	],
  /**
	 * 验证规则
	 * @description
	 * 1、可以使用注释或配置文件修改项目中要使用的规则.要改变一个规则,可以将规则ID设置为:
	 * 0/'off': 关闭规则
	 * 1/'warn': 开启规则,使用警告级别的错误:warn(不会导致程序退出)
	 * 2/'error': 开启规则,使用错误级别的错误:error(触发时程序会退出)
	 * @see {@link http://eslint.cn/docs/rules/}
	 */
	rules: {
		/**
		 * 强制使用jsdoc
		 */
		'valid-jsdoc': 1,
		/**
		 * 强制要求使用===和!==
		 */
		eqeqeq: 2,
		/**
		 * 不允许使用debugger
		 */
		'no-debugger': 1,
		/**
		 * 禁止使用arguments.caller和arguments.callee
		 * @description 因为严格模式下不支持
		 */
		'no-caller': 2,
		/**
		 * 禁止拓展原生类型
		 */
		'no-extend-native': 2,
		/**
		 * 禁止模块重复导入
		 */
		'no-duplicate-imports': 2,
		/**
		 * 禁止使用var声明变量,只能使用let或const
		 */
		'no-var': 0,
		/**
		 * 禁用使用console
		 */
		'no-console': 1,
		/**
		 * 关闭禁止使用tab
		 */
		'no-tabs': 0,
		/**
		 * 强制使用一致的缩进
		 */
		indent: 0,
		/**
		 * 强制在function的左括号前使用一致的空格
		 */
		'space-before-function-paren': 1,
		/**
		 * 禁用在return语句中使用赋值语句
		 */
		'no-return-assign': 0,
		/**
		 * 强制使用驼峰式命名
		 */
		camelcase: 0,
		/**
		 * 强制所有控制语句使用一致的括号风格
		 */
		curly: ['error', 'all']
	}
}
