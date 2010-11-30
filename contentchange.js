/*!
 * jQuery Content Change Event
 * https://github.com/tropperstyle/jquery-contentchange
 *
 * Copyright, Jonathan Tropper.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * MIT-LICENSE.txt
 * GPL-LICENSE.txt
 */

(function($) {
    $.extend($.event.special, {
        contentchange: {
            add: function(event) {
                var delay = event.data && event.data.delay || 300;
                var lastValue = this.value;
                var el = this;
                var timer;
                var originalHandler = event.handler;
                
                event.handler = function(event) {
                    window.clearTimeout(timer);
                    timer = window.setTimeout(function() {
                        if (el.value != lastValue) {
                            originalHandler.apply(el, arguments);
                            lastValue = el.value;
                        }
                    }, delay);
                };
            },
            setup: function() {
                $(this).bind('keyup', $.event.special.contentchange.handler);
            },
            teardown: function() {
                $(this).unbind('keyup', $.event.special.contentchange.handler);
            },
            handler: function(event) {
                event.type = 'contentchange';
                $.event.handle.apply(this, arguments);
            }
        }
    });
})(jQuery);
