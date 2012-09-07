/**
  * @fileoverview viewable impression plugin for jQuery for use on washingtonpost.com
  * @Author michael.spencer@washingtonpost.com (Mike Spencer)
  */
(function($, wpAd) {

  'use strict';
  
  if($ && wpAd){

    $.fn.viewableImpression = function(options){
    
      var ads = [],
        scrollCheck=true,
        rndm=Math.floor(Math.random()*1E7),
        timer;

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

        $.each(ads, function(i, el) {
          if(el){
            var $el = $(el),
              height = $el.height(),
              halfHeight = height/2,
              midPoint = $el.offset().top + halfHeight;

            if(midPoint > wTop && midPoint < wBottom){
              renderAd(ads[i]);
              ads[i] = false;
              cleanupFlag = true;
            }
          }
        });
        if(cleanupFlag){
          ads = cleanupAdArray();
        }
      }

      function cleanupAdArray(){
        var temp = ads, l= temp.length, rv = [];
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

      function renderAd(slug){
        var template = wpAd.templates[slug.id.split('slug_')[1]];
        if(template && template.briefcase){
          $(slug).css({height:''}); //remove set height (added initially to measure midpoint of ad container):
          wpAd.exec.adi(template.briefcase); //render iframe ad
          if(options.fadeInSpeed){
            $(slug).hide().fadeIn(options.fadeInSpeed);
          }
        }
      }

      function addEventListeners(){
        $(window).bind('scroll.wpAd_viewable_' + rndm + ' resize.wpAd_viewable_' + rndm, onWindowScroll);
      }
      
      function removeEventListeners(){
        $(window).unbind('scroll.wpAd_viewable_' + rndm + ' resize.wpAd_viewable_' + rndm);
      }
      
      init();
      
      return this.each(function(i, el){
        ads.push(el);
      });

    };

    $(function(){
      if(wpAd.viewableImpressions){ //wpAd.viewableImpressions Array generated via generic_ad.js
        $(wpAd.viewableImpressions).viewableImpression(); //initialise the plugin
      }
    });

  }

})(window.jQuery, window.wpAd);