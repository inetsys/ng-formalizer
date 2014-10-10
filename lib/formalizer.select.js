(function () {
    "use strict";

    Formalizer.templates.push("select");

    Formalizer.types.select = "select";

    Formalizer.parsers.select = function ($scope, field, cfg) {
        field.defaultOption = cfg.empty_msg ? "<option value=\"\">" + cfg.empty_msg + "</option>" : "";

        field.source_display = field.source_display || "label";

        var mdl = field.source_model ? "." + field.source_model : "";

        field.element.attrs["ng-options"] = "c" + mdl + " as c." + field.source_display + " for c in $field['$$'].source";

        if (field.options.multiple) {
            field.element.attrs.multiple = "multiple";
        }
    };
}());

