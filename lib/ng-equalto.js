angular.module('formalizer')
.directive('ngEqualTo', ['$parse', '$compile', '$log', function($parse, $compile, $log) {
  return {
    require: '?ngModel',
    link: function($scope, $elm, $attr, $ngModel) {
      if (!$ngModel) {
        return;
      }

      var eq_val,
        this_val;

      $ngModel.$parsers.unshift(function (value) {
        this_val = value == "" ? null : (value || null);

        $ngModel.$setValidity('equal-to', eq_val == this_val);

        return value;
      });

      var validate = false;

      $scope.$watch($attr.ngEqualTo, function ngEqualToWatch(value) {
        eq_val = value == "" ? null : (value || null);

        $ngModel.$setValidity('equal-to', eq_val == this_val);
      });
    }
  };
}]);