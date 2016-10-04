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
          link: function($scope, $element, $attrs) {
            scope.$on('$destroy', $scope.$watch(function() {
                return $element.prop(attr);
            }, function(val) {
                var obj = {$element: $element};
                obj["$" + attr] = val;

                $scope.$eval($attrs[normalized], obj);
            }));
          }
        };
    });
});
