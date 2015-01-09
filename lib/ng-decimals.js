angular.module("formalizer")
.directive("ngDecimals", function () {
    return {
        require: "ngModel",
        link: function ($scope, $elm, $attrs, $ngModel) {
            var max_decimals = parseInt($attrs.ngDecimals, 10) || 4;

            $ngModel.$parsers.unshift(function (value) {
                var fnum = parseFloat(value),
                    fstr = "" + fnum,
                    fdec = 0;

                if (fstr.indexOf(".") !== -1) {
                    fdec = fstr.split(".")[1].length;
                }

                $ngModel.$setValidity("decimals", !isNaN(fnum) && fdec <= max_decimals);

                return value;
            });
        }
    };
});