describe("specs-formalizer-number.js", function () {
    console.log("--> ", this.description);

    var config = {
        "legend": "Legend",
        "type": "horizontal",
        "name": "form",
        "onSubmit": "onSubmit",
        "model": "entity",
        "fields": [{
            "label": "Select",
            "type": "select",
            "name": "select",
            "placeholder": "select your number",

            "source": [
                { id: null, label: "default" },
                { id: 1, label: "step 1" },
                { id: 2, label: "step 2" },
            ],
            "source_display": "label",
            "source_model": "id",

            "constraints": {
                "required": true
            },
        }, {
            "label": "Submit now!",
            "type": "submit",
            "name": "submit",
            "class": "btn-primary"
        }],
    };

    var entity = {
        select: null
    };

    var $scope,
        $formalizer,
        form,
        submit_el,
        submited = false;

    // Load the myApp module, which contains the directive
    beforeEach(module("formalizer-tpls"));
    beforeEach(module("formalizer"));

    // Store references to $scope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(FormalizerConfig, $compile, $rootScope, $timeout) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $scope = $rootScope.$new();

        $scope.onSubmit = function(clean) {
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

    function nok() {
        expect(form.$invalid).toEqual(true);
        expect(form.select.$invalid).toEqual(true);
        expect(submit_el.attr("disabled")).toEqual("disabled");
    }

    function ok() {
        expect(form.$invalid).toEqual(false);
        expect(form.select.$invalid).toEqual(false);
        expect(submit_el.attr("disabled")).toEqual(null);

    }

    function set_select(val, form_state) {

        form.select.$setViewValue(val);

        $scope.$apply();
        $scope.$digest();

        form_state && ok();
        !form_state && nok();
    }
    // a single test
    // a single test
    it("test input@number", function () {
        nok();

        set_select(1, true);
        set_select(2, true);

        set_select(null, false);
    });
});

