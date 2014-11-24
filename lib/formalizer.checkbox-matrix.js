(function () {
    "use strict";

    function safe_array_remove(arr, item) {
        var cut = arr.indexOf(item);
        if (cut !== -1) {
            return arr.splice(cut, 1);
        }

        return false;
    }

    Formalizer.templates.push("checkbox-matrix");

    Formalizer.types["checkbox-matrix"] = "checkbox-matrix";

    Formalizer.parsers["checkbox-matrix"] = function ($scope, field, cfg) {
        // this class should be used, but destroy the table style
        // field.container["class"].push("checkbox");

        safe_array_remove(field.element.attrs["class"], "form-control");

        // swap places
        field.options.model = field.element.attrs["ng-model"];
        delete field.element.attrs["ng-model"];

        field.options.name = field.element.attrs["name"];
        delete field.element.attrs["name"];

        field.options.id = field.element.attrs["id"];
        delete field.element.attrs["id"];

        field.element.attrs["type"] = "checkbox";

        if (!field.source_model) {
            field.source_model = [[],[]];

            field.source_display[0].forEach(function() {
                field.source_model[0].push(field.source_model[0].length);
            });
            field.source_display[1].forEach(function() {
                field.source_model[1].push(field.source_model[1].length);
            });

        }
    };
}());

