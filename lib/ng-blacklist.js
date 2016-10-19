'use strict';

angular
.module('formalizer')
.directive('ngBlacklist', function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function($scope, $element, $attrs, $ngModel) {
      $ngModel.$validators.blacklist = function(value) {
        if (value == null || value == undefined) return true;

        var blacklist = $scope.$eval($attrs.ngBlacklist);

        if ('string' === typeof blacklist) {
          blacklist = blacklist.split(',');
        }
        return blacklist.indexOf(value) === -1;
      };
    }
  };
});
