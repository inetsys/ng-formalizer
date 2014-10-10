angular.module("formalizer")
.directive("ngFormalizerField", ["$timeout", "$compile", function ($timeout, $compile) {
    return {
        scope: true,
        link: function ($scope, $elm, $attrs) {
            var $ngFormalizer = $scope.$formalizer; // nasty hack but works!

            var field_data = $scope.$eval($attrs.ngFormalizerField),
                html;

            if (Array.isArray(field_data)) {
                // column configuration?
                html = $ngFormalizer.createColumns(field_data, $scope);
            } else {
                // field configuration?
                html = $ngFormalizer.createField(field_data, $scope, $scope.$index);
            }

            var el = angular.element(html);
            $elm.append(el);

            $timeout(function () {
                $compile(el.contents())($scope);

                $scope.$digest();
            });
        }
    };
}]);