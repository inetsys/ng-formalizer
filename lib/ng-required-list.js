
angular.module('formalizer')
.directive('ngRequiredList', function () {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function ($scope, $elm, $attrs, $ngModel) {
      $scope.$watchCollection($attrs.ngRequiredList, function(a, b) {
        if (a && Array.isArray(a)) {
          $ngModel.$setValidity('required_list', a.length > 0);
          return;
        }
        $ngModel.$setValidity('required_list', false);
      })
      /*
      $ngModel.$parsers.unshift(function (value) {
        var mdl = $scope.$eval($attrs.ngRequiredList);

        console.log('ngRequiredList', mdl);
        if (Array.isArray(mdl)) {
          $ngModel.$setValidity('ng-required', mdl.length > 0);
          return value;
        }
        // warning ?
        $ngModel.$setValidity('ng-required', false);
        return value;
      });
      */
    }
  };
});
