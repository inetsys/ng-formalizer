// Code goes here

// NOTE: ng-app="plunker" + AngularUI module dependency
var app = angular.module("app", ["formalizer"]);

app.config(["datepickerConfig", "datepickerPopupConfig", "datepickerPopupFix", function (datepickerConfig, datepickerPopupConfig, datepickerPopupFix) {
    datepickerPopupConfig.currentText = "Hoy";
    datepickerPopupConfig.clearText = "Borrar";
    datepickerPopupConfig.closeText = "Cerrar";
    datepickerPopupConfig.toggleWeeksText = "Semanas";
    datepickerConfig.showWeeks = false;
    datepickerPopupConfig.datepickerPopup = "dd/MM/yyyy";

    // spanish GMT+0
    datepickerPopupFix.datepickerPopup = "DD/MM/YYYY";
    datepickerPopupFix.datepickerTZ = "+0000";
}]);

app.controller("MainCtrl", ["$scope", "$timeout", function ($scope, $timeout) {
    $scope.entity = {
        //tyc: true,
        platform: "desktop",
        date: "2014-03-14T00:00:00.000Z"
        //has_iphone: false
    };

    $scope.dateOptions = {
        "year-format": "yyyy",
        "starting-day": 1
    };

    $scope.onSubmit = function (dirty_data_only) {
        console.log("onSubmit");
        console.log(dirty_data_only);
    };

    console.log("maincontroller end!");



    $scope.form_cfg = {
        "legend": "legend",
        "type": "horizontal",
        "name": "form",
        "onSubmit": "onSubmit",
        "model": "entity",
        "fields": "form_fields",
    };

    $scope.typeahead_items = [
        {id: 1, name: "abc"},
        {id: 2, name: "bcd"},
        {id: 3, name: "def"},
        {id: 4, name: "efg"},
        {id: 5, name: "zzz"},
    ];

    $scope.select_populate = {
        "mobile": ["xxx", "yyy"],
        "desktop": ["xxx", "yyy"]
    };


    $scope.form_fields = [{
        "label": "User (minlength=5 translated) & (server-side validation)",
        "type": "text",
        "name": "user",
        "placeholder": "Text",
        "constraints": {
            "required": true,
            "minlength": 5,
            "server-validation": "/validate",
            "request-key": "username",
            "response-key": "success"
        },
        "messages": {
            "minlength": "más de 5 caracters majo!",
            "server-validation": "the only free name is pepe123"
        }
    }, /* cols*/ [{
        "label": "Password (only-iso)",
        "type": "password",
        "name": "pwd",
        "placeholder": "Password",
        "constraints": {
            "only-iso": true
        },
        "cols": 6
    }, {
        "label": "Password repeat (must be equal to password)",
        "type": "password",
        "name": "pwd2",
        "placeholder": "repeat password",
        "constraints": {
            "equal-to": "entity.pwd"
        },
        "messages": {
            "equal-to": "La contraseña no coincide."
        },
        "cols": 6
    }], {
        "label": "Comments",
        "type": "textarea",
        "name": "comments"
    }, {
        "label": "just a checkbox, required if you fill User (with a valid user!)",
        "type": "checkbox",
        "name": "tyc",
        "right": true,
        "constraints": {
            "required": "entity.user"
        }
    }, {
        "label": "Datepicker",
        "type": "datepicker",
        "name": "date"
    }, {
        "label": "Select (set to desktop)",
        "type": "select",
        "name": "select_platform",
        "source": [{"id": "mobile", "label": "mobile"}, {"id": "desktop", "label": "desktop"}],
        "source_model": "id",
        "source_display": "label",
        "empty_msg": "Please choose a car",
        "constraints": {
            "populate": "select_populate"
        }
    }, {
        "label": "Select (with booleans this time)",
        "type": "select",
        "option_id": "id",
        "option_value": "value",
        "source": [{"id": true, "label": "YES"}, {"id": false, "label": "NO"}],
        "source_model": "id",
        "source_display": "label",
        "name": "select_bool"
    }, {
        "label": "Select (multiple)",
        "type": "select",
        "name": "select_multiple_platform",
        "source": [{"id": "mobile", "label": "mobile"}, {"id": "desktop", "label": "desktop"}],
        "source_model": null,
        "source_display": "label",
        "empty_msg": "Please choose a car",
        "options": {
            "multiple": true
        }
    }, {
        "label": "List (source is a string and formalizer watch that variable) in 5 seconds will have more elements",
        "type": "select",
        "name": "lista",
        "source": "list",
        "empty_msg": "Choose one"
    }, {
        "label": "Checkbox list",
        "type": "checkbox-list",
        "name": "cb_list",
        "placeholder": "",
        "source": [
            {"id": 1, "label": "check@1"},
            {"id": 2, "label": "check@2"},
            {"id": 3, "label": "check@3"},
        ],
        "source_display": "label",
        "source_model": "id", // null means the object otherwise a key(string)
        "options": {
            "select_all": true
        }
    }, {
        "label": "Checkbox list",
        "type": "radio-list",
        "name": "radio",
        "placeholder": "",
        "source": [
            {"id": 1, "label": "check@1"},
            {"id": 2, "label": "check@2"},
            {"id": 3, "label": "check@3"},
        ],
        "source_display": "label",
        "source_model": null // null means the object otherwise a key(string)
    }, {
        "label": "typeahead (abc,bcd,zzz)",
        "type": "typeahead-multi",
        "name": "ta_list",
        "placeholder": "Text",
        "constraints": {
        },
        "source": "typeahead_items",
        "source_display": "name"
    }, {
        "label": "Slider 0-50, 1",
        "type": "slider",
        "name": "slider_val",
        "options": {
            "min": 0,
            "max": 50,
            "step": 1
        },
        "source": "typeahead_items",
        "source_display": "name"
    }, {
        "label": "richtext",
        "type": "richtext",
        "name": "richtext",
        "options": {
        },
    }, {
        "label": "Submit now!",
        "type": "submit",
        "name": "submit",
        "class": "btn-primary"
    }];


    $scope.list = [{
        id: 1,
        label: "ELEMENT ID 1"
    }, {
        id: 2,
        label: "ELEMENT ID 2"
    }, {
        id: 3,
        label: "ELEMENT ID 3"
    }, {
        id: 4,
        label: "ELEMENT ID 4"
    }];

    setTimeout(function () {
        console.log("chages arrive");

        $scope.list.push({
            id: 5,
            label: "ELEMENT ID 5"
        });

        $scope.list.push({
            id: 6,
            label: "ELEMENT ID 6"
        });


        $scope.form_fields.push({
            "label": "dynamic text field",
            "type": "text",
            "name": "dynamic_text",
            "placeholder": "Text",
            "constraints": {
                "required": true
            }
        });

        $timeout(function () {
            $scope.$digest();
        });

    }, 5000);

}])
.controller("MatrixCtrl", ["$scope", "$timeout", function ($scope, $timeout) {
    $scope.entity = {
        matrix: [

            [true, false, true],
            [false, true, false],
            [true, false, true],
        ],
        matrix2: {
            "A": {"F": true, "G": false, "H": true},
            "B": {"F": false, "G": true, "H": false},
            "C": {"F": true, "G": false, "H": true}
        }
    };

    $scope.onSubmit = function (dirty_data_only) {
        console.log("onSubmit");
        console.log(dirty_data_only);
    };

    console.log("MatrixCtrl end!");

    $scope.form_cfg = {
        "legend": "legend",
        "type": "horizontal",
        "name": "form",
        "onSubmit": "onSubmit",
        "model": "entity",
        "fields": [{
            "label": "Checkbox matrix (no source) map to array[array]",
            "type": "checkbox-matrix",
            "name": "matrix",

            "source_display": [
                ["A", "B", "C"],
                ["F", "G", "H"]
            ]
        }, {
            "label": "Checkbox matrix (with source) map to an object",
            "type": "checkbox-matrix",
            "name": "matrix2",

            "source_display": [
                ["A", "B", "C"],
                ["F", "G", "H"]
            ],

            "source_model": [
                ["A", "B", "C"],
                ["F", "G", "H"]
            ]
        }, {
            "label": "Submit now!",
            "type": "submit",
            "name": "submit",
            "class": "btn-primary"
        }]
    };

}]);

app.controller("DisableWeekendsCtrl", ["$scope", "$timeout", function ($scope, $timeout) {
    $scope.disabled_weekend = function (date, mode) {
        return (mode === "day" && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.form_cfg = {
        "legend": "legend",
        "type": "horizontal",
        "name": "form",
        "onSubmit": "onSubmit",
        "model": "entity",
        "fields": [{
            "label": "datepicker",
            "type": "datepicker",
            "name": "datepicker",
            "attrs": {
                "date-disabled": "disabled_weekend(date, mode)"
            }
        }, {
            "label": "Submit now!",
            "type": "submit",
            "name": "submit",
            "class": "btn-primary"
        }]
    };
}]);



app
.controller("NumberCtrl", ["$scope", "$timeout", function ($scope, $timeout) {
  $scope.entity = {
    num: 5000000.99
  };

  $scope.onSubmit = function (dirty_data_only) {
    console.log("onSubmit");
    console.log(dirty_data_only);
  };

  $scope.form_cfg = {
    "legend": "legend",
    "type": "horizontal",
    "name": "form",
    "onSubmit": "onSubmit",
    "model": "entity",
    "fields": [{
      "label": "number",
      "type": "number",
      "name": "num",
      "actions": {
        "use-locale":""
      }
    }, {
      "label": "Submit now!",
      "type": "submit",
      "name": "submit",
      "class": "btn-primary"
    }]
  };

}]);
