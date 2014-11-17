angular.module("formalizer")
.directive("ngDefault", ["$timeout", function ($timeout) {
    return {
        require: "ngModel",
        link: function ($scope, $elm, $attrs, $ngModel) {
            var def_val = $scope.$eval($attrs.ngDefault),
                not_set_values = $scope.$eval($attrs.ngDefaultValues);

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
                    $scope.$eval($attrs.ngModel + " = " + JSON.stringify(def_val));
                }
            });
        }
    };
}]);