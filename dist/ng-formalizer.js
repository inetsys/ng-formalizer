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
    function join_ngclass(target) {
      if (target["ng-class"]) {
        target["ng-class"] = "{" + target["ng-class"].join(",") + "}";
      }
    }

    function join_attrs(attrs) {
      var txt = [],
        j;

      // escape double quotes!
      for (j in attrs) {
        if ("string" === typeof attrs[j]) {
          txt.push(j + "=\"" + (attrs[j].replace(/\"/g, "&quot;")) + "\"");
        } else {
          txt.push(j + "=\"" + attrs[j] + "\"");
        }
      }
      return txt.join(" ");
    }


    Formalizer = function ($scope, $parse, $interpolate, $log) {
        this.fields = [];
        this.groups = {};

        this.$scope = $scope;
        this.$parse = $parse;
        this.$interpolate = $interpolate;
        this.$log = $log;
    };

    Formalizer.prototype.onSubmit = null;
    Formalizer.prototype.name = null;
    Formalizer.prototype.type = null;
    Formalizer.prototype.fields = null;
    Formalizer.prototype.groups = null;

    Formalizer.prototype.attempts = 0;

    Formalizer.prototype.horizontal = false;
    Formalizer.prototype.vertical = false;
    Formalizer.prototype.inline = false;


    Formalizer.prototype.$scope = null;
    Formalizer.prototype.$parse = null;
    Formalizer.prototype.$log = null;
    Formalizer.prototype.$interpolate = null;

    // match between templates and field.type
    Formalizer.types = {
        "columns": "columns"
    };
    Formalizer.templates = [];
    Formalizer.parsers = {};

    Formalizer.loadTemplates = function ($q, $http, $templateCache, FormalizerConfig) {
        return $q.all(this.templates.concat([
            "error-list",
            "input",
            "hidden",
            "textarea",
            "checkbox",
            "select",
            "submit",
            "typeahead",
            "checkbox-list",
            "columns",
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

    Formalizer.prototype.submit = function () {
        var on_submit = this.$parse(this.onSubmit)(this.$scope.$parent),
            form = this.$scope[this.name];

        if (!on_submit) {
            throw new Error("options.onSubmit is required");
        }

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
                if (i[0] === "$") {
                    continue;
                }

                field_data = this.fields.filter(function (v) { return v.formalizer.element.attrs.name === i; });

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

            return on_submit(data, files, this.$scope.$eval(this.model), form);
        }

        this.$log.info("form is $invalid, no submit");
    };

    Formalizer.prototype.callParser = function (event, $scope, field, args) {
        var type = field.type,
            ret;

        if ("function" === typeof Formalizer.parsers[type] && event === "post") {
            ret = Formalizer.parsers[type]($scope, field, this);
        } else if (Formalizer.parsers[type] && "function" === typeof Formalizer.parsers[type][event]) {
            ret = Formalizer.parsers[type][event]($scope, field, this, args);
        }

        return ret;
    };

    Formalizer.prototype.createFieldMeta = function (cfg, field_in_scope, field_id, $scope) {
        var key;

        var constraints = cfg.constraints || {};
        var actions = cfg.actions || {};
        var attrs = cfg.attrs || {};
        var cattrs = cfg.cattrs || {};

        var field = {
            visible: true,
            visible_children: true,
            type: cfg.type || "text",
            scope_name: field_in_scope,
            container: {
                "class": ["form-group", "formalizer-element"], //, "col-xs-12 col-sm-12 col-md-12"],
                "ng-class": null,
                "ng-show" : "$field.formalizer.visible"
            },
            label: {
                "class": ["control-label"].concat((cfg.labelClass || "").split(" ")),
                size: parseInt(cfg.label_size, 10) || 2
            },
            element: {
                size: parseInt(cfg.element_size, 10),
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
                    "ng-formalizer-attach": ""
                },

                // <span class="input-group-addon">XXX</span>
                // <span class="input-group-btn"><button></button></span>
                right: "",
                left: ""
            },
            messages: cfg.messages || {},
            source: null,
            source_display: cfg.source_display || null,
            source_model: cfg.source_model || null,
            options: angular.extend(cfg.options || {}, {
                scope_name: field_in_scope
            })
        };
        //cfg.formalzier = field;

        field.container.class.push("formalizer-" + field.type);
        field.container["ng-class"] = [
          "\"has-error\" : (" + this.name + "[\"" + field.element.attrs.name + "\"].$invalid == true)",
        ];



        if (cfg.default !== undefined) {
            field.element.attrs["ng-default"] = "$field.default";
        }

        var name = field.element.attrs.name;

        // watch source for changes
        if (typeof cfg.source === "string") {
            field.source = $scope.$eval(cfg.source);
            $scope.$watch(cfg.source, function (a) {
                field.source = a;
            });
        } else if (cfg.source !== undefined) {
            field.source = cfg.source;
            $scope.$watch("$field.source", function (a) {
                field.source = a;
            });
        }

        field.element.attrs["ng-model"] = cfg.model || this.model + "." + name;
        field.element.attrs["class"] = ["form-control"].concat((cfg["class"] || "").split(" "));
        field.element.attrs["ng-class"] = [
            "\"has-error\": $formalizer.attempts > 0 && " + this.name + "." + field.element.attrs.name + ".$invalid"
        ];
        field.element.attrs["ng-placeholder"] = cfg.placeholder || "";

        // constraints
        var kattr;
        for (key in constraints) {
            // watchable attrs
            if (["required", "disabled"].indexOf(key) !== -1) {
              kattr = "ng-" + key;
              field.element.attrs[kattr] = constraints[key];
              field.container["ng-class"].push(
                JSON.stringify(kattr) + ":" + constraints[key]
              );
            // attrs withtout 'ng-'
            } else if (["min", "max", "max-date", "min-date"].indexOf(key) !== -1) {
                field.element.attrs[key] = constraints[key];
                field.container.class.push(key);
            } else {
                kattr = "ng-" + key;
                field.element.attrs[kattr] = constraints[key];
                field.container.class.push(kattr);
            }
        }

        for (key in actions) {
            kattr = "ng-" + key;
            field.element.attrs[kattr] = actions[key];
        }

        // overwrite everything use it with caution!
        for (key in attrs) {
            field.element.attrs[key] = attrs[key];
        }

        for (key in cattrs) {
            field.container[key] = cattrs[key];
            if (key == "ng-hide") {
              field.container["ng-hide-emit"] = cattrs[key];
            }
        }

        switch (this.type) {
        case "horizontal":
            var l = field.label.size,
                r = field.element.size || (12 - field.label.size);

            if (cfg.type === "checkbox") {
                field.element.container["class"].push("col-sm-offset-" + l);
                field.label["class"].push("col-sm-12");
                safe_array_remove(field.label["class"], "control-label");
            } else {
                field.label["class"].push("col-sm-" + l);
            }

            field.element.container["class"].push("col-sm-" + r); // 1 padding ?
            break;
        case "vertical":
            break;
        case "inline":
            break;
        }

        return field;
    };

    Formalizer.prototype.createField = function (field_data, $scope, field_id) {
        $scope.$field = field_data;

        var j,
            template,
            field;

        if (!field_data.name && field_data.type !== "raw") {
            this.$log.error(field_data);
            throw new Error("invalid field without name");
        }

        var field_in_scope = "$field.formalizer";

        // specific config per field
        this.callParser("pre", $scope, field_data);

        // common metadata
        field = this.createFieldMeta(field_data, field_in_scope, field_id, $scope);

        // specific config per field
        this.callParser("post", $scope, field);


        Object.defineProperty(field_data, "formalizer", {
            value: field,
            writable : true,
            enumerable : false,
            configurable : false
        });

        if (field_data.group) {
            this.groups[field_data.group] = this.groups[field_data.group] || [];
            this.groups[field_data.group].push(field_data);
        }

        // join classes
        join_class(field.element.wrap);
        join_class(field.container);
        join_class(field.element.container);
        join_class(field.element.attrs);
        join_class(field.label);

        join_ngclass(field.container);
        join_ngclass(field.element.attrs);
        // TODO update using this method
        // field.element.attrs_text = join_attrs(field.element.attrs);
        field.container.attrs_text = join_attrs(field.container);

        template = this.getTemplate(field.type);

        //double interpolation!
        var errs = "";

        // interpolate only if needed!
        if (template.indexOf("%element-error-list%") !== -1) {
            errs = this.$interpolate(
                    this.$interpolate(templates["error-list"])(field)
                )(field);
        }

        var html = template
                    .replace("%element-attributes%", join_attrs(field.element.attrs))
                    .replace("%element-error-list%", errs)
                    .replace(/%scope-form-name%/g, this.name);
        // always escape!
        html = this.$interpolate(html)(field)

            // TODO this seem to be a bug in $interpolate
            .replace(/\\\{/g, "{").replace(/\\\}/g, "}");

        var alt_html = this.callParser("html", $scope, field_data, html);

        if (alt_html) {
            html = alt_html;
        }

        return html;

    };

    Formalizer.prototype.createColumns = function (data, $scope) {
        // sanitize check
        var i;

        for (i = 0; i < data.length; ++i) {
            if (!data[i].cols) {
                this.$log.error(data[i]);
                throw new Error("cols is not defined");
            }
        }

        // template
        $scope.columns = data;
        return this.getTemplate("columns");
    };

    Formalizer.prototype.attach = function ($scope, $elm, field, $compile) {
        field.formalizer.domElement = $elm;
        this.callParser("attached", $scope, field, $compile);
    };


    Formalizer.prototype.setModel = function (field_name, value, force) {
        var model = this.$scope.$eval(this.model);

        // not defined or forced
        if (!model[field_name] || force) {
            model[field_name] = value;
        }

        if (Array.isArray(model[field_name]) && force) {
            if (model[field_name].indexOf(value) === -1) {
                model[field_name].push(value);
            }
        }
    };

    Formalizer.toFormData = function (data, data_key, files) {
        var formData = new FormData();

        var tfiles = 0,
            j;

        formData.append(data_key, JSON.stringify(data));

        for (j = 0; j < files.length; j++) {
            formData.append("file" + (++tfiles), files[j]);
        }

        return formData;
    };

    Formalizer.prototype.showGroups = function (groups) {
        var self = this;
        groups.split(",").forEach(function (key) {
            if (self.groups[key]) {
                var i;
                for (i = 0; i < self.groups[key].length; ++i) {
                    self.groups[key][i].formalizer.visible = true;
                }
            }
        });
    };

    Formalizer.prototype.hideGroups = function (groups) {
        var self = this;
        groups.split(",").forEach(function (key) {
            if (self.groups[key]) {
                var i;
                for (i = 0; i < self.groups[key].length; ++i) {
                    self.groups[key][i].formalizer.visible = false;
                }
            }
        });
    };
}());

(function () {
    "use strict";

    Formalizer.templates.push("raw");

    Formalizer.types["raw"] = "raw";

    Formalizer.parsers["raw"] = {
        attached: function($scope, $field, $formalizer, $compile) {
            var $elm = $field.formalizer.domElement;
            $scope.$watch("$field.template", function(a, b) {
                $elm.html(a);
                console.log("$field.template", $field);
                if ($field.options && $field.options.compile) {
                  $compile($elm.contents())($scope);
                }
            });
        }
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

        field.element.attrs["ng-options"] = "c" + mdl + " as c." + field.source_display + " for c in $field.formalizer.source";

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
        field.element.container["class"].push("radio");
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
                var src = $scope.$eval("$field.formalizer.source");
                src.forEach(function (el, k) {
                    mdl.push(
                        $scope.$eval("$field.formalizer.source[" + k + "]" + (field.source_model ? "." + field.source_model : ""))
                    );

                });
            }
        };

        //delete field.element.attrs["id"];
        //delete field.element.attrs["name"];

        field.element.attrs["checklist-value"] = "checkbox_data" + (field.source_model ? "." + field.source_model : "");

        field.element.attrs.type = "checkbox";
        field.element.container["class"].push("checkbox");
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

    Formalizer.templates.push("checkbox-matrix");

    Formalizer.types["checkbox-matrix"] = "checkbox-matrix";

    Formalizer.parsers["checkbox-matrix"] = function ($scope, field, cfg) {
        // this class should be used, but destroy the table style
        // field.container["class"].push("checkbox");

        safe_array_remove(field.element.attrs["class"], "form-control");

        // swap places
        field.options.model = field.element.attrs["ng-model"];
        delete field.element.attrs["ng-model"];

        field.options.name = field.element.attrs["name"];
        delete field.element.attrs["name"];

        field.options.id = field.element.attrs["id"];
        delete field.element.attrs["id"];

        field.element.attrs["type"] = "checkbox";

        if (!field.source_model) {
          // model will be the index of the arrays
          $scope.$watch("field.source_display", function (a, b) {
            field.source_model = [[],[]];

            var mdl = field.options.model;

            field.source_display[0].forEach(function() {
                var idx = field.source_model[0].length;
                field.source_model[0].push(idx);
                // initialize the array, otherwise an object will be created and it's messy
                $scope.$eval(
                  mdl + "[" + idx + "] = " +
                  mdl + "[" + idx + "] || [];"
                );
            });

            field.source_display[1].forEach(function() {
                field.source_model[1].push(field.source_model[1].length);
            });

          }, true);

        }
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
"use strict";
(function () {

    angular

    .module("formalizer", ["ui.bootstrap", "checklist-model", "ui.bootstrap-slider", "formalizer-tpls", "textAngular"])

    .config(["$sceProvider", function($sceProvider) {
      $sceProvider.enabled(false);
    }])

    .value("FormalizerConfig", {})

    .directive("ngFormalizer", [
        "$parse", "$interpolate", "$http", "$templateCache", "$q", "$log", "FormalizerConfig",
        function ($parse, $interpolate, $http, $templateCache, $q, $log, FormalizerConfig) {
            var $ready = Formalizer.loadTemplates($q, $http, $templateCache, FormalizerConfig),
                v = angular.version;

            return {
                restrict: "A",
                replace: true,
                scope: true,
                templateUrl: "templates/formalizer-form-" + v.major + "." + Math.min(3, v.minor) + ".tpl.html",
                priority: 500,

                controller: function ($scope) {
                    var $formalizer = new Formalizer($scope, $parse, $interpolate, $log);

                    if (angular.version.minor > 2) {
                        // this is dangerous!
                        var self = this;
                        Object.keys(Formalizer.prototype).forEach(function (key) {
                            self[key] = $formalizer[key];
                        });
                    }

                    $scope.$formalizer = $formalizer;
                    return $scope.$formalizer;
                },
                compile: function () {
                    return {
                        pre: function ($scope, $element, $attrs) {
                            var container = jQuery($element).find(".fieldset-contents"),
                                //container = $element.find(".fieldset-contents"),
                                config = $scope.$eval($attrs.ngFormalizer),
                                $formalizer = $scope.$formalizer;

                            if (!config) {
                                throw new Error("formalizer configuration must be sent");
                            }

                            // do not allow directly insert the object, lead to some problems with watchers
                            if ($attrs.ngFormalizer.indexOf("{") !== -1) {
                                throw new Error("ng-formalizer must be a string");
                            }

                            if (!config.name) {
                                throw new Error("formalizer require form name");
                            }

                            // start watching

                            $ready.then(function () {
                                $log.info("formalizer is ready");

                                var config_watcher;

                                 $scope.$watch($attrs.ngFormalizer, function config_watcher (config) {
                                    ["name", "type", "model", "legend", "onSubmit"].forEach(function (key) {
                                        $formalizer[key] = config[key];
                                    });

                                    $formalizer.horizontal = $formalizer.vertical = $formalizer.inline = false;
                                    $formalizer[$formalizer.type] = true;

                                }, true);
                            });

                            ["name", "type", /*"model",*/ "legend", "onSubmit"].forEach(function (key) {
                                $formalizer[key] = config[key];
                            });

                            $formalizer.horizontal = $formalizer.vertical = $formalizer.inline = false;
                            $formalizer[$formalizer.type] = true;


                            if ("string" === typeof config.fields) {
                                $scope.$watch(config.fields, function fields_watcher (fields) {
                                    $formalizer.fields = fields;
                                }, true);
                            } else {
                                $formalizer.fields = config.fields;
                            }
                        },
                        post: function ($scope, $element, $attrs) {
                        }
                    };
                }
            };
        }
    ]);

})();

angular.module("formalizer")
.directive("ngFormalizerField", ["$timeout", "$compile", function ($timeout, $compile) {
    return {
        scope: true,
        link: function ($scope, $elm, $attrs) {
            var $ngFormalizer = $scope.$formalizer; // nasty hack but works!

            var field_data = $scope.$eval($attrs.ngFormalizerField),
                html;

            if (Array.isArray(field_data)) {
                // column configuration?
                html = $ngFormalizer.createColumns(field_data, $scope);
            } else {
                // field configuration?
                html = $ngFormalizer.createField(field_data, $scope, $scope.$index);
            }

            var el = angular.element(html);
            $elm.append(el);

            $timeout(function () {
                $compile(el)($scope);

                $scope.$digest();
            });
        }
    };
}]);
angular.module("formalizer")
.directive("ngFormalizerAttach", function ($compile) {
    return {
        link: function ($scope, $elm, $attrs, $ngFormalizer) {
            $scope.$formalizer.attach($scope, $elm, $scope.$eval("$field"), $compile);
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
        require: 'ngModel',
        link: function ($scope, $elm, $attrs, $ngModel) {
            if (!$ngModel) {
                return;
            }

            var my_value = null;
            function check() {
              var this_val = $ngModel.$modelValue === "" ? null : ($ngModel.$modelValue || null),
                eq_val = my_value === "" ? null : (my_value || null);

              $ngModel.$setValidity("equal-to", eq_val == this_val);
            }

            $scope.$watch($attrs.ngModel, function() {
              check();
            });

            $scope.$watch($attrs.ngEqualTo, function ngEqualToWatch(value) {
              my_value = value;
              check();
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
        //"only-iso": /^[a-zA-Z0-9_\-\s]*$/i,
        "one-upper": /^(?=.*[A-Z]).+$/,
        "one-lower": /^(?=.*[a-z]).+$/,
        "one-number": /^(?=.*[0-9]).+$/,
        "one-alpha": /^(?=.*[a-z]).+$/i,
        "no-spaces": /^[^\s]+$/,
        "hexadecimal": /^[0-9a-fA-F]+$/,
        "hex-color": /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
    }, function(regex, key) {
        angular.module('formalizer')
        .directive(camelCase('ng-' + key), function (){
            return {
                require: 'ngModel',
                link: function($scope, $elm, $attr, $ngModel) {
                    $ngModel.$parsers.unshift(function (value) {
                        var str_val = ("" + value);
                        // for this test, use required
                        if (value === undefined || value === null || str_val.length === 0) {
                          $ngModel.$setValidity(key, true);
                          return value;
                        }

                        // do not test 'empty' things this task is for required
                        $ngModel.$setValidity(key, regex.test(str_val));

                        return str_val;
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
                        $ngModel.$setValidity("server-validation-in-progress", true); // spinner off
                        $ngModel.$setValidity("server-validation", !!data[ngResponseKey]);
                    })
                    .error(function (data) {
                        $ngModel.$setValidity("server-validation-in-progress", true); // spinner off

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

angular.module("formalizer")
.directive("ngDefault", ["$timeout", function ($timeout) {
    return {
        require: "ngModel",
        link: function ($scope, $elm, $attrs, $ngModel) {
            var def_val = $scope.$eval($attrs.ngDefault),
                not_set_values = $scope.$eval($attrs.ngDefaultValues);

            if ("number" === $attrs.type) {
                def_val = parseFloat(def_val, 10);
            }

            if (!not_set_values) {
                not_set_values = [undefined];
            } else if (Array.isArray(not_set_values)) {
                not_set_values.push(undefined);
            } else {
                throw new Error("ngDefaultValues must be an array of values");
            }

            function is_nan(val) {
                return "number" === typeof val && ("" + val) === "NaN";
            }

            // wait model to be populated
            $timeout(function () {
                if (is_nan($ngModel.$modelValue) || not_set_values.indexOf($ngModel.$modelValue) !== -1) {
                    //$ngModel.$setViewValue(def_val);
                    $scope.$eval($attrs.ngModel + " = " + JSON.stringify(def_val));
                }
            });
        }
    };
}]);
angular.module("formalizer")
.directive("ngHideGroups", function () {
    return {
        require: "ngModel",
        link: function ($scope, $elm, $attrs, $ngModel) {
            var groups = $scope.$eval($attrs.ngHideGroups),
                values = Object.keys(groups);

            $scope.$watch($attrs.ngModel, function(a, b) {
                // fix: first show, then hide bacause if model is set a == b
                if (values.indexOf("" + b) >= 0) {
                    $scope.$formalizer.showGroups(groups[b]);
                }

                if (values.indexOf("" + a) >= 0) {
                    $scope.$formalizer.hideGroups(groups[a]);
                }
            });
        }
    };
});
angular.module("formalizer")
.directive("ngHideChildren", function () {
    return {
        require: "ngModel",
        link: function ($scope, $elm, $attrs, $ngModel) {
            var check = $scope.$eval($attrs.ngHideChildren),
                values = [],
                i;

            for (i in check) {
                if (check[i]) {
                    values.push(i);
                }
            }

            $scope.$watch($attrs.ngModel, function(a, b) {
                $scope.$field.formalizer.visible_children = values.indexOf("" + a) === -1;
            });
        }
    };
});
/*
 * listen angular changes in boolean attrs
 */

angular.forEach('Selected,Checked,Disabled,Readonly,Required,Open'.split(','), function(name) {

    var normalized = 'ngOn' + name,
        attr = name.toLowerCase();

    angular.module("formalizer")
    .directive(normalized, function() {
        return {
          restrict: 'A',
          priority: 100,
          link: function($scope, $elm, $attrs) {
            $scope.$watch(function() {
                return $elm.prop(attr);
            }, function(val) {
                var obj = {$element: $elm};
                obj["$" + attr] = val;

                $scope.$eval($attrs[normalized], obj);
            });
          }
        };
    });
});



angular.module("formalizer")
.directive("ngCompile", ["$compile", "$timeout", function ($compile, $timeout) {
  return {
    link: function ($scope, $elm, $attrs, $ngModel) {
      $attrs.$observe('ngBindHtml', function ( myTemplate ) {
        $timeout(function() {
          $compile($elm.contents())($scope);
        });
      });
    }
  };
}]);

angular.module("formalizer")
.directive("ngLength", function () {
  return {
    require: "ngModel",
    link: function ($scope, $elm, $attrs, $ngModel) {
      $ngModel.$parsers.unshift(function (value) {
        // do not test 'empty' things this task is for required
        var length = parseInt($attrs.ngLength, 10);
        if (Array.isArray(value) || "string" === typeof value) {
          $ngModel.$setValidity("length", value.length === length);
        } else {
          // invalid length?
          $ngModel.$setValidity("length", false);
        }
        

        return value;
      });
    }
  };
});

angular.module("formalizer")
.directive("ngDecimals", function () {
    return {
        require: "ngModel",
        link: function ($scope, $elm, $attrs, $ngModel) {
            var max_decimals = parseInt($attrs.ngDecimals, 10) || 4;

            $ngModel.$parsers.unshift(function (value) {
                var fnum = parseFloat(value),
                    fstr = "" + fnum,
                    fdec = 0;
                // fix clear field
                // if it's NaN give number error not this one.
                if (!value || isNaN(fnum)) {
                  $ngModel.$setValidity("decimals", true);
                  return value;
                }

                if (fstr.indexOf(".") !== -1) {
                    fdec = fstr.split(".")[1].length;
                }

                var valid = fdec <= max_decimals;

                $ngModel.$setValidity("decimals", valid);

                return valid ? value : null;
            });
        }
    };
});

angular.module("formalizer")
.directive("ngNoDecimals", function () {
    return {
        require: "ngModel",
        link: function ($scope, $elm, $attrs, $ngModel) {
            $ngModel.$parsers.unshift(function (value) {
                var fstr = "" + value;

                var valid = fstr.indexOf(".") === -1;
                $ngModel.$setValidity("no-decimals", valid);

                return valid ? value : null;
            });
        }
    };
});

angular.module("formalizer")
.directive("ngPastDate", function () {
    return {
        priority: -9000, // higher than ui-datepicker
        link: function ($scope, $elm, $attrs) {
            var date = new Date();
            date.setMilliseconds(0);
            date.setSeconds(0);
            date.setMinutes(0);
            date.setHours(0);
            date.setTime(date.getTime() - 24 * 60 * 60 * 1000);

            $attrs.$set('maxDate', JSON.stringify(date));

        }
    };
});
angular.module("formalizer")
.directive("ngFutureDate", function () {
    return {
        priority: -9000, // higher than ui-datepicker
        link: function ($scope, $elm, $attrs) {
            var date = new Date();
            date.setMilliseconds(0);
            date.setSeconds(0);
            date.setMinutes(0);
            date.setHours(0);
            date.setTime(date.getTime() + 24 * 60 * 60 * 1000);

            $attrs.$set('maxDate', JSON.stringify(date));

        }
    };
});
angular.module("formalizer")
.directive("ngTillToday", function () {
    return {
        priority: -9000, // higher than ui-datepicker
        link: function ($scope, $elm, $attrs) {
            var date = new Date();

            $attrs.$set('maxDate', JSON.stringify(date));
        }
    };
});
/**
* ng-use-locale=""
*/
angular.module("formalizer")
.directive("ngUseLocale", ["$locale", "numberFilter", "$log", function ($locale, numberFilter, $log) {
  return {
    require: "ngModel",
    priority: 10000, // lowest priority directive -> unshift => highest priority parser
    link: function ngUseLocale($scope, $elm, $attrs, $ngModel) {
      if ($attrs.type == "number") {
        // parse from locale to "real-c-english-number"
        $ngModel.$parsers.unshift(function ngUseLocaleParser(value) {
          for (i = 0; i < value.length; ++i) {
            if (value[i] == $locale.NUMBER_FORMATS.DECIMAL_SEP) {
              value  = value.substr(0, i) +
                "." + value.substr(i + 1);
            }
            // group separators are just removed
            else if (value[i] == $locale.NUMBER_FORMATS.GROUP_SEP) {
              value  = value.substr(0, i) + value.substr(i + 1);
            }
          }

          return value;
        });

        // use number (filter) to display
        $ngModel.$formatters.unshift(function ngUseLocaleFormatter(value) {
          if (!value) return value;

          value = "" + value;

          for (i = 0; i < value.length; ++i) {
            if (value[i] == ".") {
              value  = value.substr(0, i) +
              $locale.NUMBER_FORMATS.DECIMAL_SEP + value.substr(i + 1);
            }
          }

          return value;
        });

      } else {
        $log.info("use locale not supportted for: ", $attrs.type);
      }
    }
  };
}]);

angular.module("formalizer")
.directive("ngHideEmit", function () {
  return {
    restrict: 'A',
    multiElement: true,
    link: function(scope, element, attr) {
      scope.$watch(attr.ngHide, function ngHideWatchAction(value) {
        scope.$emit("hide", [scope.field, element, value]);
      });
    }
  };
});

angular.module("formalizer")
.directive("ngHideCatch", ["$animate", function ($animate) {
  return {
    restrict: 'A',
    multiElement: true,
    link: function(scope, element, attr) {

      scope.$on("hide", function(ev, args) {
        ev.stopPropagation();

        // name should be unique, so it could be safe to use to compare
        if (scope.field.name == args[0].name) {
          $animate[args[2] ? 'addClass' : 'removeClass'](element, "ng-hide", {
            tempClasses: "ng-hide-animate"
          });
        }
      });
    }
  };
}]);
