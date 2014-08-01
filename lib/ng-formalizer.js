"use strict";
(function () {

var module;

try {
    //production
    angular.module("formalizer-tpls");
    module = angular.module("formalizer", ["ui.bootstrap", "checklist-model", "formalizer-tpls"]);
} catch (e) {
    //development
    module = angular.module("formalizer", ["ui.bootstrap", "checklist-model"]);
}

module.value("FORMLIZER_CFG", {
});

var templates = {};

var TYPE_TO_TEMPLATE = {
    "text": "input",
    "textarea": "textarea",
    "password": "input",
    "number": "input",
    "email": "input",
    "tel": "input",
    "url": "input",

    "select": "select",
    "datepicker": "input",

    "checkbox": "checkbox",
    "checkbox-list": "checkbox-list",

    "radio-list": "radio-list",

    "typeahead": "typeahead",
    "typeahead-multi": "typeahead",

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

function join_class(target) {
    target["class"] = target["class"].filter(function (cls) {
        return cls && cls.length ? cls : false;
    }).join(" ");
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

var configure = {
    "radio-list": function ($scope, field) {
        field.element.attrs.type = "radio";
        field.container["class"].push("radio");
        safe_array_remove(field.element.attrs["class"], "form-control");

        field.source_model = (field.source_model ? "." + field.source_model : "");
    },
    "checkbox-list": function ($scope, field) {
        var model = field.element.attrs["checklist-model"] = field.element.attrs["ng-model"];

        delete field.element.attrs["ng-model"];

        field.options.chkall_model = field.scope_name + ".options.chkall_value";

        field.source_display = field.source_display || "label";


        // TODO fix bug select all, deselect one, check all again (do nothing)
        field.options.check_all = function () {
            var chkall = $scope.$eval(field.options.chkall_model);
            console.log("chkall", chkall, arguments);

            var mdl = $scope.$eval(model);
            if (mdl === undefined) {
                $scope.$eval(model + " = []");
                mdl = $scope.$eval(model);
            }

            mdl.splice(0, mdl.length);
            if (chkall) {
                var src = $scope.$eval(field.scope_name + ".source");
                src.forEach(function (el, k) {
                    mdl.push(
                        $scope.$eval(field.scope_name + ".source[" + k + "]" + (field.source_model ? "." + field.source_model : ""))
                    );

                });
            }
        };

        //delete field.element.attrs["id"];
        //delete field.element.attrs["name"];

        field.element.attrs["checklist-value"] = "checkbox_data" + (field.source_model ? "." + field.source_model : "");

        field.element.attrs.type = "checkbox";
        field.container["class"].push("checkbox");
        //checkbox-inline

        safe_array_remove(field.element.attrs["class"], "form-control");

    },
    "datepicker": function ($scope, field, cfg) {
        var name = field.element.attrs.name,
            openEvent = name + "Open",
            closeEvent = name + "Close",
            isOpenVar = field.options["datepicker-options"] || name + "Options";

        angular.forEach(datepicker_attrs, function (value) {
            if (field.options[value]) {
                field.element.attrs[value] = field.options[value];
            }
        });

        // calendar button setup
        field.element.wrap["class"].push("input-group");
        field.element.right = "<span class=\"input-group-btn\"><button ng-click=\"" + openEvent + "($event)\" class=\"btn btn-default\" type=\"button\"><i class=\"glyphicon glyphicon-calendar\"></i></button>";

        // forced attrs
        field.element.attrs["is-open"] = isOpenVar;
        field.element.attrs["datepicker-popup"] = field.options["datepicker-popup"] || "yyyy-MM-dd";
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

    "typeahead": function ($scope, field, cfg) {
        field.element.attrs.type = "text";
        if (field.source_display) {
            field.element.attrs.typeahead = "p as p." + field.source_display + " for p in " + field.scope_name + ".source | filter:{" + field.source_display + ":$viewValue}";
        } else {
            field.element.attrs.typeahead = "for p in " + field.scope_name + ".source";
        }

        angular.forEach(typeahead_attrs, function (value) {
            if (field.options[value]) {
                field.element.attrs[value] = field.options[value];
            }
        });
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
            console.log(add_fn);
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

        configure.typeahead($scope, field);
    },
    "button": function ($scope, field, cfg) {
        field.element.attrs["class"] = (cfg["class"] || "") + " btn btn-default";
    },
    "checkbox": function ($scope, field, cfg) {
        field.container["class"].push("checkbox");
    },
    "select": function ($scope, field, cfg) {
        field.defaultOption = cfg.empty_msg ? "<option value=\"\">" + cfg.empty_msg + "</option>" : "";

        field.source_display = field.source_display || "label";

        var mdl = field.source_model ? "." + field.source_model : "";

        field.element.attrs["ng-options"] = "c" + mdl + " as c." + field.source_display + " for c in " + field.scope_name + ".source";

        if (field.options.multiple) {
            field.element.attrs.multiple = "multiple";
        }
    },
    "submit": function ($scope, field, cfg) {
        delete field.element.attrs["ng-model"];
        delete field.element.attrs["ng-class"];
        delete field.element.attrs["ng-placeholder"];
        safe_array_remove(field.element.attrs["class"], "form-control");
        field.element.attrs["class"].push("btn");
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
        source_model: cfg.source_model || null,
        options: angular.extend(cfg.options || {}, {
            scope_name: field_in_scope
        })
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
    field.element.attrs["ng-class"] = "{'has-error': $formalizer.attempts > 0 && " + definition.name + "." + field.element.attrs.name + ".$invalid}";
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
            safe_array_remove(field.label["class"], "control-label");
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
        if ($scope.$formalizer.fields.length > i) {
            continue;
        }

        var field_in_scope = "$formalizer.fields[" + $scope.$formalizer.fields.length + "]";
        field = createFieldConfiguration(definition, fields[i], $scope, field_in_scope);

        // join classes
        join_class(field.element.wrap);
        join_class(field.container);
        join_class(field.element.container);
        join_class(field.element.attrs);
        join_class(field.label);

        attrs = [];
        for (j in field.element.attrs) {
            attrs.push(j + "=\"" + field.element.attrs[j] + "\"");
        }
        attrs = attrs.join(" ");


        if (!TYPE_TO_TEMPLATE[field.type]) {
            throw new Error("invalid type: template not found (" + field.element.attrs.type + ")");
        }

        var field_source = "$formalizer.fields[" + $scope.$formalizer.fields.length + "].source";
        $scope.$formalizer.fields.push(field);

        template = templates[TYPE_TO_TEMPLATE[field.type]];
        if (!template) {
            throw new Error("template not found for: " + field.type);
        }

        //double interpolation!
        var errs = "";

        // interpolate only if needed!
        if (template.indexOf("%element-error-list%") !== -1) {
            errs = $interpolate(
                    $interpolate(templates["error-list"])(field)
                )(field);
        }

        var html = template
                    .replace("%element-attributes%", attrs)
                    .replace("%element-error-list%", errs)
                    .replace(/%scope-form-name%/g, definition.name)
                    .replace(/%scope-field-source%/g, field_source);
        // always escape!
        html = $interpolate(html)(field)

            // TODO this seem to be a bug in $interpolate
            .replace(/\\\{/g, "{").replace(/\\\}/g, "}");

        new_fields.push(html);
    }
}

function formalizerController($scope, $element, $compile, $parse, $interpolate, $http) {
    console.log("(start) formalizerController");

    console.log("(end) formalizerController");
}



function load_templates($q, $http, $templateCache, FORMLIZER_CFG) {
    return $q.all([
        "error-list",
        "input",
        "textarea",
        "checkbox",
        "select",
        "submit",
        "typeahead",
        "checkbox-list",
        "radio-list",
    ].map(function (tpl) {
        // debug
        //var html = $templateCache.get("templates/formalizer-" + tpl + ".tpl.html");
        //if (html) {
        //    templates[tpl] = html
        //    return null;
        //}

        return $http
            .get("templates/formalizer-" + tpl + ".tpl.html", {cache: $templateCache})
            .success(function (html) {
                templates[tpl] = html;
            });
    }));
}

module.filter("formalizer_uq", function () {
    var unique = 0;
    return function (text) {
        return (text || "") + "_" + (++unique);
    };
});

module.directive("formalizer", [
    "$parse", "$compile", "$interpolate", "$http", "$templateCache", "$rootScope", "$timeout", "$q", "FORMLIZER_CFG",
function ($parse, $compile, $interpolate, $http, $templateCache, $rootScope, $timeout, $q, FORMLIZER_CFG) {
    var $ready = load_templates($q, $http, $templateCache, FORMLIZER_CFG),
        parsed_fields = 0;

    return {
        restrict: "A",
        replace: true,
        scope: true,
        templateUrl: "templates/formalizer-form.tpl.html",
        priority: 500,

        controller: function ($scope, $element, $compile) {
            return formalizerController($scope, $element, $compile, $parse, $interpolate, $http);
        },
        compile: function () {
            return {
                pre: function ($scope, $element, $attrs) {
                    var container = jQuery($element).find(".fieldset-contents"),
                    //var container = $element.find(".fieldset-contents"),
                        config = $scope.$eval($attrs.formalizer),
                        $formalizer;

                    $scope.$formalizer = $formalizer = {};

                    angular.extend($formalizer, config);

                    $formalizer.name = $formalizer.name || "form";
                    $formalizer.fields = []; // reset
                    $formalizer.attempts = 0;
                    // vertical|horizontal|inline
                    $formalizer[config.type] = true;

                    if (!$formalizer.onSubmit) {
                        throw new Error("options.onSubmit is required");
                    }

                    $formalizer.submit = function () {
                        var on_submit = $parse(config.onSubmit)($scope.$parent),
                            form = $scope[config.name];

                        ++$formalizer.attempts;

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
                        if (!fields) {
                            return;
                        }

                        console.log("--> fields: ", fields.length);

                        var new_fields = [],
                            new_elements = [];
                        parsed_fields = parseFields(config, fields, new_fields,
                            $scope, $element, $compile, $parse, $interpolate);

                        angular.forEach(new_fields, function (fel) {
                            //console.log(fel);
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

                    // watch fields and generate HTML after every template is loaded
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
