(function () {
    "use strict";

    Formalizer.templates.push("raw");

    Formalizer.types["raw"] = "raw";

    Formalizer.parsers["raw"] = {
        pre: function ($scope, field_data, $formalizer) {
            field_data.template = $formalizer.$sce.trustAsHtml(field_data.template);
        },
        html: function($scope, field_data, $formalizer, html) {
            return html.replace('%content%', field_data.template);
        }
    };

}());

