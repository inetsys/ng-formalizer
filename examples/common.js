angular
.module("app", ["formalizer"])
.config(["uibDatepickerConfig", "uibDatepickerPopupConfig", "datepickerPopupFix", function (uibDatepickerConfig, uibDatepickerPopupConfig, datepickerPopupFix) {
    uibDatepickerPopupConfig.currentText = "Hoy";
    uibDatepickerPopupConfig.clearText = "Borrar";
    uibDatepickerPopupConfig.closeText = "Cerrar";
    uibDatepickerPopupConfig.toggleWeeksText = "Semanas";
    uibDatepickerConfig.showWeeks = false;
    uibDatepickerPopupConfig.datepickerPopup = "dd/MM/yyyy";

    // spanish GMT+0
    datepickerPopupFix.datepickerPopup = "DD/MM/YYYY";
    datepickerPopupFix.datepickerTZ = "+0000";
}]);
