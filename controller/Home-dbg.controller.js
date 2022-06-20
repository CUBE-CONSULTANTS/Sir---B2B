sap.ui.define(
    ["./BaseController", "sap/ui/core/Fragment", "sap/ui/model/json/JSONModel", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/m/MessageBox", "sap/m/MessageToast"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.core.Fragment} Fragment
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     * @param {typeof sap.m.MessageBox} MessageBox
     * @param {typeof sap.m.MessageToast} MessageToast
     */
    function (BaseController, Fragment, JSONModel, Filter, FilterOperator, MessageBox, MessageToast) {
        "use strict";

        return BaseController.extend("com.myorg.myUI5App.controller.Home", {
            onInit: function () {
                const oDataDropDown = {
                    Enabled: false,
                    EnabledCancel: true,
                    RicercaAvanzata: false,
                    nextButtonVisible: true,
                    nextButtonEnabled: false,
                    backButtonVisible: false,
                    reviewButtonVisible: false,
                    finishButtonVisible: false,
                    TestoColore: "",
                    visibleCodice: false,
                    PersonalizzazioneButtonVisible: false,
                    visibleDescrizione: false,
                    visibleCategoria: false,
                    visibleSerie: false,
                    DisponibilitaButtonVisible: false,
                    reviewButtonEnabled: true,
                    SelectedItems: "",
                    SelectedCodice: "",
                    SelectedDescrizione: "",
                    SelectedSeries: "",
                    SelectedTableCodice: "",
                    SelectedTableDescription: "",
                    SelectedTableCodicePrecedente: "",
                    SelectedQuantita: "",
                    SelectedQuantitaStorico: false,
                    prodottoList: "",
                    prodottoTotale: "",
                    prodottoPrezzo: "",
                    prodottoSconto: "",
                    columnVisible: false,
                    selectedCategory: "",
                    selectedCheck: false,
                    valueDays: 0,

                    SelectedCategoria: "AI",
                    Categories: [
                        {
                            Name: "ANTINCENDIO",
                            id: "AI",
                        },
                        {
                            Name: "ANTIRUMORE",
                            id: "AR",
                        },
                        {
                            Name: "ATTR. ELETTRICHE",
                            id: "AE",
                        },
                    ],
                    SelectedColor: "black",
                    SelectedName: "",
                    Colors: [
                        {
                            Name: "J5 - ARANCIO (M)",
                            id: "darkorange",
                        },
                        {
                            Name: "K1 BIANCO (M)",
                            id: "white",
                        },
                        {
                            Name: "Q2 AZZURRO (M)",
                            id: "blue",
                        },
                        {
                            Name: "S0 VERDE (M)",
                            id: "green",
                        },
                        {
                            Name: "AM _ GRIGIO MELANGE (M)",
                            id: "grey",
                        },
                        {
                            Name: "Q7 - NAVY (M)",
                            id: "black",
                        },
                    ],
                };

                const oModelDropDown = new JSONModel(oDataDropDown);
                this.getView().setModel(oModelDropDown, "dropDownModel");

                const oModel = this.getOwnerComponent().getModel("oData");

                // check token validity
                oModel.read("/sap/opu/odata/sap/ZB2B_BP_SRV/$metadata", {
                    success: (oData, oResponse) => {
                        debugger;
                    },
                    error: (oError) => {
                        debugger;
                    },
                });
                oModel.read("/google/search?q=sap", {
                    success: (oData, oResponse) => {
                        debugger;
                    },
                    error: (oError) => {
                        debugger;
                    },
                });
            },

            goToOrder: function () {
                this.getView().getModel("Clothing").setProperty("/catalog/clothing/itemsTreeTable", []);

                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Order");
            },
            goToModication: function () {
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Order");
                const categories = this.getView().getModel("Clothing").getProperty("/catalog/clothing/categories");
                this.getView().getModel("Clothing").setProperty("/catalog/clothing/itemsTreeTable", categories);
            },
            goToDocument: function () { },
            goOrderDetail: function (oEvent) {
                const oButton = oEvent.getSource(),
                    oView = this.getView();

                // create popover
                if (!this._pPopover) {
                    this._pPopover = Fragment.load({
                        id: oView.getId(),
                        name: "com.myorg.myUI5App.view.fragment.Functionality.OrderSection",
                        controller: this,
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
                const oButton = oEvent.getSource(),
                    oView = this.getView();

                // create popover
                if (!this._ItemsPopover) {
                    this._ItemsPopover = Fragment.load({
                        id: oView.getId(),
                        name: "com.myorg.myUI5App.view.fragment.Functionality.ItemsDetail",
                        controller: this,
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
                const oButton = oEvent.getSource(),
                    oView = this.getView();

                // create popover
                if (!this._historicalPopover) {
                    this._historicalPopover = Fragment.load({
                        id: oView.getId(),
                        name: "com.myorg.myUI5App.view.fragment.Functionality.Historical",
                        controller: this,
                    }).then(function (oPopover) {
                        oView.addDependent(oPopover);
                        return oPopover;
                    });
                }
                this._historicalPopover.then(function (oPopover) {
                    oPopover.openBy(oButton);
                });
                this._documentPopover.then(function (oPopover) {
                    oPopover.openBy(oButton);
                });
            },


            onGoToRicercaArticolo: function () {
                debugger;
                this.getView().getModel("Clothing").setProperty("/catalog/clothing/itemsTreeTable", []);

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("SearchProducts");
                // this._getDialog();
            },





        });
    }
);