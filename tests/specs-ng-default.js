describe("specs-formalizer-number.js", function () {
  console.log("--> ", this.description);

  var fields = [{
    "label": "Select",
    "type": "select",
    "name": "select",
    "placeholder": "select your number",
    "source": [
      { id: null, label: "default" },
      { id: 1, label: "step 1" },
      { id: 2, label: "step 2" },
    ],
    "default": null,
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
  }];

  var entity = {
    //select: null
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
  beforeEach(inject(function($compile, $rootScope, $timeout) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $scope = $rootScope.$new();

    $scope.onSubmit = function(clean) {
        expect(clean).toEqual({});

        submited = true;
    };

    $scope.entity = entity;

    $scope.fields = fields;

    element = angular.element(
      '<form name="form" ng-formalizer="" ng-base-model="entity" class="form-horizontal container">' +
      '  <div ng-repeat="field in fields track by $index">' +
      '    <div ng-formalizer-field="field"></div>' +
      '  </div>' +
      '</form>'
    );
    $compile(element)($scope);


    $scope.$digest();

    $timeout.flush();

    form = $scope.$$childTail.form;
    $formalizer = $scope.$$childTail.$formalizer;
    submit_el = element.find("#form-submit");
  }));


  // a single test
  // a single test
  it("test empty ng-default", function () {
    expect($scope.entity.select).toBe(null);

    // fill a value for next test
    entity.select = 1;

    //!!! this could be considered a bug, but there is no fix/workaround...
    // form.select.$setViewValue(null);
    // expect($scope.entity.select).toBe(undefined);
  });
  it("test filled ng-default", function () {
    expect($scope.entity.select).toBe(1);
  });
});
