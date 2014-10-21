angular.module("formalizer")
.directive("ngFormalizerAttach", function () {
    return {
        link: function ($scope, $elm, $attrs, $ngFormalizer) {
            $scope.$formalizer.attach($scope, $elm, $scope.$eval("$field"));
        }
    };
});