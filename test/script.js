// Code goes here

// NOTE: ng-app="plunker" + AngularUI module dependency
var app = angular.module("app", ["ui.bootstrap", "formalizer"]);

app.controller("MainCtrl", ["$scope", "$timeout", function ($scope, $timeout) {
    $scope.entity = {
        //tyc: true,
        platform: "desktop",
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


    $scope.form_fields = [{
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
    }, {
        "label": "Password (only-iso)",
        "type": "password",
        "name": "pwd",
        "placeholder": "Password",
        "constraints": {
            "only-iso": true
        }
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
        }
    }, {
        "label": "Comments",
        "type": "textarea",
        "name": "comments"
    }, {
        "label": "just a checkbox, required if you fill User (with a valid user!)",
        "type": "checkbox",
        "name": "tyc",
        "right": true,
        "constraints": {
            "required-if": "entity.user"
        }
    }, {
        "label": "Checkbos list (not available atm)",
        "type": "checkbox-list",
        "name": "services",
        "source": "src_list"
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
        "empty_msg": "Please choose a car"
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
        "messages": {
            "required": "necesita rellenar este campo!"
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
        "source_model": null, // null means the object otherwise a key(string)
        "messages": {
            "required": "necesita rellenar este campo!"
        }
    }, {
        "label": "typeahead (abc,bcd,zzz)",
        "type": "typeahead-multi",
        "name": "ta_list",
        "placeholder": "Text",
        "constraints": {
        },
        "source": "typeahead_items",
        "source_display": "name",
        "messages": {
            "required": "necesita rellenar este campo!"
        }
    }, {
        "label": "Submit now!",
        "type": "submit",
        "name": "submit"
    }];


    $scope.list = [{
        id: 1,
        label: "ELEMENT ID 1"
    },{
        id: 2,
        label: "ELEMENT ID 2"
    },{
        id: 3,
        label: "ELEMENT ID 3"
    },{
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

}]);
