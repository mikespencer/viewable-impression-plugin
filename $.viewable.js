/**
  * @fileoverview viewable impression plugin for jQuery for use on washingtonpost.com
  * @Author michael.spencer@washingtonpost.com (Mike Spencer)
  */
(function($) {

  'use strict';
  
  if($){

    $.fn.viewable = function(options, callback){
    
      var elements = [],
        scrollCheck = true,
        rndm = Math.floor(Math.random()*1E7),
        timer;
      
      callback = callback || renderAd;
      
      options = $.extend({
        timeVisible: 1000,
        fadeInSpeed: 500
      }, options);
      
      function init(){
        addEventListeners();
        setTimeout(onWindowScroll, 500);
      }
      
      function onWindowScroll(){
        if(scrollCheck){
          scrollCheck = false;
          timer = setTimeout(function(){
            scrollCheck = true;
            checkIfVisible();
          }, options.timeVisible);
        }        
      }

      function checkIfVisible(){
        var $win = $(window),
          wTop = $win.scrollTop(),
          wBottom = wTop + $win.height(),
          cleanupFlag = false;

        $.each(elements, function(i, el) {
          if(el){
            var $el = $(el),
              height = $el.height(),
              halfHeight = height/2,
              midPoint = $el.offset().top + halfHeight;

            if(midPoint > wTop && midPoint < wBottom){
              
              callback(elements[i], options);
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
      
      function addEventListeners(){
        $(window).bind('scroll.wpAd_viewable_' + rndm + ' resize.wpAd_viewable_' + rndm, onWindowScroll);
      }
      
      function removeEventListeners(){
        $(window).unbind('scroll.wpAd_viewable_' + rndm + ' resize.wpAd_viewable_' + rndm);
      }
      
      init();
      
      return this.each(function(i, el){
        elements.push(el);
      });

    };

  }

})(window.jQuery);