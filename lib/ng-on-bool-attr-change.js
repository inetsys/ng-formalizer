/*
 * listen angular changes in boolean attrs
 */

angular.forEach('Selected,Checked,Disabled,Readonly,Required,Open'.split(','), function(name) {

    var normalized = 'ngOn' + name,
        attr = name.toLowerCase();

    angular.module("formalizer")
    .directive(normalized, function() {
        return {
          restrict: 'A',
          priority: 100,
          link: function($scope, $elm, $attrs) {
            $scope.$watch(function() {
                return $elm.prop(attr);
            }, function(val) {
                var obj = {$element: $elm};
                obj["$" + attr] = val;

                $scope.$eval($attrs[normalized], obj);
            });
          }
        };
    });
});


