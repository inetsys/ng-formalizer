angular.module("formalizer")
.directive("ngServerValidation", ["$http", function ($http) {
    return {
        require: "ngModel",
        link: function ($scope, $elm, $attrs, $ngModel) {
            var url = $attrs.ngServerValidation,
                ngRequestKey = $attrs.ngRequestKey || "value",
                ngResponseKey = $attrs.ngResponseKey || "value";

            $ngModel.$parsers.unshift(function (value) {
                if (!value) {
                    return;
                }

                $ngModel.$setValidity("server-validation-in-progress", false); // spinner
                $ngModel.$setValidity("server-validation", true);

                // send request to server
                var sent_data = {};
                sent_data[ngRequestKey] = value;
                $http.post(url, sent_data)
                    .success(function (data) {
                        $ngModel.$setValidity("server-validation-in-progress", false); // spinner off
                        $ngModel.$setValidity("server-validation", !!data[ngResponseKey]);
                    })
                    .error(function (data) {
                        $ngModel.$setValidity("server-validation-in-progress", false); // spinner off

                        // do nothing is reasonable ?
                    });
                return value;
            });
        }
    };
}]);
