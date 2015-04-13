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
                // fix clear field
                // if it's NaN give number error not this one.
                if (!value || isNaN(fnum)) {
                  $ngModel.$setValidity("decimals", true);
                  return value;
                }

                if (fstr.indexOf(".") !== -1) {
                    fdec = fstr.split(".")[1].length;
                }

                $ngModel.$setValidity("decimals", fdec <= max_decimals);

                return value;
            });
        }
    };
});
