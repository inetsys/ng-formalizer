describe("specs-formalizer-dynamic-source.js", function () {
    console.log("--> ", this.description);

    var config = {
        "legend": "Legend",
        "type": "horizontal",
        "name": "form",
        "onSubmit": "onSubmit",
        "model": "entity",
        "fields": [{
            "label": "radio-list-string",
            "type": "radio-list",
            "name": "radio_list",
            "source": "config.fields[1].source",
            "source_model": "id",
            "source_display": "label",

        }, {
            "label": "radio-list-object",
            "type": "radio-list",
            "name": "radio_list",

            "source": [
                {id: 1, label: "1"},
                {id: 2, label: "2"}
            ],
            "source_model": "id",
            "source_display": "label",

        }, {
            "label": "Submit now!",
            "type": "submit",
            "name": "submit",
            "class": "btn-primary"
        }],
    };

    var entity = {
        number: null
    };

    var $scope,
        $formalizer,
        element,
        form,
        submit_el,
        submited = false;

    // Load the myApp module, which contains the directive
    beforeEach(module("formalizer-tpls"));
    beforeEach(module("formalizer"));

    // Store references to $scope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function ($compile, $rootScope, $timeout) {
        $scope = $rootScope.$new();

        $scope.onSubmit = function (clean) {
            expect(clean).toEqual({});

            submited = true;
        };

        $scope.entity = entity;

        $scope.config = config;

        element = angular.element("<div ng-formalizer=\"config\"></div>");
        $compile(element)($scope);

        $scope.$digest();

        $timeout.flush();

        form = $scope.$$childTail.form;
        $formalizer = $scope.$$childTail.$formalizer;
        submit_el = element.find("#form-submit");
    }));

    // a single test
    // a single test
    it("test input@number", function () {
        expect(element.find("input").length).toEqual(4);

        $scope.config.fields[1].source.push({id: 3, label: "3"});
        $scope.$digest();

        expect(element.find("input").length).toEqual(6);
    });
});
