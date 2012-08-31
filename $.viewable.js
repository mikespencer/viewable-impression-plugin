/**
  * @fileoverview viewable impression plugin for jQuery for use on washingtonpost.com
  * @Author michael.spencer@washingtonpost.com (Mike Spencer)
  */
(function($) {

  'use strict';
  
  if($ && window.wpAd){
  
    var ads = [],
      scrollCheck=true,
      timer;

    $.fn.viewableImpression = function(options){
      
      options = options || {};
      options.timeVisible = options.timeVisible || 1000;
      
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
          wBottom = wTop + $win.height();

        $.each(ads, function(i, el) {
          if(el){
            var $el = $(el),
              height = $el.height(),
              halfHeight = height/2,
              midPoint = $el.offset().top + halfHeight; 

            if(midPoint > wTop && midPoint < wBottom){
              renderAd(ads[i]);
              ads[i] = false;
            }
          }
        });
        ads = cleanupAdArray();
      }
      
      function cleanupAdArray(){
        var temp = ads, l= temp.length, rv = [];
        while(l--){
          if(temp[l]){
            rv.push(temp[l]);
          }
        }
        if(!rv.length){
          try{if(wpAd.flags.debug){window.console.log('all viewable impressions rendered');}}catch(e){}
          $(window).unbind('scroll.wpAd_viewable resize.wpAd_viewable');
        }
        return rv;
      }
      
      function renderAd(slug){
        var template = wpAd.templates[slug.id.split('slug_')[1]];
        if(template && template.briefcase){
          //remove set height (added initially to measure midpoint of ad container):
          $(slug).css({height:''});
          wpAd.exec.adi(template.briefcase);
        }
      }
      
      $(window).bind('scroll.wpAd_viewable resize.wpAd_viewable', onWindowScroll);

      return this.each(function(){
        ads.push(this);
      });
    };
    
    $(function(){
      //wpAd.viewableImpressions Array generated via generic_ad.js:
      if(wpAd.viewableImpressions){
        //initialise the plugin:
        $(wpAd.viewableImpressions).viewableImpression();
      }
    });

  }

})(window.jQuery);