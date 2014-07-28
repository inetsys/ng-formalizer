WIP, do not use atm. Wait a few weeks!


## install

```bash
npm install
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


### config object.

```js
// in the controller


    $scope.onSubmit = function(obj) {
        console.log(obj);
    };

    $scope.rawSubmit = function(obj) {
        console.log(obj);
    };

    $scope.config = {
        "legend": "The form legend, leave it blank to disable",
        "type": "horizontal", // vertical or inline, should work (untested)
        "name": "form",
        "onSubmit": "onSubmit", // function(dirty_data_only, model, form)
        "model": "entity",
        "fields": "form_fields", // dynamic (watch): string | static: array
    };

    $scope.form_fields = [/* explained below */];
```


### formalizer.fields properties


#### `type`: String [**mandatory**]
* text
* textarea
* password
* number
* email
* select
* datepicker
* checkbox
* checkbox-list
* radio-list (**IN PROGRESS**)
* typeahead (**IN PROGRESS**)
* typeahead-multi
* submit


#### `label`: String

Label text


#### `name`: String [**mandatory**]

Same as HTML


#### `placeholder`: String

No applicable to select, typeahead*, checkbox*, radio*


#### `source`: String|Array [**mandatory** for types: select, typeahead\*, checkbox\*, radio\*]

#### `source_display`: String [**mandatory** for types: select, typeahead\*, checkbox\*, radio\*]

#### `source_model`: String|null

These three options configure how you data source is displayed and what need to be stored in your model.

**source**

Data source, must be an array of objects or a string if you want formalizer to watch the scope for changes.

**source_display**

What will be displayed

**source_model**

What will be inserted in your model. String if you want a specific key of your object or null if you want the entire object.


#### `options`: Object

Extends current configuration with extra options for each type of field.

`select` options

* multiple

[`typeahead` options](http://angular-ui.github.io/bootstrap/#/typeahead)

* typeahead-append-to-body
* typeahead-editable
* typeahead-input-formatter
* typeahead-loading
* typeahead-min-length
* typeahead-template-url
* typeahead-wait-m

#### `datepicker`: Object

[`datepiker` options](http://angular-ui.github.io/bootstrap/#/datepicker)

* datepicker-mode
* min-date
* max-date
* date-disabled
* show-weeks
* starting-day
* init-date
* min-mode
* max-mode
* format-day
* format-month
* format-year
* format-day-header
* format-day-title
* format-month-title
* year-range
* show-button-bar
* current-text
* clear-text
* close-text
* close-on-date-selection
* datepicker-append-to-body
* datepicker-option


### extending templates

Here I expose some rules you need to know.


#### formalizer.error-list.html

This file will be `$interpolate` twice (before injected in field template, another one after it)

To support multiple tokens in each pass escape `{{` and `}}` like in this example.

`<li ng-show="%form-name%['{{element.attrs.name}}'].$error.min">{{messages.min || 'Field minimum is {\\{element.attrs[\'ng-min\']}\\}'}}</li>`

after the first `$interpolate`

`<li ng-show="form['input_name'].$error.min">Field minimum is {{element.attrs['ng-min']}}</li>`

after the second `$interpolate`

`<li ng-show="form['input_name'].$error.min">Field minimum is 5</li>`

Then the file is injected into the the form field template.

If you want to display something in the final


### Form field templates

Templates has another two phase process.

First replaces some internal values:
* `%element-attributes%` list of input/select/etc attributes as html-string
* `%element-error-list%` html for errors (the one explained above)
* `%scope-form-name%`
* `%scope-field-source%`

As you may notice `%scope-form-name%` appears in *formalizer.error-list.html* but it's replaced in this phase.

The second one `$interpolate` so remember to escape `{{` and `}}` if you want them to be in the final html that will be compiled.


### snippets

Hide a form field.

```js
{
    //...
    "constraints": {
        "show": false
    }
}
```js


## TODO

* set-value-if
* add-option-if
* remove-option-if
* select multiple
* checkbox-inline (label@class)
* radio-inline (label@class)
* Timepicker
* server validation?
* raw -> direct html
* include -> direct html (file)
* tabs
  * tabs (cfg)
  * tab-break
* matrix (table of radios)
* captcha (require server side so -> plugin system)
* file upload (queue & instant)
* columns (when found an array instead a config object 12 / length)
* remove elements (add $$formalizer_key to each cfg to track changes)
* casperjs tests with travis_ci support

util websites
* http://bootsnipp.com/forms?version=3