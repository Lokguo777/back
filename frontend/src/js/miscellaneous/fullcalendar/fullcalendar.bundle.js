// FullCalendar v3.10.2
// 包含核心功能、時間網格視圖和本地化
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
})(function($) {
    // 核心功能
    $.fullCalendar = {
        version: '3.10.2',
        internalApiVersion: 1
    };

    // 本地化
    $.fullCalendar.locale('zh-tw', {
        buttonText: {
            prev: '上一個',
            next: '下一個',
            today: '今天',
            month: '月',
            week: '週',
            day: '日',
            list: '列表'
        },
        allDayText: '全天',
        eventLimitText: '更多',
        noEventsMessage: '沒有活動'
    });

    // 時間網格視圖
    $.fullCalendar.views.agendaWeek = {
        type: 'agenda',
        duration: { weeks: 1 },
        buttonText: '週',
        titleFormat: 'YYYY年M月D日',
        columnFormat: 'ddd D日',
        timeFormat: 'H:mm',
        slotLabelFormat: 'H:mm'
    };

    $.fullCalendar.views.agendaDay = {
        type: 'agenda',
        duration: { days: 1 },
        buttonText: '日',
        titleFormat: 'YYYY年M月D日',
        columnFormat: 'ddd D日',
        timeFormat: 'H:mm',
        slotLabelFormat: 'H:mm'
    };

    // 初始化日曆
    $.fn.fullCalendar = function(options) {
        var args = Array.prototype.slice.call(arguments, 1);
        var res = this;
        
        this.each(function() {
            var $el = $(this);
            var calendar = $el.data('fullCalendar');
            
            if (!calendar) {
                calendar = new $.fullCalendar.Calendar($el, options);
                $el.data('fullCalendar', calendar);
            }
            
            if (typeof options === 'string') {
                var method = calendar[options];
                if (method) {
                    res = method.apply(calendar, args);
                }
            }
        });
        
        return res;
    };
}); 