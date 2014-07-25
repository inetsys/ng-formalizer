WIP, do not use atm. Wait a few weeks!


##todo

* server validation
* raw type -> html
* casperjs tests with travis_ci support
* remove elements

html reference
http://bootsnipp.com/forms?version=3

## Usage
````js
  // Add to app dependencies
  var app = angular.module("app", ["formalizer"]);
````


## Development

### markup

```html
<div fromalizer="config"></div>
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

### fromalizer.fields properties

#### `type`: String
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

#### `name`: String

Same as HTML

#### `placeholder`: String

No aplicable to select, typeahead*, checkbox*, radios*

#### `source`: String|Array

Where obtain the data to *build* the field

#### `source_diplay`: String

What display

#### `source_model`: String|null

What field of the object include in the model, `null` means insert the object.

For: select, typeahead-multi, checkbox-list

Choose the data source to *build* the field. Use it in conjuction with source_diplay & source_model give you the ability to display and insert in the model exactly what you need.

If String is selected, watch/eval is used.

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
