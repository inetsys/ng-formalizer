# ng-formalizer [![Build Status](https://secure.travis-ci.org/inetsys/ng-formalizer.png?branch=master)](http://travis-ci.org/inetsys/ng-formalizer)

Complete suite of form controls.

## install

```bash
bower install ng-formalizer --save
```

## usage

````js
  // Add to your app dependencies
  var app = angular.module("app", ["formalizer"]);
````

## run examples

```bash
node examples/server.js
firefox http://localhost:6001
```

### markup (html)

#### Horizontal

```html
<form name="horizontal" ng-formalizer="" ng-base-model="entity" class="form-horizontal container">
  <legend>Horizontal</legend>
  <div ng-repeat="field in fields track by $index">
    <div ng-formalizer-field="field"></div>
  </div>
</form>
```

#### Vertical

```html
<form name="horizontal" ng-formalizer="" ng-base-model="entity" class="form-vertical container">
  <legend>Vertical</legend>
  <div ng-repeat="field in fields track by $index">
    <div ng-formalizer-field="field"></div>
  </div>
</form>
```

### configuration (controller)

```js
  $scope.entity = {}; // ng-base-model
  $scope.fields = [
    // Fields properties see below for examples & info
  ];
```

### Fields properties

Basic Example:
Create an input with some constraints and error messages translated.

```json
{
    "label": "User",
    "type": "text",
    "name": "user",
    "groups": "my-group",
    "actions": {
    },
    "attrs": {
    },
    "constraints": {
        "required": true,
        "minlength": 5
    },
    "messages": {
        "minlength": "más de 5 caracters majo!"
    }
}
```

##### `label`: String

Label text. *Can be real-time modified*.

##### `help`: String

Help text. *Can be real-time modified*. You could be used to give extra feedback to user.

##### `type`: String [**required**]
* text
* richtext

  Small WYSIWYG HTML editor using [textangular](http://textangular.com/)

* password
* number
* email
* tel
* url
* textarea
* select
* ui-select

  Select2 and Selectize using [ui-select](https://github.com/angular-ui/ui-select)

* datepicker

  using [ui-bootstrap-datepicker](http://angular-ui.github.io/bootstrap/#/datepicker)

* checkbox
* checkbox-list

  using [checklist-model](http://vitalets.github.io/checklist-model/)

* lcheckbox

  left labeled checkbox.

* checkbox-matrix

* radio-list
* typeahead (**IN PROGRESS**)

  using [ui-bootstrap-typeahead](http://angular-ui.github.io/bootstrap/#/typeahead)

* typeahead-multi

  using [ui-bootstrap-typeahead](http://angular-ui.github.io/bootstrap/#/typeahead)

* slider

  using [angular-bootstrap-slider](https://github.com/seiyria/angular-bootstrap-slider)

* submit
* raw

  Raw HTML that will be included into the form. [example](#field-type-raw-example)

* colorpiker

  using [angular-spectrum-colorpicker](https://github.com/Jimdo/angular-spectrum-colorpicker)

##### `name`: String [**required**]

Same as HTML


##### `label_size`: Number (default: 2)

Label width in columns.


##### `element_size`: Number (default: 10)

Element width in columns.


##### `default`: String [**optional**]

If model is `undefined` set this value.

##### `source`, `source_display` & `source_model` & `source_filter`

These three options configure how your data source is displayed and what need to be stored in your model.

* `source`: String|Array

  **Mandatory** in: select, typeahead, typeahead-multi, checkbox, checkbox-list, radio\*

  Data source, must be an *array of objects* or a string if you want formalizer to watch the scope for changes.

  *Can be real-time modified.*

* `source_display`

  **Mandatory** in: select, typeahead, typeahead-multi, checkbox, checkbox-list, checkbox-matrix, radio\*.


  What will be displayed, the key in `source` object.

  For `checkbox-matrix` it's a 2d-array first the columns, second the rows.

* `source_model`: String|null

  Optional.

  What will be inserted in your model. String if you want a specific key of your object or null if you want the entire object.

  For `checkbox-matrix` represent WHERE (rather than what) by default will map the model to a 2d-array.

* `source_filter`: String|null

  Optional, only available to select.

  Add filter function to ng-options

Example:

```json
{
    "label": "Multiple select. Model will contains `id`s, and `label` will be displayed in the options.",
    "type": "select",
    "source": [
        {"id": 1, "label": "1.- Brikindans"},
        {"id": 2, "label": "2.- Crusaíto"},
        {"id": 3, "label": "3.- Maiquelyason"},
        {"id": 4, "label": "4.- Robocop"}
    ],
    "source_display": "label",
    "source_model": "id",
    "options": {
        "multiple": true
    }
}
```

`checkbox-matrix` example:

Model

```json
{
    "matrix2": {
        "A": {"F": true, "G": false, "H": true},
        "B": {"F": false, "G": true, "H": false},
        "C": {"F": true, "G": false, "H": true}
    }
}
```

Configuration

```json
{
    "label": "Checkbox matrix",
    "type": "checkbox-matrix",
    "name": "matrix",

    "source_display": [
        ["A", "B", "C"],
        ["F", "G", "H"]
    ],

    "source_model": [
        ["A", "B", "C"],
        ["F", "G", "H"]
    ]
}
```


<a name="field-type-raw-example"></a>
##### `template`: String (raw only)

HTML to be displayed directly in the form.
Be aware that the HTML will be compiled after injected.

```json
{
    "type": "raw",
    "template": "<div class=\"col-sm-10 col-sm-offset-2\">Current avatar: {{entity.avatar}}</div>"
}
```
##### `options`: Object

Extends current configuration with extra options for each type of field.

`checkbox-list` options

* `select_all` display a "Select All" checkbox


`select` options

* `multiple`


`typeahead` & `typeahead-multi` attrs [ui-bootstrap-typeahead](http://angular-ui.github.io/bootstrap/#/typeahead)

* `typeahead-on-select` not available in `typeahead-multi` (use options.taAppend instead)
* `typeahead-append-to-body`
* `typeahead-editable`
* `typeahead-input-formatter`
* `typeahead-loading`
* `typeahead-min-length`
* `typeahead-template-url`
* `typeahead-wait-m`

`typeahead` options

* `taAppend` function($item, $model, $label)

  Append $item to list. If provided user must handle the append.

* `taRemove` function($item, $model, $label)

  Remove $item from list. If provided user must handle the removal.

* `taSelected` function()

  items selected. If provided user must handle what items are selected.

With this three callbacks it possible to achieve complex behaviors to store information. Here is a small example.

```js
var listable_items = [{
    label: "xxx",
    list: true
}, {
    label: "yyy",
    list: false
}];

var formalizer_cfg = {
    // ...
    "fields": [{
      type: "typeahead-multi",
      // name will be ignored, because taSelected, taAppend & taRemove is provided
      // but need to be sent.
      name: "listable",
      label: "list filtered by bool",
      source: listable_items,
      source_display: "label",

      options: {
        taSelected: function() {
          return listable_items.filter(function(obj) {
            return obj.list;
          });
        },
        taAppend: function ($item, $model, $label) {
          $item.list = true;
        },
        taRemove: function ($item, $model, $label) {
          $item.list = false;
        }
      }
    }
  }]
};
```

`datepiker` attrs [ui-bootstrap-datepicker](http://angular-ui.github.io/bootstrap/#/datepicker)

* `datepicker-mode`
* `min-date`
* `max-date`
* `date-disabled` [usage example](#datepiker-date-disabled)
* `show-weeks`
* `starting-day`
* `init-date`
* `min-mode`
* `max-mode`
* `format-day`
* `format-month`
* `format-year`
* `format-day-header`
* `format-day-title`
* `format-month-title`
* `year-range`
* `show-button-bar`
* `current-text`
* `clear-text`
* `close-text`
* `close-on-date-selection`
* `datepicker-append-to-body`
* `datepicker-option`

`raw` options

- - -

### constraints

AngularJS provide some constraints, like min/max/maxlength/minlength etc... those can be used and formalizer will be transparent.

Additionally we provide some more:

##### populate

Fill another field if a specific value is meet.

Example:

```js
"constraints": {
   "populate": {
        // by default populate initialize the model
        // if it has a value, do not set the new one unless the third parameter is true
        "value-01": ["target_field", "-value-", true]
    }
}
```


##### blacklist (not in)

Example:

```json
"constraints": {
   "blacklist": ["apple", "pear"]
}
```

##### decimals

Limit the decimals allowed.

Example:

```json
"constraints": {
   "decimals": 4
}
```

##### no-decimals

Do not allowed decimals (give the error when try to type ',' or '.')

Example:

```json
"constraints": {
   "no-decimals": true
}
```

##### equal-to

Current field must be equal to something in the scope, could be or not a field.

Example:

```json
"constraints": {
   "equal-to": "variable-in-the-scope"
}
```

##### only-alpha

Allow letters only.

```json
"constraints": {
   "only-alpha": true
}
```

##### only-iso

Allow letters, digits, "-" and "_".

```json
"constraints": {
   "only-iso": true
}
```

##### one-upper

At least one character must be uppercase

```json
"constraints": {
   "one-upper": true
}
```

##### one-lower

At least one character must be lowercase

```json
"constraints": {
   "one-lower": true
}
```

##### one-number

At least one number must be lowercase

```json
"constraints": {
   "one-number": true
}
```

##### one-alpha

At least one letter must be lowercase

```json
"constraints": {
   "one-number": true
}
```

##### no-spaces

Cannot contains any spaces

```json
"constraints": {
   "one-number": true
}
```

##### hexadecimal

hexadecimal number: 0-9 & a-f

```json
"constraints": {
   "hexadecimal": true
}
```

##### hex-color

A color: #ffffff (# is required)

```json
"constraints": {
   "hex-color": true
}
```

##### future-date

Set datepicker range.

```json
"constraints": {
   "future-date": true
}
```

##### past-date

Set datepicker range.

```json
"constraints": {
   "past-date": true
}
```

##### till-today

Set datepicker range.

```json
"constraints": {
   "till-today": true
}
```

##### server-validation

Validate against server. $http send a JSON body with `request-key` and server must return a JSON with a boolean in `request-response`.

The request fill be made on `focusout` and only if the value change from last validation.

By default `request-key` is `value` and `request-response` is `success`

```json
"constraints": {
   "server-validation": "/URL/validation",
   "request-key": "value",
   "request-response": "success"
}
```


#### constraints todo list

* IPv4/IPv6
* alpha-dash
* alpha-num
* between (can be mimic with min/max really needed?)
* not-equal-to
* in
* mime-type
* file-size


### actions


#### angular natives

* show (ngShow)
* hide (ngHide)
* disabled (ngDisabled)
* selected (ngSelected)
* checked (ngChecked)
* readonly (ngReadonly)
* open (ngOpen)

#### on-selected
#### on-checked
#### on-disabled
#### on-readonly
#### on-required
#### on-open

Fired when given attribute is initialized or change.

Special properties are exposed on the local scope:

| Variable | Type | Details |
|---|---|---|
| $element | Node | Dom-Element |
| $selected | boolean | is selected (on-selected only) |
| $checked | boolean | is checked (on-checked only) |
| $disabled | boolean | is disabled (on-disabled only) |
| $readonly | boolean | is readonly (on-readonly only) |
| $required | boolean | is required (on-required only) |
| $open | boolean | is open (on-open only) |

Example:

```json
[{
    "label": "Disable field",
    "name": "xxx_disabled",
    "type": "checkbox",
    "actions": {
        "on-checked": "xxx_disabled = $checked;"
    }
},{
    "label": "Disable field",
    "name": "xxx_disabled",
    "type": "text",
    "actions": {
        "disabled": "xxx_disabled"
    }
}]
```

### attrs

`attrs` object contains what you expect, extra attributes that will be added to the element (for example: ng-placeholder)

The attrs are applied last, so you can override default behaviors.


For example, this won't disable the form.
```json
{
    "actions": {
        "disable": false
    },
    "attrs": {
        "ng-disable": true
    }
}
```


### Post initialization (late loading)

Sometimes you could need to wait for an async event (request) to arrive before displaying the form.

To do that you need to send the configuration object without `model`.

Minimal example:
```json
{
  "name": "form"
}
```

Formalizer will be watching the scope until the `model` is set.

`name` is the only required options. Angular will create a FormController without an appropriate name in the scope otherwise.

### snippets

Hide a form field.

```json
{
    "attrs": {
        "ng-show": false
    }
}
```

<a name="datepiker-date-disabled"></a>
Disable weekend selection @datepicker

```js
field_cfg = [{
    //...
    "attrs": {
        "date-disabled": "disabled_weekend(date, mode)"
    }
}];

$scope.disabled_weekend = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
};
```

## ng-datepicker-fix

Fix date input/output in foreign languages like Spanish using momentjs.

If you don't need to introduce dates in foreign languages, *remove* `ng-datepicker-fix.js` & `moment.js` from your include list.


Spanish example witht GMT+0:

```js
your_module
.config(["datepickerPopupConfig", function(datepickerPopupConfig) {
    datepickerPopupConfig.datepickerPopup = "dd/MM/yyyy"; // this is the viewable format (angularjs)
})
.config(["datepickerPopupFix", function(datepickerPopupFix) {

    // configure your lang
    moment.lang('es');

    // this will be the input/output format for datepickers
    datepickerPopupFix.datepickerPopup = "DD/MM/YYYY"; // in momentjs format
    datepickerPopupFix.datepickerTZ = "+0000"; // GMT+0, GMT+1 = "+0100", GMT-1 = "-0100" etc.
})

```

fix [TZ localization in date picker should be optional](https://github.com/angular-ui/bootstrap/issues/1891)

- - -

## Internalization

Input number can be internalized allowing enter a number with "." or "," as
decimal separator depending on current ngLocale ($locale).

```js
{ // field
  "type":"number",
  "attrs": {
    "use-locale": ""
  }
}
```

- - -

## testing

Currently karma with phantomjs (so you need to install phantomjs)


Datepicker fix need your system in GMT+1 to break angular-ui datepicker and see if the fix works.

```bash
sudo ln -sf /usr/share/zoneinfo/Europe/Madrid /etc/localtime

npm install
npm test
# or what i do
node_modules/karma/bin/karma start karma.js --browsers Firefox
```

- - -

## TODO

* add-option-if
* remove-option-if
* checkbox-inline (label@class)
* radio-inline (label@class)
* Timepicker
* include -> direct html (file)
* tabs
  * tabs (cfg)
  * tab-break
* matrix (table of radios|checkbox)
* captcha (require server side so -> plugin system)
* file upload (queue & instant)
* protractor tests with travis_ci support

util websites
* http://bootsnipp.com/forms?version=3
