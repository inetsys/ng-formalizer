angular.module('formalizer')
.directive('ngFormalizerField', ['$timeout', '$compile', function ($timeout, $compile) {
  return {
    scope: true,
    require: '^ngFormalizer',
    link: function ($scope, $elm, $attrs, $ngFormalizer) {
      //console.log("$ngFormalizer", $ngFormalizer);
      $scope.$formalizer = $ngFormalizer;

      //delay execution
      $timeout(function() {

        var data = $scope.$eval($attrs.ngFormalizerField);
        var configuration = $ngFormalizer.configure(data, $scope);
        $scope.$field = data;
        $scope.$configuration = configuration;

        $ngFormalizer.getFieldHTML(data, configuration, $scope)
        .then(function(html) {
          //console.log('html', html);
          // append html and compile in next tick
          var el = angular.element(html);
          $elm.append(el);

          $timeout(function () {
            $compile(el)($scope);

            $scope.$digest();
          });
        });
      });
    }
  };
}]);
