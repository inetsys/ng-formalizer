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
