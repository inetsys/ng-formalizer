angular.module("formalizer")
.directive("ngFormalizerAttach", function ($compile) {
    return {
        link: function ($scope, $elm, $attrs, $ngFormalizer) {
            $scope.$formalizer.attach($scope, $elm, $scope.$eval("$field"), $compile);
        }
    };
});
