angular
.module('formalizer', [
  'ui.bootstrap',
  'checklist-model',
  'formalizer-tpls',
  'textAngular',
  'angularSpectrumColorpicker',
  'ui.select',
  'ngSanitize'
  ])
.config(['$sceProvider', function($sceProvider) {
  $sceProvider.enabled(false);
}])
.provider('formalizerParsers', function formalizerParsers() {
  var parsers = {};

  this.set = function (type, parser_fn) {
    parsers[type] = parser_fn;
  };

  this.$get = function () {
    return parsers;
  };
})
.provider('formalizerTemplates', function formalizerParsers() {
  var templates = {
    'text': 'templates/formalizer-input.tpl.html'
  };

  this.set = function (type, tpl) {
    templates[type] = tpl;
  };

  this.$get = function () {
    return templates;
  };
})
.directive('ngFormalizer', function ($http, $templateCache, $interpolate, $log) {
  function safe_array_remove(arr, item) {
      var cut = arr.indexOf(item);
      if (cut !== -1) {
          return arr.splice(cut, 1);
      }

      return false;
  }

  function join_class(target) {
      target['class'] = target['class'].filter(function (cls) {
          return cls && cls.length ? cls : false;
      }).join(' ');
  }

  function join_ngclass(target) {
    if (target['ng-class']) {
      if (target['ng-class'].length) {
        target['ng-class'] = '{' + target['ng-class'].join(',') + '};';
      } else {
        delete target['ng-class'];
      }

    }
  }

  function join_attrs(attrs) {
    var txt = [],
      j;

    // escape double quotes!
    for (j in attrs) {
      if ('string' === typeof attrs[j]) {
        txt.push(j + '="' + (attrs[j].replace(/\"/g, '&quot;')) + '"');
      } else {
        txt.push(j + '="' + attrs[j] + '"');
      }
    }
    return txt.join(' ');
  }

  return {
    restrict: 'A',
    scope: false,
    priority: 500,
    require: ['?form', 'ngFormalizer'],

    link: function ($scope, $elm, $attrs, $ctrls) {
      //console.log("$attrs", $attrs);
      var $ngForm = $ctrls[0];
      var $ngFormalizer = $ctrls[1];

      // TODO maybe: $scope.$formalizer = $ngFormalizer;

      if (!$attrs.name) {
        throw new Error('formalizer require a form name');
      }

      if ($attrs.class.indexOf('form-horizontal') !== -1) {
        $ngFormalizer.layout = 'horizontal';
      } else if ($attrs.class.indexOf('form-inline') !== -1) {
        $ngFormalizer.layout = 'inline';
      } else {
        $ngFormalizer.layout = 'vertical';
      }

      $ngFormalizer.name = $attrs.name;
      $ngFormalizer.form = $ngForm;
      $ngFormalizer.baseModel = $attrs.ngBaseModel || null;
    },
    controller: function ($scope, formalizerParsers, formalizerTemplates) {
      return {
        layout: null,
        name: null,
        form: null,
        baseModel: null,
        attempts: 0,
        fields: {},

        configure: function configure(cfg, $scope) {
          //console.log('configure', arguments);
          var key;
          var constraints = cfg.constraints || {};
          var actions = cfg.actions || {};
          var attrs = cfg.attrs || {};
          var cattrs = cfg.cattrs || {};

          var field = {
            visible: true,
            visible_children: true,
            type: cfg.type || 'text',
            form_name: this.name,
            container: {
              'class': ['form-group', 'formalizer-element'], //, "col-xs-12 col-sm-12 col-md-12"],
              'ng-class': null
            },
            label: {
              'class': ['control-label'].concat((cfg.labelClass || '').split(' ')),
              size: parseInt(cfg.label_size, 10) || 2
            },
            element: {
              size: parseInt(cfg.element_size, 10),
              container: {
                'class': []
              },
              wrap: {
                'class': []
              },
              attrs: {
                name: cfg.name,
                id: this.name + '-' + cfg.name,
                type: cfg.type || 'text'
              },
              right: '',
              left: ''
            },
            source: null,
            source_display: cfg.source_display || null,
            source_model: cfg.source_model || null,
            source_filter: cfg.source_filter || null,
            options: angular.copy(cfg.options || {})
          };

          var name = field.element.attrs.name;

          field.container.class.push('formalizer-' + field.type);
          field.container['ng-class'] = [
            '"has-error" : (' + this.name + '[\'' + name + '\'].$invalid == true)',
            '"no-error" : (' + this.name + '[\'' + name + '\'].$invalid == false)'
          ];

          if (cfg.default !== undefined) {
              field.element.attrs['ng-default'] = '$field.default';
          }

          // watch source for changes
          if (typeof cfg.source === 'string') {
              field.source = $scope.$eval(cfg.source);
              $scope.$watch(cfg.source, function (a) {
                  field.source = a;
              });
          } else if (cfg.source !== undefined) {
              field.source = cfg.source;
              $scope.$watch('$field.source', function (a) {
                  field.source = a;
              });
          }


          field.element.attrs['ng-model'] = cfg.model || this.baseModel + '.' + name;
          field.element.attrs['class'] = ['form-control', 'formalizer-element-' + cfg.type].concat((cfg['class'] || '').split(' '));
          field.element.attrs['ng-class'] = [
              '"has-error": $formalizer.attempts > 0 && ' + this.name + '.' + name + '.$invalid'
          ];

          // constraints
          var kattr;
          for (key in constraints) {
            // watchable attrs
            if (['required', 'disabled'].indexOf(key) !== -1) {
              kattr = 'ng-' + key;
              field.element.attrs[kattr] = constraints[key];
              field.container['ng-class'].push(
                JSON.stringify(kattr) + ':' + constraints[key]
              );
            // attrs withtout 'ng-'
            } else if (['min', 'max', 'max-date', 'min-date'].indexOf(key) !== -1) {
              field.element.attrs[key] = constraints[key];
              field.container.class.push(key);
            } else if(key == 'required-list') {
              kattr = 'ng-' + key;
              if (constraints[key]) {
                field.element.attrs[kattr] = field.element.attrs['ng-model'];
                field.container.class.push('ng-required');
              }
            } else {
              kattr = 'ng-' + key;
              field.element.attrs[kattr] = constraints[key];
              field.container.class.push(kattr);
            }
          }

          for (key in actions) {
            kattr = 'ng-' + key;
            field.element.attrs[kattr] = actions[key];
          }

          // overwrite everything use it with caution!
          for (key in attrs) {
            if (key === 'ng-class') {
              field.element.attrs['ng-class'] = field.element.attrs['ng-class'].concat(attrs['ng-class']);
            } else {
              field.element.attrs[key] = attrs[key];
            }
          }

          for (key in cattrs) {
            if (key === 'ng-class') {
              field.container['ng-class'] = field.container['ng-class'].concat(cattrs[key]);
            } else {
              field.container[key] = cattrs[key];
            }

            if (key === 'ng-hide') {
              field.container['ng-hide-emit'] = cattrs[key];
            }
          }

          switch (this.layout) {
          case 'horizontal':
            var l = field.label.size,
              r = field.element.size || (12 - field.label.size);

            if (cfg.type === 'checkbox') {
              field.element.container['class'].push('col-sm-offset-' + l);
              field.label['class'].push('col-sm-12');
              safe_array_remove(field.label['class'], 'control-label');
            } else {
              field.label['class'].push('col-sm-' + l);
            }

            field.element.container['class'].push('col-sm-' + r); // 1 padding ?
            field.element.offset = 'col-sm-offset-' + l;
            field.element.size = 'col-sm-' + r;
            break;
          case 'vertical':
            field.element.offset = '';
            field.element.size = 'col-sm-12';
            break;
          case 'inline':
            field.element.container['class'].push('input-group');
            field.element.offset = '';
            field.element.size = '';
            break;
          }


          this.fields[field.element.attrs.name] = {
            $configuration: field,
            $field: cfg
          };

          return field;
        },

        interpolate: function interpolate(configuration, template, $scope) {
          if (formalizerParsers[configuration.type]) {
            formalizerParsers[configuration.type]($scope, configuration);
          }

          if (!configuration.element.attrs.name && configuration.type !== 'raw') {
            console.error(configuration);
            throw new Error('invalid field without name');
          }

          // join classes
          join_class(configuration.element.wrap);
          join_class(configuration.container);
          join_class(configuration.element.container);
          join_class(configuration.element.attrs);
          join_class(configuration.label);

          join_ngclass(configuration.container);
          join_ngclass(configuration.element.attrs);
          // TODO update using this method
          // field.element.attrs_text = join_attrs(field.element.attrs);
          configuration.container.attrs_text = join_attrs(configuration.container);
          configuration.element.attrs_text = join_attrs(configuration.element.attrs);

          // always escape!
          var html = $interpolate(template)(configuration)
            // TODO this seem to be a bug in $interpolate
            .replace(/\\\{/g, '{').replace(/\\\}/g, '}');

          return html;
        },
        toFormData: function toFormData(data, data_key, files) {
          var formData = new FormData();

          var tfiles = 0,
              j;

          formData.append(data_key, JSON.stringify(data));

          for (j = 0; j < files.length; j++) {
              formData.append('file' + (++tfiles), files[j]);
          }

          return formData;
        },
        getFieldHTML: function(field, configuration, $scope) {
          //console.log("getFieldHTML", field);
          if (!formalizerTemplates[field.type]) {
            throw new Error('invalid field type');
          }

          var self = this;

          return $http
            .get(formalizerTemplates[field.type], {
              cache: $templateCache
            })
            .then(function (html) {
              html = html.data;
              return self.interpolate(configuration, html, $scope);
            });

        }
      };
    },
  };
});
