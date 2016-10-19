'use strict';

angular.module('formalizer')
.directive('ngFormalizerField', ['$timeout', '$compile', function($timeout, $compile) {
  function formalizerit($scope, $element, $attrs, $ngFormalizer, data) {
    var configuration = $ngFormalizer.configure(data, $scope);
    $scope.$field = data;
    $scope.$configuration = configuration;

    $attrs.$set('id', configuration.element.attrs.id + '-container');

    $ngFormalizer.getFieldHTML(data, configuration, $scope)
    .then(function(html) {
      // append html and compile now

      $element[0].innerHTML = html;
      $compile($element.contents())($scope);

      //var node_el = angular.element(html);
      //$element.append(node_el);
      //$compile(node_el)($scope);
    });
  }

  return {
    scope: true,
    require: '^ngFormalizer',
    link: function($scope, $element, $attrs, $ngFormalizer) {
      $scope.$formalizer = $ngFormalizer;

      var unwatch = $scope.$watch($attrs.ngFormalizerField, function(a, b) {
        if (a) {
          formalizerit($scope, $element, $attrs, $ngFormalizer, a);
          unwatch();
        }
      });
    }
  };
}]);
