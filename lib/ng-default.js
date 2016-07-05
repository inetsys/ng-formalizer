angular.module("formalizer")
.directive("ngDefault", ["$timeout", function ($timeout) {
  return {
    require: "ngModel",
    priority: 0,
    link: function ($scope, $elm, $attrs, $ngModel) {
      var def_val = $scope.$eval($attrs.ngDefault),
        not_set_values = $scope.$eval($attrs.ngDefaultValues);

      if ("number" === $attrs.type) {
        def_val = parseFloat(def_val, 10);
      }

      if ("datepicker" === $attrs.type) {
        def_val = new Date(def_val);
      }

      if (!not_set_values) {
        not_set_values = [undefined];
      } else if (Array.isArray(not_set_values)) {
        not_set_values.push(undefined);
      } else {
        throw new Error("ngDefaultValues must be an array of values");
      }

      function is_nan(val) {
        return "number" === typeof val && ("" + val) === "NaN";
      }

      // wait model to be populated
      $timeout(function () {
        if (is_nan($ngModel.$modelValue) || not_set_values.indexOf($ngModel.$modelValue) !== -1) {
          //$ngModel.$setViewValue(def_val);
          if ("datepicker" === $attrs.type) {
            $scope.$$tmp = def_val;
            $scope.$eval($attrs.ngModel + " = $$tmp");
            delete $scope.$$tmp;
          } else {
            $scope.$eval($attrs.ngModel + " = " + JSON.stringify(def_val));
          }
        }
      });
    }
  };
}]);
