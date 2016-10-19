'use strict';

(function() {
  function safe_array_remove(arr, item) {
    var cut = arr.indexOf(item);
    if (cut !== -1) {
      return arr.splice(cut, 1);
    }

    return false;
  }

  Formalizer.templates.push('slider');

  Formalizer.types.slider = 'slider';

  Formalizer.parsers.slider = function($scope, field) {
    safe_array_remove(field.element.attrs['class'], 'form-control');

    // slider.js:L26-L57 version 0.5 review when update!
    [
      'min', 'max', 'step', 'precision', 'orientation', 'range', 'selection',
      'tooltip', 'tooltipSeparator', 'tooltipSplit', 'handle', 'reversed',
      'enabled', 'naturalArrowKeys', 'sliderId', 'updateEvent'
    ].forEach(function(i) {
      if (field.options[i] !== undefined) {
        field.element.attrs[i] = field.options[i];
      }
    });
  };
}());
