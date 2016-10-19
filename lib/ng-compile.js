'use strict';

angular
.module('formalizer')
.directive('ngBindHtmlAndCompile', ['$compile', '$parse', '$sce', '$timeout', function($compile, $parse, $sce, $timeout) {
  return {
    restrict: 'A',
    compile: function ngBindHtmlCompile($element, $attrs) {
      var ngBindHtmlGetter = $parse($attrs.ngBindHtmlAndCompile);
      var ngBindHtmlWatch = $parse($attrs.ngBindHtmlAndCompile, function getStringValue(value) {
        return (value || '').toString();
      });
      $compile.$$addBindingClass($element);

      return function ngBindHtmlLink($scope, $element2, $attr2) {
        $compile.$$addBindingInfo($element2, $attr2.ngBindHtmlAndCompile);

        $scope.$on('$destroy', $scope.$watch(ngBindHtmlWatch, function ngBindHtmlWatchAction() {
          var value = ngBindHtmlGetter($scope);
          if (value) {
            if (value.indexOf('<') >= 0) {
              // look like html...
              // we re-evaluate the expr because we want a TrustedValueHolderType
              // for $sce, not a string
              $element2.html($sce.getTrustedHtml(value) || '');
              $compile($element2.contents())($scope);
            } else {
              $element2[0].textContent = value;
            }
          } else {
            $element2[0].textContent = '';
          }
        }));
      };
    }
  };
}]);
