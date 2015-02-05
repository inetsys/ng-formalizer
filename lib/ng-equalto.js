angular.module("formalizer")
.directive("ngEqualTo", function () {
    return {
        require: 'ngModel',
        link: function ($scope, $elm, $attrs, $ngModel) {
            if (!$ngModel) {
                return;
            }

            var my_value = null;
            function check() {
              var this_val = $ngModel.$modelValue === "" ? null : ($ngModel.$modelValue || null),
                eq_val = my_value === "" ? null : (my_value || null);

              $ngModel.$setValidity("equal-to", eq_val == this_val);
            }

            $scope.$watch($attrs.ngModel, function() {
              console.info("change model");
              check();
            });

            $scope.$watch($attrs.ngEqualTo, function ngEqualToWatch(value) {
              console.info("change target");
              my_value = value;
              check();
            });
        }
    };
});
