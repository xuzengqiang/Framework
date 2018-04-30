/**
 * @copyright (c) 2018, www.wicoder.net. All rights reserved.
 * @fileOverview Framework.js
 * @author xuzengqiang <253948113@qq.com>
 * @date 2018-04-30 10:05:42
 * @version 1.0.0
 */
(function(global, factory) {
    "use strict";

    factory(global);
})(typeof window !== "undefined" ? window : this, function(window) {
    var document = window.document;
    var location = window.location;
    var rint = /^[1-9]\d*$/;
    var objProto = Object.prototype;
    var toString = objProto.toString;
    var Framework = {};

    /**
     * 判断是否为正整数
     * @param {mixed} number - 需要验证的数据
     * @since 1.0.0
     */
    Framework.isInt = function(number) {
        return rint.test(number);
    };

    /**
     * 判断是否为数字
     * @param {mixed} number - 需要验证的数据
     * @since 1.0.0
     */
    Framework.isNumber = function(number) {
        return (
            (toString.call(number) === "[Object Number]" ||
                toString.call(number) === "[Object String]") &&
            !isNaN(number - parseFloat(number))
        );
    };

    /**
     * 对外暴露接口
     * @since 1.0.0
     */
    window.Framework = Framework;
});
