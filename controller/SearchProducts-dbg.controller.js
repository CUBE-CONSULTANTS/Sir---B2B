sap.ui.define(
    ["./BaseController",
        "sap/ui/model/Sorter",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageBox",
        "../model/API"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, Sorter, Filter, FilterOperator, JSONModel, MessageBox, API) {
        "use strict";

        return BaseController.extend("com.myorg.myUI5App.controller.SearchProducts", {
            onInit: function () {
                this.getRouter().getRoute("SearchProducts").attachPatternMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function () {
                const oDataModel = this.getModel("oData");
                const x = async () => await API.getMatchCode(oDataModel);

                //x().then(res => { debugger })
            },

            // FilterBar

            factoryFilterBar: function(sId, context){
                let oControl = null;

                switch (context.getProperty("control/type")) {
                    case "Input":
                        oControl = new sap.m.Input({
                            value: context.getProperty("control/value")
                        }).setBindingContext(context, "filterContext");
                        break;
                    case "Select":
                        oControl = new sap.m.Select({
                            forceSelection: false,
                            selectedKey: context.getProperty("control/value")
                        }).bindItems({
                            path: "/MatchCodeSet",
                            filters: [
                                new Filter("Atnam", FilterOperator.EQ, "")
                            ],
                            parameters : {
                                $expand: "F4Set",
                                $format: "json"
                            },
                            template: new sap.ui.core.Item({
                                key: "{Atnam}",
                                text: "{Atwtb}"
                            }),
                            templateShareable: false
                        }).setBindingContext(context, "filterContext");
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

            onFilterBarSearch: function (e) {
                const oDataModel = this.getModel("oData");
                const aFilters = e.getParameter("selectionSet");
                const aFilterValues = [];
                const getArticoloList = async () => await API.getArticoloList(oDataModel, []);

                aFilters.forEach(el => {
                    const { oDataField, control } = el.getBindingContext("filterContext").getObject();

                    aFilterValues.push({ oDataField, value: control.value });
                });

                getArticoloList()
                    .then(res => {
                        this.getModel("searchProducts").setProperty("/table/items", res.results);
                    })
                    .catch(res => {
                        debugger
                    })          
            },

            onReset: function () {
                
            },

            // Table

            onOpenDetailProduct: function (oEvent) {
                const oContext = oEvent.getSource().getBindingContext("searchProducts");
                this.getRouter().navTo("ProductDetails", { ProductId: oContext.getProperty("Idprodotto") });
            },

            onOpenDialogProductAvailability: function (e) {
                const oContext = e.getSource().getBindingContext("searchProducts").getObject();
                this._getDialogProductAvailable(oContext);
            },

            onSort: function (e) {
                const oTable = e.getSource().getParent().getParent();
                const bSorted = oTable.getBinding("items").aSorters[0].bDescending;
                
                oTable.getBinding("items").sort(new Sorter("codice", !bSorted));
            },

            // Dialog Init

            _getDialogProductAvailable: function (oContext) {
                if (!this._oDialogProdAvailab) {
                    this._oDialogProdAvailab = sap.ui.core.Fragment.load({
                        id: this.getView().getId(),
                        name: "com.myorg.myUI5App.view.fragment.SearchProducts.ProductAvailability",
                        type: "XML",
                        controller: this
                    }).then(oDialog => {
                        this.getView().addDependent(oDialog);
                        oDialog.setModel(new JSONModel({
                            context: oContext
                        }), "productAvailability");
                        return oDialog;
                    })
                }

                this._oDialogProdAvailab.then(oDialog => {
                    oDialog.open();
                })
            },

            // Dialog Events
            
            onCloseProd: function (e) {
                e.getSource().getParent().close();
            },
        });
    }
);
