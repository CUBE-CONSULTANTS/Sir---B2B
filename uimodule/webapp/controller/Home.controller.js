sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/core/Fragment',
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    'sap/m/MessageToast'
], function (
    Controller,
    Fragment,
    JSONModel,
    Filter,
    FilterOperator,
    MessageBox,
    MessageToast
) {
    "use strict";

    return Controller.extend("com.myorg.myUI5App.controller.Home", {
        onInit: function () {

            var oDataDropDown = {
                "Enabled": false,
                "EnabledCancel": true,
                "RicercaAvanzata": false,
                "nextButtonVisible": true,
                "nextButtonEnabled": false,
                "backButtonVisible": false,
                "reviewButtonVisible": false,
                "finishButtonVisible": false,
                "TestoColore": "",
                "visibleCodice": false,
                "PersonalizzazioneButtonVisible": false,
                "visibleDescrizione": false,
                "visibleCategoria": false,
                "visibleSerie": false,
                "DisponibilitaButtonVisible": false,
                "reviewButtonEnabled": true,
                "SelectedItems": "",
                "SelectedCodice": "",
                "SelectedDescrizione": "",
                "SelectedSeries": "",
                "SelectedTableCodice": "",
                "SelectedTableDescription": "",
                "SelectedTableCodicePrecedente": "",
                "SelectedQuantita": "",
                "SelectedQuantitaStorico": false,
                "prodottoList": "",
                "prodottoTotale": "",
                "prodottoPrezzo": "",
                "prodottoSconto": "",
                "columnVisible": false,
                "selectedCategory": "",
                "selectedCheck": false,
                "valueDays": 0,

                "SelectedCategoria": "AI",
                "Categories": [{
                    "Name": "ANTINCENDIO",
                    "id": "AI"
                },
                {
                    "Name": "ANTIRUMORE",
                    "id": "AR"
                },
                {
                    "Name": "ATTR. ELETTRICHE",
                    "id": "AE"
                },

                ],
                "SelectedColor": "black",
                "SelectedName": "",
                "Colors": [
                    {
                        "Name": "J5 - ARANCIO (M)",
                        "id": "darkorange"
                    },
                    {
                        "Name": "K1 BIANCO (M)",
                        "id": "white"
                    },
                    {
                        "Name": "Q2 AZZURRO (M)",
                        "id": "blue"
                    },
                    {
                        "Name": "S0 VERDE (M)",
                        "id": "green"
                    },
                    {
                        "Name": "AM _ GRIGIO MELANGE (M)",
                        "id": "grey"
                    },
                    {
                        "Name": "Q7 - NAVY (M)",
                        "id": "black"
                    }
                ],

            };

            var oModelDropDown = new JSONModel(oDataDropDown);
            this.getView().setModel(oModelDropDown, 'dropDownModel');


        },

        goToOrder: function () {

            this.getView().getModel("Clothing").setProperty("/catalog/clothing/itemsTreeTable", []);

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Order");
        },
        goToModication: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Order");
            var categories = this.getView().getModel("Clothing").getProperty("/catalog/clothing/categories")
            this.getView().getModel("Clothing").setProperty("/catalog/clothing/itemsTreeTable", categories);
        },
        goToLogin: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("MainView");
        },
        goOrderDetail: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            // create popover
            if (!this._pPopover) {
                this._pPopover = Fragment.load({
                    id: oView.getId(),
                    name: "com.myorg.myUI5App.view.fragment.Functionality.OrderSection",
                    controller: this
                }).then(function (oPopover) {
                    oView.addDependent(oPopover);
                    return oPopover;
                });
            }
            this._pPopover.then(function (oPopover) {
                oPopover.openBy(oButton);
            });
        },
        goToItemsDetail: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            // create popover
            if (!this._ItemsPopover) {
                this._ItemsPopover = Fragment.load({
                    id: oView.getId(),
                    name: "com.myorg.myUI5App.view.fragment.Functionality.ItemsDetail",
                    controller: this
                }).then(function (oPopover) {
                    oView.addDependent(oPopover);
                    return oPopover;
                });
            }
            this._ItemsPopover.then(function (oPopover) {
                oPopover.openBy(oButton);
            });
        },
        goToHistorical: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            // create popover
            if (!this._historicalPopover) {
                this._historicalPopover = Fragment.load({
                    id: oView.getId(),
                    name: "com.myorg.myUI5App.view.fragment.Functionality.Historical",
                    controller: this
                }).then(function (oPopover) {
                    oView.addDependent(oPopover);
                    return oPopover;
                });
            }
            this._historicalPopover.then(function (oPopover) {
                oPopover.openBy(oButton);
            });
        },
        goToDocument: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            // create popover
            if (!this._documentPopover) {
                this._documentPopover = Fragment.load({
                    id: oView.getId(),
                    name: "com.myorg.myUI5App.view.fragment.Functionality.Document",
                    controller: this
                }).then(function (oPopover) {
                    oView.addDependent(oPopover);
                    return oPopover;
                });
            }
            this._documentPopover.then(function (oPopover) {
                oPopover.openBy(oButton);
            });
        },
        // _getDialog: function () {
        //     debugger
        //     if (!this._oDialog) {
        //         Fragment.load({
        //             name: "com.myorg.myUI5App.view.fragment.SearchItems",
        //             controller: this,
        //             id: this.getView().getId()
        //         }).then(function (fr) {
        //             fr.attachAfterOpen(this.onDialogAfterOpen, this);
        //             fr.setModel(this.getOwnerComponent().getModel("Clothing"), "Clothing")
        //             fr.setModel(this.getView().getModel("dropDownModel"))
        //             this._oDialog = fr
        //             fr.open();
        //         }.bind(this));
        //     } else {
        //         this._oDialog.open();
        //     }

        // },
        handleButtonsVisibility: function () {
            debugger

            var oModel = this.getView().getModel("dropDownModel");
            switch (this._oWizard.getProgress()) {
                case 1:
                    oModel.setProperty("/nextButtonVisible", true);
                    // oModel.setProperty("/nextButtonEnabled", false);
                    oModel.setProperty("/backButtonVisible", false);
                    oModel.setProperty("/reviewButtonVisible", false);
                    oModel.setProperty("/finishButtonVisible", false);
                    break;
                case 2:
                    oModel.setProperty("/DisponibilitaButtonVisible", false);
                    oModel.setProperty("/backButtonVisible", true);
                    oModel.setProperty("/nextButtonEnabled", false);
                    oModel.setProperty("/nextButtonVisible", false);
                    oModel.setProperty("/reviewButtonVisible", true)
                    oModel.setProperty("/reviewButtonEnabled", false)
                    break;
                case 3:
                    oModel.setProperty("/finishButtonVisible", true);
                    oModel.setProperty("/backButtonVisible", false);
                    oModel.setProperty("/PersonalizzazioneButtonVisible", false)
                    oModel.setProperty("/reviewButtonVisible", false)
                    break;
                default: break;
            }

        },
        onDialogAfterOpen: function () {
            debugger
            var model = this.getView().getModel("dropDownModel");
            var bColumn = model.getProperty("/columnVisible")
            if (bColumn) {
                model.setProperty("/columnVisible", false);
            }
            var bSelected = this.getView().byId("checkBoxFiltro").getSelected();
            if (bSelected === true) {
                model.setProperty("/visibleCodice", false);
                model.setProperty("/visibleDescrizione", false);
                model.setProperty("/visibleCategoria", false);
                model.setProperty("/visibleSerie", false);
            }
            model.setProperty("/selectedCheck", false);
            model.setProperty("/selectedCategory", "");
            model.setProperty("/SelectedCodice", "");
            model.setProperty("/SelectedDescrizione", "");

            this._oWizard = this.byId("CreateProductWizard");
            this._oWizard.discardProgress(this._oWizard.getSteps()[0]);
            this.handleButtonsVisibility();
        },
        onGoToRicercaArticolo: function () {
            debugger
            this.getView().getModel("Clothing").setProperty("/catalog/clothing/itemsTreeTable", []);

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("SearchProducts");
            // this._getDialog();

        },
        onSelectCheckBox: function (oEvent) {
            debugger
            var selected = oEvent.getSource().getSelected();
            var model = this.getView().getModel("dropDownModel");
            if (selected === true) {
                model.setProperty("/visibleCodice", true);
                model.setProperty("/visibleDescrizione", true);
                model.setProperty("/visibleCategoria", true);
                model.setProperty("/visibleSerie", true);
            } else {
                model.setProperty("/visibleCodice", false);
                model.setProperty("/visibleDescrizione", false);
                model.setProperty("/visibleCategoria", false);
                model.setProperty("/visibleSerie", false);
            }
        },

        handleWizardCancel: function () {
            debugger
            this._handleMessageBoxOpen("Are you sure you want to cancel your report?", "warning");
        },
        _handleMessageBoxOpen: function (sMessage, sMessageBoxType) {
            MessageBox[sMessageBoxType](sMessage, {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.YES) {
                        this._oWizard.discardProgress(this._oWizard.getSteps()[0]);
                        this.byId("wizardDialog").close();
                        this.getView().getModel().setData(Object.assign({}, oData));
                    }
                }.bind(this)
            });
        },
        onCloseProd: function (oEvent) {
            debugger
            this._oDialogProdAvailab.close();
            // oEvent.getSource().getParent().close();
        },


        onDialogNextButton: function () {
            debugger
            if (this._oWizard.getProgressStep().getValidated()) {
                this._oWizard.nextStep();
            }

            this.handleButtonsVisibility();
        },
        onChangeValueItems: function () {
            debugger
            var somma = 0;
            var model = this.getView().getModel("Clothing").getProperty("/sizes/sizes1");
            var model2 = this.getView().getModel("Clothing").getProperty("/sizes/sizes2");
            for (let i = 0; i < model.length; i++) {
                var quantita = model[i].quantita
                var sommaQuantita = somma += quantita
            }
            var somma1 = 0
            for (let i = 0; i < model2.length; i++) {
                var quantita2 = model2[i].quantita;
                var sommaQuantita2 = somma1 += quantita2
            }
            var sommaFinale = sommaQuantita + sommaQuantita2

            this.getView().getModel("Clothing").setProperty("/sizes/totale", sommaFinale);
            var prezzo = this.getView().getModel("Clothing").getProperty("/sizes/prezzo");
            var result = sommaFinale * prezzo;
            this.getView().getModel("Clothing").setProperty("/sizes/calcolo", result.toFixed(2));

            var testoColore = this.getView().byId("coloreFinale").getText();
            var totale = this.getView().byId("totalItems2").getText();
            if (testoColore !== "" && totale > 0) {
                this.getView().getModel("dropDownModel").setProperty("/reviewButtonEnabled", true);
                this.getView().getModel("dropDownModel").setProperty("/SelectedQuantitaStorico", false);

            } else {
                this.getView().getModel("dropDownModel").setProperty("/reviewButtonEnabled", false);
            }
        },
        onOpenColor: function (oEvent) {
            this.getView().setModel(this.getView().getModel("dropDownModel"))
            debugger;
            var oButton = oEvent.getSource(),
                oView = this.getView();
            // create popover
            if (!this._pPopover) {
                this._pPopover = Fragment.load({
                    id: oView.getId(),
                    name: "com.myorg.myUI5App.view.fragment.SelectColor",
                    controller: this
                }).then(function (oPopover) {
                    oView.addDependent(oPopover);
                    return oPopover;
                });
            }
            this._pPopover.then(function (oPopover) {
                oPopover.openBy(oButton);
            });
        },
        onChooseColor: function (oEvent) {
            debugger
            var oSelectedItem = oEvent.getSource();
            var oContext = oSelectedItem.getBindingContext();
            var sPath = oContext.getPath();
            var sId = this.getView().getModel().getProperty(sPath).id;
            this.getView().getModel().setProperty("/SelectedColor", sId);
            var sName = this.getView().getModel().getProperty(sPath).Name;
            this.getView().getModel().setProperty("/SelectedName", sName);
            this.byId("colors").close();
            var testoColore = this.getView().byId("coloreFinale").getText();
            var totale = this.getView().byId("totalItems2").getText();
            if (testoColore !== "" && totale > 0) {
                this.getView().getModel("dropDownModel").setProperty("/reviewButtonEnabled", true);
                this.getView().getModel("dropDownModel").setProperty("/SelectedQuantitaStorico", false);
            } else {
                this.getView().getModel("dropDownModel").setProperty("/reviewButtonEnabled", false);
            }
            sap.ui.getCore().byId("colors").destroy();
        },
        onChangeDate: function () {
            debugger
            var selectedDate = this.getView().byId("daysPicker").getDateValue();
            var currentDate = new Date();
            var sDay = currentDate.getDate(); //get just the date, eg 23
            var sDaySel = selectedDate.getDate()
            var sMonth = currentDate.getMonth() + 1;
            var sMonthSel = currentDate.getMonth() + 1;
            var sYear = currentDate.getFullYear();
            var sYearSel = currentDate.getFullYear();
            if (sMonth < 10) { sMonth = '0' + sMonth };
            if (sDay < 10) { sMonth = '0' + sDay };
            var sToday = sYear + '-' + sMonth + '-' + sDay
            var sDaySelect = sYearSel + '-' + sMonthSel + '-' + sDaySel;
            var valueInput = this.getView().byId("calculateDays")
            var days = selectedDate.getTime() - currentDate.getTime()
            if (days >= 0) {
                var diff = Math.abs(selectedDate.getTime() - currentDate.getTime());
                var diffD = Math.ceil(diff / (1000 * 60 * 60 * 24));
                this.getView().getModel("dropDownModel").setProperty("/valueDays", diffD)
                valueInput.setValueState("None")
            } else {
                valueInput.setValueState("Error")
                var msg = 'Inserire una data valida';
                MessageToast.show(msg);
                this.getView().getModel("dropDownModel").setProperty("/reviewButtonEnabled", true)
            }
        },
        onCloseColor: function () {
            this.byId("colors").close();
        },
        onDialogBackButton: function () {
            this._iSelectedStepIndex = this._oWizard.getSteps().indexOf(this._oSelectedStep);
            var oPreviousStep = this._oWizard.getSteps()[this._iSelectedStepIndex - 1];

            if (this._oSelectedStep) {
                this._oWizard.goToStep(oPreviousStep, true);
            } else {
                this._oWizard.previousStep();
            }

            this._iSelectedStepIndex--;
            this._oSelectedStep = oPreviousStep;

            this.handleButtonsVisibility();
            this.getView().getModel("dropDownModel").setProperty("/nextButtonEnabled", true)
        },
        editStepOne: function () {
            debugger
            var cntrlStep1 = this.getView().byId('CreateProductWizard');
            var step = cntrlStep1.getSteps()[0];
            this.getView().byId('CreateProductWizard').goToStep(step);
        },

        editStepTwo: function () {
            debugger
            var cntrlStep2 = this.getView().byId('CreateProductWizard');
            var step = cntrlStep2.getSteps()[1];
            this.getView().byId('CreateProductWizard').goToStep(step);
        },
    });
});