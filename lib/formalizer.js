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

                //console.log(i, form[i]);
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

        this.$log.info("$invalid = true, no submit");
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
            this.$log.log(field_data);
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

    Formalizer.prototype.attach = function ($scope, $elm, field) {
        field.formalizer.domElement = $elm;
        this.callParser("attached", $scope, field);
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
