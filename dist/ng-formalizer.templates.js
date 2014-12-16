angular.module('formalizer-tpls', ['templates/formalizer-checkbox-list.tpl.html', 'templates/formalizer-checkbox-matrix.tpl.html', 'templates/formalizer-checkbox.tpl.html', 'templates/formalizer-columns.tpl.html', 'templates/formalizer-error-list.tpl.html', 'templates/formalizer-form-1.2.tpl.html', 'templates/formalizer-form-1.3.tpl.html', 'templates/formalizer-input.tpl.html', 'templates/formalizer-radio-list.tpl.html', 'templates/formalizer-raw.tpl.html', 'templates/formalizer-richtext.tpl.html', 'templates/formalizer-select.tpl.html', 'templates/formalizer-slider.tpl.html', 'templates/formalizer-submit.tpl.html', 'templates/formalizer-textarea.tpl.html', 'templates/formalizer-typeahead.tpl.html', 'templates/formalizer.fields.tpl.html']);

angular.module("templates/formalizer-checkbox-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-checkbox-list.tpl.html",
    "<div class=\"{{container.class}}\" ng-class=\"{ 'has-error' : (%scope-form-name%['{{element.attrs.name}}'].$invalid == true) }\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <label class=\"{{label.class}}\" ng-compile=\"\" ng-bind-html=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <div ng-show=\"{{scope_name}}.options.select_all\">\n" +
    "      <label for=\"{{element.attrs.name}}-select-all\">\n" +
    "        <input name=\"{{element.attrs.name}}-select-all\" id=\"{{element.attrs.id}}-select-all\" value=\"true\" ng-checked=\"{{element.attrs['checklist-model']}}.length == $field['$$'].source.length\" type=\"checkbox\" ng-model=\"{{options.chkall_model}}\" ng-change=\"{{options.scope_name}}.options.check_all($event)\" />\n" +
    "        Select All\n" +
    "      </label>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"{{element.wrap.class}}\" ng-repeat=\"checkbox_data in $field.formalizer.source\">\n" +
    "      <label for=\"{{element.attrs.name}}-\\{\\{$index\\}\\}\">\n" +
    "        <input name=\"{{element.attrs.name}}-\\{\\{$index\\}\\}\" id=\"{{element.attrs.id}}-\\{\\{$index\\}\\}\" %element-attributes%>\n" +
    "        \\{\\{checkbox_data['{{source_display}}']\\}\\}\n" +
    "      </label>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"help-block\" ng-compile=\"\" ng-bind-html=\"$field.help\"></div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-checkbox-matrix.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-checkbox-matrix.tpl.html",
    "<div class=\"{{container.class}}\" ng-class=\"{ 'has-error' : (%scope-form-name%['{{element.attrs.name}}'].$invalid == true) }\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <label class=\"{{label.class}}\" ng-compile=\"\" ng-bind-html=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "\n" +
    "<table class=\"table table-striped\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th></th>\n" +
    "      <th ng-repeat=\"label in $field.formalizer.source_display[0]\" ng-compile=\"\" ng-bind-html=\"label\">\n" +
    "      </th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"(yidx, second_level) in $field.formalizer.source_display[1]\">\n" +
    "      <th>\n" +
    "        \\{\\{$field.formalizer.source_display[1][yidx]\\}\\}\n" +
    "      </th>\n" +
    "\n" +
    "      <td ng-repeat=\"(xidx, first_level) in $field.formalizer.source_display[0]\">\n" +
    "        <input name=\"{{options.name}}-\\{\\{first_level\\}\\}-\\{\\{$index\\}\\}\"\n" +
    "        id=\"{{options.id}}-\\{\\{first_level\\}\\}-\\{\\{$index\\}\\}\"\n" +
    "        ng-model=\"{{options.model}}[$field.formalizer.source_model[0][xidx]][$field.formalizer.source_model[1][yidx]]\"\n" +
    "        %element-attributes% />\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "\n" +
    "<!--\n" +
    "<pre>\n" +
    "\\{\\{$field.formalizer | json\\}\\}\n" +
    "\\{\\{$field.model | json\\}\\}\n" +
    "</pre>\n" +
    "-->\n" +
    "    <div class=\"help-block\" ng-compile=\"\" ng-bind-html=\"$field.help\"></div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-checkbox.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-checkbox.tpl.html",
    "<div class=\"{{container.class}}\" ng-class=\"{ 'has-error' : (%scope-form-name%['{{element.attrs.name}}'].$invalid == true) }\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\">\n" +
    "      <input %element-attributes% /><span ng-compile=\"\" ng-bind-html=\"$field.label\"></span>\n" +
    "    </label>\n" +
    "\n" +
    "    <div class=\"help-block\" ng-compile=\"\" ng-bind-html=\"$field.help\"></div>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-columns.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-columns.tpl.html",
    "<div class=\"row\">\n" +
    "    <div ng-repeat=\"col in columns\" class=\"col-xs-{{col.cols}} col-sm-{{col.cols}} col-md-{{col.cols}} col-lg-{{col.cols}}\">\n" +
    "        <div ng-formalizer-field=\"col\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/formalizer-error-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-error-list.tpl.html",
    "<ul class=\"form-error-list help-block\">\n" +
    "  <li ng-show=\"$formalizer.$attemps > 0 && %scope-form-name%['{{element.attrs.name}}'].$error.required\">{{messages.required || 'Field is required'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error.min\">{{messages.min || 'Field minimum is \\{\\{element.attrs[\\'ng-min\\']\\}\\}'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error.max\">{{messages.max || 'Field maximum is \\{\\{element.attrs[\\'ng-max\\']\\}\\}'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error.minlength\">{{messages.minlength || 'Field is required to be at least \\{\\{element.attrs[\\'ng-minlength\\']\\}\\} characters'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error.maxlength\">{{messages.maxlength || 'Field cannot be longer than \\{\\{element.attrs[\\'ng-maxlength\\']\\}\\} characters'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error.number\">{{messages.number || 'Field is an invalid number'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error.email\">{{messages.email || 'Field is an invalid email'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error.url\">{{messages.url || 'Field is an invalid URL'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error.blacklist\">{{messages.blacklist || 'Field value is blacklisted'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error['equal-to']\">{{messages['equal-to'] || 'Field must be equal to: X'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error['only-alpha']\">{{messages['only-alpha'] || 'Field must contains only letters'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error['only-iso']\">{{messages['only-iso'] || 'Valid characters are: A-Z, a-z, 0-9'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error['one-upper']\">{{messages['one-upper'] || 'At least one uppercase'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error['one-lower']\">{{messages['one-lower'] || 'At least one lowercase'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error['one-number']\">{{messages['one-number'] || 'At least one number'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error['one-alpha']\">{{messages['one-alpha'] || 'At least one letter'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error['server-validation']\">{{messages['server-validation'] || 'Server validation fails'}}</li>\n" +
    "  <li ng-show=\"%scope-form-name%['{{element.attrs.name}}'].$error['length']\">{{messages['length'] || 'Field length must be exactly \\{\\{element.attrs[\\'ng-length\\']\\}\\}'}}</li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("templates/formalizer-form-1.2.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-form-1.2.tpl.html",
    "<form\n" +
    "    role=\"form\"\n" +
    "    ng-submit=\"$formalizer.submit()\"\n" +
    "    ng-class=\"{'form-horizontal': $formalizer.horizontal, 'form-vertical': $formalizer.vertical, 'form-inline': $formalizer.inline}\"\n" +
    "    name=\"{{$formalizer.name}}\"\n" +
    "    ng-formalizer-form-attach=\"$formalizer.name\"\n" +
    "    novalidate>\n" +
    "  <fieldset>\n" +
    "    <legend ng-if=\"$formalizer.legend\">{{$formalizer.legend}}</legend>\n" +
    "    <div class=\"fieldset-contents\"></div>\n" +
    "\n" +
    "    <div ng-if=\"$formalizer.model\">\n" +
    "      <div ng-init=\"field.fields = $formalizer.fields\"></div>\n" +
    "      <div ng-include=\"'templates/formalizer.fields.tpl.html'\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "  </fieldset>\n" +
    "\n" +
    "</form>\n" +
    "");
}]);

angular.module("templates/formalizer-form-1.3.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-form-1.3.tpl.html",
    "<form\n" +
    "    role=\"form\"\n" +
    "    ng-submit=\"$formalizer.submit()\"\n" +
    "    ng-class=\"{'form-horizontal': $formalizer.horizontal, 'form-vertical': $formalizer.vertical, 'form-inline': $formalizer.inline}\"\n" +
    "    name=\"$parent.{{$formalizer.name}}\"\n" +
    "    ng-formalizer-form-attach=\"$formalizer.name\"\n" +
    "    novalidate>\n" +
    "  <fieldset>\n" +
    "    <legend ng-if=\"$formalizer.legend\">{{$formalizer.legend}}</legend>\n" +
    "    <div class=\"fieldset-contents\"></div>\n" +
    "\n" +
    "    <div ng-if=\"$formalizer.model\">\n" +
    "      <div ng-init=\"field.fields = $formalizer.fields\"></div>\n" +
    "      <div ng-include=\"'templates/formalizer.fields.tpl.html'\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "  </fieldset>\n" +
    "\n" +
    "</form>\n" +
    "");
}]);

angular.module("templates/formalizer-input.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-input.tpl.html",
    "<div class=\"{{container.class}}\" ng-class=\"{ 'has-error' : (%scope-form-name%['{{element.attrs.name}}'].$invalid == true) }\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\" ng-compile=\"\" ng-bind-html=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <div class=\"{{element.wrap.class}}\">\n" +
    "        {{element.left}}\n" +
    "        <input %element-attributes% />\n" +
    "        {{element.right}}\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"help-block\" ng-compile=\"\" ng-bind-html=\"$field.help\"></div>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-radio-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-radio-list.tpl.html",
    "<div class=\"{{container.class}}\" ng-class=\"{ 'has-error' : (%scope-form-name%['{{element.attrs.name}}'].$invalid == true) }\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <label class=\"{{label.class}}\" ng-compile=\"\" ng-bind-html=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <div class=\"{{element.wrap.class}}\" ng-repeat=\"radio_data in $field.formalizer.source\">\n" +
    "      <label for=\"{{element.attrs.name}}-\\{\\{$index\\}\\}\">\n" +
    "        <input name=\"{{element.attrs.name}}\" id=\"{{element.attrs.id}}-\\{\\{$index\\}\\}\" value=\"\\{\\{radio_data{{source_model}}\\}\\}\" %element-attributes%>\n" +
    "        \\{\\{radio_data['{{source_display}}']\\}\\}\n" +
    "      </label>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"help-block\" ng-compile=\"\" ng-bind-html=\"$field.help\"></div>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-raw.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-raw.tpl.html",
    "<div ng-formalizer-attach=\"\" ng-show=\"$field.formalizer.visible\">\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-richtext.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-richtext.tpl.html",
    "<div class=\"{{container.class}}\" ng-class=\"{ 'has-error' : (%scope-form-name%['{{element.attrs.name}}'].$invalid == true) }\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\" ng-compile=\"\" ng-bind-html=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <div class=\"{{element.wrap.class}}\">\n" +
    "        <div text-angular %element-attributes%></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"help-block\" ng-compile=\"\" ng-bind-html=\"$field.help\"></div>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-select.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-select.tpl.html",
    "<div class=\"{{container.class}}\" ng-class=\"{ 'has-error' : (%scope-form-name%['{{element.attrs.name}}'].$invalid == true) }\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\" ng-compile=\"\" ng-bind-html=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <select %element-attributes%>\n" +
    "      {{defaultOption}}\n" +
    "    </select>\n" +
    "\n" +
    "    <div class=\"help-block\" ng-compile=\"\" ng-bind-html=\"$field.help\"></div>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-slider.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-slider.tpl.html",
    "<div class=\"{{container.class}}\" ng-class=\"{ 'has-error' : (%scope-form-name%['{{element.attrs.name}}'].$invalid == true) }\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\" ng-compile=\"\" ng-bind-html=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <p class=\"{{element.wrap.class}}\">\n" +
    "        {{element.left}}\n" +
    "        <div slider %element-attributes% />\n" +
    "        {{element.right}}\n" +
    "        <!-- hide an input with the value ?! -->\n" +
    "    </p>\n" +
    "\n" +
    "    <div class=\"help-block\" ng-compile=\"\" ng-bind-html=\"$field.help\"></div>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-submit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-submit.tpl.html",
    "<div class=\"{{container.class}}\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <div class=\"col-sm-10 col-sm-offset-2\">\n" +
    "    <button %element-attributes% ng-disabled=\"%scope-form-name%.$invalid\" ng-compile=\"\" ng-bind-html=\"$field.label\"></button>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"help-block\" ng-compile=\"\" ng-bind-html=\"$field.help\"></div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-textarea.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-textarea.tpl.html",
    "<div class=\"{{container.class}}\" ng-class=\"{ 'has-error' : (%scope-form-name%['{{element.attrs.name}}'].$invalid == true) }\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\" ng-compile=\"\" ng-bind-html=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <p class=\"{{element.wrap.class}}\">\n" +
    "        <textarea %element-attributes%>\n" +
    "        </textarea>\n" +
    "    </p>\n" +
    "\n" +
    "    <div class=\"help-block\" ng-compile=\"\" ng-bind-html=\"$field.help\"></div>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-typeahead.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-typeahead.tpl.html",
    "<div class=\"{{container.class}}\" ng-class=\"{ 'has-error' : (%scope-form-name%['{{element.attrs.name}}'].$invalid == true) }\" ng-show=\"$field.formalizer.visible\">\n" +
    "  <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\" ng-compile=\"\" ng-bind-html=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <p class=\"{{element.wrap.class}}\">\n" +
    "\n" +
    "    <ul>\n" +
    "      <li ng-repeat=\"obj in entity.ta_list\">\n" +
    "        <span>\\{\\{obj.name\\}\\} <a ng-click=\"{{options.del_fn}}(obj)\"><span class=\"glyphicon glyphicon-trash\"></span></a></span>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "\n" +
    "    </p>\n" +
    "    <p class=\"{{element.wrap.class}}\">\n" +
    "        {{element.left}}\n" +
    "        <input %element-attributes% />\n" +
    "        {{element.right}}\n" +
    "    </p>\n" +
    "\n" +
    "    <div class=\"help-block\" ng-compile=\"\" ng-bind-html=\"$field.help\"></div>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer.fields.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer.fields.tpl.html",
    "<div ng-repeat=\"field in field.fields\">\n" +
    "    <!-- <pre>{{field | json}}</pre> -->\n" +
    "    <div ng-formalizer-field=\"field\"></div>\n" +
    "\n" +
    "    <div class=\"col-sm-offset-1\" ng-show=\"field.formalizer.visible_children\">\n" +
    "      <div ng-include=\"'templates/formalizer.fields.tpl.html'\"></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
