angular.module('ng').directive('ngBlacklist', function (){
    return {
        require: 'ngModel',
        link: function($scope, $elm, $attr, $ngModel) {
            var blacklist = $scope.$eval($attr.blacklist);

            if ("string" === typeof blacklist) {
                blacklist = blacklist.split(',');
            }

            ngModel.$parsers.unshift(function (value) {
                ngModel.$setValidity('blacklist', blacklist.indexOf(value) === -1);
                return value;
            });
        }
    };
});