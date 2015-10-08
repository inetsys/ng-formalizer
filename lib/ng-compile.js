angular.module('formalizer')
.directive('ngBindHtmlAndCompile', ['$compile', '$parse', '$sce', '$timeout', function ($compile, $parse, $sce, $timeout) {
  return {
    restrict: 'A',
    compile: function ngBindHtmlCompile(tElement, tAttrs) {
      var ngBindHtmlGetter = $parse(tAttrs.ngBindHtmlAndCompile);
      var ngBindHtmlWatch = $parse(tAttrs.ngBindHtmlAndCompile, function getStringValue(value) {
        return (value || '').toString();
      });
      $compile.$$addBindingClass(tElement);

      return function ngBindHtmlLink(scope, element, attr) {
        $compile.$$addBindingInfo(element, attr.ngBindHtmlAndCompile);

        scope.$watch(ngBindHtmlWatch, function ngBindHtmlWatchAction() {
          // we re-evaluate the expr because we want a TrustedValueHolderType
          // for $sce, not a string
          element.html($sce.getTrustedHtml(ngBindHtmlGetter(scope)) || '');
          $timeout(function() {
            $compile(element.contents())(scope);
          });
        });
      };
    }
  };
}]);
