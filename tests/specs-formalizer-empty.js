describe('specs-formalizer-empty.js', function () {
  console.log('--> ', this.description);

  var $compile;
  var $rootScope;
  var $timeout;

  // Load the myApp module, which contains the directive
  beforeEach(module('formalizer-tpls'));
  beforeEach(module('formalizer'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
  }));

  // a single test
  it('Create an empty formalizer', function () {
    var submited = false;
    $rootScope.onSubmit = function(clean) {
      submited = true;
    };

    $rootScope.entity = {};

    $rootScope.fields = [{
      'label': 'Submit now!',
      'type': 'submit',
      'name': 'submit',
      'class': 'btn-primary'
    }];

    var element = $compile(
      '<form name="form" ng-formalizer="" ng-base-model="entity" class="form-horizontal container" ng-submit="onSubmit()">' +
      '{{$formalizer | json}}' +
      '  <div ng-repeat="field in fields track by $index">' +
      '    <div ng-formalizer-field="field"></div>' +
      '  </div>' +
      '</form>'
    )($rootScope);

    $rootScope.$digest();
    $timeout.flush();

    expect(submited).toEqual(false);

    var submit = element.find('#form-submit');
    expect(submit.hasClass('btn-primary')).toEqual(true);
    expect(submit.attr('disabled')).toBeFalsy();

    element.submit();

     expect(submited).toEqual(true);
  });
});
