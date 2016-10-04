describe('specs-formalizer-full.js', function () {
  console.log('--> ', this.description);

  var $compile,
    $scope,
    form,
    submited = false,
    element;

  // Load the myApp module, which contains the directive
  beforeEach(module('formalizer-tpls'));
  beforeEach(module('formalizer'));

  // Store references to $scope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_, $timeout) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $scope = _$rootScope_;

    $scope.onSubmit = function(clean) {
        expect(clean).toEqual({});

        submited = true;
    };

    $scope.entity = {
        text: null
    };

    $scope.fields = [{
      'label': 'User (minlength=5 and messages translated)',
      'type': 'text',
      'name': 'user',
      'placeholder': 'Text',
      'constraints': {
        'required': true,
        'minlength': 5
      },
      'messages': {
        'minlength': 'más de 5 caracters majo!'
      }
    }, {
      'label': 'Password (only-iso)',
      'type': 'password',
      'name': 'pwd',
      'placeholder': 'Password',
      'constraints': {
        'only-iso': true
      }
    }, {
      'label': 'Password repeat (must be equal to password)',
      'type': 'password',
      'name': 'pwd2',
      'placeholder': 'repeat password',
      'constraints': {
        'equal-to': 'entity.pwd'
      },
      'messages': {
        'equal-to': 'La contraseña no coincide.'
      }
    }, {
      'label': 'Comments',
      'type': 'textarea',
      'name': 'comments'
    }, {
      'label': 'just a checkbox, required if you fill User (with a valid user!)',
      'type': 'checkbox',
      'name': 'tyc',
      'right': true,
      'constraints': {
        'required': 'entity.user'
      }
    }, {
      'label': 'Datepicker',
      'type': 'datepicker',
      'name': 'date'
    }, {
      'label': 'Select (set to desktop)',
      'type': 'select',
      'name': 'select_platform',
      'source': [{'id': 'mobile', 'label': 'mobile'}, {'id': 'desktop', 'label': 'desktop'}],
      'source_model': 'id',
      'source_display': 'label',
      'empty_msg': 'Please choose a car'
    }, {
      'label': 'Select (with booleans this time)',
      'type': 'select',
      'option_id': 'id',
      'option_value': 'value',
      'source': [{'id': true, 'label': 'YES'}, {'id': false, 'label': 'NO'}],
      'source_model': 'id',
      'source_display': 'label',
      'name': 'select_bool'
    }, {
      'label': 'Select (multiple)',
      'type': 'select',
      'name': 'select_multiple_platform',
      'source': [{'id': 'mobile', 'label': 'mobile'}, {'id': 'desktop', 'label': 'desktop'}],
      'source_model': null,
      'source_display': 'label',
      'empty_msg': 'Please choose a car',
      'options': {
        'multiple': true
      }
    }, {
      'label': 'List (source is a string and formalizer watch that variable) in 5 seconds will have more elements',
      'type': 'select',
      'name': 'lista',
      'source': 'list',
      'empty_msg': 'Choose one'
    }, {
      'label': 'Checkbox list',
      'type': 'checkbox-list',
      'name': 'cb_list',
      'placeholder': '',
      'source': [
        {'id': 1, 'label': 'check@1'},
        {'id': 2, 'label': 'check@2'},
        {'id': 3, 'label': 'check@3'},
      ],
      'source_display': 'label',
      'source_model': 'id', // null means the object otherwise a key(string)
      'options': {
        'select_all': true
      }
    }, {
      'label': 'Checkbox list',
      'type': 'radio-list',
      'name': 'radio',
      'placeholder': '',
      'source': [
        {'id': 1, 'label': 'check@1'},
        {'id': 2, 'label': 'check@2'},
        {'id': 3, 'label': 'check@3'},
      ],
      'source_display': 'label',
      'source_model': null // null means the object otherwise a key(string)
    }, {
      'label': 'typeahead (abc,bcd,zzz)',
      'type': 'typeahead-multi',
      'name': 'ta_list',
      'placeholder': 'Text',
      'constraints': {
      },
      'source': 'typeahead_items',
      'source_display': 'name'
    }, {
      'label': 'Submit now!',
      'type': 'submit',
      'name': 'submit',
      'class': 'btn-primary'
    }];

    element = $compile(
      '<form name="form" ng-formalizer="" ng-base-model="entity" class="form-horizontal container">' +
      '  <div ng-repeat="field in fields track by $index">' +
      '    <div ng-formalizer-field="field"></div>' +
      '  </div>' +
      '</form>'
    )($scope);

    $scope.$digest();

    $timeout.flush();
    form = $scope.form;
  }));

  // a single test
  it('test input@text', function () {
    var submit = element.find('#form-submit');

    expect(form.$invalid).toEqual(true);
    expect(form.user.$invalid).toEqual(true);
    expect(submit.attr('disabled')).toEqual('disabled');

    // do more tests!
  });
});
