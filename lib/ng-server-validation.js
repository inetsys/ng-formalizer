'use strict';

angular
.module('formalizer')
.directive('ngServerValidation', function($http) {
  return {
    require: 'ngModel',
    link: function($scope, $element, $attrs, $ngModel) {
      var url = $attrs.ngServerValidation,
        ngRequestKey = $attrs.ngRequestKey || 'value',
        ngResponseKey = $attrs.ngResponseKey || 'value',
        current_value,
        last_checked_value;

      jQuery($element).focusout(function run_server_validation() {
        if (last_checked_value == current_value) return;

        last_checked_value = current_value;
        // send request to server
        var sent_data = {};
        sent_data[ngRequestKey] = current_value;

        $http
        .post(url, sent_data)
        .success(function(data) {
          $ngModel.$setValidity('server-validation-in-progress', true); // spinner off
          $ngModel.$setValidity('server-validation', !!data[ngResponseKey]);
        })
        .error(function(data) {
          $ngModel.$setValidity('server-validation-in-progress', true); // spinner off

          // do nothing is reasonable ?
        });
      });

      $ngModel.$parsers.unshift(function(value) {
        if (!value) {
          return;
        }

        $ngModel.$setValidity('server-validation-in-progress', false); // spinner
        //$ngModel.$setValidity('server-validation', true);

        current_value = value;
        //run_server_validation();

        return value;
      });
    }
  };
});
