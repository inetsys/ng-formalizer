function toBoolean(value) {
  if (value && value.length !== 0) {
    var v = ("" + value).toLowerCase();
    value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]');
  } else {
    value = false;
  }

  return value;
}

angular.module('ng').directive('ngRequiredIf', ['$parse', '$compile', '$log', function($parse, $compile, $log) {
  return {
    require: '?ngModel',
    link: function($scope, $elm, $attr, $ngModel) {
      if (!$ngModel) {
        return;
      }

      $attr.required = true; // force truthy in case we are on non input element

      var validate = false;

      $scope.$watch($attr.ngRequiredIf, function ngIfWatchAction(value) {
        validate = toBoolean(value);
        validator($ngModel.$viewValue);
      });


      var validator = function(value) {
        if ($attr.required && validate && $ngModel.$isEmpty(value)) {
          $ngModel.$setValidity('required', false);
          return;
        } else {
          $ngModel.$setValidity('required', true);
          return value;
        }
      };

      $ngModel.$formatters.push(validator);
      $ngModel.$parsers.unshift(validator);

      $attr.$observe('required', function() {
        validator($ngModel.$viewValue);
      });
    }
  };
}]);