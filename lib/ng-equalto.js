angular.module("formalizer")
.directive("ngEqualTo", function () {
    return {
        require: "?ngModel",
        link: function ($scope, $elm, $attrs, $ngModel) {
            if (!$ngModel) {
                return;
            }

            $scope.$watch($attrs.ngEqualTo, function ngEqualToWatch(value) {
                var this_val = $ngModel.$modelValue === "" ? null : ($ngModel.$modelValue || null),
                    eq_val = value === "" ? null : (value || null);

                $ngModel.$setValidity("equal-to", eq_val == this_val);
            });
        }
    };
});