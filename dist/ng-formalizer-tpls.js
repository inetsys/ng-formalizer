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
    "    <div class=\"{{element.wrap.class}}\" ng-repeat=\"radio_data in $configuration.source {{source_filter}}\">\n" +
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

'use strict';

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

  this.set = function(type, parser_fn) {
    parsers[type] = parser_fn;
  };

  this.$get = function() {
    return parsers;
  };
})
.provider('formalizerTemplates', function formalizerParsers() {
  var templates = {
    'text': 'templates/formalizer-input.tpl.html'
  };

  this.set = function(type, tpl) {
    templates[type] = tpl;
  };

  this.$get = function() {
    return templates;
  };
})
.directive('ngFormalizer', function($http, $templateCache, $interpolate, $log) {
  function safe_array_remove(arr, item) {
    var cut = arr.indexOf(item);
    if (cut !== -1) {
      return arr.splice(cut, 1);
    }

    return false;
  }

  function join_class(target) {
    target['class'] = target['class'].filter(function(cls) {
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

    link: function($scope, $element, $attrs, $ctrls) {
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
    controller: function($scope, formalizerParsers, formalizerTemplates) {
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
            $scope.$on('$destroy', $scope.$watch(cfg.source, function(a) {
              field.source = a;
            }));
          } else if (cfg.source !== undefined) {
            field.source = cfg.source;
            $scope.$on('$destroy', $scope.$watch('$field.source', function(a) {
              field.source = a;
            }));
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
            } else if (key == 'required-list') {
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
            //field.element.container['class'].push('input-group');
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
            .then(function(html) {
              html = html.data;
              return self.interpolate(configuration, html, $scope);
            });

        }
      };
    },
  };
});

'use strict';

angular
.module('formalizer')
.config(function(formalizerParsersProvider, formalizerTemplatesProvider) {
  function safe_array_remove(arr, item) {
    var cut = arr.indexOf(item);
    if (cut !== -1) {
      return arr.splice(cut, 1);
    }
    return false;
  }

  formalizerTemplatesProvider.set('hidden', 'templates/formalizer-hidden.tpl.html');
  formalizerTemplatesProvider.set('textarea', 'templates/formalizer-textarea.tpl.html');

  //
  // submit
  //

  formalizerTemplatesProvider.set('submit', 'templates/formalizer-submit.tpl.html');

  formalizerParsersProvider.set('submit', function($scope, cfg) {
    delete cfg.element.attrs['ng-model'];
    delete cfg.element.attrs['ng-class'];
    delete cfg.element.attrs['ng-placeholder'];
    safe_array_remove(cfg.element.attrs['class'], 'form-control');
    cfg.element.attrs['class'].push('btn');
  });

  //
  // input based
  //

  formalizerTemplatesProvider.set('text', 'templates/formalizer-input.tpl.html');
  formalizerTemplatesProvider.set('password', 'templates/formalizer-input.tpl.html');
  formalizerTemplatesProvider.set('number', 'templates/formalizer-input.tpl.html');
  formalizerTemplatesProvider.set('email', 'templates/formalizer-input.tpl.html');
  formalizerTemplatesProvider.set('tel', 'templates/formalizer-input.tpl.html');
  formalizerTemplatesProvider.set('url', 'templates/formalizer-input.tpl.html');
  formalizerTemplatesProvider.set('file', 'templates/formalizer-input.tpl.html');
  formalizerTemplatesProvider.set('colorpicker', 'templates/formalizer-input.tpl.html');

  // do not need anything more :)
  formalizerTemplatesProvider.set('lcheckbox', 'templates/formalizer-lcheckbox.tpl.html');
  formalizerParsersProvider.set('lcheckbox', function($scope, cfg) {
    cfg.element.attrs.type = 'checkbox';

    cfg.element.container['class'].push('input');
    safe_array_remove(cfg.element.attrs['class'], 'form-control');
    cfg.element.attrs['class'].push('pull-left');
    cfg.element.attrs['ng-class'].push(
      '"no-help": !$field.help.length'
    );

  });

  formalizerParsersProvider.set('colorpicker', function($scope, cfg) {
    cfg.element.wrap['class'].push('row');
    cfg.element.left = '<div class="col-sm-6">';
    // TODO how to send attrs to colorpicker?

    var attrs_text = [];
    if (cfg.element.attrs['ng-disabled']) {
      attrs_text.push('disabled="' + cfg.element.attrs['ng-disabled'] + '"');
    }

    attrs_text.push('format="\'hex\'"');
    attrs_text.push('ng-model="' + cfg.element.attrs['ng-model'] + '"');

    cfg.element.right = '</div>' +
        '<div class="col-sm-6">' +
        '<spectrum-colorpicker ' + attrs_text.join(' ') + '></spectrum-colorpicker>' +
        '</div>';
  });

  //
  // datepicker
  //

  //from http://angular-ui.github.io/bootstrap
  var datepicker_attrs = [
    'datepicker-mode',
    'min-date',
    'max-date',
    'date-disabled',
    'show-weeks',
    'starting-day',
    'init-date',
    'min-mode',
    'max-mode',
    'format-day',
    'format-month',
    'format-year',
    'format-day-header',
    'format-day-title',
    'format-month-title',
    'year-range',
    // popup,
    //,'datepicker-popup',
    'show-button-bar',
    'current-text',
    'clear-text',
    'close-text',
    'close-on-date-selection',
    'datepicker-append-to-body',
    'datepicker-options'
  ];

  formalizerTemplatesProvider.set('datepicker', 'templates/formalizer-input.tpl.html');

  formalizerParsersProvider.set('datepicker', function($scope, cfg) {
    var name = cfg.element.attrs.name,
      openEvent = name + 'Open',
      closeEvent = name + 'Close',
      isOpenVar = cfg.options['datepicker-options'] || name + 'Options';

    angular.forEach(datepicker_attrs, function(value) {
      if (cfg.options[value]) {
        cfg.element.attrs[value] = cfg.options[value];
      }
    });

    // calendar button setup
    cfg.element.wrap['class'].push('input-group');
    cfg.element.right = '<span class="input-group-btn"><button ng-click="datepickers.' + openEvent + '($event)" class="btn btn-default" type="button"><i class="glyphicon glyphicon-calendar"></i></button></span>';

    // forced attrs
    cfg.element.attrs['is-open'] = 'datepickers.' + isOpenVar;
    cfg.element.attrs['uib-datepicker-popup'] = cfg.options['uib-datepicker-popup'] || '';
    // do not use focus, uib use it and this mess thing in IE
    cfg.element.attrs['ng-click'] = 'datepickers.' + openEvent + '()';

    cfg.element.attrs['ng-datepicker-fix'] = '';

    var $scope_data = $scope.$eval('datepickers = datepickers || {}');

    $scope_data[isOpenVar] = false;

    $scope_data[closeEvent] = function($event) {
      $scope_data[isOpenVar] = false;
    };

    $scope_data[openEvent] = function($event) {
      //only prevent if sent
      if ($event) {
        $event.preventDefault();
        $event.stopPropagation();
      }

      $scope_data[isOpenVar] = true;

      if ($event) {
        setTimeout(function() {
          angular.element('#' + cfg.element.attrs.id).focus();
        }, 0);
      }

      // TODO we should close other instances here
      // so we need an array of instances too
    };
  });

  //
  // select
  //

  formalizerTemplatesProvider.set('select', 'templates/formalizer-select.tpl.html');

  formalizerParsersProvider.set('select', function($scope, cfg) {
    // TODO cfg.defaultOption = cfg.empty_msg ? "<option value=\"\">" + cfg.empty_msg + "</option>" : '';

    cfg.source_display = cfg.source_display || 'label';

    var mdl = cfg.source_model ? '.' + cfg.source_model : '';

    cfg.element.attrs['ng-options'] = 'c' + mdl + ' as c.' + cfg.source_display + ' for c in $configuration.source';

    if (cfg.source_filter) {
      cfg.element.attrs['ng-options'] += ' | ' + cfg.source_filter + ':c';
    }

    if (cfg.options.multiple) {
      cfg.element.attrs.multiple = 'multiple';
    }
  });

  //
  // ui-select
  //

  formalizerTemplatesProvider.set('ui-select', 'templates/formalizer-ui-select.tpl.html');

  formalizerParsersProvider.set('ui-select', function($scope, cfg) {
    cfg.source_display = cfg.source_display || 'label';
    cfg.element.attrs['ng-class'] = [];
    safe_array_remove(cfg.element.attrs['class'], 'form-control');
    cfg.source_filter = cfg.source_filter ? (cfg.source_filter + ' |') : '';
    cfg.source_filter += 'filter: $select.search';
  });

  //
  // richtext
  //

  formalizerTemplatesProvider.set('richtext', 'templates/formalizer-richtext.tpl.html');

  formalizerParsersProvider.set('richtext', function($scope, cfg) {
    safe_array_remove(cfg.element.attrs['class'], 'form-control');
    delete cfg.element.attrs['type'];
    cfg.element.attrs['id'] = 'textAngular-' + cfg.element.attrs['name'];
    delete cfg.element.attrs['ta-disabled'];
  });

  //
  // checkbox-list
  //

  formalizerTemplatesProvider.set('checkbox-list', 'templates/formalizer-checkbox-list.tpl.html');

  formalizerParsersProvider.set('checkbox-list', function($scope, cfg) {
    if (cfg.source_filter) {
      cfg.source_filter = ' | ' + cfg.source_filter;
    }


    var model = cfg.element.attrs['checklist-model'] = cfg.element.attrs['ng-model'];
    delete cfg.element.attrs['ng-model'];

    cfg.source_display = cfg.source_display || 'label';

    // TODO fix bug select all, deselect one, check all again (do nothing)
    cfg.options.chkall_model = '$configuration.chkall_value';
    cfg.$check_all = function() {
      var chkall = $scope.$eval(cfg.options.chkall_model),
        mdl = $scope.$eval(model);

      if (mdl === undefined) {
        $scope.$eval(model + ' = []');
        mdl = $scope.$eval(model);
      }

      mdl.splice(0, mdl.length);
      if (chkall) {
        var src = $scope.$eval('$configuration.source');
        src.forEach(function(el, k) {
          mdl.push(
            $scope.$eval('$configuration.source[' + k + ']' + (cfg.source_model ? '.' + cfg.source_model : ''))
          );
        });
      }

    };

    cfg.element.attrs['checklist-value'] = 'checkbox_data' + (cfg.source_model ? '.' + cfg.source_model : '');

    // copy error from the first check to the real name
    var name = cfg.element.attrs.name;
    $scope.$on('$destroy', $scope.$watch(cfg.form_name + '[\'' + name + '-0\']', function() {
      $scope.$eval(cfg.form_name + '[\'' + name + '\'] = ' +
      cfg.form_name + '[\'' + name + '-0\']');
    }, true));

    cfg.element.attrs.type = 'checkbox';
    cfg.element.container['class'].push('checkbox');

    safe_array_remove(cfg.element.attrs['class'], 'form-control');
  });

  //
  // checkbox
  //

  formalizerTemplatesProvider.set('checkbox', 'templates/formalizer-checkbox.tpl.html');

  formalizerParsersProvider.set('checkbox', function($scope, cfg) {
    cfg.container['class'].push('checkbox');
    safe_array_remove(cfg.element.attrs['class'], 'form-control');
  });

  //
  // radio-list
  //

  formalizerTemplatesProvider.set('radio-list', 'templates/formalizer-radio-list.tpl.html');

  formalizerParsersProvider.set('radio-list', function($scope, cfg) {
    cfg.element.attrs.type = 'radio';
    cfg.element.container['class'].push('radio');
    safe_array_remove(cfg.element.attrs['class'], 'form-control');

    cfg.source_model = (cfg.source_model ? '.' + cfg.source_model : '');

    if (cfg.source_filter) {
      cfg.source_filter = ' | ' + cfg.source_filter;
    }
  });

  //
  // raw
  //

  formalizerTemplatesProvider.set('raw', 'templates/formalizer-raw.tpl.html');

  //
  // typeahead
  //

  var typeahead_attrs = [
    //"uib-typeahead",
    //"typeahead-on-select",

    'typeahead-append-to',
    'typeahead-append-to-body',
    'typeahead-editable',
    'typeahead-focus-first',
    'typeahead-focus-on-select',
    'typeahead-input-formatter',
    'typeahead-is-open',
    'typeahead-loading',
    'typeahead-min-length',
    'typeahead-no-results',
    'typeahead-should-select',
    'typeahead-popup-template-url',
    'typeahead-select-on-blur',
    'typeahead-select-on-exact',
    'typeahead-show-hint',
    'typeahead-template-url',
    'typeahead-wait-ms',
  ];

  formalizerTemplatesProvider.set('typeahead', 'templates/formalizer-typeahead.tpl.html');
  formalizerTemplatesProvider.set('typeahead-multi', 'templates/formalizer-typeahead.tpl.html');

  function typeahead($scope, cfg) {
    cfg.element.attrs.type = 'text';
    if (cfg.source_display) {
      cfg.element.attrs['uib-typeahead'] = 'p as p.' + cfg.source_display + ' for p in $configuration.source | filter:{' + cfg.source_display + ':$viewValue}';
    } else {
      cfg.element.attrs['uib-typeahead'] = 'p for p in $configuration.source';
    }

    angular.forEach(typeahead_attrs, function(value) {
      if (cfg.options[value]) {
        cfg.element.attrs[value] = cfg.options[value];
      }
    });
  }

  formalizerParsersProvider.set('typeahead', typeahead);

  // TODO FIXME after select, clear the input
  formalizerParsersProvider.set('typeahead-multi', function($scope, cfg) {
    typeahead($scope, cfg);

    var ta_model = cfg.element.attrs['ng-model'],
      ta_model_selected = 'current_typeahead'; //cfg.element.attrs['ng-model'] + '_sel';

    cfg.element.attrs['ong-model'] = cfg.element.attrs['ng-model'];
    cfg.element.attrs['ng-model'] = ta_model_selected;
    $scope[ta_model_selected] = '';

    var target = $scope.$eval(ta_model);
    if (target === undefined) {
      $scope.$eval(ta_model + ' = []');
    }

    $scope.taSelected = cfg.options.taSelected || function() {
      $scope[ta_model_selected] = '';
      return $scope.$eval(ta_model);
    };

    $scope.taAppend = function($item, $model, $label) {
      if (cfg.options.taAppend) {
        cfg.options.taAppend($item, $model, $label);
      } else {
        if ($model.indexOf($item) === -1) {
          $model.push($item);
        }
      }
      $scope[ta_model_selected] = '';
    };


    $scope.taRemove = cfg.options.taRemove || function($item) {
      var target2 = $scope.$eval(ta_model);

      safe_array_remove(target2, $item);
    };

    cfg.element.attrs['typeahead-on-select'] = 'taAppend($item, ' + ta_model + ', $label)';
  });

  //
  //
  //
});

'use strict';

angular
.module('formalizer')
.directive('ngFormalizerErrors', [function() {
  return {
    scope: {
      $messages: '=messages',
      ngFormalizerErrors: '@ngFormalizerErrors'
    },
    require: '^ngFormalizer',
    templateUrl: 'templates/formalizer-error-list.tpl.html',
    replace: true,
    link: function($scope, $element, $attrs, $ngFormalizer) {
      $scope.$formalizer = $ngFormalizer;

      var unwatch2;
      // delayed init
      var unwatch = $scope.$parent.$watch($attrs.ngFormalizerErrors, function(name, b) {
        if (!name && !b) return;
        $scope.name = name;
        unwatch(); unwatch = null;

        if ('string' !== typeof name) {
          console.error(name);
          throw new Error('ngFormalizerErrors must be a string with the field name');
        }

        // lazy init, wait until field is parsed
        unwatch2 = $scope.$watch(function() {
          return $ngFormalizer.fields[name];
        }, function(newValue) {
          if (newValue) {
            $scope.$configuration = $ngFormalizer.fields[name].$configuration;
            $scope.$field = $ngFormalizer.fields[name].$field;
            unwatch2(); unwatch2 = null;
          }
        });
      });

      $scope.$on('$destroy', function() {
        unwatch && unwatch();
        unwatch2 && unwatch2();
      });
    }
  };
}]);

'use strict';

//
// fix https://github.com/angular-ui/bootstrap/issues/1891
// TZ issues
// foreign language direct input
//
angular
.module('formalizer')
.constant('datepickerPopupFix', {
  /**
   * Input format in moment.js format!
   */
  datepickerPopup: 'YYYY-MM-DD',
  /**
   * timezone in string format:
   * '+0000' GMT+0
   * '+0100' GMT+1
   * '-0100' GMT-1
   * etc...
   */
  datepickerTZ: undefined
})
.directive('ngDatepickerFix', ['datepickerPopupFix', '$parse', function(datepickerPopupFix, $parse) {
  return {
    require: '?ngModel',
    priority: -100,
    link: function($scope, $element, $attrs, $ngModel) {
      // fix string date
      var val = $scope.$eval($attrs.ngModel);

      if ('string' == typeof val) {
        val = new Date(val);
        if (!isNaN(val.getTime())) {
          $parse($attrs.ngModel).assign($scope, val);
        }
      }

      $ngModel.$parsers.unshift(function ngDatepickerFix(value) {
        var mjs;

        if ('string' === typeof value) {
          // manually introduce the date
          mjs = moment(value, datepickerPopupFix.datepickerPopup);
        } else {
          // click on the datepicker
          mjs = moment(value);
        }

        if (!mjs.isValid()) {
          return value;
        }

        if (datepickerPopupFix.datepickerTZ !== undefined) {
          // fix TZ
          return new Date(mjs.toDate().toDateString() + ' 00:00 GMT' + datepickerPopupFix.datepickerTZ);
        }

        return mjs.toDate();
      });
    }
  };
}]);

'use strict';

angular.module('formalizer')
.directive('ngFormalizerField', ['$timeout', '$compile', function($timeout, $compile) {
  function formalizerit($scope, $element, $attrs, $ngFormalizer, data) {
    var configuration = $ngFormalizer.configure(data, $scope);
    $scope.$field = data;
    $scope.$configuration = configuration;

    $attrs.$set('id', configuration.element.attrs.id + '-container');

    $ngFormalizer.getFieldHTML(data, configuration, $scope)
    .then(function(html) {
      // append html and compile now

      $element[0].innerHTML = html;
      $compile($element.contents())($scope);

      //var node_el = angular.element(html);
      //$element.append(node_el);
      //$compile(node_el)($scope);
    });
  }

  return {
    scope: true,
    require: '^ngFormalizer',
    link: function($scope, $element, $attrs, $ngFormalizer) {
      $scope.$formalizer = $ngFormalizer;

      var unwatch = $scope.$watch($attrs.ngFormalizerField, function(a, b) {
        if (a) {
          formalizerit($scope, $element, $attrs, $ngFormalizer, a);
          unwatch();
        }
      });
    }
  };
}]);

'use strict';

angular
.module('formalizer')
.directive('ngBlacklist', function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function($scope, $element, $attrs, $ngModel) {
      $ngModel.$validators.blacklist = function(value) {
        if (value == null || value == undefined) return true;

        var blacklist = $scope.$eval($attrs.ngBlacklist);

        if ('string' === typeof blacklist) {
          blacklist = blacklist.split(',');
        }
        return blacklist.indexOf(value) === -1;
      };
    }
  };
});

'use strict';

angular
.module('formalizer')
.directive('ngEqualTo', function() {
  return {
    require: 'ngModel',
    link: function($scope, $element, $attrs, $ngModel) {
      if (!$ngModel) {
        return;
      }

      var my_value = null;
      function check() {
        var this_val = $ngModel.$modelValue === '' ? null : ($ngModel.$modelValue || null),
          eq_val = my_value === '' ? null : (my_value || null);

        $ngModel.$setValidity('equal-to', eq_val == this_val);
      }

      $scope.$on('$destroy', $scope.$watch($attrs.ngModel, function() {
        check();
      }));

      $scope.$on('$destroy', $scope.$watch($attrs.ngEqualTo, function ngEqualToWatch(value) {
        my_value = value;
        check();
      }));
    }
  };
});

'use strict';

(function() {
  var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
  var MOZ_HACK_REGEXP = /^moz([A-Z])/;

  /**
   * copy&paste from angular
   */
  function camelCase(name) {
    return name.
      replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
      }).
      replace(MOZ_HACK_REGEXP, 'Moz$1');
  }

  angular.forEach({
    'only-alpha': /^[a-zA-Z]*$/i,
    'alphanumeric': /^[a-zA-Z0-9]+$/,
    'one-upper': /^(?=.*[A-Z]).+$/,
    'one-lower': /^(?=.*[a-z]).+$/,
    'one-number': /^(?=.*[0-9]).+$/,
    'one-alpha': /^(?=.*[a-z]).+$/i,
    'no-spaces': /^[^\s]+$/,
    'hexadecimal': /^[0-9a-fA-F]+$/,
    'hex-color': /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
  }, function(regex, key) {
    angular
    .module('formalizer')
    .directive(camelCase('ng-' + key), ['$timeout', function($timeout) {
      return {
        require: 'ngModel',
        link: function($scope, $element, $attr, $ngModel) {
          function check(value) {
            var str_val = ('' + value);
            // for this test, use required
            if (value === undefined || value === null || str_val.length === 0) {
              $ngModel.$setValidity(key, true);
              return value;
            }

            // do not test 'empty' things this task is for required
            $ngModel.$setValidity(key, regex.test(str_val));

            return str_val;
          }

          $ngModel.$parsers.unshift(check);
          // run check after ng-default
          $timeout(function() {
            check($ngModel.$modelValue);
          });
        }
      };
    }]);
  });
}());

'use strict';

/**
 * ng-populate="object"
 * ng-populate="{value: ['target', 'value']}"
 *
 */
angular
.module('formalizer')
.directive('ngPopulate', function() {
  return {
    require: ['^ngFormalizer', 'ngModel'],
    link: function($scope, $element, $attrs, controllers) {
      var $ngFormalizer = controllers[0];
      var $ngModel = controllers[1];

      var object = $scope.$eval($attrs.ngPopulate);

      $ngModel.$parsers.push(function(value) {
        if (object && object[value]) {
          // populate!
          $ngFormalizer.setModel(
              object[value][0], // model
              object[value][1], // value
              object[value][2] || false // force
          );
        }

        return value;
      });
    }
  };
});

'use strict';

angular
.module('formalizer')
.directive('ngServerValidation', function($http) {
  return {
    require: 'ngModel',
    link: function($scope, $element, $attrs, $ngModel) {
      var url = $attrs.ngServerValidation,
        ngRequestKey = $attrs.ngRequestKey || 'value',
        ngResponseKey = $attrs.ngResponseKey || 'value',
        current_value,
        last_checked_value;

      jQuery($element).focusout(function run_server_validation() {
        if (last_checked_value == current_value) return;

        last_checked_value = current_value;
        // send request to server
        var sent_data = {};
        sent_data[ngRequestKey] = current_value;

        $http
        .post(url, sent_data)
        .success(function(data) {
          $ngModel.$setValidity('server-validation-in-progress', true); // spinner off
          $ngModel.$setValidity('server-validation', !!data[ngResponseKey]);
        })
        .error(function(data) {
          $ngModel.$setValidity('server-validation-in-progress', true); // spinner off

          // do nothing is reasonable ?
        });
      });

      $ngModel.$parsers.unshift(function(value) {
        if (!value) {
          return;
        }

        $ngModel.$setValidity('server-validation-in-progress', false); // spinner
        //$ngModel.$setValidity('server-validation', true);

        current_value = value;
        //run_server_validation();

        return value;
      });
    }
  };
});

'use strict';

angular
.module('formalizer')
.directive('ngDefault', ['$timeout', function($timeout) {
  return {
    require: 'ngModel',
    priority: 0,
    link: function($scope, $element, $attrs, $ngModel) {
      var def_val = $scope.$eval($attrs.ngDefault),
        not_set_values = $scope.$eval($attrs.ngDefaultValues);

      if ('number' === $attrs.type) {
        def_val = parseFloat(def_val, 10);
      }

      if ('datepicker' === $attrs.type) {
        def_val = new Date(def_val);
      }

      if (!not_set_values) {
        not_set_values = [undefined];
      } else if (Array.isArray(not_set_values)) {
        not_set_values.push(undefined);
      } else {
        throw new Error('ngDefaultValues must be an array of values');
      }

      function is_nan(val) {
        return 'number' === typeof val && ('' + val) === 'NaN';
      }

      // wait model to be populated
      $timeout(function() {
        if (is_nan($ngModel.$modelValue) || not_set_values.indexOf($ngModel.$modelValue) !== -1) {
          //$ngModel.$setViewValue(def_val);
          if ('datepicker' === $attrs.type) {
            $scope.$$tmp = def_val;
            $scope.$eval($attrs.ngModel + ' = $$tmp');
            delete $scope.$$tmp;
          } else {
            $scope.$eval($attrs.ngModel + ' = ' + JSON.stringify(def_val));
          }
        }
      });
    }
  };
}]);

'use strict';
/*
 * listen angular changes in boolean attrs
 */

angular.forEach('Selected,Checked,Disabled,Readonly,Required,Open'.split(','), function(name) {

  var normalized = 'ngOn' + name,
    attr = name.toLowerCase();

  angular
  .module('formalizer')
  .directive(normalized, function() {
    return {
      restrict: 'A',
      priority: 100,
      link: function($scope, $element, $attrs) {
        $scope.$on('$destroy', $scope.$watch(function() {
          return $element.prop(attr);
        }, function(val) {
          var obj = {$element: $element};
          obj['$' + attr] = val;

          $scope.$eval($attrs[normalized], obj);
        }));
      }
    };
  });
});

'use strict';

angular
.module('formalizer')
.directive('ngBindHtmlAndCompile', ['$compile', '$parse', '$sce', '$timeout', function($compile, $parse, $sce, $timeout) {
  return {
    restrict: 'A',
    compile: function ngBindHtmlCompile($element, $attrs) {
      var ngBindHtmlGetter = $parse($attrs.ngBindHtmlAndCompile);
      var ngBindHtmlWatch = $parse($attrs.ngBindHtmlAndCompile, function getStringValue(value) {
        return (value || '').toString();
      });
      $compile.$$addBindingClass($element);

      return function ngBindHtmlLink($scope, $element2, $attr2) {
        $compile.$$addBindingInfo($element2, $attr2.ngBindHtmlAndCompile);

        $scope.$on('$destroy', $scope.$watch(ngBindHtmlWatch, function ngBindHtmlWatchAction() {
          var value = ngBindHtmlGetter($scope);
          if (value) {
            if (value.indexOf('<') >= 0 || value.indexOf('{{') >= 0) {
              // look like html or interpolation...
              // we re-evaluate the expr because we want a TrustedValueHolderType
              // for $sce, not a string
              $element2.html($sce.getTrustedHtml(value) || '');
              $compile($element2.contents())($scope);
            } else {
              $element2[0].textContent = value;
            }
          } else {
            $element2[0].textContent = '';
          }
        }));
      };
    }
  };
}]);

'use strict';

angular
.module('formalizer')
.directive('ngLength', function() {
  return {
    require: 'ngModel',
    link: function($scope, $element, $attrs, $ngModel) {
      $ngModel.$parsers.unshift(function(value) {
        // do not test 'empty' things this task is for required
        var length = parseInt($attrs.ngLength, 10);
        if (Array.isArray(value) || 'string' === typeof value) {
          $ngModel.$setValidity('length', value.length === length);
        } else {
          // invalid length?
          $ngModel.$setValidity('length', false);
        }

        return value;
      });
    }
  };
});

'use strict';

angular
.module('formalizer')
.directive('ngDecimals', function() {
  return {
    require: 'ngModel',
    link: function($scope, $element, $attrs, $ngModel) {
      var max_decimals = parseInt($attrs.ngDecimals, 10) || 4;

      $ngModel.$parsers.unshift(function(value) {
        var fnum = parseFloat(value);
        var fstr = '' + fnum;
        var fdec = 0;
        // fix clear field
        // if it's NaN give number error not this one.
        if (!value || isNaN(fnum)) {
          $ngModel.$setValidity('decimals', true);
          return value;
        }

        if (fstr.indexOf('.') !== -1) {
          fdec = fstr.split('.')[1].length;
        }

        var valid = fdec <= max_decimals;

        $ngModel.$setValidity('decimals', valid);

        return valid ? value : null;
      });
    }
  };
});

'use strict';

angular
.module('formalizer')
.directive('ngNoDecimals', function() {
  return {
    require: 'ngModel',
    link: function($scope, $element, $attrs, $ngModel) {
      $ngModel.$parsers.unshift(function(value) {
        var fstr = '' + value;

        var valid = fstr.indexOf('.') === -1;
        $ngModel.$setValidity('no-decimals', valid);

        return valid ? value : null;
      });
    }
  };
});

'use strict';

(function() {
  function today_utc() {
    var m = moment.utc();
    m.millisecond(0);
    m.seconds(0);
    m.minutes(0);
    m.hours(0);

    return m;
  }
  [{
    directive: 'ngDateAfter',
    constraint: 'date-after',
    check: function(ref_date, input_date) {
      return ref_date.diff(input_date, 'seconds') < 0;
    }
  }, {
    directive: 'ngDateBefore',
    constraint: 'date-before',
    check: function(ref_date, input_date) {
      return ref_date.diff(input_date, 'seconds') > 0;
    }
  }, {
    directive: 'ngFutureDate',
    constraint: 'future-date',
    check: function(ref_date, input_date) {
      return today_utc().diff(input_date, 'seconds') < 0;
    }
  }, {
    directive: 'ngPastDate',
    constraint: 'past-date',
    check: function(ref_date, input_date) {
      return today_utc().diff(input_date, 'seconds') > 0;
    }
  }, {
    directive: 'ngTillToday',
    constraint: 'till-today',
    check: function(ref_date, input_date) {
      return today_utc().diff(input_date, 'seconds') >= 0;
    }
  }, {
    directive: 'ngFromToday',
    constraint: 'from-today',
    check: function(ref_date, input_date) {
      return today_utc().diff(input_date, 'seconds') <= 0;
    }
  }].forEach(function(dt) {
    angular.module('formalizer')
    .directive(dt.directive, ['$timeout', '$log', function($timeout, $log) {
      return {
        priority: -9000, // higher than ui-datepicker
        require: 'ngModel',
        link: function($scope, $element, $attrs, $ngModel) {
          $log.debug('(', dt.directive, ')', $attrs[dt.directive]);

          var ref_date = moment($attrs[dt.directive]);

          function check(value) {
            var input_date = moment(value);

            if (!value || !input_date.isValid()) {
              $ngModel.$setValidity(dt.constraint, true);
            } else {
              var res = dt.check(ref_date, input_date);
              $log.debug('(', dt.directive, ')', 'ref_date', ref_date.toJSON(), 'input_date', input_date.toJSON(), res);
              $ngModel.$setValidity(dt.constraint, res);
            }

            return value;
          }

          $ngModel.$parsers.unshift(check);
          // run check after ng-default
          $timeout(function() {
            check($ngModel.$modelValue);
          });
        }
      };
    }]);
  });
}());

'use strict';

/**
* ng-use-locale=""
*/

angular
.module('formalizer')
.directive('ngUseLocale', function($locale, numberFilter, $log) {
  return {
    require: 'ngModel',
    priority: 10000, // lowest priority directive -> unshift => highest priority parser
    link: function ngUseLocale($scope, $element, $attrs, $ngModel) {
      if ($attrs.type == 'number') {
        // parse from locale to "real-c-english-number"
        $ngModel.$parsers.unshift(function ngUseLocaleParser(value) {
          for (var i = 0; i < value.length; ++i) {
            if (value[i] == $locale.NUMBER_FORMATS.DECIMAL_SEP) {
              value  = value.substr(0, i) +
                '.' + value.substr(i + 1);
            }
            // group separators are just removed
            else if (value[i] == $locale.NUMBER_FORMATS.GROUP_SEP) {
              value  = value.substr(0, i) + value.substr(i + 1);
            }
          }

          return value;
        });

        // use number (filter) to display
        $ngModel.$formatters.unshift(function ngUseLocaleFormatter(value) {
          if (!value) return value;

          value = '' + value;

          for (var i = 0; i < value.length; ++i) {
            if (value[i] == '.') {
              value  = value.substr(0, i) +
              $locale.NUMBER_FORMATS.DECIMAL_SEP + value.substr(i + 1);
            }
          }

          return value;
        });

      } else {
        $log.info('use locale not supportted for: ', $attrs.type);
      }
    }
  };
});

'use strict';

angular
.module('formalizer')
.directive('ngHideEmit', function() {
  return {
    restrict: 'A',
    multiElement: true,
    link: function(scope, element, attr) {
      scope.$on('$destroy', scope.$watch(attr.ngHide, function ngHideWatchAction(value) {
        scope.$emit('hide', [scope.field, element, value]);
      }));
    }
  };
});

angular
.module('formalizer')
.directive('ngHideCatch', ['$animate', function($animate) {
  return {
    restrict: 'A',
    multiElement: true,
    link: function(scope, element, attr) {

      scope.$on('hide', function(ev, args) {
        ev.stopPropagation();

        // name should be unique, so it could be safe to use to compare
        if (scope.field.name == args[0].name) {
          $animate[args[2] ? 'addClass' : 'removeClass'](element, 'ng-hide', {
            tempClasses: 'ng-hide-animate'
          });
        }
      });
    }
  };
}]);

'use strict';

angular
.module('formalizer')
.directive('ngAutofocus', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link : function($scope, $element) {
      $timeout(function() {
        $element[0].focus();
      });
    }
  };
}]);

'use strict';

angular
.module('formalizer')
.directive('ngRequiredList', function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function($scope, $element, $attrs, $ngModel) {
      $scope.$on('$destroy', $scope.$watchCollection($attrs.ngRequiredList, function(a, b) {
        if (a && Array.isArray(a)) {
          $ngModel.$setValidity('required_list', a.length > 0);
          return;
        }
        $ngModel.$setValidity('required_list', false);
      }));
    }
  };
});
