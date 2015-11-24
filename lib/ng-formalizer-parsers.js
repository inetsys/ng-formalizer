angular.module('formalizer')
.config(function(formalizerParsersProvider, formalizerTemplatesProvider) {
  function safe_array_remove(arr, item) {
    var cut = arr.indexOf(item);
    if (cut !== -1) {
      return arr.splice(cut, 1);
    }
    return false;
  }

  formalizerTemplatesProvider.set('hidden', 'templates/formalizer-hidden.tpl.html');
  formalizerTemplatesProvider.set('textarea', 'templates/formalizer-textarea.tpl.html');

  //
  // submit
  //

  formalizerTemplatesProvider.set('submit', 'templates/formalizer-submit.tpl.html');

  formalizerParsersProvider.set('submit', function ($scope, cfg) {
    delete cfg.element.attrs['ng-model'];
    delete cfg.element.attrs['ng-class'];
    delete cfg.element.attrs['ng-placeholder'];
    safe_array_remove(cfg.element.attrs['class'], 'form-control');
    cfg.element.attrs['class'].push('btn');
  });

  //
  // input based
  //

  formalizerTemplatesProvider.set('text', 'templates/formalizer-input.tpl.html');
  formalizerTemplatesProvider.set('password', 'templates/formalizer-input.tpl.html');
  formalizerTemplatesProvider.set('number', 'templates/formalizer-input.tpl.html');
  formalizerTemplatesProvider.set('email', 'templates/formalizer-input.tpl.html');
  formalizerTemplatesProvider.set('tel', 'templates/formalizer-input.tpl.html');
  formalizerTemplatesProvider.set('url', 'templates/formalizer-input.tpl.html');
  formalizerTemplatesProvider.set('file', 'templates/formalizer-input.tpl.html');
  formalizerTemplatesProvider.set('colorpicker', 'templates/formalizer-input.tpl.html');

  // do not need anything more :)
  formalizerTemplatesProvider.set('lcheckbox', 'templates/formalizer-lcheckbox.tpl.html');
  formalizerParsersProvider.set('lcheckbox', function ($scope, cfg) {
    cfg.element.attrs.type = 'checkbox';

    cfg.element.container['class'].push('input');
    safe_array_remove(cfg.element.attrs['class'], 'form-control');
    cfg.element.attrs['class'].push('pull-left');
    cfg.element.attrs['ng-class'].push(
      '"no-help": !$field.help.length'
    );

  });

  formalizerParsersProvider.set('colorpicker', function ($scope, cfg) {
    cfg.element.wrap['class'].push('row');
    cfg.element.left = '<div class="col-sm-6">';
    // TODO how to send attrs to colorpicker?

    var attrs_text = [];
    if (cfg.element.attrs['ng-disabled']) {
      attrs_text.push('disabled="' + cfg.element.attrs['ng-disabled'] + '"');
    }

    attrs_text.push('format="\'hex\'"');
    attrs_text.push('ng-model="' + cfg.element.attrs['ng-model'] + '"');

    cfg.element.right = '</div>' +
        '<div class="col-sm-6">' +
        '<spectrum-colorpicker ' + attrs_text.join(' ') +'></spectrum-colorpicker>' +
        '</div>';
  });

  //
  // datepicker
  //

  //from http://angular-ui.github.io/bootstrap
  var datepicker_attrs = [
    'datepicker-mode',
    'min-date',
    'max-date',
    'date-disabled',
    'show-weeks',
    'starting-day',
    'init-date',
    'min-mode',
    'max-mode',
    'format-day',
    'format-month',
    'format-year',
    'format-day-header',
    'format-day-title',
    'format-month-title',
    'year-range',
    // popup,
    //,'datepicker-popup',
    'show-button-bar',
    'current-text',
    'clear-text',
    'close-text',
    'close-on-date-selection',
    'datepicker-append-to-body',
    'datepicker-options'
  ];

  formalizerTemplatesProvider.set('datepicker', 'templates/formalizer-input.tpl.html');

  formalizerParsersProvider.set('datepicker', function ($scope, cfg) {
    var name = cfg.element.attrs.name,
      openEvent = name + 'Open',
      closeEvent = name + 'Close',
      isOpenVar = cfg.options['datepicker-options'] || name + 'Options';

    angular.forEach(datepicker_attrs, function (value) {
      if (cfg.options[value]) {
        cfg.element.attrs[value] = cfg.options[value];
      }
    });

    // calendar button setup
    cfg.element.wrap['class'].push('input-group');
    cfg.element.right = '<span class="input-group-btn"><button ng-click="datepickers.' + openEvent + '($event)" class="btn btn-default" type="button"><i class="glyphicon glyphicon-calendar"></i></button>';

    // forced attrs
    cfg.element.attrs['is-open'] = 'datepickers.' + isOpenVar;
    cfg.element.attrs['uib-datepicker-popup'] = cfg.options['uib-datepicker-popup'] || '';
    // do not use focus, uib use it and this mess thing in IE
    cfg.element.attrs['ng-click'] = 'datepickers.' + openEvent + '()';

    cfg.element.attrs['ng-datepicker-fix'] = '';

    var $scope_data = $scope.$eval('datepickers = datepickers || {}');

    $scope_data[isOpenVar] = false;

    $scope_data[closeEvent] = function ($event) {
      $scope_data[isOpenVar] = false;
    };

    $scope_data[openEvent] = function ($event) {
      //only prevent if sent
      if ($event) {
        $event.preventDefault();
        $event.stopPropagation();
      }

      $scope_data[isOpenVar] = true;

      if ($event) {
        setTimeout(function () {
          angular.element('#' + cfg.element.attrs.id).focus();
        }, 0);
      }

      // TODO we should close other instances here
      // so we need an array of instances too
    };
  });

  //
  // select
  //

  formalizerTemplatesProvider.set('select', 'templates/formalizer-select.tpl.html');

  formalizerParsersProvider.set('select', function ($scope, cfg) {
    // TODO cfg.defaultOption = cfg.empty_msg ? "<option value=\"\">" + cfg.empty_msg + "</option>" : '';

    cfg.source_display = cfg.source_display || 'label';

    var mdl = cfg.source_model ? '.' + cfg.source_model :'';

    cfg.element.attrs['ng-options'] = 'c' + mdl + ' as c.' + cfg.source_display + ' for c in $configuration.source';

    if (cfg.source_filter) {
      cfg.element.attrs['ng-options'] += ' | ' + cfg.source_filter + ':c';
    }

    if (cfg.options.multiple) {
      cfg.element.attrs.multiple = 'multiple';
    }
  });

  //
  // ui-select
  //

  formalizerTemplatesProvider.set('ui-select', 'templates/formalizer-ui-select.tpl.html');

  formalizerParsersProvider.set('ui-select', function ($scope, cfg) {
    cfg.source_display = cfg.source_display || 'label';
    cfg.element.attrs['ng-class'] = [];
    safe_array_remove(cfg.element.attrs['class'], 'form-control');
  });

  //
  // richtext
  //

  formalizerTemplatesProvider.set('richtext', 'templates/formalizer-richtext.tpl.html');

  formalizerParsersProvider.set('richtext', function ($scope, cfg) {
    safe_array_remove(cfg.element.attrs['class'], 'form-control');
  });

  //
  // checkbox-list
  //

  formalizerTemplatesProvider.set('checkbox-list', 'templates/formalizer-checkbox-list.tpl.html');

  formalizerParsersProvider.set('checkbox-list', function ($scope, cfg) {
    var model = cfg.element.attrs['checklist-model'] = cfg.element.attrs['ng-model'];
    delete cfg.element.attrs['ng-model'];

    cfg.source_display = cfg.source_display || 'label';

    // TODO fix bug select all, deselect one, check all again (do nothing)
    cfg.options.chkall_model = '$configuration.chkall_value';
    cfg.$check_all = function () {
      var chkall = $scope.$eval(cfg.options.chkall_model),
          mdl = $scope.$eval(model);

      if (mdl === undefined) {
          $scope.$eval(model + ' = []');
          mdl = $scope.$eval(model);
      }

      mdl.splice(0, mdl.length);
      if (chkall) {
          var src = $scope.$eval('$configuration.source');
          src.forEach(function (el, k) {
              mdl.push(
                  $scope.$eval('$configuration.source[' + k + ']' + (cfg.source_model ? '.' + cfg.source_model : ''))
              );
          });
      }
    };

    cfg.element.attrs['checklist-value'] = 'checkbox_data' + (cfg.source_model ? '.' + cfg.source_model : '');

    cfg.element.attrs.type = 'checkbox';
    cfg.element.container['class'].push('checkbox');

    safe_array_remove(cfg.element.attrs['class'], 'form-control');
  });

  //
  // checkbox
  //

  formalizerTemplatesProvider.set('checkbox', 'templates/formalizer-checkbox.tpl.html');

  formalizerParsersProvider.set('checkbox', function ($scope, cfg) {
    cfg.container['class'].push('checkbox');
    safe_array_remove(cfg.element.attrs['class'], 'form-control');
  });

  //
  // radio-list
  //

  formalizerTemplatesProvider.set('radio-list', 'templates/formalizer-radio-list.tpl.html');

  formalizerParsersProvider.set('radio-list', function ($scope, cfg) {
    cfg.element.attrs.type = 'radio';
    cfg.element.container['class'].push('radio');
    safe_array_remove(cfg.element.attrs['class'], 'form-control');

    cfg.source_model = (cfg.source_model ? '.' + cfg.source_model : '');
  });

  //
  // raw
  //

  formalizerTemplatesProvider.set('raw', 'templates/formalizer-raw.tpl.html');
  /* TODO
  formalizerParsersProvider.set("raw", function ($scope, cfg, $element, $compile) {
    $scope.$watch("$field.template", function(a, b) {
      $element.html(a);
      if (cfg.options && cfg.options.compile) {
        $compile($element.contents())($scope);
      }
    });
  });
  */

  //
  // typeahead
  //

  var typeahead_attrs = [
      //"typeahead",
      //"typeahead-on-select",
      'uib-typeahead-append-to-body',
      'uib-typeahead-editable',
      'uib-typeahead-input-formatter',
      'uib-typeahead-loading',
      'uib-typeahead-min-length',
      'uib-typeahead-template-url',
      'uib-typeahead-wait-ms'
  ];

  formalizerTemplatesProvider.set('typeahead', 'templates/formalizer-typeahead.tpl.html');
  formalizerTemplatesProvider.set('typeahead-multi', 'templates/formalizer-typeahead.tpl.html');

  function typeahead($scope, cfg) {
    cfg.element.attrs.type = 'text';
    if (cfg.source_display) {
      cfg.element.attrs["uib-typeahead"] = 'p as p.' + cfg.source_display + ' for p in $configuration.source | filter:{' + cfg.source_display + ':$viewValue}';
    } else {
      cfg.element.attrs["uib-typeahead"] = 'p for p in $configuration.source';
    }

    angular.forEach(typeahead_attrs, function (value) {
      if (cfg.options[value]) {
        cfg.element.attrs[value] = cfg.options[value];
      }
    });
  }

  formalizerParsersProvider.set('typeahead', typeahead);

  // TODO FIXME after select, clear the input
  formalizerParsersProvider.set('typeahead-multi', function ($scope, cfg) {
    typeahead($scope, cfg);

    var ta_model = cfg.element.attrs['ng-model'],
      ta_model_selected = 'current_typeahead'; //cfg.element.attrs['ng-model'] + '_sel';

    cfg.element.attrs['ong-model'] = cfg.element.attrs['ng-model'];
    cfg.element.attrs['ng-model'] = ta_model_selected;
    $scope[ta_model_selected] = '';

    var target = $scope.$eval(ta_model);
    if (target === undefined) {
      $scope.$eval(ta_model + ' = []');
    }

    $scope.taSelected = cfg.options.taSelected || function () {
      $scope[ta_model_selected] = '';
      return $scope.$eval(ta_model);
    };

    $scope.taAppend = function ($item, $model, $label) {
      if (cfg.options.taAppend) {
        cfg.options.taAppend($item, $model, $label);
      } else {
        if ($model.indexOf($item) === -1) {
          $model.push($item);
        }
      }
      $scope[ta_model_selected] = '';
    };


    $scope.taRemove = cfg.options.taRemove || function ($item) {
      var target = $scope.$eval(ta_model);

      safe_array_remove(target, $item);
    };

    cfg.element.attrs['typeahead-on-select'] = 'taAppend($item, ' + ta_model +', $label)';
  });

  //
  //
  //
});
