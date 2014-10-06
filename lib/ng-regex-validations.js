(function() {
    "use strict";

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
        "only-alpha": /^[a-zA-Z]*$/i,
        //"only-iso": /^[a-zA-Z0-9_\-\s]*$/i,
        "one-upper": /^(?=.*[A-Z]).+$/,
        "one-lower": /^(?=.*[a-z]).+$/,
        "one-number": /^(?=.*[0-9]).+$/,
        "one-alpha": /^(?=.*[a-z]).+$/i,
        "no-spaces": /^[^\s]+$/,
        "hexadecimal": /^[0-9a-fA-F]+$/,
        "hex-color": /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
    }, function(regex, key) {
        angular.module('formalizer')
        .directive(camelCase('ng-' + key), function (){
            return {
                require: 'ngModel',
                link: function($scope, $elm, $attr, $ngModel) {
                    $ngModel.$parsers.unshift(function (value) {
                        $ngModel.$setValidity(key, regex.test(value));
                        return value;
                    });
                }
            };
        });
    });
}());