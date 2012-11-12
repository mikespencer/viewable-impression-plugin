#Description
jQuery plugin that renders an ad only when 50% of it is visible in the viewport for a set time (default 1000ms).

#Usage
    $(selector).viewableImpression({option: key}, callback);

####options (with defaults):
    {
      timeVisible: 1000,
      fadeInSpeed: 500
    } 
    
####callback (optional):
callback function to be called when the element is determined as viewable. Passed 
one argument, which is the target element. If callback is omitted, the default
behaviour of making the placeAd2 call and displaying the ad is executed.