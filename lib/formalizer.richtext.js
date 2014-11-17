(function () {
    "use strict";

    function safe_array_remove(arr, item) {
        var cut = arr.indexOf(item);
        if (cut !== -1) {
            return arr.splice(cut, 1);
        }

        return false;
    }

    Formalizer.templates.push("richtext");

    Formalizer.types.richtext = "richtext";

    Formalizer.parsers.richtext = function ($scope, field) {
        safe_array_remove(field.element.attrs["class"], "form-control");
    };
}());