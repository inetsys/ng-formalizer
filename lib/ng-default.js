angular.module("formalizer")
.directive("ngDefault", ["$timeout", function ($timeout) {
    return {
        require: "ngModel",
        link: function ($scope, $elm, $attrs, $ngModel) {
            var def_val = $scope.$eval($attrs.ngDefault);

            function is_nan(val) {
                return "number" === typeof val && ("" + val) === "NaN";
            }

            // wait model to be populated
            $timeout(function () {
                if (is_nan($ngModel.$modelValue) || $ngModel.$modelValue === undefined) {
                    //$ngModel.$setViewValue(def_val);
                    $scope.$eval($attrs.ngModel + " = " + JSON.stringify(def_val));
                }
            });
        }
    };
}]);