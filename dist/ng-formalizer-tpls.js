angular.module('formalizer-tpls', ['templates/formalizer-checkbox-list.tpl.html', 'templates/formalizer-checkbox.tpl.html', 'templates/formalizer-columns.tpl.html', 'templates/formalizer-error-list.tpl.html', 'templates/formalizer-form-1.2.tpl.html', 'templates/formalizer-form-1.3.tpl.html', 'templates/formalizer-input.tpl.html', 'templates/formalizer-radio-list.tpl.html', 'templates/formalizer-raw.tpl.html', 'templates/formalizer-select.tpl.html', 'templates/formalizer-slider.tpl.html', 'templates/formalizer-submit.tpl.html', 'templates/formalizer-textarea.tpl.html', 'templates/formalizer-typeahead.tpl.html', 'templates/formalizer.fields.tpl.html']);

angular.module("templates/formalizer-checkbox-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-checkbox-list.tpl.html",
    "<div class=\"{{container.class}}\" ng-class=\"{ 'has-error' : (%scope-form-name%['{{element.attrs.name}}'].$invalid == true) }\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <label class=\"{{label.class}}\" ng-bind=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <div ng-show=\"{{scope_name}}.options.select_all\">\n" +
    "      <label for=\"{{element.attrs.name}}-select-all\">\n" +
    "        <input name=\"{{element.attrs.name}}-select-all\" id=\"{{element.attrs.id}}-select-all\" value=\"true\" ng-checked=\"{{element.attrs['checklist-model']}}.length == $field['$$'].source.length\" type=\"checkbox\" ng-model=\"{{options.chkall_model}}\" ng-change=\"{{options.scope_name}}.options.check_all($event)\" />\n" +
    "        Select All\n" +
    "      </label>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"{{element.wrap.class}}\" ng-repeat=\"checkbox_data in $field.formalizer.source\">\n" +
    "      <label for=\"{{element.attrs.name}}-\\{\\{$index\\}\\}\">\n" +
    "        <input name=\"{{element.attrs.name}}-\\{\\{$index\\}\\}\" id=\"{{element.attrs.id}}-\\{\\{$index\\}\\}\" %element-attributes%>\n" +
    "        \\{\\{checkbox_data['{{source_display}}']\\}\\}\n" +
    "      </label>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"help-block\" ng-bind=\"$field.help\"></div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-checkbox.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-checkbox.tpl.html",
    "<div class=\"{{container.class}}\" ng-class=\"{ 'has-error' : (%scope-form-name%['{{element.attrs.name}}'].$invalid == true) }\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\">\n" +
    "      <input %element-attributes% /><span ng-bind=\"$field.label\"></span>\n" +
    "    </label>\n" +
    "\n" +
    "    <div class=\"help-block\" ng-bind=\"$field.help\"></div>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-columns.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-columns.tpl.html",
    "<div class=\"row\">\n" +
    "    <div ng-repeat=\"col in columns\" class=\"col-xs-{{col.cols}} col-sm-{{col.cols}} col-md-{{col.cols}} col-lg-{{col.cols}}\">\n" +
    "        <div ng-formalizer-field=\"col\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/formalizer-error-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-error-list.tpl.html",
    "<ul class=\"form-error-list help-block\">\n" +
    "  <li ng-show=\"$formalizer.$attemps > 0 && %scope-form-name%['{{element.attrs.name}}'].$error.required\">{{messages.required || 'Field is required'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error.min\">{{messages.min || 'Field minimum is \\{\\{element.attrs[\\'ng-min\\']\\}\\}'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error.max\">{{messages.max || 'Field maximum is \\{\\{element.attrs[\\'ng-max\\']\\}\\}'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error.minlength\">{{messages.minlength || 'Field is required to be at least \\{\\{element.attrs[\\'ng-minlength\\']\\}\\} characters'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error.maxlength\">{{messages.maxlength || 'Field cannot be longer than \\{\\{element.attrs[\\'ng-maxlength\\']\\}\\} characters'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error.number\">{{messages.number || 'Field is an invalid number'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error.email\">{{messages.email || 'Field is an invalid email'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error.url\">{{messages.url || 'Field is an invalid URL'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error.blacklist\">{{messages.blacklist || 'Field value is blacklisted'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error['equal-to']\">{{messages['equal-to'] || 'Field must be equal to: X'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error['only-alpha']\">{{messages['only-alpha'] || 'Field must contains only letters'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error['only-iso']\">{{messages['only-iso'] || 'Valid characters are: A-Z, a-z, 0-9'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error['one-upper']\">{{messages['one-upper'] || 'At least one uppercase'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error['one-lower']\">{{messages['one-lower'] || 'At least one lowercase'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error['one-number']\">{{messages['one-number'] || 'At least one number'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error['one-alpha']\">{{messages['one-alpha'] || 'At least one letter'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error['server-validation']\">{{messages['server-validation'] || 'Server validation fails'}}</li>\n" +
    "</ul>");
}]);

angular.module("templates/formalizer-form-1.2.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-form-1.2.tpl.html",
    "<form\n" +
    "    role=\"form\"\n" +
    "    ng-submit=\"$formalizer.submit()\"\n" +
    "    ng-class=\"{'form-horizontal': $formalizer.horizontal, 'form-vertical': $formalizer.vertical, 'form-inline': $formalizer.inline}\"\n" +
    "    name=\"{{$formalizer.name}}\"\n" +
    "    ng-formalizer-form-attach=\"$formalizer.name\"\n" +
    "    novalidate>\n" +
    "  <fieldset>\n" +
    "    <legend ng-if=\"$formalizer.legend\">{{$formalizer.legend}}</legend>\n" +
    "    <div class=\"fieldset-contents\"></div>\n" +
    "\n" +
    "    <div ng-if=\"$formalizer.model\">\n" +
    "      <div ng-init=\"field.fields = $formalizer.fields\"></div>\n" +
    "      <div ng-include=\"'templates/formalizer.fields.tpl.html'\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "  </fieldset>\n" +
    "\n" +
    "</form>\n" +
    "");
}]);

angular.module("templates/formalizer-form-1.3.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-form-1.3.tpl.html",
    "<form\n" +
    "    role=\"form\"\n" +
    "    ng-submit=\"$formalizer.submit()\"\n" +
    "    ng-class=\"{'form-horizontal': $formalizer.horizontal, 'form-vertical': $formalizer.vertical, 'form-inline': $formalizer.inline}\"\n" +
    "    name=\"$parent.{{$formalizer.name}}\"\n" +
    "    ng-formalizer-form-attach=\"$formalizer.name\"\n" +
    "    novalidate>\n" +
    "  <fieldset>\n" +
    "    <legend ng-if=\"$formalizer.legend\">{{$formalizer.legend}}</legend>\n" +
    "    <div class=\"fieldset-contents\"></div>\n" +
    "\n" +
    "    <div ng-if=\"$formalizer.model\">\n" +
    "      <div ng-init=\"field.fields = $formalizer.fields\"></div>\n" +
    "      <div ng-include=\"'templates/formalizer.fields.tpl.html'\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </fieldset>\n" +
    "\n" +
    "</form>\n" +
    "");
}]);

angular.module("templates/formalizer-input.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-input.tpl.html",
    "<div class=\"{{container.class}}\" ng-class=\"{ 'has-error' : (%scope-form-name%['{{element.attrs.name}}'].$invalid == true) }\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\" ng-bind=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <div class=\"{{element.wrap.class}}\">\n" +
    "        {{element.left}}\n" +
    "        <input %element-attributes% />\n" +
    "        {{element.right}}\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"help-block\" ng-bind=\"$field.help\"></div>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-radio-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-radio-list.tpl.html",
    "<div class=\"{{container.class}}\" ng-class=\"{ 'has-error' : (%scope-form-name%['{{element.attrs.name}}'].$invalid == true) }\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <label class=\"{{label.class}}\" ng-bind=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <div class=\"{{element.wrap.class}}\" ng-repeat=\"radio_data in $field.formalizer.source\">\n" +
    "      <label for=\"{{element.attrs.name}}-\\{\\{$index\\}\\}\">\n" +
    "        <input name=\"{{element.attrs.name}}\" id=\"{{element.attrs.id}}-\\{\\{$index\\}\\}\" value=\"\\{\\{radio_data{{source_model}}\\}\\}\" %element-attributes%>\n" +
    "        \\{\\{radio_data['{{source_display}}']\\}\\}\n" +
    "      </label>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"help-block\" ng-bind=\"$field.help\"></div>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-raw.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-raw.tpl.html",
    "<div ng-formalizer-attach=\"\" ng-show=\"$field.formalizer.visible\">\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-select.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-select.tpl.html",
    "<div class=\"{{container.class}}\" ng-class=\"{ 'has-error' : (%scope-form-name%['{{element.attrs.name}}'].$invalid == true) }\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\" ng-bind=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <select %element-attributes%>\n" +
    "      {{defaultOption}}\n" +
    "    </select>\n" +
    "\n" +
    "    <div class=\"help-block\" ng-bind=\"$field.help\"></div>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-slider.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-slider.tpl.html",
    "<div class=\"{{container.class}}\" ng-class=\"{ 'has-error' : (%scope-form-name%['{{element.attrs.name}}'].$invalid == true) }\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\" ng-bind=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <p class=\"{{element.wrap.class}}\">\n" +
    "        {{element.left}}\n" +
    "        <div slider %element-attributes% />\n" +
    "        {{element.right}}\n" +
    "        <!-- hide an input with the value ?! -->\n" +
    "    </p>\n" +
    "\n" +
    "    <div class=\"help-block\" ng-bind=\"$field.help\"></div>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-submit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-submit.tpl.html",
    "<div class=\"{{container.class}}\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <div class=\"col-sm-10 col-sm-offset-2\">\n" +
    "    <button %element-attributes% ng-disabled=\"%scope-form-name%.$invalid\" ng-bind=\"$field.label\"></button>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"help-block\" ng-bind=\"$field.help\"></div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-textarea.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-textarea.tpl.html",
    "<div class=\"{{container.class}}\" ng-class=\"{ 'has-error' : (%scope-form-name%['{{element.attrs.name}}'].$invalid == true) }\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\" ng-bind=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <p class=\"{{element.wrap.class}}\">\n" +
    "        <textarea %element-attributes%>\n" +
    "        </textarea>\n" +
    "    </p>\n" +
    "\n" +
    "    <div class=\"help-block\" ng-bind=\"$field.help\"></div>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-typeahead.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-typeahead.tpl.html",
    "<div class=\"{{container.class}}\" ng-class=\"{ 'has-error' : (%scope-form-name%['{{element.attrs.name}}'].$invalid == true) }\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\" ng-bind=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <p class=\"{{element.wrap.class}}\">\n" +
    "\n" +
    "    <ul>\n" +
    "      <li ng-repeat=\"obj in entity.ta_list\">\n" +
    "        <span>\\{\\{obj.name\\}\\} <a ng-click=\"{{options.del_fn}}(obj)\"><span class=\"glyphicon glyphicon-trash\"></span></a></span>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "\n" +
    "    </p>\n" +
    "    <p class=\"{{element.wrap.class}}\">\n" +
    "        {{element.left}}\n" +
    "        <input %element-attributes% />\n" +
    "        {{element.right}}\n" +
    "    </p>\n" +
    "\n" +
    "    <div class=\"help-block\" ng-bind=\"$field.help\"></div>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer.fields.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer.fields.tpl.html",
    "<div ng-repeat=\"field in field.fields\">\n" +
    "    <!-- <pre>{{field | json}}</pre> -->\n" +
    "    <div ng-formalizer-field=\"field\"></div>\n" +
    "\n" +
    "    <div class=\"col-sm-offset-1\">\n" +
    "      <div ng-include=\"'templates/formalizer.fields.tpl.html'\"></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

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

        var field = {
            visible: true,
            type: cfg.type || "text",
            scope_name: field_in_scope,
            container: {
                "class": ["form-group"]
            },
            label: {
                "class": ["control-label"].concat((cfg.labelClass || "").split(" "))
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
        field.element.attrs["ng-class"] = "{'has-error': $formalizer.attempts > 0 && " + this.name + "." + field.element.attrs.name + ".$invalid}";
        field.element.attrs["ng-placeholder"] = cfg.placeholder || "";

        // constraints
        var kattr;
        for (key in constraints) {
            if (key === "min" || key === "max") {
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


        switch (this.type) {
        case "horizontal":
            if (cfg.type === "checkbox") {
                field.element.container["class"].push("col-sm-offset-2");
                field.label["class"].push("col-sm-12");
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

        return field;
    };

    Formalizer.prototype.createField = function (field_data, $scope, field_id) {
        $scope.$field = field_data;

        var j,
            attrs,
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
(function () {
    "use strict";

    Formalizer.templates.push("raw");

    Formalizer.types["raw"] = "raw";

    Formalizer.parsers["raw"] = {
        attached: function($scope, $field, $formalizer) {
            $scope.$watch("$field.template", function(a, b) {
                $field.formalizer.domElement.html(a);
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
            field.element.attrs.typeahead = "p as p." + field.source_display + " for p in $field.formalizer.source | filter:{" + field.source_display + ":$viewValue}";
        } else {
            field.element.attrs.typeahead = "for p in $field.formalizer.source";
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

    angular

    .module("formalizer", ["ui.bootstrap", "checklist-model", "ui.bootstrap-slider", "formalizer-tpls"])

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

                            if (!config.name) {
                                throw new Error("formalizer require form name");
                            }

                            // start watching

                            $ready.then(function () {
                                $log.info("formalizer is ready");

                                var config_watcher;

                                 $scope.$watch($attrs.ngFormalizer, function config_watcher (config) {
                                    //$log.log("config_watcher", config);

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
                                    //$log.log("fields_watcher", fields);

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
.directive("ngFormalizerAttach", function () {
    return {
        link: function ($scope, $elm, $attrs, $ngFormalizer) {
            $scope.$formalizer.attach($scope, $elm, $scope.$eval("$field"));
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
                        // do not test 'empty' things this task is for required
                        if (value !== undefined && value !== null && ("" + value).length > 0) {
                            $ngModel.$setValidity(key, regex.test(value));
                        }
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
            var def_val = $scope.$eval($attrs.ngDefault);

            function is_nan(val) {
                return "number" === typeof val && ("" + val) === "NaN";
            }

            // wait model to be populated
            $timeout(function () {
                if (is_nan($ngModel.$modelValue) || $ngModel.$modelValue === undefined) {
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
                if (values.indexOf("" + a) >= 0) {
                    $scope.$formalizer.hideGroups(groups[a]);
                }

                if (values.indexOf("" + b) >= 0) {
                    $scope.$formalizer.showGroups(groups[b]);
                }
            });
        }
    };
});