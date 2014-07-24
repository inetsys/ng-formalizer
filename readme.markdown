WIP, do not use atm. Wait a few weeks!


##todo

* server validation
* raw type -> html
* casperjs tests with travis_ci support
* remove elements

html reference
http://bootsnipp.com/forms?version=3



### Development

#### markup

```html
<div fromalizer="configuration"></div>
```

#### configuration object.

```js
// in the controller


    $scope.onSubmit = function(obj) {
        console.log(obj);
    };

    $scope.rawSubmit = function(obj) {
        console.log(obj);
    };

    $scope.configuration = {
        "legend": "The form legend, leave it blank to disable",
        "type": "horizontal", // vertical or inline, should work (untested)
        "name": "form",
        "onSubmit": "onSubmit", // function(dirty_data_only, model, form)
        "model": "entity",
        "fields": "form_fields", // dynamic (watch): string | static: array
    };

    $scope.form_fields = [/* explained below */];
```



#### formalizer.error-list.html

This file will be `$interpolate` twice.

To support multiple tokens in each pass escape `{{` and `}}` like in the example.

Initial

`<li ng-show="%form-name%['{{element.attrs.name}}'].$error.min">{{messages.min || 'Field minimum is {\\{element.attrs[\'ng-min\']}\\}'}}</li>`

first time

`<li ng-show="form['input_name'].$error.min">Field minimum is {{element.attrs['ng-min']}}</li>`

second time

`<li ng-show="form['input_name'].$error.min">Field minimum is 5</li>`

Then the file is injected into the the form field template.


#### Form field templates

The are many templates. All are `$interpolate` once. so remember to escape `{{` and `}}` if you want them to be in the final html that will be compiled.


#### snippets

Hide a form field.

```js
{
    //...
    "constraints": {
        "show": false
    }
}
```js


### TODO

* set-value-if
* add-option-if
* remove-option-if
