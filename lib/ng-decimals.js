'use strict';

angular
.module('formalizer')
.directive('ngDecimals', function() {
  return {
    require: 'ngModel',
    link: function($scope, $element, $attrs, $ngModel) {
      var max_decimals = parseInt($attrs.ngDecimals, 10) || 4;

      $ngModel.$parsers.unshift(function(value) {
        var fnum = parseFloat(value);
        var fstr = '' + fnum;
        var fdec = 0;
        // fix clear field
        // if it's NaN give number error not this one.
        if (!value || isNaN(fnum)) {
          $ngModel.$setValidity('decimals', true);
          return value;
        }

        if (fstr.indexOf('.') !== -1) {
          fdec = fstr.split('.')[1].length;
        }

        var valid = fdec <= max_decimals;

        $ngModel.$setValidity('decimals', valid);

        return valid ? value : null;
      });
    }
  };
});
