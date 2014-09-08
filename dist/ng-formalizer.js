var Formalizer;

(function () {
    "use strict";

    var templates = {};

    function safe_array_remove(arr, item) {
        var cut = arr.indexOf(item);
        if (cut !== -1) {
            return arr.splice(cut, 1);
        }

        return false;
    }

    function join_class(target) {
        target["class"] = target["class"].filter(function (cls) {
            return cls && cls.length ? cls : false;
        }).join(" ");
    }


    Formalizer = function ($scope, $parse, $log) {
        this.options = {};
        this.fields = [];

        this.$scope = $scope;
        this.$parse = $parse;
        this.$log = $log;
    };

    Formalizer.prototype.options = null;
    Formalizer.prototype.name = null;
    Formalizer.prototype.fields = null;

    Formalizer.prototype.attempts = 0;

    Formalizer.prototype.horizontal = false;
    Formalizer.prototype.vertical = false;
    Formalizer.prototype.inline = false;

    Formalizer.prototype.$scope = null;
    Formalizer.prototype.$parse = null;
    Formalizer.prototype.$log = null;

    // match between templates and field.type
    Formalizer.types = {};
    Formalizer.templates = [];
    Formalizer.parsers = {};

    Formalizer.loadTemplates = function ($q, $http, $templateCache, FormalizerConfig) {
        return $q.all(this.templates.concat([
            "error-list",
            "input",
            "textarea",
            "checkbox",
            "select",
            "submit",
            "typeahead",
            "checkbox-list",
        ]).map(function (tpl) {
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
    };

    Formalizer.prototype.getTemplate = function (type) {
        var template = templates[Formalizer.types[type]] || null;

        if (!template) {
            throw new Error("template not found for: " + type);
        }

        return template;
    };

    Formalizer.prototype.setOptions = function (options) {
        angular.extend(this.options, options);

        this.name = this.options.name || "form";

        this[this.options.type] = true;

        if (!this.options.onSubmit) {
            throw new Error("options.onSubmit is required");
        }
    };

    Formalizer.prototype.submit = function () {
        var on_submit = this.$parse(this.options.onSubmit)(this.$scope.$parent),
            form = this.$scope[this.name];

        ++this.attempts;

        if (form.$valid) {
            // pristile
            var i,
                j,
                el,
                data = {},
                files = null,
                field_data;

            for (i in form) {
                if (i[0] === "$") continue;

                //console.log(i, form[i]);
                field_data = this.fields.filter(function(v) { return v.element.attrs.name === i});

                if (form[i].$dirty) {
                    data[i] = form[i].$modelValue;
                } else if (field_data && field_data.length && field_data[0].type === "file") { // check if it's a file
                    el = field_data[0].domElement[0];

                    files = files || [];

                    //files[i] = [];

                    for (j = 0; j < el.files.length; ++j) {
                        //files[i].push(el.files[j]);
                        files.push(el.files[j]);
                    }
                }
            }

            return on_submit(data, files, this.$scope.$eval(this.options.model), form);
        }

        this.$log.info("$invalid = true, no submit");
    };

    Formalizer.prototype.parseField = function (type, field) {
        if (Formalizer.parsers[type]) {
            Formalizer.parsers[type](this.$scope, field, this);
        }
    };

    Formalizer.prototype.addField = function (cfg, field_in_scope, field_id) {
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
                    id: this.name + "-" + cfg.name,
                    type: cfg.type || "text",
                    "ng-formalizer-attach": field_id
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
            field.source = this.$scope.$eval(cfg.source);
        } else if (cfg.source !== undefined) {
            field.source = cfg.source;
        }

        field.element.attrs["ng-model"] = cfg.model || this.options.model + "." + name;
        field.element.attrs["class"] = ["form-control"].concat(cfg["class"].split(" "));
        field.element.attrs["ng-class"] = "{'has-error': $formalizer.attempts > 0 && " + this.name + "." + field.element.attrs.name + ".$invalid}";
        field.element.attrs["ng-placeholder"] = cfg.placeholder || "";

        // constraints
        for (key in cfg.constraints) {
            field.element.attrs["ng-" + key] = cfg.constraints[key];
        }


        switch (this.options.type) {
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

        // specific config per field
        this.parseField(cfg.type, field);

        return field;
    };

    Formalizer.prototype.addFields = function (fields, $interpolate) {
        var i,
            max,
            j,
            attrs,
            template,
            field,
            new_fields = [];

        for (i = 0, max = fields.length; i < max; ++i) {
            if (!fields[i].name && fields[i].type !== "raw") {
                throw new Error("invalid field without name");
            }

            // already parsed ?
            if (this.fields.length > i) {
                continue;
            }

            var field_id = this.fields.length,
                field_in_scope = "$formalizer.fields[" + field_id + "]";
            field = this.addField(fields[i], field_in_scope, field_id);

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


            var field_source = "$formalizer.fields[" + field_id + "].source";
            this.fields.push(field);

            template = this.getTemplate(field.type);

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
                        .replace(/%scope-form-name%/g, this.name)
                        .replace(/%scope-field-source%/g, field_source);
            // always escape!
            html = $interpolate(html)(field)

                // TODO this seem to be a bug in $interpolate
                .replace(/\\\{/g, "{").replace(/\\\}/g, "}");

            new_fields.push(html);
        }

        return new_fields;
    };

    Formalizer.prototype.setModel = function (field_name, value, force) {
        var model = this.$scope.$eval(this.options.model);

        // not defined or forced
        if (!model[field_name] || force) {
            model[field_name] = value;
        }

        if (Array.isArray(model[field_name]) && force) {
            if (model[field_name].indexOf(value) === -1) {
                model[field_name].push(value);
            }
        }
    }

}());
(function () {
    "use strict";

    Formalizer.templates.push("raw");

    Formalizer.types["raw"] = "raw";

    Formalizer.parsers["raw"] = function ($scope, field) {

    };

}());


(function () {
    "use strict";

    function safe_array_remove(arr, item) {
        var cut = arr.indexOf(item);
        if (cut !== -1) {
            return arr.splice(cut, 1);
        }

        return false;
    }

    Formalizer.templates.push("submit");

    Formalizer.types.submit = "submit";

    Formalizer.parsers.submit = function ($scope, field, cfg) {
        delete field.element.attrs["ng-model"];
        delete field.element.attrs["ng-class"];
        delete field.element.attrs["ng-placeholder"];
        safe_array_remove(field.element.attrs["class"], "form-control");
        field.element.attrs["class"].push("btn");
    };
}());


(function () {
    "use strict";

    Formalizer.templates.push("select");

    Formalizer.types.select = "select";

    Formalizer.parsers.select = function ($scope, field, cfg) {
        field.defaultOption = cfg.empty_msg ? "<option value=\"\">" + cfg.empty_msg + "</option>" : "";

        field.source_display = field.source_display || "label";

        var mdl = field.source_model ? "." + field.source_model : "";

        field.element.attrs["ng-options"] = "c" + mdl + " as c." + field.source_display + " for c in " + field.scope_name + ".source";

        if (field.options.multiple) {
            field.element.attrs.multiple = "multiple";
        }
    };
}());


(function () {
    "use strict";

    Formalizer.templates.push("textarea");

    Formalizer.types.textarea = "textarea";

    Formalizer.parsers.textarea = function ($scope, field, cfg) {
    };
}());


(function () {
    "use strict";

    Formalizer.templates.push("checkbox");

    Formalizer.types.checkbox = "checkbox";

    Formalizer.parsers.checkbox = function ($scope, field, cfg) {
        field.container["class"].push("checkbox");
    };
}());


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

    Formalizer.templates.push("typeahead");

    Formalizer.types.typeahead = "typeahead";
    Formalizer.types["typeahead-multi"] = "typeahead";

    Formalizer.parsers.typeahead = function ($scope, field) {
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
    };

    Formalizer.parsers["typeahead-multi"] = function ($scope, field) {
        var name = field.element.attrs.name,
            add_fn = camelCase("add-" + name),
            del_fn = camelCase("del-" + name),
            ta_model = field.element.attrs["ng-model"],
            ta_model_selected = field.element.attrs["ng-model"] + "_sel";

        field.element.attrs["ng-model"] = ta_model_selected;

        var target = $scope.$eval(ta_model);
        if (target === undefined) {
            //console.log("set model to default value!");
            $scope.$eval(ta_model + " = []");
        }

        $scope[add_fn] = function ($item, $model, $label) {
            //console.log(add_fn);
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

        Formalizer.parsers.typeahead($scope, field);
    };

}());


(function () {
    "use strict";

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

    //Formalizer.templates.push("input");

    Formalizer.types.datepicker = "input";

    Formalizer.parsers.datepicker = function ($scope, field) {
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
        field.element.attrs["datepicker-popup"] = field.options["datepicker-popup"] || "";
        field.element.attrs["ng-focus"] = openEvent + "()";

        field.element.attrs["ng-datepicker-fix"] = "";

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
    };

}());


(function () {
    "use strict";

    Formalizer.templates.push("input");


    Formalizer.types.text = "input";
    Formalizer.types.password = "input";
    Formalizer.types.number = "input";
    Formalizer.types.email = "input";
    Formalizer.types.tel = "input";
    Formalizer.types.url = "input";
    Formalizer.types.file = "input";

    // do not need anything more :)
}());


(function () {
    "use strict";

    function safe_array_remove(arr, item) {
        var cut = arr.indexOf(item);
        if (cut !== -1) {
            return arr.splice(cut, 1);
        }

        return false;
    }

    Formalizer.templates.push("checkbox-list");

    Formalizer.types["checkbox-list"] = "checkbox-list";

    Formalizer.parsers["checkbox-list"] = function ($scope, field) {
        var model = field.element.attrs["checklist-model"] = field.element.attrs["ng-model"];

        delete field.element.attrs["ng-model"];

        field.options.chkall_model = field.scope_name + ".options.chkall_value";

        field.source_display = field.source_display || "label";


        // TODO fix bug select all, deselect one, check all again (do nothing)
        field.options.check_all = function () {
            var chkall = $scope.$eval(field.options.chkall_model),
                mdl = $scope.$eval(model);

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

    };
}());


(function () {
    "use strict";

    function safe_array_remove(arr, item) {
        var cut = arr.indexOf(item);
        if (cut !== -1) {
            return arr.splice(cut, 1);
        }

        return false;
    }

    Formalizer.templates.push("slider");

    Formalizer.types["slider"] = "slider";

    Formalizer.parsers["slider"] = function ($scope, field) {
        safe_array_remove(field.element.attrs["class"], "form-control");

        // slider.js:L26-L57 version 0.5 review when update!
        ["min", "max", "step","precision","orientation","range","selection",
        "tooltip","tooltipSeparator","tooltipSplit","handle","reversed",
        "enabled","naturalArrowKeys","sliderId", "updateEvent"].forEach(function(i) {
            if (field.options[i] !== undefined) {
                field.element.attrs[i] = field.options[i];
            }
        });
    };
}());


"use strict";
(function () {

    var module;

    try {
        //production
        angular.module("formalizer-tpls");
        module = angular.module("formalizer", ["ui.bootstrap", "checklist-model", "ui.bootstrap-slider", "formalizer-tpls"]);
    } catch (e) {
        //development
        module = angular.module("formalizer", ["ui.bootstrap", "checklist-model", "ui.bootstrap-slider"]);
    }

    module.value("FormalizerConfig", {
    });

    module.directive("ngFormalizer", [
        "$parse", "$compile", "$interpolate", "$http", "$templateCache", "$rootScope", "$timeout", "$q", "$log", "FormalizerConfig",
        function ($parse, $compile, $interpolate, $http, $templateCache, $rootScope, $timeout, $q, $log, FormalizerConfig) {
            var $ready = Formalizer.loadTemplates($q, $http, $templateCache, FormalizerConfig),
                parsed_fields = 0;

            return {
                restrict: "A",
                replace: true,
                scope: true,
                templateUrl: "templates/formalizer-form.tpl.html",
                priority: 500,

                controller: function ($scope, $element, $compile) {
                    return $scope.$formalizer = new Formalizer($scope, $parse, $log);
                },
                compile: function () {
                    return {
                        pre: function ($scope, $element, $attrs) {
                            var container = jQuery($element).find(".fieldset-contents"),
                                //container = $element.find(".fieldset-contents"),
                                config = $scope.$eval($attrs.ngFormalizer),
                                $formalizer = $scope.$formalizer;

                            $formalizer.setOptions(config);

                            function update_fields(fields, o) {
                                if (!fields) {
                                    return;
                                }

                                //console.log("--> fields: ", fields.length);

                                var new_elements = [];

                                var new_fields = $formalizer.addFields(fields, $interpolate);

                                angular.forEach(new_fields, function (fel) {
                                    //console.log(fel);
                                    //var el = jQuery(fel);
                                    var el = angular.element(fel);
                                    new_elements.push(el);
                                    container.append(el);
                                });

                                //$compile($element.contents())($scope);
                                $timeout(function () {
                                    angular.forEach(new_elements, function (el) {
                                        $compile(el.contents())($scope);
                                    });

                                    $scope.$digest();
                                });
                            }

                            // watch fields and generate HTML after every template is loaded
                            $ready.then(function () {
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

angular.module("formalizer")
.directive("ngFormalizerAttach", function () {
    return {
        require: "^ngFormalizer",
        link: function ($scope, $elm, $attrs, $ngFormalizer) {
            if (!$ngFormalizer) {
                return;
            }

            $ngFormalizer.fields[$attrs.ngFormalizerAttach].domElement = $elm;
        }
    };
});
angular.module("formalizer")
.directive("ngBlacklist", function () {
    return {
        require: "ngModel",
        link: function ($scope, $elm, $attrs, $ngModel) {
            var blacklist = $scope.$eval($attrs.ngBlacklist);

            if ("string" === typeof blacklist) {
                blacklist = blacklist.split(",");
            }

            $ngModel.$parsers.unshift(function (value) {
                $ngModel.$setValidity("blacklist", blacklist.indexOf(value) === -1);

                return value;
            });
        }
    };
});
angular.module("formalizer")
.directive("ngEqualTo", function () {
    return {
        require: "?ngModel",
        link: function ($scope, $elm, $attrs, $ngModel) {
            if (!$ngModel) {
                return;
            }

            $scope.$watch($attrs.ngEqualTo, function ngEqualToWatch(value) {
                var this_val = $ngModel.$modelValue === "" ? null : ($ngModel.$modelValue || null),
                    eq_val = value === "" ? null : (value || null);

                $ngModel.$setValidity("equal-to", eq_val == this_val);
            });
        }
    };
});
(function() {
    "use strict";

    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    var MOZ_HACK_REGEXP = /^moz([A-Z])/;

    /**
     * copy&paste from angular
     */
    function camelCase(name) {
      return name.
        replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
          return offset ? letter.toUpperCase() : letter;
        }).
        replace(MOZ_HACK_REGEXP, 'Moz$1');
    }

    angular.forEach({
        "only-alpha": /^[a-zA-Z]*$/i,
        "only-iso": /^[a-zA-Z0-9_\-\s]*$/i,
        "one-upper": /^(?=.*[A-Z]).+$/,
        "one-lower": /^(?=.*[a-z]).+$/,
        "one-number": /^(?=.*[0-9]).+$/,
        "one-alpha": /^(?=.*[a-z]).+$/i,
        "no-spaces": /^[^\s]+$/
    }, function(regex, key) {
        angular.module('formalizer')
        .directive(camelCase('ng-' + key), function (){
            return {
                require: 'ngModel',
                link: function($scope, $elm, $attr, $ngModel) {
                    $ngModel.$parsers.unshift(function (value) {
                        $ngModel.$setValidity(key, regex.test(value));
                        return value;
                    });
                }
            };
        });
    });
}());
//
// fix https://github.com/angular-ui/bootstrap/issues/1891
// TZ issues
// foreign language direct input
//
angular.module("formalizer")
.constant("datepickerPopupFix", {
    /**
     * Input format in moment.js format!
     */
    datepickerPopup: "YYYY-MM-DD",
    /**
     * timezone in string format:
     * "+0000" GMT+0
     * "+0100" GMT+1
     * "-0100" GMT-1
     * etc...
     */
    datepickerTZ: undefined
})
.directive("ngDatepickerFix", ["datepickerPopupFix", function (datepickerPopupFix) {
    return {
        require: "?ngModel",
        priority: 100,
        link: function ($scope, $elm, $attrs, $ngModel) {

            $ngModel.$parsers.unshift(function ngDatepickerFix(value) {
                var mjs;

                if ("string" === typeof value) {
                    // manually introduce the date
                    mjs = moment(value, datepickerPopupFix.datepickerPopup);
                } else {
                    // click on the datepicker
                    mjs = moment(value);
                }

                if (!mjs.isValid()) {
                    return value;
                }

                if (datepickerPopupFix.datepickerTZ !== undefined) {
                    // fix TZ
                    return new Date(mjs.toDate().toDateString() + " 00:00 GMT" + datepickerPopupFix.datepickerTZ);
                }

                return mjs.toDate();

            });

        }
    };
}]);
/**
 * ng-populate="object"
 * ng-populate="{value: ['target', 'value']}"
 *
 */
angular.module("formalizer")
.directive("ngPopulate", function () {
    return {
        require: ["^ngFormalizer", "ngModel"],
        link: function ($scope, $elm, $attrs, controllers) {
            $ngFormalizer = controllers[0];
            $ngModel = controllers[1];

            var object = $scope.$eval($attrs.ngPopulate);

            $ngModel.$parsers.push(function (value) {
                //console.log("ngPopulate", value, object);
                if (object && object[value]) {
                    // populate!
                    $ngFormalizer.setModel(
                        object[value][0], // model
                        object[value][1], // value
                        object[value][2] || false // force
                    );
                }

                return value;
            });
        }
    };
});
angular.module("formalizer")
.directive("ngServerValidation", ["$http", function ($http) {
    return {
        require: "ngModel",
        link: function ($scope, $elm, $attrs, $ngModel) {
            var url = $attrs.ngServerValidation,
                ngRequestKey = $attrs.ngRequestKey || "value",
                ngResponseKey = $attrs.ngResponseKey || "value",
                current_value,
                last_checked_value;

            jQuery($elm).focusout(function run_server_validation() {
                if (last_checked_value == current_value) return;

                last_checked_value = current_value;
                // send request to server
                var sent_data = {};
                sent_data[ngRequestKey] = current_value;
                $http.post(url, sent_data)
                    .success(function (data) {
                        $ngModel.$setValidity("server-validation-in-progress", false); // spinner off
                        $ngModel.$setValidity("server-validation", !!data[ngResponseKey]);
                    })
                    .error(function (data) {
                        $ngModel.$setValidity("server-validation-in-progress", false); // spinner off

                        // do nothing is reasonable ?
                    });
            });

            $ngModel.$parsers.unshift(function (value) {
                if (!value) {
                    return;
                }

                $ngModel.$setValidity("server-validation-in-progress", false); // spinner
                //$ngModel.$setValidity("server-validation", true);

                current_value = value;
                //run_server_validation();

                return value;
            });
        }
    };
}]);
