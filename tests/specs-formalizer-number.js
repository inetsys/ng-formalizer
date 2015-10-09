describe('specs-formalizer-number.js', function () {
  console.log('--> ', this.description);

  var fields = [{
      'label': 'Number',
      'type': 'number',
      'name': 'number',
      'placeholder': 'enter your number',
      'constraints': {
        'min': 10,
        'max': 100,
        'decimals': 2,
        'required': true
      },
    }, {
      'label': 'Submit now!',
      'type': 'submit',
      'name': 'submit',
      'class': 'btn-primary'
    }];

  var entity = {
    number: null
  };

  var $scope,
    $formalizer,
    form,
    submit_el,
    submited = false;

  // Load the myApp module, which contains the directive
  beforeEach(module('formalizer-tpls'));
  beforeEach(module('formalizer'));

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

    var element = angular.element(
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
    submit_el = element.find('#form-submit');
  }));

  function nok() {
    expect(form.$invalid).toEqual(true);
    expect(form.number.$invalid).toEqual(true);
    expect(submit_el.attr('disabled')).toEqual('disabled');
  }

  function ok() {
    expect(form.$invalid).toEqual(false);
    expect(form.number.$invalid).toEqual(false);
    expect(submit_el.attr('disabled')).toBeFalsy();
  }

  function set_number(val, form_state) {
    form.number.$setViewValue(val);

    $scope.$apply();
    $scope.$digest();

    form_state ? ok() : nok();
  }
  // a single test
  // a single test
  it('test input@number', function () {
    nok();

    set_number(11, true);
    set_number(101, false);
    set_number(50.12, true);
    set_number(50.123, false);
    set_number(0, false);
    set_number(-10, false);
  });
});
