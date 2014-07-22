// Code goes here

// NOTE: ng-app="plunker" + AngularUI module dependency
var app = angular.module("app", ["ui.bootstrap"]);

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

    $scope.list = [{
        id: 1,
        label: "Soccer"
    }, {
        id: 2,
        label: "Basket"
    }, {
        id: 3,
        label: "Curlin"
    }, {
        id: "sc2",
        label: "starcraft 2"
    }];

    $scope.SendToServer = function (dirty_data) {
        console.log("SendToServer");
        console.log(dirty_data);
    };

    console.log("maincontroller end!");



    $scope.form_cfg = {
        "legend": "legend",
        "type": "horizontal",
        "name": "form",
        "onSubmit": "SendToServer",
        "model": "entity",
        "fields": "form_fields",
    };

    $scope.form_fields = [{
        "label": "Text field",
        "type": "text",
        "name": "user",
        "placeholder": "Text",
        "constraints": {
            "required": true
        }
    }, {
        "label": "Password field",
        "type": "password",
        "name": "pwd",
        "placeholder": "Password",
        "constraints": {
            "only-iso": true
        }
    }, {
        "label": "Password field - 2",
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
        "label": "T&C",
        "type": "checkbox",
        "name": "tyc",
        "right": true,
        "constraints": {
            "required-if": "entity.user"
        }
    }, {
        "label": "Services",
        "type": "checkbox-list",
        "name": "services",
        "source": "src_list"
    }, {
        "label": "Datepicker",
        "type": "datepicker",
        "name": "date"
    }, {
        "label": "Platform",
        "type": "select",
        "name": "platform",
        "source": [{"id": "mobile", "label": "mobile"}, {"id": "desktop", "label": "desktop"}],
        "empty_msg": "Please choose a car"
    }, {
        "type": "select-bool",
        "label": "IPhone",
        "option_id": "id",
        "option_value": "value",
        "source": [{"id": true, "label": "YES"}, {"id": false, "label": "NO"}],
        "name": "has_iphone"
    }, {
        "label": "Lista",
        "type": "select",
        "name": "lista",
        "source": "list",
        "empty_msg": "Choose one"
    }, {
        "label": "Submit now!",
        "type": "submit",
        "name": "submit"
    }];

    setTimeout(function () {
        console.log("new text field!");
        $scope.form_fields.push({
            "label": "Text field",
            "type": "text",
            "name": "user2",
            "placeholder": "Text",
            "constraints": {
                "required": true
            }
        });

        $timeout(function () {
            $scope.$digest();
        });

    }, 3000);

}]);