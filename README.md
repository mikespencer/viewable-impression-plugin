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
This callback function is passed two arguments:

1. Target element (DOM Element).
2. The above options set (JSON Object).

This callback is _technically_ optional, however, nothing will happen when the 
element is in view if it is omitted.

# 
#####Last updated: Mike Spencer 11/20/12