angular.module("formalizer")
.directive("ngCompile", ["$compile", "$timeout", function ($compile, $timeout) {
  return {
    link: function ($scope, $elm, $attrs, $ngModel) {
      $attrs.$observe('ngBindHtml', function ( myTemplate ) {
        $timeout(function() {
          $compile($elm.contents())($scope);
        });
      });
    }
  };
}]);
