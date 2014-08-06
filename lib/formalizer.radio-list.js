(function () {
    "use strict";

    function safe_array_remove(arr, item) {
        var cut = arr.indexOf(item);
        if (cut !== -1) {
            return arr.splice(cut, 1);
        }

        return false;
    }

    Formalizer.templates.push("radio-list");

    Formalizer.types["radio-list"] = "radio-list";

    Formalizer.parsers["radio-list"] = function ($scope, field) {
        field.element.attrs.type = "radio";
        field.container["class"].push("radio");
        safe_array_remove(field.element.attrs["class"], "form-control");

        field.source_model = (field.source_model ? "." + field.source_model : "");
    };

}());

