angular.module("formalizer")
.directive("ngHideGroups", function () {
    return {
        require: "ngModel",
        link: function ($scope, $elm, $attrs, $ngModel) {
            var groups = $scope.$eval($attrs.ngHideGroups),
                values = Object.keys(groups);

            $scope.$watch($attrs.ngModel, function(a, b) {
                // fix: first show, then hide bacause if model is set a == b
                if (values.indexOf("" + b) >= 0) {
                    $scope.$formalizer.showGroups(groups[b]);
                }

                if (values.indexOf("" + a) >= 0) {
                    $scope.$formalizer.hideGroups(groups[a]);
                }
            });
        }
    };
});