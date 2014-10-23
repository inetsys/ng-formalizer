# ng-formalizer [![Build Status](https://secure.travis-ci.org/llafuente/ng-formalizer.png?branch=master)](http://travis-ci.org/llafuente/ng-formalizer)


## notice

Rather stable. Report any bug and remember to provide a test case.


## dependencies

* jquery: 2.1.*
* angular: 1.2.*
* angular-bootstrap : *
* checklist-model: 0.1.3
* bootstrap: ~3.2.0
* moment: ~2.8. (optional, used in ng-datepicker-fix)


## install

```bash
# npm install #this is required only if you need to PR or run tests
bower install
```


## run examples

```bash
node examples/server.js
firefox http://localhost:6001
```


## usage

````js
  // Add to your app dependencies
  var app = angular.module("app", ["formalizer"]);
````


### markup (html)

```html
<div ng-formalizer="config"></div>
```


### configuration (controller)

```js
    // handle submit
    $scope.onSubmit = function(dirty_data, files, full_data, form_ctrl) {
        console.log("dirty_data", dirty_data);
        console.log("files", files);
        console.log("full_data", full_data);
        console.log("form_ctrl", form_ctrl);
    };

    $scope.entity = {};

    $scope.config = {
        "legend": "The form legend, leave it blank to disable",
        "type": "horizontal", // vertical or inline, should work (untested)
        "name": "form",
        "onSubmit": "onSubmit", // function(dirty_data_only, model, scope_form)
        "model": "entity", // must be a string, not the real variable!
        "fields": "form_fields", // String (watch) | Array
    };

    $scope.form_fields = [
        // Fields properties see below for examples & info
    ];
```

##### `legend`: String

Form legend text.

##### `type`: String [horizontal, vertical, inline]

How to display the form in the screen. ATM only horizontal is fully supported and tested.

##### `name`: String [**mandatory**]

Form name attribute.

##### `model`: String [**mandatory**]

Key in the scope that will hold all form information (ng-model)

##### `onSubmit`: String|Function [**mandatory**]

* `dirty_data` Object

  Data that has from the original model.

* `files` null|Array<File>

  List of files.

* `full_data` Object

  All data in the scope.

* `form_ctrl`

  AngularJS Form controller


##### `fields`: String|Array

Fields list. See below for more information.

- - -

### Fields properties

Basic Example:
Create an input with some constraints and error messages translated.

```json
{
    "label": "User",
    "type": "text",
    "name": "user",
    "placeholder": "Text",
    "groups": "",
    "actions": {
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

##### `type`: String [**mandatory**]
* text
* password
* number
* email
* tel
* url
* textarea
* select
* datepicker

  using [ui-bootstrap-datepicker](http://angular-ui.github.io/bootstrap/#/datepicker)

* checkbox
* checkbox-list

  using [checklist-model](http://vitalets.github.io/checklist-model/)

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


##### `name`: String [**mandatory**]

Same as HTML


##### `placeholder`: String

No applicable to select, typeahead*, checkbox*, radio*


##### `default`: String [**optional**]

If model is `undefined` set this value. No more scope checks.


##### `source`: String|Array [**mandatory** in select, typeahead\*, checkbox\*, radio\*]

##### `source_display`: String [**mandatory** in select, typeahead\*, checkbox\*, radio\*]

##### `source_model`: String|null

These three options configure how your data source is displayed and what need to be stored in your model.

**source**

Data source, must be an *array of objects* or a string if you want formalizer to watch the scope for changes.

*Can be real-time modified.*

**source_display**

What will be displayed, the key in the object.

**source_model**

What will be inserted in your model. String if you want a specific key of your object or null if you want the entire object.


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

<a name="field-type-raw-example"></a>
##### `template`: String (raw only)

HTML to be displayed directly in the form. Be aware that the HTML is not `$compile` on purpose.

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


`typeahead` options [ui-bootstrap-typeahead](http://angular-ui.github.io/bootstrap/#/typeahead)

* `typeahead-append-to-body`
* `typeahead-editable`
* `typeahead-input-formatter`
* `typeahead-loading`
* `typeahead-min-length`
* `typeahead-template-url`
* `typeahead-wait-m`


`datepiker` options [ui-bootstrap-datepicker](http://angular-ui.github.io/bootstrap/#/datepicker)

* `datepicker-mode`
* `min-date`
* `max-date`
* `date-disabled`
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


`slider` options [angular-bootstrap-slider](https://github.com/seiyria/angular-bootstrap-slider)

* `min`
* `max`
* `step`
* `precision`
* `orientation`
* `range`
* `selection`
* `tooltip`
* `tooltipSeparator`
* `tooltipSplit`
* `handle`
* `reversed`
* `enabled`
* `naturalArrowKeys`
* `sliderId`
* `updateEvent`

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

##### decimal

Limit the decimals allowed.

Example:

```json
"constraints": {
   "decimal": 4
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
* After Date (Future Date)
* Before Date
* alpha-dash
* alpha-num
* between (can be mimic with min/max really needed?)
* not-equal-to
* in
* mime-type
* file-size


### actions

Group of actions to do when value change.

#### hide-group

Hide target group(s) (show previous target).

Use the same syntax as ng-class, keys are the values, values are the target group (coma separated)

```json
{
    "label": "Lista",
    "name": "lista",
    "type": "select",
    "source": [
        { "id": 1, "label": "HIDE grp001 & grp002 is visible" },
        { "id": 1, "label": "HIDE grp002 & grp001 is visible" }
    ],
    "source_display": "label",
    "source_model": "id",
    "actions": {
        "hide-group": "{1: 'grp001', 2: 'grp002'}"
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
    "constraints": {
        "show": false
    }
}
```

Disable weekend selection @datepicker

```js
field_cfg = [{
    //...
    "constraints": {
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

## Extending templates

Here I expose some rules you need to know to write your own.

This is an advanced tutorial. Take a look to [$interpolate](https://docs.angularjs.org/api/ng/service/$interpolate) and [$compile](https://docs.angularjs.org/api/ng/service/$compile) their knowledge will help you to understand formalizer passes and how to escape things.

#### formalizer.error-list.html

This file will be `$interpolate` twice (before injected in field template), and one more time after it. Three times total.

Take a look to this example:

`<li ng-show="%scope-form-name%['{{element.attrs.name}}'].$error.min">{{messages.min || 'Field minimum is \{\{element.attrs[\'ng-min\']\}\}'}}</li>`

After the first `$interpolate`

`<li ng-show="%scope-form-name%['input_name'].$error.min">Field minimum is {{element.attrs['ng-min']}}</li>`

After the second `$interpolate`

`<li ng-show="%scope-form-name%['input_name'].$error.min">Field minimum is 5</li>`

Then the file is injected into the the form field template and will be `$interpolate` one more time.


## Form field templates

Templates has another two phase process.

First replaces some internal values:
* `%element-attributes%` element attributes as html-string example: `ng-model="xxxx" ng-class="xxx"`
* `%element-error-list%` contents of `formalizer.error-list.html` after the process explained above.
* `%scope-form-name%` name of the form in scope

As you may notice `%scope-form-name%` appears in *formalizer.error-list.html* It's replaced now.

After this replacement, `$interpolate`. Remember to escape `{{` and `}}` if you want them to be in the final html.

When all fields are generated, we attach them to the fieldset and `$compile`.



## Extending ng-formalizer (beyond templates)

Formalizer class can be extended to support new types or overwrite current ones.

Let's take a look to a simple case

formalizer.textarea.js
```js
    // add to templates, so it will fetch templates/formalizer-textarea.tpl.hmtml
    Formalizer.templates.push("textarea");

    // add a new field.type = template to use
    Formalizer.types.textarea = "textarea";

    // do your staff here.
    // take a look to: "lib/formalizer.**.js" for more code examples.
    Formalizer.parsers.textarea = function ($scope, field, cfg) {
    };
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