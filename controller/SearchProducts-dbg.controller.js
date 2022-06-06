sap.ui.define(
    ["./BaseController",
        "sap/m/MessageToast",
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
    function (Controller, MessageToast, Filter, FilterOperator, JSONModel, Fragment, Sorter, UIComponent, History, PDFViewer) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.SearchProducts", {
            onInit: function () {
                var oDataDropDown = {
                    "RicercaAvanzata": false,
                    "visibleCodice": false,
                    "textDisponibilita": "",
                    "visibleDescrizione": false,
                    "visibleCategoria": false,
                    "visibleSerie": false,
                    "SelectedItems": "",
                    "SelectedCodice": "",
                    "SelectedDescrizione": "",
                    "columnVisible": false,
                    "selectedCategory": "",
                    "selectedCheck": false,
                    "enabledCart": false,
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


                };

                var oModelDropDown = new JSONModel(oDataDropDown);
                this.getView().setModel(oModelDropDown, 'dropDownModel');

                this._oRouter = this.getOwnerComponent().getRouter();
                this._oRouter.getRoute("SearchProducts").attachPatternMatched(this._onObjectMatched, this);

            },
            _onObjectMatched: function () {
                debugger
                var model = this.getView().getModel("dropDownModel");
                var bColumn = model.getProperty("/columnVisible")
                if (bColumn) {
                    model.setProperty("/columnVisible", false);
                }
                model.setProperty("/selectedCheck", false);
                model.setProperty("/visibleCodice", false);
                model.setProperty("/visibleDescrizione", false);
                model.setProperty("/visibleCategoria", false);
                model.setProperty("/visibleSerie", false);
                model.setProperty("/selectedCategory", "");
                model.setProperty("/SelectedCodice", "");
                model.setProperty("/SelectedDescrizione", "");
            },

            onFilterTable: function () {
                debugger;
                this.getView().byId("idProductsTableItems").removeSelections()
                var aFilter = [];
                var model = this.getView().getModel("dropDownModel");
                var sCodice = model.getProperty("/SelectedCodice");
                var sDescrizione = model.getProperty("/SelectedDescrizione");
                var sCategory = model.getProperty("/selectedCategory")
                var sArticolo = model.getProperty("/SelectedItems");

                var bColumn = model.getProperty("/columnVisible")
                if (!bColumn) {
                    model.setProperty("/columnVisible", true);
                }
                if (sCodice) {
                    aFilter.push(new Filter("codice", FilterOperator.Contains, sCodice));
                }
                if (sDescrizione) {
                    aFilter.push(new Filter("description", FilterOperator.Contains, sDescrizione));
                }
                if (sCategory) {
                    aFilter.push(new Filter("categoria", FilterOperator.Contains, sCategory))
                }
                if (sArticolo) {
                    aFilter.push(new Filter("", FilterOperator.Contains, sArticolo))
                }

                var oTable = this.getView().byId("idProductsTableItems");
                var oBinding = oTable.getBinding("items");
                oBinding.filter(aFilter);
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
            onSelectItems: function () {
                debugger
                var aSelected = this.byId("idProductsTableItems").getSelectedItems();
                var visible = this.getModel("dropDownModel").getProperty("/columnVisible");
                if (aSelected.length > 0 && visible == true) {
                    this.getModel("dropDownModel").setProperty("/enabledCart", true);
                } else {
                    this.getModel("dropDownModel").setProperty("/enabledCart", false);
                }
            },
            _getDialogFile: function () {
                debugger
                if (!this._oDialogFile) {
                    Fragment.load({
                        name: "com.myorg.myUI5App.view.fragment.FileDocument",
                        controller: this
                    }).then(function (fr) {
                        fr.setModel(this.getOwnerComponent().getModel("Clothing"), "Clothing")
                        fr.setModel(this.getView().getModel("dropDownModel"), "dropDownModel")
                        fr.setModel(this.getView().getModel("pdfModel"))
                        this._oDialogFile = fr
                        fr.open();
                    }.bind(this));
                } else {
                    this._oDialogFile.open();
                }
            },
            openFileDocument: function (oEvent) {
                this._getDialogFile();
            },

            onCloseFilterOptionsDialogCancel: function (oEvent) {
                debugger
                this._oDialogFilter
                oEvent.getSource().getParent().close();
            },

            _getDialogProductAvailable: function () {
                if (!this._oDialogProdAvailab) {
                    Fragment.load({
                        name: "com.myorg.myUI5App.view.fragment.ProductAvailability",
                        controller: this
                    }).then(function (fr) {
                        fr.setModel(this.getOwnerComponent().getModel("Clothing"), "Clothing")
                        fr.setModel(this.getView().getModel("dropDownModel"), "dropDown")
                        this._oDialogProdAvailab = fr
                        fr.open();
                    }.bind(this));
                } else {
                    this._oDialogProdAvailab.open();
                }
            },
            onOpenDialogProductAvailability: function (oEvent) {
                var oContext = oEvent.getSource().getParent().getParent().getBindingContext("Clothing").getObject();
                var sdesc = oContext.description;
                this.getModel("dropDownModel").setProperty("/textDisponibilita", "Disponibilità prodotto " + sdesc)
                this._getDialogProductAvailable();

                debugger
            },
            onCloseProd: function (oEvent) {
                debugger
                this._oDialogProdAvailab.close();
            },
            onReset: function (oEvent) {
                debugger
                this.bDescending = false;

                this.fnApplyFiltersAndOrdering();
                var model = this.getModel("dropDownModel");
                model.setProperty("/SelectedCodice", "");
                model.setProperty("/SelectedDescrizione", "");
                model.setProperty("/selectedCategory", "");
                model.setProperty("/selectedSerie", "");
            },
            onSort: function (oEvent) {
                this.bDescending = !this.bDescending;
                this.fnApplyFiltersAndOrdering();
            },
            fnApplyFiltersAndOrdering: function (oEvent) {
                debugger
                var aFilters = [],
                    aSorters = [];

                if (this.bGrouped) {
                    aSorters.push(new Sorter("codice", this.bDescending, this._fnGroup));
                } else {
                    aSorters.push(new Sorter("codice", this.bDescending));
                }
                this.byId("idProductsTableItems").getBinding("items").filter(aFilters).sort(aSorters);
            },
            navBackHome: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("Home", {}, true);
                }
            },
            onCloseFilterOptionsDialogCancel: function (oEvent) {
                debugger
                this._oDialogFilter
                oEvent.getSource().getParent().close();
            },
            handleLinkPress: function (oEvent) {
                debugger
                // oEvent.getSource().getModel().setProperty("/visible", true)
                // oEvent.getSource().getModel().setProperty("/Source", this._sValidPath);
                var opdfViewer = new PDFViewer();
                this.getView().addDependent(opdfViewer);
                var sServiceURL = oEvent.getSource().getModel().getData().Source;
                var sSource = sServiceURL + "GetPdfSet(Serial='C0003',Filename='')/$value";
                // var sSource = "https://drive.google.com/file/d/1Fwbo8knPzPBHIZjms291AJQYKIbgjovR/view?usp=sharing";
                opdfViewer.setTitle("File preview")
                opdfViewer.setSource(sSource);
                opdfViewer.open();
            },
        });
    }
);
