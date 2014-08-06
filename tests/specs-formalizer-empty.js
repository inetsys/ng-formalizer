describe("specs-formalizer-empty.js", function () {
    console.log("--> ", this.description);

    var $compile;
    var $rootScope;

    // Load the myApp module, which contains the directive
    beforeEach(module("formalizer-tpls"));
    beforeEach(module("formalizer"));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(FormalizerConfig, _$compile_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    var form,
        input;

    // a single test
    it("Create an empty formalizer", function () {
        var submited = false;
        $rootScope.onSubmit = function(clean) {
            expect(clean).toEqual({});

            submited = true;
        };

        $rootScope.entity = {};

        $rootScope.form_fields = [{
            "label": "Submit now!",
            "type": "submit",
            "name": "submit",
            "class": "btn-primary"
        }];

        $rootScope.config = {
            "legend": "Legend",
            "type": "horizontal",
            "name": "form",
            "onSubmit": "onSubmit",
            "model": "entity",
            "fields": "form_fields",
        };

        var element = $compile(
            "<div ng-formalizer=\"config\">" +
            "</div>"
        )($rootScope);

        $rootScope.$digest();

        //console.log(element.html());

        expect(submited).toEqual(false);


        var submit = element.find("#form-submit");
        expect(submit.hasClass("btn-primary")).toEqual(true);
        expect(submit.attr("disabled")).toEqual(null);

        element.submit();

        expect(submited).toEqual(true);
    });
});
