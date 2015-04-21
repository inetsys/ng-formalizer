angular.module("formalizer")
.directive("ngHideEmit", function () {
  return {
    restrict: 'A',
    multiElement: true,
    link: function(scope, element, attr) {
      //console.log("ngHideEmit", attr.ngHide, scope.field); //$$hashKey
      scope.$watch(attr.ngHide, function ngHideWatchAction(value) {
        //console.log("visibility change!", scope.field.label); //$$hashKey
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
      //console.log("ngHideCatch", scope.field);

      scope.$on("hide", function(ev, args) {
        ev.stopPropagation();

        //console.log("EVENT UP", arguments);
        //console.log(scope.field.name, args[0].name);

        // name should be unique, so it could be safe to use to compare
        if (scope.field.name == args[0].name) {
          //console.log("HIDE!?");
          $animate[args[2] ? 'addClass' : 'removeClass'](element, "ng-hide", {
            tempClasses: "ng-hide-animate"
          });
        }

        //console.log(scope.field.label, args);
      });
    }
  };
}]);
