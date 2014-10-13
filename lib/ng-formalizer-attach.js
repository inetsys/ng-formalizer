angular.module("formalizer")
.directive("ngFormalizerAttach", function () {
    return {
        require: "?^ngFormalizer",
        link: function ($scope, $elm, $attrs, $ngFormalizer) {
            if (!$ngFormalizer) {
                return;
            }

            $ngFormalizer.__fields[$attrs.ngFormalizerAttach].domElement = $elm;
        }
    };
});