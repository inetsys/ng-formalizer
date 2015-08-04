angular.module("formalizer")
.directive("ngHideEmit", function () {
  return {
    restrict: 'A',
    multiElement: true,
    link: function(scope, element, attr) {
      scope.$watch(attr.ngHide, function ngHideWatchAction(value) {
        scope.$emit("hide", [scope.field, element, value]);
      });
    }
  };
});

angular.module("formalizer")
.directive("ngHideCatch", ["$animate", function ($animate) {
  return {
    restrict: 'A',
    multiElement: true,
    link: function(scope, element, attr) {

      scope.$on("hide", function(ev, args) {
        ev.stopPropagation();

        // name should be unique, so it could be safe to use to compare
        if (scope.field.name == args[0].name) {
          $animate[args[2] ? 'addClass' : 'removeClass'](element, "ng-hide", {
            tempClasses: "ng-hide-animate"
          });
        }
      });
    }
  };
}]);
