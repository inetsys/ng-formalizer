(function () {
    "use strict";

    function safe_array_remove(arr, item) {
        var cut = arr.indexOf(item);
        if (cut !== -1) {
            return arr.splice(cut, 1);
        }

        return false;
    }

    Formalizer.templates.push("ui-select");

    Formalizer.types["ui-select"] = "ui-select";

    Formalizer.parsers["ui-select"] = function ($scope, field, cfg) {
        field.source_display = field.source_display || "label";

        field.element.attrs["ng-class"] = [];

        safe_array_remove(field.element.attrs["class"], "form-control");

        /*
        var mdl = field.source_model ? "." + field.source_model : "";

        field.element.attrs["ng-options"] = "c" + mdl + " as c." + field.source_display + " for c in $field.formalizer.source";

        if (field.source_filter) {
          field.element.attrs["ng-options"] += " | " + field.source_filter + ":c";
        }

        if (field.options.multiple) {
            field.element.attrs.multiple = "multiple";
        }
        */
    };
}());
