(function ($) {
$.fn.tab = function (action) {
    function bindEvent () {
        var $tab = $(this);
        var $prev = $tab.find('.tab_nav_prev');
        var $next = $tab.find('.tab_nav_next');

        $tab.on('click', '.tab_hd_item', function (event) {
            event.preventDefault();
            $(this).siblings('.selected').removeClass('selected').end().addClass('selected');
            $($(this).attr('href')).siblings('.selected').removeClass('selected').end().addClass('selected');
        });

        $tab.on('click', '.tab_nav_item:not(.disabled)', function (event) {
            event.preventDefault();
            var data = $tab.data('_tab');
            var left = cssLeft.call($tab[0]);
            $(this).hasClass('tab_nav_prev') ? left += data.itemWidth : left -= data.itemWidth;
            cssLeft.call($tab[0], left, function () {
                updateNavState.call($tab[0]);
            });
        });
    }

    function refresh () {
        var $tab = $(this);
        var $hdItems = $tab.find('.tab_hd_item');
        var data = $tab.data('_tab') || {};
        data.itemWidth = $tab.find('.tab_hd_item:first').outerWidth();
        data.left = {
            max: 0,
            min: $tab.find('.tab_hd').outerWidth() - $hdItems.filter(':first').outerWidth() * $hdItems.length
        };
        $tab.data('_tab', data);
        updateNavState.call(this);
    }

    function updateNavState () {
        var $tab = $(this);
        var $prev = $tab.find('.tab_nav_prev');
        var $next = $tab.find('.tab_nav_next');
        var data = $tab.data('_tab');
        var left = cssLeft.call(this);
        $prev.toggleClass('disabled', left >= data.left.max);
        $next.toggleClass('disabled', left <= (data.left.min - data.itemWidth));
    }

    function cssLeft (value, callback) {
        var $hdInner = $(this).find('.tab_hd_inner');
        if(arguments.length) {
            $hdInner.animate({
                left: value
            }, callback);
        } else {
            var left = parseFloat($hdInner.css('left'));
            return isNaN(left) ? 0 : left;
        }
    }

    return this.each(function() {
        if(action === 'refresh') {
            return refresh.call(this);
        }
        bindEvent.call(this);
        refresh.call(this);
    });
};
})(jQuery);