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
                v = angular.version;

            return {
                restrict: "A",
                replace: true,
                scope: true,
                templateUrl: "templates/formalizer-form-" + v.major + "." + Math.min(3, v.minor) + ".tpl.html",
                priority: 500,

                controller: function ($scope) {
                    if (angular.version.minor > 2) {
                        $scope.$formalizer = new Formalizer($scope, $parse, $log);

                        // this is dangerous!
                        angular.extend(this, $scope.$formalizer);

                        return $scope.$formalizer;
                    } else if (angular.version.minor === 2) {
                        return ($scope.$formalizer = new Formalizer($scope, $parse, $log));
                    }

                    throw new Error("not supported angular version");
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

                            function configure(config) {
                                $formalizer.setOptions(config);
                                $formalizer.init();

                                function update_fields(fields) {
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
                            }

                            if (!config.model) {
                                //console.log("post-initialization");

                                // set initial config
                                $formalizer.setOptions(config);

                                var unregister = $scope.$watch($attrs.ngFormalizer, function (new_config) {
                                    if (new_config && new_config.model) {
                                        unregister();

                                        configure(new_config);
                                    }
                                }, true);
                            } else {
                                configure(config);
                            }
                        },
                        post: function ($scope, $element, $attrs) {
                        }
                    };
                }
            };
        }]);

})();
