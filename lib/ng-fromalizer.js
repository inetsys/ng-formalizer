"use strict";

var error_list = '    <ul class="error-list">\n' +
'        <li ng-show="$formalizer.$attemps > 0 && %form-name%[\'{{element.attrs.name}}\'].$error.required">Field is required</li>\n' +
'        <li ng-show="%form-name%[\'{{element.attrs.name}}\'].$error.min">Field minimum is {{min}}</li>\n' +
'        <li ng-show="%form-name%[\'{{element.attrs.name}}\'].$error.max">Field maximum is {{max}}</li>\n' +
'        <li ng-show="%form-name%[\'{{element.attrs.name}}\'].$error.minlength">Field is required to be at least {{minlength}} characters</li>\n' +
'        <li ng-show="%form-name%[\'{{element.attrs.name}}\'].$error.maxlength">Field cannot be longer than {{maxlength}} characters</li>\n' +
'        <li ng-show="%form-name%[\'{{element.attrs.name}}\'].$error.number">Field is an invalid number</li>\n' +
'        <li ng-show="%form-name%[\'{{element.attrs.name}}\'].$error.email">Field is an invalid email</li>\n' +
'        <li ng-show="%form-name%[\'{{element.attrs.name}}\'].$error.url">Field is an invalid URL</li>\n' +
'        <li ng-show="%form-name%[\'{{element.attrs.name}}\'].$error.blacklist">Field value is blacklisted</li>\n' +
'        <li ng-show="%form-name%[\'{{element.attrs.name}}\'].$error[\'equal-to\']">Field must be equal to: X</li>\n' +
'        <li ng-show="%form-name%[\'{{element.attrs.name}}\'].$error[\'only-alpha\']">Field must contains only letters</li>\n' +
'        <li ng-show="%form-name%[\'{{element.attrs.name}}\'].$error[\'only-iso\']">Valid characters are: A-Z, a-z, 0-9</li>\n' +
'        <li ng-show="%form-name%[\'{{element.attrs.name}}\'].$error[\'one-upper\']">At least one uppercase</li>\n' +
'        <li ng-show="%form-name%[\'{{element.attrs.name}}\'].$error[\'one-lower\']">At least one lowercase</li>\n' +
'        <li ng-show="%form-name%[\'{{element.attrs.name}}\'].$error[\'one-number\']">At least one number</li>\n' +
'        <li ng-show="%form-name%[\'{{element.attrs.name}}\'].$error[\'one-alpha\']">At least one letter</li>\n' +
'    </ul>\n';

var templates = {
    inputs:
'<div class="{{container.class}}">\n' +
'  <label for="{{element.attrs.name}}" class="{{label.class}}">{{label.text}}</label>\n' +
'  <div class="{{element.container.class}}">\n' +
'    <p class="{{element.wrap.class}}"><input %element-attributes% />%element-right-icon%</p>\n' +
'    <p class="help-block">{{help.text}}</p>\n' +
error_list +
'  </div>\n' +
'</div>',
    checkbox:
'<div class="{{container.class}}">\n' +
' <div class="{{element.container.class}}">\n' +
'  <label for="{{element.attrs.name}}" class="{{label.class}}">\n' +
'    <input %element-attributes% /><span>{{label.text}}</span>\n' +
'  </label>\n' +
'  <p class="help-block">{{helpText}}</p>\n' +
error_list +
' </div>\n' +
'</div>',
    select:
'<div class="{{container.class}}">\n' +
'  <label for="{{element.attrs.name}}" class="{{label.class}}">{{label.text}}</label>\n' +
'  <div class="{{element.container.class}}">\n' +
'<select ng-options="c.id as c.label for c in %field-source%" %element-attributes%>\n' +
'{{defaultOption}}\n' +
'</select>\n' +
'    <p class="help-block">{{helpText}}</p>\n' +
error_list +
'  </div>\n' +
'</div>',
    select_bool:
'<div class="{{container.class}}">\n' +
'  <label for="{{element.attrs.name}}" class="{{label.class}}">{{label.text}}</label>\n' +
'  <div class="{{element.container.class}}">\n' +
'<select ng-options="c.id as c.label for c in %field-source%" %element-attributes%>\n' +
'</select>\n' +
'    <p class="help-block">{{helpText}}</p>\n' +
error_list +
'  </div>\n' +
'</div>',
    submit:
'<div class="{{container.class}}">\n' +
'<button %element-attributes% ng-disabled="%form-name%.$invalid">{{label.text}}</button>'+
'</div>'
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

function createFieldConfiguration(definition, cfg, $scope) {
    var key;

    cfg.constraints = cfg.constraints || {};
    cfg.labelClass = cfg.labelClass || "";
    cfg["class"] = cfg["class"] || "";

    var field = {
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
        },
        help: {
            text: cfg.helpText || ""
        },
        right_icon: "",
        source: null
    };

    var name = field.element.attrs.name;

    if (typeof cfg.source === "string") {
        field.source = $scope.$eval(cfg.source);
    } else if (cfg.source !== undefined) {
        field.source = cfg.source;
    }

    field.element.attrs["ng-model"] = cfg.model || definition.model + "." + name;
    field.element.attrs["class"] = ["form-control"].concat(cfg["class"].split(" "));
    field.element.attrs["ng-class"] = "{'has-error': $fromalizer.attempts > 0 && " + definition.name + "." + field.element.attrs.name + ".$invalid, 'checkbox': true}";
    field.element.attrs["ng-placeholder"] = cfg.placeholder || "";

    // constraints
    for (key in cfg.constraints) {
        field.element.attrs["ng-" + key] = cfg.constraints[key];
    }

    switch (cfg.type) {
    case "datepicker":
        cfg.datepicker = cfg.datepicker || {};

        var openEvent = name + "Open",
            closeEvent = name + "Close",
            isOpenVar = cfg.datepicker["datepicker-options"] || name + "Options";

        angular.forEach(datepicker_attrs, function (value) {
            if (cfg.datepicker[value]) {
                field.element.attrs[value] = cfg.datepicker[value];
            }
        });

        // calendar button setup
        field.element.wrap["class"].push("input-group");
        field.right_icon = "<span class=\"input-group-btn\"><button ng-click=\"" + openEvent + "($event)\" class=\"btn btn-default\" type=\"button\"><i class=\"glyphicon glyphicon-calendar\"></i></button>";

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
                    $("#" + field.element.attrs.id).focus();
                }, 0);
            }

            // @TODO we should close other instances here
            // so we need an array of instances too
            //if ($scope.endDateOpened) {
            //    $scope.closeEndDate();
            //}
        };

        break;
    case "button":
        field.element.attrs["class"] = (cfg["class"] || "") + " btn btn-default";
        break;
    case "checkbox":
        field.container["class"].push("checkbox");
        break;
    case "select":
        field.defaultOption = cfg.empty_msg ? "<option value=\"\">" + cfg.empty_msg + "</option>" : "";
        break;
    }





    switch (definition.type) {
    case "horizontal":
        if (cfg.type === "checkbox") {
            field.element.container["class"].push("col-sm-offset-2");
            field.label["class"].push("col-sm-9");
            field.label["class"] = field.label["class"].splice(field.label["class"].indexOf("control-label"), 1);
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
}


var TYPE_TO_TEMPLATE = {
    "checkbox-list": "inputs", //??

    "datepicker": "inputs",
    "password": "inputs",
    "number": "inputs",
    "email": "inputs",
    "text": "inputs",
    "select": "select",
    "select-bool": "select_bool",
    "checkbox": "checkbox",
    "submit": "submit"
};

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

        field = createFieldConfiguration(definition, fields[i], $scope);

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
        new_fields.push($interpolate(
                template
                    .replace("%element-attributes%", attrs)
                    .replace(/%form-name%/g, definition.name)
                    .replace(/%field-source%/g, field_source)
                    .replace(/%element-right-icon%/g, field.right_icon)
            )(field)
            .replace(/\{\\\{/g, "{{")
        );
    }
}

function formalizerController($scope, $element, $compile, $parse, $interpolate, $http) {
    console.log("(start) formalizerController");

    console.log("(end) formalizerController");
}




angular.module("ng").directive("fromalizer", [
    "$parse", "$compile", "$interpolate", "$http", "$templateCache", "$rootScope", "$timeout",
  function ($parse, $compile, $interpolate, $http, $templateCache, $rootScope, $timeout) {
    var parsed_fields = 0;
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
          /*
          var templates = [
          ];
          .each
        templateLoader = $http.get(tplURL, {cache: $templateCache})
          .success(function(html) {
            tElement.html(html);
          });
          */
            return {
                pre: function ($scope, $element, $attrs) {
                    var container = jQuery($element).find(".fieldset-contents"),
                        configuration = $scope.$eval($attrs.fromalizer),
                        $fromalizer;

                    $scope.$fromalizer = $fromalizer = {};

                    angular.extend($fromalizer, configuration);

                    $fromalizer.name = $fromalizer.name || "form";
                    $fromalizer.fields = []; // reset
                    $fromalizer.attempts = 0;
                    // vertical|horizontal|inline
                    $fromalizer[configuration.type] = true;

                    if (!$fromalizer.onSubmit) {
                        throw new Error("options.onSubmit is required");
                    }


                    $fromalizer.submit = function () {
                        var onsubmit = $parse(configuration.onSubmit)($scope.$parent),
                            form = $scope[configuration.name];

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

                            return onsubmit(ret);
                        }
                        console && console.info && console.info("form.$invalid = true");
                    };


                    function update_fields(fields, o) {
                        console.log("--> fields: ", fields.length);
                        var new_fields = [],
                            new_elements = [];
                        parsed_fields = parseFields(configuration, fields, new_fields,
                            $scope, $element, $compile, $parse, $interpolate);

                        angular.forEach(new_fields, function (fel) {
                            var el = jQuery(fel);
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


                    if ("string" === typeof configuration.fields) {
                        return $scope.$watch(configuration.fields, update_fields, true);
                    }

                    update_fields(configuration.fields);
                },
                post: function ($scope, $element, $attrs) {
                }
            };
        }
    };
}]);