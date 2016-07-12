angular.module('formalizer-tpls', ['templates/formalizer-checkbox-list.tpl.html', 'templates/formalizer-checkbox-matrix.tpl.html', 'templates/formalizer-checkbox.tpl.html', 'templates/formalizer-columns.tpl.html', 'templates/formalizer-error-list.tpl.html', 'templates/formalizer-form-1.2.tpl.html', 'templates/formalizer-form-1.3.tpl.html', 'templates/formalizer-form-1.4.tpl.html', 'templates/formalizer-hidden.tpl.html', 'templates/formalizer-input.tpl.html', 'templates/formalizer-lcheckbox.tpl.html', 'templates/formalizer-radio-list.tpl.html', 'templates/formalizer-raw.tpl.html', 'templates/formalizer-richtext.tpl.html', 'templates/formalizer-select.tpl.html', 'templates/formalizer-slider.tpl.html', 'templates/formalizer-submit.tpl.html', 'templates/formalizer-textarea.tpl.html', 'templates/formalizer-typeahead.tpl.html', 'templates/formalizer-ui-select.tpl.html', 'templates/formalizer.fields.tpl.html']);

angular.module("templates/formalizer-checkbox-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-checkbox-list.tpl.html",
    "<div {{container.attrs_text}}>\n" +
    "  <label class=\"{{label.class}}\" ng-bind-html-and-compile=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <div ng-show=\"$field.options.select_all\">\n" +
    "      <label for=\"{{element.attrs.id}}-select-all\">\n" +
    "        <input name=\"{{element.attrs.name}}-select-all\" id=\"{{element.attrs.id}}-select-all\" value=\"true\" ng-checked=\"{{element.attrs['checklist-model']}}.length == $field['$$'].source.length\" type=\"checkbox\" ng-model=\"{{options.chkall_model}}\" ng-change=\"$configuration.$check_all($event)\" />\n" +
    "        Select All\n" +
    "      </label>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"{{element.wrap.class}}\" ng-repeat=\"checkbox_data in $configuration.source {{source_filter}}\">\n" +
    "      <label for=\"{{element.attrs.id}}-\\{\\{$index\\}\\}\">\n" +
    "        <input name=\"{{element.attrs.name}}-\\{\\{$index\\}\\}\" id=\"{{element.attrs.id}}-\\{\\{$index\\}\\}\" {{element.attrs_text}}>\n" +
    "        \\{\\{checkbox_data['{{source_display}}']\\}\\}\n" +
    "      </label>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"help-block formalizer-help {{element.offset}} {{element.size}}\" ng-bind-html-and-compile=\"$field.help\" ng-show=\"$field.help\"></div>\n" +
    "  <div class=\"help-block formalizer-error-list {{element.offset}} {{element.size}}\" ng-formalizer-errors=\"'{{element.attrs.name}}'\" messages=\"$field.messages\"></div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-checkbox-matrix.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-checkbox-matrix.tpl.html",
    "<div {{container.attrs_text}}>\n" +
    "  <label class=\"{{label.class}}\" ng-compile=\"\" ng-bind-html-and-compile=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "\n" +
    "<table class=\"table table-striped\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th></th>\n" +
    "      <th ng-repeat=\"label in $field.formalizer.source_display[0]\" ng-bind-html-and-compile=\"label\">\n" +
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
    "        {{element.attrs_text}} />\n" +
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
    "    <div class=\"help-block formalizer-help {{element.offset}} {{element.size}}\" ng-bind-html-and-compile=\"$field.help\" ng-show=\"$field.help\"></div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-checkbox.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-checkbox.tpl.html",
    "<div {{container.attrs_text}}>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <label for=\"{{element.attrs.id}}\" class=\"{{label.class}}\">\n" +
    "      <input {{element.attrs_text}} /><span ng-bind-html-and-compile=\"$field.label\"></span>\n" +
    "    </label>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"help-block formalizer-help {{element.offset}} {{element.size}}\" ng-bind-html-and-compile=\"$field.help\" ng-show=\"$field.help\"></div>\n" +
    "  <div class=\"help-block formalizer-error-list {{element.offset}} {{element.size}}\" ng-formalizer-errors=\"'{{element.attrs.name}}'\" messages=\"$field.messages\"></div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-columns.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-columns.tpl.html",
    "<div class=\"col-xs-12 col-sm-12 col-md-12\">\n" +
    "  <div ng-repeat=\"col in columns\" class=\"col-xs-{{col.cols}} col-sm-{{col.cols}} col-md-{{col.cols}} col-lg-{{col.cols}}\">\n" +
    "    <div ng-formalizer-field=\"col\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-error-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-error-list.tpl.html",
    "<ul class=\"formalizer-error-messages ng-hide\" ng-show=\"$messages !== false && !!$formalizer.form[$field.name].$error\">\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$dirty && $formalizer.form[$field.name].$error.required\" ng-bind-html-and-compile=\"$messages.required || ('Field is required')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form.$dirty && $formalizer.form[$field.name].$error.required_list\" ng-bind-html-and-compile=\"$messages.required_list || ('At least one must be checked')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error.min\" ng-bind-html-and-compile=\"$messages.min || ('Field minimum is {{ $configuration.element.attrs[&quot;min&quot;] }}')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error.max\" ng-bind-html-and-compile=\"$messages.max || ('Field maximum is {{ $configuration.element.attrs[&quot;max&quot;] }}')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error.minlength\" ng-bind-html-and-compile=\"$messages.minlength || ('Field is required to be at least {{ $configuration.element.attrs[&quot;ng-minlength&quot;] }} characters')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error.maxlength\" ng-bind-html-and-compile=\"$messages.maxlength || ('Field cannot be longer than {{$configuration.element.attrs[&quot;ng-maxlength&quot;]}} characters')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error.number\" ng-bind-html-and-compile=\"$messages.number || ('Field is an invalid number')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error.email\" ng-bind-html-and-compile=\"$messages.email || ('Field is an invalid email')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error.url\" ng-bind-html-and-compile=\"$messages.url || ('Field is an invalid URL')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error.blacklist\" ng-bind-html-and-compile=\"$messages.blacklist || ('Field value is blacklisted')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['equal-to']\" ng-bind-html-and-compile=\"$messages['equal-to'] || ('Field must be equal to: X')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['only-alpha']\" ng-bind-html-and-compile=\"$messages['only-alpha'] || ('Field must contains only letters')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['only-iso']\" ng-bind-html-and-compile=\"$messages['only-iso'] || ('Valid characters are: A-Z, a-z, 0-9')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['one-upper']\" ng-bind-html-and-compile=\"$messages['one-upper'] || ('At least one uppercase')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['one-lower']\" ng-bind-html-and-compile=\"$messages['one-lower'] || ('At least one lowercase')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['one-number']\" ng-bind-html-and-compile=\"$messages['one-number'] || ('At least one number')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['one-alpha']\" ng-bind-html-and-compile=\"$messages['one-alpha'] || ('At least one letter')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['server-validation']\" ng-bind-html-and-compile=\"$messages['server-validation'] || ('Server validation fails')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['length']\" ng-bind-html-and-compile=\"$messages['length'] || ('Field length must be exactly {{$configuration.element.attrs[&quot;ng-length&quot;]}}' )\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['decimals']\" ng-bind-html-and-compile=\"$messages['decimals'] || ('Maximum decimals exceeded: {{$configuration.element.attrs[&quot;ng-decimals&quot;]}}' )\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['no-decimals']\" ng-bind-html-and-compile=\"$messages['no-decimals'] || ('Cannot contain decimals {{$configuration.element.attrs[&quot;ng-no-decimals&quot;]}}' )\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['pattern']\" ng-bind-html-and-compile=\"$messages['pattern'] || ('Invalid pattern match')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['date']\" ng-bind-html-and-compile=\"$messages['date'] || ('Invalid date')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['alphanumeric']\" ng-bind-html-and-compile=\"$messages['alphanumeric'] || ('Invalid alpha-numeric')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['date-before']\" ng-bind-html-and-compile=\"$messages['date-before'] || ('Invalid date. Must be before: {{ $configuration.element.attrs[&quot;ng-date-before&quot;] }}')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['date-after']\" ng-bind-html-and-compile=\"$messages['date-after'] || ('Invalid date. Must be after: {{ $configuration.element.attrs[&quot;ng-date-after&quot;] }}')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['till-today']\" ng-bind-html-and-compile=\"$messages['till-today'] || ('Invalid date. Must be a past date or today.')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['from-today']\" ng-bind-html-and-compile=\"$messages['from-today'] || ('Invalid date. Must be a future date or today.')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['past-date']\" ng-bind-html-and-compile=\"$messages['past-date'] || ('Invalid date. Must be a past date.')\"></li>\n" +
    "  <li class=\"ng-hide\" ng-show=\"$formalizer.form[$field.name].$error['future-date']\" ng-bind-html-and-compile=\"$messages['future-date'] || ('Invalid date. Must be a future date.')\"></li>\n" +
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

angular.module("templates/formalizer-form-1.4.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-form-1.4.tpl.html",
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

angular.module("templates/formalizer-hidden.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-hidden.tpl.html",
    "<input {{element.attrs_text}} />\n" +
    "");
}]);

angular.module("templates/formalizer-input.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-input.tpl.html",
    "<div {{container.attrs_text}}>\n" +
    "  <div>\n" +
    "    <label for=\"{{element.attrs.id}}\" class=\"{{label.class}}\" ng-bind-html-and-compile=\"$field.label\"></label>\n" +
    "    <span class=\"{{element.container.class}}\">\n" +
    "      <span class=\"{{element.wrap.class}}\">\n" +
    "          {{element.left}}\n" +
    "          <input {{element.attrs_text}} />\n" +
    "          {{element.right}}\n" +
    "      </span>\n" +
    "    </span>\n" +
    "\n" +
    "    <div class=\"help-block formalizer-help {{element.offset}} {{element.size}}\" ng-bind-html-and-compile=\"$field.help\" ng-show=\"$field.help\"></div>\n" +
    "    <div class=\"help-block formalizer-error-list {{element.offset}} {{element.size}}\" ng-formalizer-errors=\"'{{element.attrs.name}}'\" messages=\"$field.messages\"></div>\n" +
    "\n" +
    "  </div>\n" +
    "  <div class=\"clearfix\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-lcheckbox.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-lcheckbox.tpl.html",
    "<div {{container.attrs_text}}>\n" +
    "  <label for=\"{{element.attrs.id}}\" class=\"{{label.class}}\" ng-bind-html-and-compile=\"$field.label\"></label>\n" +
    "  <span class=\"{{element.container.class}}\">\n" +
    "    <span class=\"{{element.wrap.class}}\">\n" +
    "        <input {{element.attrs_text}} />\n" +
    "        <span class=\"help-block formalizer-help\" ng-bind-html-and-compile=\"$field.help\" ng-show=\"$field.help\"></span>\n" +
    "    </span>\n" +
    "\n" +
    "    <span class=\"help-block formalizer-error-list {{element.offset}} {{element.size}}\" ng-formalizer-errors=\"'{{element.attrs.name}}'\" messages=\"$field.messages\"></span>\n" +
    "  </span>\n" +
    "  <div class=\"clearfix\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-radio-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-radio-list.tpl.html",
    "<div {{container.attrs_text}}>\n" +
    "  <label class=\"{{label.class}}\" ng-bind-html-and-compile=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <div class=\"{{element.wrap.class}}\" ng-repeat=\"radio_data in $configuration.source\">\n" +
    "      <label for=\"{{element.attrs.id}}-\\{\\{$index\\}\\}\">\n" +
    "        <input name=\"{{element.attrs.name}}\" id=\"{{element.attrs.id}}-\\{\\{$index\\}\\}\" ng-value=\"radio_data{{source_model}}\" {{element.attrs_text}}>\n" +
    "        \\{\\{radio_data['{{source_display}}']\\}\\}\n" +
    "      </label>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"help-block formalizer-help {{element.offset}} {{element.size}}\" ng-bind-html-and-compile=\"$field.help\" ng-show=\"$field.help\"></div>\n" +
    "  <div class=\"help-block formalizer-error-list {{element.offset}} {{element.size}}\" ng-formalizer-errors=\"'{{element.attrs.name}}'\" messages=\"$field.messages\"></div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-raw.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-raw.tpl.html",
    "<div {{container.attrs_text}}>\n" +
    "  <div ng-bind-html-and-compile=\"$field.template\">\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-richtext.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-richtext.tpl.html",
    "<div {{container.attrs_text}}>\n" +
    "  <label for=\"{{element.attrs.id}}\" class=\"{{label.class}}\" ng-bind-html-and-compile=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <div class=\"{{element.wrap.class}}\">\n" +
    "        <div text-angular {{element.attrs_text}}></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"help-block formalizer-help {{element.offset}} {{element.size}}\" ng-bind-html-and-compile=\"$field.help\" ng-show=\"$field.help\"></div>\n" +
    "  <div class=\"help-block formalizer-error-list {{element.offset}} {{element.size}}\" ng-formalizer-errors=\"'{{element.attrs.name}}'\" messages=\"$field.messages\"></div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-select.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-select.tpl.html",
    "<div {{container.attrs_text}}>\n" +
    "  <label for=\"{{element.attrs.id}}\" class=\"{{label.class}}\" ng-bind-html-and-compile=\"$field.label\"></label>\n" +
    "  <span class=\"{{element.container.class}}\">\n" +
    "    <select {{element.attrs_text}}>\n" +
    "      {{defaultOption}}\n" +
    "    </select>\n" +
    "  </span>\n" +
    "\n" +
    "  <div class=\"help-block formalizer-help {{element.offset}} {{element.size}}\" ng-bind-html-and-compile=\"$field.help\" ng-show=\"$field.help\"></div>\n" +
    "  <div class=\"help-block formalizer-error-list {{element.offset}} {{element.size}}\" ng-formalizer-errors=\"'{{element.attrs.name}}'\" messages=\"$field.messages\"></div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-slider.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-slider.tpl.html",
    "<div {{container.attrs_text}}>\n" +
    "  <label for=\"{{element.attrs.id}}\" class=\"{{label.class}}\" ng-bind-html-and-compile=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <p class=\"{{element.wrap.class}}\">\n" +
    "        {{element.left}}\n" +
    "        <div slider {{element.attrs_text}} />\n" +
    "        {{element.right}}\n" +
    "        <!-- hide an input with the value ?! -->\n" +
    "    </p>\n" +
    "\n" +
    "    <div class=\"help-block formalizer-help {{element.offset}} {{element.size}}\" ng-bind-html-and-compile=\"$field.help\" ng-show=\"$field.help\"></div>\n" +
    "    <div class=\"help-block formalizer-error-list {{element.offset}} {{element.size}}\" ng-formalizer-errors=\"'{{element.attrs.name}}'\" messages=\"$field.messages\"></div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-submit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-submit.tpl.html",
    "<div {{container.attrs_text}}>\n" +
    "  <div class=\"col-sm-10 col-sm-offset-2\">\n" +
    "    <button {{element.attrs_text}} ng-disabled=\"{{form_name}}.$invalid\" ng-bind-html-and-compile=\"$field.label\"></button>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"help-block formalizer-help {{element.offset}} {{element.size}}\" ng-bind-html-and-compile=\"$field.help\" ng-show=\"$field.help\"></div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-textarea.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-textarea.tpl.html",
    "<div {{container.attrs_text}}>\n" +
    "  <label for=\"{{element.attrs.id}}\" class=\"{{label.class}}\" ng-bind-html-and-compile=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <p class=\"{{element.wrap.class}}\">\n" +
    "        <textarea {{element.attrs_text}}>\n" +
    "        </textarea>\n" +
    "    </p>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"help-block formalizer-help {{element.offset}} {{element.size}}\" ng-bind-html-and-compile=\"$field.help\" ng-show=\"$field.help\"></div>\n" +
    "  <div class=\"help-block formalizer-error-list {{element.offset}} {{element.size}}\" ng-formalizer-errors=\"'{{element.attrs.name}}'\" messages=\"$field.messages\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-typeahead.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-typeahead.tpl.html",
    "<div {{container.attrs_text}}>\n" +
    "  <label for=\"{{element.attrs.id}}\" class=\"{{label.class}}\" ng-bind-html-and-compile=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <p class=\"{{element.wrap.class}}\">\n" +
    "      <ul class=\"formalizer-typeahead-muli formalizer-typeahead-muli-selected\">\n" +
    "        <li ng-repeat=\"obj in taSelected({{element.attrs[\"ong-model\"]}})\">\n" +
    "          <span>\\{\\{obj[$field.source_display]\\}\\} <a ng-click=\"taRemove(obj, {{element.attrs[\"ong-model\"]}})\"><span class=\"glyphicon glyphicon-trash\"></span></a></span>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </p>\n" +
    "\n" +
    "    <p class=\"{{element.wrap.class}}\">\n" +
    "        {{element.left}}\n" +
    "        <input {{element.attrs_text}} />\n" +
    "        {{element.right}}\n" +
    "    </p>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"help-block formalizer-help {{element.offset}} {{element.size}}\" ng-bind-html-and-compile=\"$field.help\" ng-show=\"$field.help\"></div>\n" +
    "  <div class=\"help-block formalizer-error-list {{element.offset}} {{element.size}}\" ng-formalizer-errors=\"'{{element.attrs.name}}'\" messages=\"$field.messages\"></div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer-ui-select.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer-ui-select.tpl.html",
    "<div {{container.attrs_text}}>\n" +
    "  <label for=\"{{element.attrs.id}}\" class=\"{{label.class}}\" ng-bind-html-and-compile=\"$field.label\"></label>\n" +
    "  <div class=\"{{element.container.class}}\">\n" +
    "    <div class=\"{{element.wrap.class}}\">\n" +
    "      <!-- theme=\"bootstrap\" -->\n" +
    "      <ui-select {{element.attrs_text}}>\n" +
    "        <ui-select-match class=\"ui-select-match\" placeholder=\"{{placeholder || \"\"}}\">\\{\\{$select.selected{{source_display? \".\" + source_display : source_display}}\\}\\}</ui-select-match>\n" +
    "        <ui-select-choices class=\"ui-select-choices\" repeat=\"data{{source_model ? \".\" + source_model: source_model}} as data in ($configuration.source | {{source_filter}})\">\n" +
    "          <span ng-bind-html=\"data{{source_display? \".\" + source_display : source_display}} | highlight: $select.search\"></span>\n" +
    "        </ui-select-choices>\n" +
    "      </ui-select>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"help-block formalizer-help {{element.offset}} {{element.size}}\" ng-bind-html-and-compile=\"$field.help\" ng-show=\"$field.help\"></div>\n" +
    "  <div class=\"help-block formalizer-error-list {{element.offset}} {{element.size}}\" ng-formalizer-errors=\"'{{element.attrs.name}}'\" messages=\"$field.messages\"></div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/formalizer.fields.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/formalizer.fields.tpl.html",
    "<div class=\"formalizer-group\">\n" +
    "  <div ng-repeat=\"field in field.fields\" class=\"formalizer-element-container\" ng-hide-catch=\"\">\n" +
    "      <!-- <pre>{{field | json}}</pre> -->\n" +
    "      <div ng-formalizer-field=\"field\"></div>\n" +
    "\n" +
    "      <div class=\"col-sm-offset-1\" ng-show=\"field.formalizer.visible_children\">\n" +
    "        <div ng-include=\"'templates/formalizer.fields.tpl.html'\"></div>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
