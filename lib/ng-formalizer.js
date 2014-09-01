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

                                console.log("--> fields: ", fields.length);

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
