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
A callback function to be called when each element is determined as viewable. 
This callback function is passed one argument, which is the target element as a 
DOM Element. If callback is omitted, the default behaviour of making the 
placeAd2 call and displaying the ad is executed.