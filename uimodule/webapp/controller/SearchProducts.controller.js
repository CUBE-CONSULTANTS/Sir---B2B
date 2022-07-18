sap.ui.define(
    ["./BaseController",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/model/json/JSONModel",
        'sap/ui/core/Fragment',
        'sap/ui/model/Sorter',
        "sap/ui/core/UIComponent",
        "sap/ui/core/routing/History",
        "sap/m/PDFViewer",],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel, Fragment, Sorter, UIComponent, History, PDFViewer) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.SearchProducts", {
            onInit: function () {
                this.getRouter().getRoute("SearchProducts").attachPatternMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function () {
               
            },

            // FilterBar

            factoryFilterBar: function(sId, context){
                let oControl = null;

                switch (context.getProperty("control/type")) {
                    case "Input":
                        oControl = new sap.m.Input({
                            value: context.getProperty("control/value")
                        })
                        break;
                    case "Select":
                        oControl = new sap.m.Select({
                            forceSelection: false,
                            selectedKey: context.getProperty("control/value")
                        }).bindAggregation("items", {
                            path: "",
                            template: new sap.ui.core.Item({
                                key: "",
                                text: ""
                            }),
                            templateShareable: false
                        })
                        break;
                    default:
                        break;
                }

                return new sap.ui.comp.filterbar.FilterItem({
                    name: context.getProperty("name"),
                    label: this.getView().getModel("i18n").getResourceBundle().getText(context.getProperty("label")),
                    visible: context.getProperty("visible"),
                    control: oControl
                });
            },

            onSelectCheckBox: function (oEvent) {
                
            },

            onFilterTable: function () {
                
            },

            onReset: function () {
                
            },

            // Table

            onOpenDetailProduct: function (oEvent, oContext) {
                debugger
                this.getRouter().navTo("DetailProduct", {}, true);
            },

            onOpenDialogProductAvailability: function (e) {
                var oContext = e.getParent().getParent().getBindingContext("Clothing").getObject();
                var sdesc = oContext.description;
                //this.getModel("dropDownModel").setProperty("/textDisponibilita", "Disponibilità prodotto " + sdesc)
                this._getDialogProductAvailable(e);
            },

            onSort: function (e) {
                const oTable = e.getSource().getParent().getParent();
                const bSorted = oTable.getBinding("items").aSorters[0].bDescending;
                
                oTable.getBinding("items").sort(new Sorter("codice", !bSorted));
            },

            // Dialog Init

            _getDialogProductAvailable: function () {
                if (!this._oDialogProdAvailab) {
                    Fragment.load({
                        name: "com.myorg.myUI5App.view.fragment.ProductAvailability",
                        controller: this
                    }).then(function (fr) {
                        fr.setModel(this.getOwnerComponent().getModel("Clothing"), "Clothing")
                        fr.setModel(this.getView().getModel("dropDownModel"), "dropDown");
                        this._oDialogProdAvailab = fr
                        fr.open();
                    }.bind(this));
                } else {
                    this._oDialogProdAvailab.open();
                }
            },

            // Dialog Events
            
            onCloseProd: function () {
                this._oDialogProdAvailab.close();
            },
        });
    }
);
