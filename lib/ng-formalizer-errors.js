'use strict';

angular
.module('formalizer')
.directive('ngFormalizerErrors', [function() {
  return {
    scope: {
      $messages: '=messages',
      ngFormalizerErrors: '@ngFormalizerErrors'
    },
    require: '^ngFormalizer',
    templateUrl: 'templates/formalizer-error-list.tpl.html',
    replace: true,
    link: function($scope, $element, $attrs, $ngFormalizer) {
      $scope.$formalizer = $ngFormalizer;

      var unwatch2;
      // delayed init
      var unwatch = $scope.$parent.$watch($attrs.ngFormalizerErrors, function(name, b) {
        if (!name && !b) return;
        $scope.name = name;
        unwatch(); unwatch = null;

        if ('string' !== typeof name) {
          console.error(name);
          throw new Error('ngFormalizerErrors must be a string with the field name');
        }

        // lazy init, wait until field is parsed
        unwatch2 = $scope.$watch(function() {
          return $ngFormalizer.fields[name];
        }, function(newValue) {
          if (newValue) {
            $scope.$configuration = $ngFormalizer.fields[name].$configuration;
            $scope.$field = $ngFormalizer.fields[name].$field;
            unwatch2(); unwatch2 = null;
          }
        });
      });

      $scope.$on('$destroy', function() {
        unwatch && unwatch();
        unwatch2 && unwatch2();
      });
    }
  };
}]);
