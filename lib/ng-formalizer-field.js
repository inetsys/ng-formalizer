angular.module("formalizer")
.directive("ngFormalizerField", ["$timeout", "$compile", function ($timeout, $compile) {
    return {
        link: function ($scope, $elm, $attrs) {
            var $ngFormalizer = $scope.$formalizer; // nasty hack but works!

            var field_data = $scope.$eval($attrs.ngFormalizerField);

            var html = $ngFormalizer.createField(field_data, $scope.$index);
            var el = angular.element(html);
            $elm.append(el);

            $timeout(function () {
                $compile(el.contents())($scope);

                $scope.$digest();
            });

        }
    };
}]);