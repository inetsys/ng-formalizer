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


    Formalizer = function ($scope, $parse, $interpolate, $log) {
        this.fields = [];
        this.__fields = [];

        this.$scope = $scope;
        this.$parse = $parse;
        this.$interpolate = $interpolate;
        this.$log = $log;
    };

    Formalizer.prototype.onSubmit = null;
    Formalizer.prototype.name = null;
    Formalizer.prototype.type = null;
    Formalizer.prototype.fields = null;
    Formalizer.prototype.__fields = null;

    Formalizer.prototype.attempts = 0;

    Formalizer.prototype.horizontal = false;
    Formalizer.prototype.vertical = false;
    Formalizer.prototype.inline = false;

    Formalizer.prototype.$scope = null;
    Formalizer.prototype.$parse = null;
    Formalizer.prototype.$log = null;
    Formalizer.prototype.$interpolate = null;

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
                if (i[0] === "$") continue;

                //console.log(i, form[i]);
                field_data = this.__fields.filter(function(v) { return v.element.attrs.name === i});

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

    Formalizer.prototype.parseField = function (type, field) {
        if (Formalizer.parsers[type]) {
            Formalizer.parsers[type](this.$scope, field, this);
        }
    };

    Formalizer.prototype.createFieldMeta = function (cfg, field_in_scope, field_id) {
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

        field.element.attrs["ng-model"] = cfg.model || this.model + "." + name;
        field.element.attrs["class"] = ["form-control"].concat(cfg["class"].split(" "));
        field.element.attrs["ng-class"] = "{'has-error': $formalizer.attempts > 0 && " + this.name + "." + field.element.attrs.name + ".$invalid}";
        field.element.attrs["ng-placeholder"] = cfg.placeholder || "";

        // constraints
        for (key in cfg.constraints) {
            field.element.attrs["ng-" + key] = cfg.constraints[key];
        }


        switch (this.type) {
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

    Formalizer.prototype.createField = function (field_data, field_id) {
        var j,
            attrs,
            template,
            field;

        if (!field_data.name && field_data.type !== "raw") {
            throw new Error("invalid field without name");
        }

        var field_in_scope = "$formalizer.__fields[" + field_id + "]";
        var field_source = "$formalizer.__fields[" + field_id + "].source";

        field = this.createFieldMeta(field_data, field_in_scope, field_id);
        this.__fields[field_id] = field;

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
                    .replace("%element-attributes%", attrs)
                    .replace("%element-error-list%", errs)
                    .replace(/%scope-form-name%/g, this.name)
                    .replace(/%scope-field-source%/g, field_source);

        // always escape!
        html = this.$interpolate(html)(field)

            // TODO this seem to be a bug in $interpolate
            .replace(/\\\{/g, "{").replace(/\\\}/g, "}");

        return html;

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
    }

    Formalizer.toFormData = function(data, data_key, files) {
        var formData = new FormData();

        var tfiles = 0,
            j;

        formData.append(data_name, JSON.stringify(data));

        for (j = 0; j < files.length; j++) {
            formData.append("file" + (++tfiles), files[j]);
        }

        return formData;
    }

}());