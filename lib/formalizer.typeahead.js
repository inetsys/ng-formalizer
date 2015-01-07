(function () {
    "use strict";

    var typeahead_attrs = [
        //"typeahead",
        //"typeahead-on-select",
        "typeahead-append-to-body",
        "typeahead-editable",
        "typeahead-input-formatter",
        "typeahead-loading",
        "typeahead-min-length",
        "typeahead-template-url",
        "typeahead-wait-ms"
    ];

    function safe_array_remove(arr, item) {
        var cut = arr.indexOf(item);
        if (cut !== -1) {
            return arr.splice(cut, 1);
        }

        return false;
    }

    Formalizer.templates.push("typeahead");

    Formalizer.types.typeahead = "typeahead";
    Formalizer.types["typeahead-multi"] = "typeahead";

    Formalizer.parsers.typeahead = function ($scope, field) {
        field.element.attrs.type = "text";
        if (field.source_display) {
            field.element.attrs.typeahead = "p as p." + field.source_display + " for p in $field.formalizer.source | filter:{" + field.source_display + ":$viewValue}";
        } else {
            field.element.attrs.typeahead = "p for p in $field.formalizer.source";
        }

        angular.forEach(typeahead_attrs, function (value) {
            if (field.options[value]) {
                field.element.attrs[value] = field.options[value];
            }
        });
    };

    Formalizer.parsers["typeahead-multi"] = function ($scope, field) {
        var name = field.element.attrs.name,
            ta_model = field.element.attrs["ng-model"],
            ta_model_selected = field.element.attrs["ng-model"] + "_sel";

        field.element.attrs["ng-model"] = ta_model_selected;

        var target = $scope.$eval(ta_model);
        if (target === undefined) {
            //console.log("set model to default value!");
            $scope.$eval(ta_model + " = []");
        }

        $scope["taSelected"] = field.options.taSelected || function () {
            return $scope.$eval(ta_model);
        };

        $scope["taAppend"] = function ($item, $model, $label) {
            if (field.options.taAppend) {
                field.options.taAppend($item, $model, $label);
            } else {
                var target = $scope.$eval(ta_model);

                if (target.indexOf($item) === -1) {
                    target.push($item);
                }
            }

            $scope.$eval(ta_model_selected + " = ''");
        };


        $scope["taRemove"] = field.options.taRemove || function ($item) {
            var target = $scope.$eval(ta_model);

            safe_array_remove(target, $item);
        };

        field.element.attrs["typeahead-on-select"] = "taAppend($item, $model, $label)";

        Formalizer.parsers.typeahead($scope, field);
    };

}());

