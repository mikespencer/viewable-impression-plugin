#Description
jQuery plugin that renders an ad only when 50% of it is visible in the viewport for a set time (default 1000ms).

#Usage
    $(selector).viewableImpression(options);

##options (with defaults):
    {
      interval: 100,
      offset: 0,
      callback: function(options){}
    }

###interval
Frequency to check scroll position on scroll. `100` will check at an interval of 100ms on scroll.

###offset
Offsets when to fire the callback function. For example, `500` will call the callback function 500px before the element is in view.

###callback
Callback function that is called when the element is in view. Takes one argument (the options passed in). `this` in this scope references the DOM element that is now in view.