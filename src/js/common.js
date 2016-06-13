define(function(require) {
    var $ = require('jquery');
    require('jquery.pagination');

    /**
     * @param elem - DOM元素、jQuery对象、css选择器
     * @param Object.<current, limit, count> options
     */
    var pagination = function(elem, options) {
        var config = {
            current_page: options.current,
            items_per_page: options.limit,
            page_index: 1,
            num_edge_entries: 1,
            num_display_entries: 5,
            prev_text: '&lt;',
            next_text: '&gt;',
            load_first_page: false,
            link_to: '#__id__'
        };
        $.extend(config, options);
        $(elem).pagination(options.count, config);
    };

    var zh = {
        previousMonth : '上一月',
        nextMonth     : '下一月',
        months        : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        weekdays      : ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
        weekdaysShort : ['日','一','二','三','四','五','六']
    };
    
    var fail = function (selector, message) {
        $(selector).html('<div class="fail"><span>' + (message || '系统异常') + '</span></div>');
    };
    
    return {
        zh: zh,
        fail:fail,
        pagination: pagination
    };
});