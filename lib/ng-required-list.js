'use strict';

angular
.module('formalizer')
.directive('ngRequiredList', function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function($scope, $element, $attrs, $ngModel) {
      $scope.$on('$destroy', $scope.$watchCollection($attrs.ngRequiredList, function(a, b) {
        if (a && Array.isArray(a)) {
          $ngModel.$setValidity('required_list', a.length > 0);
          return;
        }
        $ngModel.$setValidity('required_list', false);
      }));
    }
  };
});
