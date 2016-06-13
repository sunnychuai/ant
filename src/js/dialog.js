define(function(require) {
    var $ = require('jquery');
    var template = require('template');
    var dialogTmpl = require('text!templates/dialog/common.html');
    var confirmTmpl = require('text!templates/dialog/confirm.html');

    /*
     * @param {String} message
     * @param {Function} callback(action) 回调函数返回false时会阻止关闭，其他情况下会关闭弹窗
     */
    var tip = function(message, options, callback) {
        callback = callback || $.noop;
        var data = $.isPlainObject(message) ? message : {message: message};
        $.extend(data, options);
        var html = template.compile(options.template || dialogTmpl)(data);
        var $dialog = $(html).appendTo('body');

        $dialog.find('.dialog_btn').on('click', function(event) {
            var action = $(this).data('action');
            (action === 'close') && event.preventDefault();
            var ret = callback.call($dialog[0], action);
            ret !== false && $dialog.remove();
        });
        return $dialog;
    };

    /*
     * @param {String | {Object.<title, message>}} message
     * @param {Function} callback(action)
     */
    var success = function(message, callback) {
        return tip(message || '操作成功', {type: 'success'}, callback);
    };

    /*
     * @param {String | {Object.<title, message>} message
     * @param {Function} callback(action)
     */
    var warn = function(message, callback) {
        return tip(message || '操作失败', {type: 'warn'}, callback);
    };

    var autoHide = function (action, message, callback) {
        var $dlg = this[action](message);
        setTimeout(function () {
            $dlg.fadeOut('slow', function () {
                $dlg.remove();
                $.isFunction(callback) && callback($dlg);
            });
        }, 2000);
    };

    /**
     * @param {String} tmpl - 弹窗的js模板
     * @param {Object} [data] - js模板的数据
     * @param {Function} [callback(action)]
     */
    var dialog = function(tmpl, data, callback) {
        if(arguments.length === 2 && $.isFunction(data)) {
            callback = data;
            data = null;
        }
        return tip(data, {template: tmpl}, callback);
    };

    var confirm = function (message, callback) {
        return tip(message, {template: confirmTmpl}, function (action) {
            action === 'submit' && $.isFunction(callback) && callback();
        });
    };

    return {
        success: success,
        warn: warn,
        autoHide: autoHide,
        confirm: confirm,
        dialog: dialog
    };
});