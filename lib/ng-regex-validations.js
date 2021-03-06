'use strict';

(function() {
  var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
  var MOZ_HACK_REGEXP = /^moz([A-Z])/;

  /**
   * copy&paste from angular
   */
  function camelCase(name) {
    return name.
      replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
      }).
      replace(MOZ_HACK_REGEXP, 'Moz$1');
  }

  angular.forEach({
    'only-alpha': /^[a-zA-Z]*$/i,
    'alphanumeric': /^[a-zA-Z0-9]+$/,
    'one-upper': /^(?=.*[A-Z]).+$/,
    'one-lower': /^(?=.*[a-z]).+$/,
    'one-number': /^(?=.*[0-9]).+$/,
    'one-alpha': /^(?=.*[a-z]).+$/i,
    'no-spaces': /^[^\s]+$/,
    'hexadecimal': /^[0-9a-fA-F]+$/,
    'hex-color': /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
  }, function(regex, key) {
    angular
    .module('formalizer')
    .directive(camelCase('ng-' + key), ['$timeout', function($timeout) {
      return {
        require: 'ngModel',
        link: function($scope, $element, $attr, $ngModel) {
          function check(value) {
            var str_val = ('' + value);
            // for this test, use required
            if (value === undefined || value === null || str_val.length === 0) {
              $ngModel.$setValidity(key, true);
              return value;
            }

            // do not test 'empty' things this task is for required
            $ngModel.$setValidity(key, regex.test(str_val));

            return str_val;
          }

          $ngModel.$parsers.unshift(check);
          // run check after ng-default
          $timeout(function() {
            check($ngModel.$modelValue);
          });
        }
      };
    }]);
  });
}());
