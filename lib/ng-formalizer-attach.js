angular.module("formalizer")
.directive("ngFormalizerAttach", function () {
    return {
        require: "^ngFormalizer",
        link: function ($scope, $elm, $attrs, $ngFormalizer) {
            if (!$ngFormalizer) {
                return;
            }

            $ngFormalizer.fields[$attrs.ngFormalizerAttach].domElement = $elm;

            console.log("ngFormalizer.fields", $ngFormalizer);

        }
    };
});