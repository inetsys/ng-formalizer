angular.module("formalizer")
.directive("ngLength", function () {
  return {
    require: "ngModel",
    link: function ($scope, $elm, $attrs, $ngModel) {
      $ngModel.$parsers.unshift(function (value) {
        // do not test 'empty' things this task is for required
        var length = parseInt($attrs.ngLength, 10);
        if (Array.isArray(value) || "string" === typeof value) {
          $ngModel.$setValidity("length", value.length === length);
        } else {
          // invalid length?
          $ngModel.$setValidity("length", false);
        }
        

        return value;
      });
    }
  };
});
