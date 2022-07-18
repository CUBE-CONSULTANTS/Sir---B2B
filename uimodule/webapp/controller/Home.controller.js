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

            onTileNavigation: function(e) {
                const oContext = e.getSource().getBindingContext("home");

                this.getRouter().navTo(oContext.getProperty("navigationPattern"));
            },

            factoryTiles: function(sId, context) {
                return new sap.m.GenericTile({
                    width: "auto",
                    press: this.onTileNavigation.bind(this),
                    header: this.getView().getModel("i18n").getResourceBundle().getText( context.getProperty("header") ),
                    mode: context.getProperty("mode"),
                    frameType: context.getProperty("frameType"),
                    headerImage: context.getProperty("headerImage"),
                    tileContent: [
                        // @ts-ignore
                        new sap.m.TileContent({
                            content: [
                                new sap.m.Text({
                                    text: this.getView().getModel("i18n").getResourceBundle().getText( context.getProperty("subHeader") )
                                })
                            ]
                        })
                    ],
                    customData: [
                        new sap.ui.core.CustomData({
                            key: context.getProperty("/customData/key"),
                            value: context.getProperty("/customData/value")
                        })
                    ]
                }).addStyleClass("sapUiSmallMargin")
            }
        });
    }
);