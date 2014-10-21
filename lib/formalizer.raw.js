(function () {
    "use strict";

    Formalizer.templates.push("raw");

    Formalizer.types["raw"] = "raw";

    Formalizer.parsers["raw"] = {
        attached: function($scope, $field, $formalizer) {
            $scope.$watch("$field.template", function(a, b) {
                $field.formalizer.domElement.html(a);
            });
        }
    };

}());

