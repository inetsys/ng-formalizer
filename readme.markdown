# ng-formalizer [![Build Status](https://secure.travis-ci.org/llafuente/ng-formalizer.png?branch=master)](http://travis-ci.org/llafuente/ng-formalizer)


WIP, do not use atm. Wait a few weeks/days testing is coming!


## install

```bash
# npm install #this is required only if you need to PR or run tests
bower install
```


## run tests (not ci yet)

```bash
node test/server.js
firefox http://localhost:6001
```


## Usage
````js
  // Add to app dependencies
  var app = angular.module("app", ["formalizer"]);
````


## Development


### markup

```html
<div formalizer="config"></div>
```


### Configuration object

```js
// in the controller


    $scope.onSubmit = function(obj) {
        console.log(obj);
    };

    $scope.entity = {};

    $scope.config = {
        "legend": "The form legend, leave it blank to disable",
        "type": "horizontal", // vertical or inline, should work (untested)
        "name": "form",
        "onSubmit": "onSubmit", // function(dirty_data_only, model, form)
        "model": "entity", // must be a string, not the real variable!
        "fields": "form_fields", // String (watch) | Array
    };

    $scope.form_fields = [/* Fields properties */];
```


### Fields properties

Example: Create an input with some constraints and error messages translated.

```json
{
    "label": "User (minlength=5 and messages translated)",
    "type": "text",
    "name": "user",
    "placeholder": "Text",
    "constraints": {
        "required": true,
        "minlength": 5
    },
    "messages": {
        "minlength": "más de 5 caracters majo!"
    }
}
```


#### `type`: String [**mandatory**]
* text
* textarea
* password
* number
* email
* tel
* url
* select
* datepicker
* checkbox
* checkbox-list
* radio-list
* typeahead (**IN PROGRESS**)
* typeahead-multi
* submit


#### `label`: String

Label text


#### `name`: String [**mandatory**]

Same as HTML


#### `placeholder`: String

No applicable to select, typeahead*, checkbox*, radio*


#### `source`: String|Array [**mandatory** in select, typeahead\*, checkbox\*, radio\*]

#### `source_display`: String [**mandatory** in select, typeahead\*, checkbox\*, radio\*]

#### `source_model`: String|null

These three options configure how you data source is displayed and what need to be stored in your model.

**source**

Data source, must be an *array of objects* or a string if you want formalizer to watch the scope for changes.

**source_display**

What will be displayed, the key in the object

**source_model**

What will be inserted in your model. String if you want a specific key of your object or null if you want the entire object.


Examples:

```js
{
    source: [
        {id: 1, label:"1.- Brikindans"},
        {id: 2, label:"2.- Crusaíto"},
        {id: 3, label: "Maiquelyason",
        {id:4, label: "Robocop"}
    ],
    source_display: "label",
    source_model: "id"
}
```

#### `options`: Object

Extends current configuration with extra options for each type of field.

`checkbox-list` options

* `select_all` display a "Select All" checkbox

`select` options

* `multiple`

[`typeahead` options](http://angular-ui.github.io/bootstrap/#/typeahead)

* `typeahead-append-to-body`
* `typeahead-editable`
* `typeahead-input-formatter`
* `typeahead-loading`
* `typeahead-min-length`
* `typeahead-template-url`
* `typeahead-wait-m`

[`datepiker` options](http://angular-ui.github.io/bootstrap/#/datepicker)

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


### Extending templates

Here I expose some rules you need to know to write your own.

This is an advanced tutorial. Take a look to [$interpolate](https://docs.angularjs.org/api/ng/service/$interpolate) and [$compile](https://docs.angularjs.org/api/ng/service/$compile) their knowledge will help you to understand formalizer passes and how to escape things.

#### formalizer.error-list.html

This file will be `$interpolate` twice (before injected in field template), and one more time after it.

Take a look to this example:

`<li ng-show="%form-name%['{{element.attrs.name}}'].$error.min">{{messages.min || 'Field minimum is \{\{element.attrs[\'ng-min\']\}\}'}}</li>`

After the first `$interpolate`

`<li ng-show="form['input_name'].$error.min">Field minimum is {{element.attrs['ng-min']}}</li>`

After the second `$interpolate`

`<li ng-show="form['input_name'].$error.min">Field minimum is 5</li>`

Then the file is injected into the the form field template and will be `$interpolate` one more time.


### Form field templates

Templates has another two phase process.

First replaces some internal values:
* `%element-attributes%` element attributes as html-string example: `ng-model="xxxx" ng-class="xxx"`
* `%element-error-list%` contents of `formalizer.error-list.html` after the process explained above.
* `%scope-form-name%` name of the form in scope
* `%scope-field-source%` name of the field config in the scope

As you may notice `%scope-form-name%` appears in *formalizer.error-list.html* but it's replaced in this phase.

After this replacement, `$interpolate`. Remember to escape `{{` and `}}` if you want them to be in the final html.

When all fields are generated, we attach them to the fieldset and `$compile`.

### snippets

Hide a form field.

```js
{
    //...
    "constraints": {
        "show": false
    }
}
```

## testing

Currently karma with phantomjs (so you need to install phantomjs)

```bash
npm install
npm test
```

## TODO

* set-value-if
* add-option-if
* remove-option-if
* checkbox-inline (label@class)
* radio-inline (label@class)
* Timepicker
* server validation?
* raw -> direct html
* include -> direct html (file)
* tabs
  * tabs (cfg)
  * tab-break
* matrix (table of radios|checkbox)
* captcha (require server side so -> plugin system)
* file upload (queue & instant)
* columns (when found an array instead a config object 12 / length)
* remove elements (add $$formalizer_key to each cfg to track changes)
* casperjs tests with travis_ci support

util websites
* http://bootsnipp.com/forms?version=3