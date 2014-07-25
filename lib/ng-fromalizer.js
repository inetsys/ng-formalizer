"use strict";
(function() {

var module = angular.module("formalizer", []);

var templates = {};

var TYPE_TO_TEMPLATE = {
    "checkbox-list": "checkbox-list",
    "textarea": "textarea",
    "datepicker": "input",
    "password": "input",
    "number": "input",
    "email": "input",
    "text": "input",

    "select": "select",
    "checkbox": "checkbox",
    "typeahead-multi": "typeahead",
    "typeahead": "typeahead",
    "submit": "submit"
};

var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
var MOZ_HACK_REGEXP = /^moz([A-Z])/;

/**
 * Converts snake_case to camelCase.
 * Also there is special case for Moz prefix starting with upper case letter.
 * @param name Name to normalize
 */
function camelCase(name) {
    return name
        .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter;
        })
        .replace(MOZ_HACK_REGEXP, "Moz$1");
}

function safe_array_remove(arr, item) {
    var cut = arr.indexOf(item);
    if (cut !== -1) {
        return arr.splice(cut, 1);
    }

    return false;
}


//from http://angular-ui.github.io/bootstrap
var datepicker_attrs = [
    "datepicker-mode",
    "min-date",
    "max-date",
    "date-disabled",
    "show-weeks",
    "starting-day",
    "init-date",
    "min-mode",
    "max-mode",
    "format-day",
    "format-month",
    "format-year",
    "format-day-header",
    "format-day-title",
    "format-month-title",
    "year-range",
    // popup,
    //,"datepicker-popup",
    "show-button-bar",
    "current-text",
    "clear-text",
    "close-text",
    "close-on-date-selection",
    "datepicker-append-to-body",
    "datepicker-options"
];

var configure = {
    "checkbox-list": function ($scope, field) {
        field.element.attrs["checklist-model"] = field.element.attrs["ng-model"];
        delete field.element.attrs["ng-model"];

        field.element.attrs.type = "checkbox";
        field.container["class"].push("checkbox");

        safe_array_remove(field.element.attrs["class"], "form-control");
    },
    "datepicker": function ($scope, field, cfg) {
        cfg.datepicker = cfg.datepicker || {};

        var name = field.element.attrs.name,
            openEvent = name + "Open",
            closeEvent = name + "Close",
            isOpenVar = cfg.datepicker["datepicker-options"] || name + "Options";

        angular.forEach(datepicker_attrs, function (value) {
            if (cfg.datepicker[value]) {
                field.element.attrs[value] = cfg.datepicker[value];
            }
        });

        // calendar button setup
        field.element.wrap["class"].push("input-group");
        field.element.right = "<span class=\"input-group-btn\"><button ng-click=\"" + openEvent + "($event)\" class=\"btn btn-default\" type=\"button\"><i class=\"glyphicon glyphicon-calendar\"></i></button>";

        // forced attrs
        field.element.attrs["is-open"] = isOpenVar;
        field.element.attrs["datepicker-popup"] = cfg.datepicker["datepicker-popup"] || "yyyy-MM-dd";
        field.element.attrs["ng-focus"] = openEvent + "()";


        $scope[isOpenVar] = false;

        $scope[closeEvent] = function ($event) {
            $scope[isOpenVar] = false;
        };

        $scope[openEvent] = function ($event) {
            //only prevent if sent
            if ($event) {
                $event.preventDefault();
                $event.stopPropagation();
            }

            $scope[isOpenVar] = true;

            if ($event) {
                setTimeout(function () {
                    angular.element("#" + field.element.attrs.id).focus();
                }, 0);
            }

            // @TODO we should close other instances here
            // so we need an array of instances too
            //if ($scope.endDateOpened) {
            //    $scope.closeEndDate();
            //}
        };
    },

    "typeahead": function ($scope, field) {
        if (field.source_display) {
            field.element.attrs.typeahead = "p as p." + field.source_display + " for p in " + field.scope_name + ".source | filter:{" + field.source_display + ":$viewValue}";
        } else {
            field.element.attrs.typeahead = "for p in " + field.scope_name + ".source";
        }
    },
    "typeahead-multi": function ($scope, field) {
        var name = field.element.attrs.name,
            add_fn = camelCase("add-" + name),
            del_fn = camelCase("del-" + name),
            ta_model = field.element.attrs["ng-model"],
            ta_model_selected = field.element.attrs["ng-model"] + "_sel";

        field.element.attrs["ng-model"] = ta_model_selected;

        var target = $scope.$eval(ta_model);
        if (target === undefined) {
            console.log("set model to default value!");
            $scope.$eval(ta_model + " = []");
        }

        $scope[add_fn] = function ($item, $model, $label) {
            var target = $scope.$eval(ta_model);

            if (target.indexOf($item) === -1) {
                target.push($item);
            }

            $scope.$eval(ta_model_selected + " = ''");
        };


        $scope[del_fn] = function ($item) {
            var target = $scope.$eval(ta_model);

            safe_array_remove(target, $item);
        };

        field.options.model = ta_model;
        field.options.del_fn = del_fn;

        field.element.attrs["typeahead-on-select"] = add_fn + "($item, $model, $label)";

        configure["typeahead"]($scope, field);
    },
    "button": function($scope, field, cfg) {
        field.element.attrs["class"] = (cfg["class"] || "") + " btn btn-default";
    },
    "checkbox": function($scope, field, cfg) {
        field.container["class"].push("checkbox");
    },
    "select": function($scope, field, cfg) {
        field.defaultOption = cfg.empty_msg ? "<option value=\"\">" + cfg.empty_msg + "</option>" : "";
    }
};

function createFieldConfiguration(definition, cfg, $scope, field_in_scope) {
    var key;

    cfg.constraints = cfg.constraints || {};
    cfg.labelClass = cfg.labelClass || "";
    cfg["class"] = cfg["class"] || "";

    var field = {
        type: cfg.type || "text",
        scope_name: field_in_scope,
        container: {
            "class": ["form-group"]
        },
        label: {
            text: cfg.label || "",
            "class": ["control-label"].concat(cfg.labelClass.split(" "))
        },
        element: {
            container: {
                "class": []
            },
            wrap: {
                "class": []
            },
            attrs: {
                name: cfg.name,
                id: definition.name + "-" + cfg.name,
                type: cfg.type || "text"
            },

            // <span class="input-group-addon">XXX</span>
            // <span class="input-group-btn"><button></button></span>
            right: "",
            left: ""
        },
        messages: cfg.messages || {},
        help: {
            text: cfg.helpText || ""
        },
        source: null,
        source_display: cfg.source_display || null,
        options: {
            scope_name: field_in_scope
        }
    };

    var name = field.element.attrs.name;

    // TODO watch ?!

    if (typeof cfg.source === "string") {
        field.source = $scope.$eval(cfg.source);
    } else if (cfg.source !== undefined) {
        field.source = cfg.source;
    }

    field.element.attrs["ng-model"] = cfg.model || definition.model + "." + name;
    field.element.attrs["class"] = ["form-control"].concat(cfg["class"].split(" "));
    field.element.attrs["ng-class"] = "{'has-error': $fromalizer.attempts > 0 && " + definition.name + "." + field.element.attrs.name + ".$invalid}";
    field.element.attrs["ng-placeholder"] = cfg.placeholder || "";

    // constraints
    for (key in cfg.constraints) {
        field.element.attrs["ng-" + key] = cfg.constraints[key];
    }


    switch (definition.type) {
    case "horizontal":
        if (cfg.type === "checkbox") {
            field.element.container["class"].push("col-sm-offset-2");
            field.label["class"].push("col-sm-9");
            safe_array_remove(field.label["class"], "control-label")
        } else {
            field.element.container["class"].push("col-sm-9");
            field.label["class"].push("col-sm-2");
        }
        break;
    case "vertical":
        break;
    case "inline":
        break;
    }

    // config per field
    if (configure[cfg.type]) {
        configure[cfg.type]($scope, field, cfg);
    }

    console.log(field);

    return field;
}

function parseFields(definition, fields, new_fields,
    $scope, $element, $compile, $parse, $interpolate) {

    var i,
        max,
        j,
        attrs,
        template,
        field;

    for (i = 0, max = fields.length; i < max; ++i) {
        if (!fields[i].name) {
            throw new Error("invalid field without name");
        }
        // already parsed ?
        if ($scope.$fromalizer.fields.length > i) {
            continue;
        }

        var field_in_scope = "$fromalizer.fields[" + $scope.$fromalizer.fields.length + "]";
        field = createFieldConfiguration(definition, fields[i], $scope, field_in_scope);

        // join classes
        field.element.wrap["class"] = field.element.wrap["class"].join(" ");
        field.container["class"] = field.container["class"].join(" ");
        field.element.container["class"] = field.element.container["class"].join(" ");
        field.element.attrs["class"] = field.element.attrs["class"].join(" ");
        field.label["class"] = field.label["class"].join(" ");

        attrs = [];
        for (j in field.element.attrs) {
            attrs.push(j + "=\"" + field.element.attrs[j] + "\"");
        }
        attrs = attrs.join(" ");


        if (!TYPE_TO_TEMPLATE[field.element.attrs.type]) {
            throw new Error("invalid type: template not found (" + field.element.attrs.type + ")");
        }

        var field_source = "$fromalizer.fields[" + $scope.$fromalizer.fields.length + "].source";
        $scope.$fromalizer.fields.push(field);

        template = templates[TYPE_TO_TEMPLATE[fields[i].type]];
        if (!template) {
            throw new Error("template not found for: " + fields[i].type);
        }

        //double interpolation!
        var errs = $interpolate(
            $interpolate(templates["error-list"])(field).replace(/\{\\\{/g, "{{").replace(/\}\\\}/g, "}}")
        )(field);

        new_fields.push($interpolate(
                template
                    .replace("%element-attributes%", attrs)
                    .replace("%element-error-list%", errs)
                    .replace(/%form-name%/g, definition.name)
                    .replace(/%field-source%/g, field_source)
            )(field)
            .replace(/\{\\\{/g, "{{").replace(/\}\\\}/g, "}}")
        );
    }
}

function formalizerController($scope, $element, $compile, $parse, $interpolate, $http) {
    console.log("(start) formalizerController");

    console.log("(end) formalizerController");
}



function load_templates($q, $http, $templateCache) {
    return $q.all([
        "error-list",
        "input",
        "textarea",
        "checkbox",
        "select",
        "submit",
        "typeahead",
        "checkbox-list",
    ].map(function(tpl) {
        return $http
            .get("formalizer-" + tpl + ".tpl.html", {cache: $templateCache})
            .success(function (html) {
                templates[tpl] = html;
            });
    }));
}

module.filter('fromalizer_uq', function() {
    var unique = 0;
    return function(text) {
         return (text || '') + "_" + (++unique);
    };
})

module.directive("fromalizer", [
    "$parse", "$compile", "$interpolate", "$http", "$templateCache", "$rootScope", "$timeout", "$q",
function ($parse, $compile, $interpolate, $http, $templateCache, $rootScope, $timeout, $q) {
    var $ready = load_templates($q, $http, $templateCache),
        parsed_fields = 0;

    return {
        restrict: "A",
        replace: true,
        scope: true,
        templateUrl: "formalizer-form.tpl.html",
        priority: 500,

        controller: function ($scope, $element, $compile) {
            return formalizerController($scope, $element, $compile, $parse, $interpolate, $http);
        },
        compile: function () {
            return {
                pre: function ($scope, $element, $attrs) {
                    var container = jQuery($element).find(".fieldset-contents"),
                    //var container = $element.find(".fieldset-contents"),
                        config = $scope.$eval($attrs.fromalizer),
                        $fromalizer;

                    $scope.$fromalizer = $fromalizer = {};

                    angular.extend($fromalizer, config);

                    $fromalizer.name = $fromalizer.name || "form";
                    $fromalizer.fields = []; // reset
                    $fromalizer.attempts = 0;
                    // vertical|horizontal|inline
                    $fromalizer[config.type] = true;

                    if (!$fromalizer.onSubmit) {
                        throw new Error("options.onSubmit is required");
                    }

                    $fromalizer.submit = function () {
                        var on_submit = $parse(config.onSubmit)($scope.$parent),
                            form = $scope[config.name];

                        ++$fromalizer.attempts;

                        if (form.$valid) {
                            // pristile
                            var i,
                                ret = {};

                            for (i in form) {
                                if (form[i].$dirty) {
                                    ret[i] = form[i].$modelValue;
                                }
                            }

                            return on_submit(ret);
                        }
                        console && console.info && console.info("form.$invalid = true");
                    };

                    function update_fields(fields, o) {
                        console.log("--> fields: ", fields.length);
                        var new_fields = [],
                            new_elements = [];
                        parsed_fields = parseFields(config, fields, new_fields,
                            $scope, $element, $compile, $parse, $interpolate);

                        angular.forEach(new_fields, function (fel) {
                            //var el = jQuery(fel);
                            var el = angular.element(fel);
                            new_elements.push(el);
                            container.append(el);
                        });

                        //$compile($element.contents())($scope);
                        $timeout(function() {
                            angular.forEach(new_elements, function (el) {
                                $compile(el.contents())($scope);
                            });

                            $scope.$digest();
                        });
                    }

                    $ready.then(function() {
                        if ("string" === typeof config.fields) {
                            return $scope.$watch(config.fields, update_fields, true);
                        }

                        update_fields(config.fields);
                    });
                },
                post: function ($scope, $element, $attrs) {
                }
            };
        }
    };
}]);

})();