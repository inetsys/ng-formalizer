(function () {
    "use strict";

    Formalizer.templates.push("raw");

    Formalizer.types["raw"] = "raw";

    Formalizer.parsers["raw"] = {
        attached: function($scope, $field, $formalizer, $compile) {
            var $elm = $field.formalizer.domElement;
            $scope.$watch("$field.template", function(a, b) {
                $elm.html(a);
                console.log("$field.template", $field);
                if ($field.options.compile) {
                  $compile($elm.contents())($scope);
                }
            });
        }
    };

}());
