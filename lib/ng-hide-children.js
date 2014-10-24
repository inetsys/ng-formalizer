angular.module("formalizer")
.directive("ngHideChildren", function () {
    return {
        require: "ngModel",
        link: function ($scope, $elm, $attrs, $ngModel) {
            var check = $scope.$eval($attrs.ngHideChildren),
                values = [],
                i;

            for (i in check) {
                if (check[i]) {
                    values.push(i);
                }
            }

            $scope.$watch($attrs.ngModel, function(a, b) {
                $scope.$field.formalizer.visible_children = values.indexOf("" + a) === -1;
            });
        }
    };
});