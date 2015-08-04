(function () {
    "use strict";

    function safe_array_remove(arr, item) {
      var cut = arr.indexOf(item);
      if (cut !== -1) {
        return arr.splice(cut, 1);
      }

      return false;
    }

    Formalizer.templates.push("input");
    Formalizer.templates.push("hidden");

    Formalizer.types.text = "input";
    Formalizer.types.password = "input";
    Formalizer.types.number = "input";
    Formalizer.types.email = "input";
    Formalizer.types.tel = "input";
    Formalizer.types.url = "input";
    Formalizer.types.file = "input";
    Formalizer.types.lcheckbox = "input";
    Formalizer.types.hidden = "hidden";

    // do not need anything more :)
    Formalizer.parsers.lcheckbox = function ($scope, field, cfg) {
      field.element.attrs.type = "checkbox";

      field.element.container["class"].push("checkbox");
      safe_array_remove(field.element.attrs["class"], "form-control");
    };
}());
