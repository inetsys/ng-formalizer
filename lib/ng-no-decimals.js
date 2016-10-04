angular.module("formalizer")
.directive("ngNoDecimals", function () {
    return {
        require: "ngModel",
        link: function ($scope, $element, $attrs, $ngModel) {
            $ngModel.$parsers.unshift(function (value) {
                var fstr = "" + value;

                var valid = fstr.indexOf(".") === -1;
                $ngModel.$setValidity("no-decimals", valid);

                return valid ? value : null;
            });
        }
    };
});
