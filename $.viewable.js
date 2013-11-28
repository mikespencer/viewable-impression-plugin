/**
  * @fileoverview viewable impression plugin for jQuery (1.7 min) for use on washingtonpost.com
  * @Author michael.spencer@washingtonpost.com (Mike Spencer)
  */
(function($) {

  'use strict';

  if($){

    $.fn.viewable = function(options){

      var elements = [],
        scrolling = false,
        rndm = Math.floor(Math.random()*1E9),
        namespace = '.viewable_' + rndm,
        $window = $(window);

      options = $.extend({
        interval: 100,
        offset: 0,
        callback: function(a){}
      }, options);

      function init(){
        setTimeout(checkIfVisible, 500);
        addEventListeners();
      }

      function onScroll(e){
        if(!scrolling){
          scrolling = true;
          setTimeout(function(){
            scrolling = false;
            checkIfVisible();
          }, options.interval);
        }
      }

      function addEventListeners(){
        $window.on('scroll' + namespace + ' resize' + namespace, onScroll);
      }

      function removeEventListeners(){
        $window.off('scroll' + namespace + ' resize' + namespace);
      }

      function checkIfVisible(){
        var wTop = $window.scrollTop(),
          wBottom = wTop + $window.height(),
          cleanupFlag = false;

        $.each(elements, function(i, el) {
          if(el){
            var $el = $(el),
              height = $el.height() || 0,
              halfHeight = height/2,
              top = $el.offset().top,
              bottom = top + height,
              midPoint = $el.offset().top + halfHeight;

            if((bottom + options.offset) >= wTop && (top - options.offset) <= wBottom){
              options.callback.call(this, options);
              elements[i] = false;
              cleanupFlag = true;
            }
          }
        });

        if(cleanupFlag){
          elements = cleanupElements();
        }
      }

      function cleanupElements(){
        var temp = elements, l= temp.length, rv = [];
        while(l--){
          if(temp[l]){
            rv.push(temp[l]);
          }
        }
        if(!rv.length){
          removeEventListeners();
        }
        return rv;
      }

      init();

      return this.each(function(i, el){
        elements.push(el);
      });

    };

  }

})(window.jQuery);