angular.module('formalizer')
.directive('ngFormalizerErrors', ['$timeout', '$compile', function ($timeout, $compile) {
  return {
    scope: {
      $messages: "=messages",
      ngFormalizerErrors: "@ngFormalizerErrors"
    },
    require: '^ngFormalizer',
    templateUrl: 'templates/formalizer-error-list.tpl.html',
    replace: true,
    link: function ($scope, $elm, $attrs, $ngFormalizer) {
      $scope.$formalizer = $ngFormalizer;

      // delayed init
      var unwatch = $scope.$parent.$watch($attrs.ngFormalizerErrors, function (name, b) {
        if (!name && !b) return;
        $scope.name = name;
        unwatch();

        if ("string" !== typeof name) {
          console.error(name);
          throw new Error("ngFormalizerErrors must be a string with the field name");
        }

        // lazy init, wait until field is parsed
        var unwatch2 = $scope.$watch(function() {
          return $ngFormalizer.fields[name];
        }, function(newValue) {
          if (newValue) {
            $scope.$configuration = $ngFormalizer.fields[name].$configuration;
            $scope.$field = $ngFormalizer.fields[name].$field;
            unwatch2();
          }
        });
      });
    }
  };
}]);
