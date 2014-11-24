(function () {
    "use strict";

    function safe_array_remove(arr, item) {
        var cut = arr.indexOf(item);
        if (cut !== -1) {
            return arr.splice(cut, 1);
        }

        return false;
    }

    Formalizer.templates.push("checkbox");

    Formalizer.types.checkbox = "checkbox";

    Formalizer.parsers.checkbox = function ($scope, field, cfg) {
        field.container["class"].push("checkbox");
        safe_array_remove(field.element.attrs["class"], "form-control");
    };
}());

