angular.module("formalizer")
.directive("ngFormalizerAttach", function () {
    return {
        link: function ($scope, $elm, $attrs, $ngFormalizer) {
            $scope.$eval("$field").formalizer.domElement = $elm;
        }
    };
});