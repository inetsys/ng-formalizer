angular.module('formalizer-tpls', ['templates/formalizer-checkbox-list.tpl.html', 'templates/formalizer-checkbox.tpl.html', 'templates/formalizer-error-list.tpl.html', 'templates/formalizer-form-1.2.tpl.html', 'templates/formalizer-form-1.3.tpl.html', 'templates/formalizer-input.tpl.html', 'templates/formalizer-radio-list.tpl.html', 'templates/formalizer-raw.tpl.html', 'templates/formalizer-select.tpl.html', 'templates/formalizer-slider.tpl.html', 'templates/formalizer-submit.tpl.html', 'templates/formalizer-textarea.tpl.html', 'templates/formalizer-typeahead.tpl.html']);

angular.module("templates/formalizer-checkbox-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-checkbox-list.tpl.html",
    "<div class=\"{{container.class}}\">\n" +
    "  <label class=\"{{label.class}}\">{{label.text}}</label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <div ng-show=\"{{scope_name}}.options.select_all\">\n" +
    "      <label for=\"{{element.attrs.name}}-select-all\">\n" +
    "        <input name=\"{{element.attrs.name}}-select-all\" id=\"{{element.attrs.id}}-select-all\" value=\"true\" ng-checked=\"{{element.attrs['checklist-model']}}.length == %scope-field-source%.length\" type=\"checkbox\" ng-model=\"{{options.chkall_model}}\" ng-change=\"{{options.scope_name}}.options.check_all($event)\" />\n" +
    "        Select All\n" +
    "      </label>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"{{element.wrap.class}}\" ng-repeat=\"checkbox_data in %scope-field-source%\">\n" +
    "      <label for=\"{{element.attrs.name}}-\\{\\{$index\\}\\}\">\n" +
    "        <input name=\"{{element.attrs.name}}-\\{\\{$index\\}\\}\" id=\"{{element.attrs.id}}-\\{\\{$index\\}\\}\" %element-attributes%>\n" +
    "        \\{\\{checkbox_data['{{source_display}}']\\}\\}\n" +
    "      </label>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("templates/formalizer-checkbox.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-checkbox.tpl.html",
    "<div class=\"{{container.class}}\">\n" +
    " <div class=\"{{element.container.class}}\">\n" +
    "  <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\">\n" +
    "    <input %element-attributes% /><span>{{label.text}}</span>\n" +
    "  </label>\n" +
    "  <p class=\"help-block\">{{helpText}}</p>\n" +
    "  %element-error-list%\n" +
    " </div>\n" +
    "</div>");
}]);

angular.module("templates/formalizer-error-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-error-list.tpl.html",
    "<ul class=\"form-error-list\">\n" +
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
    "</ul>");
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
    "        <div ng-repeat=\"field in $formalizer.fields\">\n" +
    "            <!-- <pre>{{field | json}}</pre> -->\n" +
    "            <div ng-formalizer-field=\"field\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "  </fieldset>\n" +
    "\n" +
    "</form>");
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
    "        <div ng-repeat=\"field in $formalizer.fields\">\n" +
    "            <!-- <pre>{{field | json}}</pre> -->\n" +
    "            <div ng-formalizer-field=\"field\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <pre>{{form | json}}</pre>\n" +
    "\n" +
    "  </fieldset>\n" +
    "\n" +
    "</form>");
}]);

angular.module("templates/formalizer-input.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-input.tpl.html",
    "<div class=\"{{container.class}}\">\n" +
    "  <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\">{{label.text}}</label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <div class=\"{{element.wrap.class}}\">\n" +
    "        {{element.left}}\n" +
    "        <input %element-attributes% />\n" +
    "        {{element.right}}\n" +
    "    </div>\n" +
    "    <div class=\"help-block\">{{help.text}}</div>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("templates/formalizer-radio-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-radio-list.tpl.html",
    "<div class=\"{{container.class}}\">\n" +
    "  <label class=\"{{label.class}}\">{{label.text}}</label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <div class=\"{{element.wrap.class}}\" ng-repeat=\"radio_data in %scope-field-source%\">\n" +
    "      <label for=\"{{element.attrs.name}}-\\{\\{$index\\}\\}\">\n" +
    "        <input name=\"{{element.attrs.name}}\" id=\"{{element.attrs.id}}-\\{\\{$index\\}\\}\" value=\"\\{\\{radio_data{{source_model}}\\}\\}\" %element-attributes%>\n" +
    "        \\{\\{radio_data['{{source_display}}']\\}\\}\n" +
    "      </label>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("templates/formalizer-raw.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-raw.tpl.html",
    "<div>\n" +
    "{{options.template}}\n" +
    "</div>");
}]);

angular.module("templates/formalizer-select.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-select.tpl.html",
    "<div class=\"{{container.class}}\">\n" +
    "  <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\">{{label.text}}</label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <select %element-attributes%>\n" +
    "      {{defaultOption}}\n" +
    "    </select>\n" +
    "    <p class=\"help-block\">{{helpText}}</p>\n" +
    "    %element-error-list%\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("templates/formalizer-slider.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-slider.tpl.html",
    "<div class=\"{{container.class}}\">\n" +
    "  <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\">{{label.text}}</label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <p class=\"{{element.wrap.class}}\">\n" +
    "        {{element.left}}\n" +
    "        <div slider %element-attributes% />\n" +
    "        {{element.right}}\n" +
    "        <!-- hide an input with the value ?! -->\n" +
    "    </p>\n" +
    "    <p class=\"help-block\">{{help.text}}</p>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("templates/formalizer-submit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-submit.tpl.html",
    "<div class=\"{{container.class}}\">\n" +
    "  <div class=\"col-sm-10 col-sm-offset-2\">\n" +
    "    <button %element-attributes% ng-disabled=\"%scope-form-name%.$invalid\">{{label.text}}</button>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("templates/formalizer-textarea.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-textarea.tpl.html",
    "<div class=\"{{container.class}}\">\n" +
    "  <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\">{{label.text}}</label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <p class=\"{{element.wrap.class}}\">\n" +
    "        <textarea %element-attributes%>\n" +
    "        </textarea>\n" +
    "    </p>\n" +
    "    <p class=\"help-block\">{{help.text}}</p>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("templates/formalizer-typeahead.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-typeahead.tpl.html",
    "<div class=\"{{container.class}}\">\n" +
    "  <label for=\"{{element.attrs.name}}\" class=\"{{label.class}}\">{{label.text}}</label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <p class=\"{{element.wrap.class}}\">\n" +
    "\n" +
    "    <ul>\n" +
    "      <li ng-repeat=\"obj in entity.ta_list\">\n" +
    "\n" +
    "        <span>\\{\\{obj.name\\}\\} <a ng-click=\"{{options.del_fn}}(obj)\"><img src=\"/trash.png\" /></a></span>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "\n" +
    "    </p>\n" +
    "    <p class=\"{{element.wrap.class}}\">\n" +
    "        {{element.left}}\n" +
    "        <input %element-attributes% />\n" +
    "        {{element.right}}\n" +
    "    </p>\n" +
    "    <p class=\"help-block\">{{help.text}}</p>\n" +
    "\n" +
    "    %element-error-list%\n" +
    "\n" +
    "  </div>\n" +
    "</div>");
}]);
