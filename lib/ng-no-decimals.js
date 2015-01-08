angular.module("formalizer")
.directive("ngNoDecimals", function () {
    return {
        require: "ngModel",
        link: function ($scope, $elm, $attrs, $ngModel) {
            $ngModel.$parsers.unshift(function (value) {
                var fstr = "" + value;

                $ngModel.$setValidity("no-decimals",
                    fstr.indexOf(".") === -1 && fstr.indexOf(",") === -1);

                return value;
            });
        }
    };
});