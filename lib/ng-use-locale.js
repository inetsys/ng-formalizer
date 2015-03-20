/**
* ng-use-locale=""
*/
angular.module("formalizer")
.directive("ngUseLocale", ["$locale", "numberFilter", function ($locale, numberFilter) {
  return {
    require: "ngModel",
    priority: 10000, // lowest priority directive -> unshift => highest priority parser
    link: function ($scope, $elm, $attrs, $ngModel) {
      if ($attrs.type == "number") {
        // parse from locale to "real-c-english-number"
        $ngModel.$parsers.unshift(function (value) {
          for (i = 0; i < value.length; ++i) {
            if (value[i] == $locale.NUMBER_FORMATS.DECIMAL_SEP) {
              value  = value.substr(0, i) +
                "." + value.substr(i + 1);
            }
            // group separators are just removed
            else if (value[i] == $locale.NUMBER_FORMATS.GROUP_SEP) {
              value  = value.substr(0, i) + value.substr(i + 1);
            }
          }

          return value;
        });

        // use number (filter) to display
        $ngModel.$formatters.unshift(function(value) {
          if (!value) return value;

          value = "" + value;

          for (i = 0; i < value.length; ++i) {
            if (value[i] == ".") {
              value  = value.substr(0, i) +
              $locale.NUMBER_FORMATS.DECIMAL_SEP + value.substr(i + 1);
            }
          }

          return value;
        });

      } else {
        console && console.info("use locale not supportted for: ", $attrs.type);
      }
    }
  };
}]);
