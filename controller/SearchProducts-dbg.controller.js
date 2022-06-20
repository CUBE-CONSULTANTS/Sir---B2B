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
                var oDataDropDown = {
                    "RicercaAvanzata": false,
                    "SelectedItems": "",
                    "SelectedCodice": "",
                    "SelectedDescrizione": "",
                    "columnVisible": false,
                    "selectedCheck": false,
                    "SelectedCategoria": "",
                    "visibleArticolo": false,
                    "CategoriesInfo": [{
                        "Name": "",
                        "id": ""
                    },
                    {
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
                    }],
                    "selectedSerie": "",
                    "SerieInfo": [{
                        "Name": "",
                        "id": ""
                    },
                    {
                        "Name": "ACCESSORI VARI",
                        "id": "AV"
                    },
                    {
                        "Name": "ANTIRUMORE CUFFIE",
                        "id": "AC"
                    },
                    {
                        "Name": "BANDE",
                        "id": "BN"
                    }]
                };

                var oModelDropDown = new JSONModel(oDataDropDown);
                this.getView().setModel(oModelDropDown, 'dropDownModel');

                this._oRouter = this.getOwnerComponent().getRouter();
                this._oRouter.getRoute("SearchProducts").attachPatternMatched(this._onObjectMatched, this);

            },
            _onObjectMatched: function () {
                debugger
                var model = this.getView().getModel("dropDownModel");
                var bColumn = model.getProperty("/columnVisible");
                if (bColumn) {
                    model.setProperty("/columnVisible", false);
                };
                model.setProperty("/SelectedDescrizione", "");
                model.setProperty("/SelectedCategoria", "");
                model.setProperty("/selectedSerie", "");
                model.setProperty("/selectedCodice", "");
                model.setProperty("/selectedCheck", false);
                model.setProperty("/SelectedItems", "")
                model.setProperty("/visibleArticolo", false);

            },

            onFilterTable: function () {
                this.getView().byId("idProductsTableItems").removeSelections();
                var aFilter = [];
                var model = this.getView().getModel("dropDownModel");

                var sCodice = model.getProperty("/SelectedCodice");
                var sDescrizione = model.getProperty("/SelectedDescrizione");
                var sCategory = model.getProperty("/SelectedCategoria");
                var sSerie = model.getProperty("/selectedSerie");
                var bColumn = model.getProperty("/columnVisible");
                var sArticolo = model.getProperty("/SelectedItems");

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
                    aFilter.push(new Filter("categoria", FilterOperator.Contains, sCategory));
                }
                if (sSerie) {
                    aFilter.push(new Filter("serie", FilterOperator.Contains, sSerie));
                }
                if (sArticolo) {
                    const filterArt = new Filter({
                        filters: [
                            new Filter("codice", FilterOperator.Contains, sArticolo),
                            new Filter("description", FilterOperator.Contains, sArticolo),
                            new Filter("codicePrecedente", FilterOperator.Contains, sArticolo),
                        ],
                        and: false,
                    });
                    aFilter.push(filterArt);
                }

                var oTable = this.getView().byId("idProductsTableItems");
                var oBinding = oTable.getBinding("items");
                oBinding.filter(aFilter);
            },
            onSelectCheckBox: function (oEvent) {
                var selected = oEvent.getSource().getSelected();
                var model = this.getView().getModel("dropDownModel");
                if (selected === true) {
                    model.setProperty("/visibleArticolo", true);
                } else {
                    model.setProperty("/visibleArticolo", false);
                }
            },

            onOpenDetailProduct: function (oEvent, oContext) {
                debugger
                var model = this.getModel("Clothing");
                var oContext = oEvent.getSource().getParent().getParent().getBindingContext("Clothing").getObject();
                var sdesc = oContext.description;
                var textSerie = oContext.serieText
                var categoriaText = oContext.categoriaText
                var taglie = oContext.taglie
                var colori = oContext.colori
                var codice = oContext.codice
                var prezzoFisso = oContext.prezzoFisso
                var taglieObj = oContext.taglieText
                var taglieObj1 = oContext.taglieText1
                var prezzo = oContext.prezzo
                var calcolo = oContext.calcolo
                var calcolo3 = oContext.calcolo3
                var sconto = oContext.sconto
                var totale = oContext.totale
                var prezzoFisso3 = oContext.prezzoFisso3
                var prezzo3 = oContext.prezzo3
                model.setProperty("/detail/textDescrizione", sdesc);
                model.setProperty("/detail/textSerie", textSerie);
                model.setProperty("/detail/categoriaText", categoriaText);
                model.setProperty("/detail/titleProd", "Scheda Articolo" + " " + sdesc);
                model.setProperty("/detail/titleCodice", "Calcola il prezzo per il prodotto" + " " + codice);
                model.setProperty("/detail/titleDesc", "Dati Aggiuntivi Articolo" + " " + codice);
                model.setProperty("/detail/textTaglie", taglie);
                model.setProperty("/detail/textColore", colori);
                model.setProperty("/detail/prezzoListino1", prezzoFisso + "€");
                model.setProperty("/detail/prezzoListino3", prezzoFisso3 + "€");
                model.setProperty("/detail/taglieObj", taglieObj);
                model.setProperty("/detail/taglieObj1", taglieObj1);
                model.setProperty("/detail/prezzo", prezzo);
                model.setProperty("/detail/calcolo", calcolo);
                model.setProperty("/detail/calcolo3", calcolo3);
                model.setProperty("/detail/sconto", sconto);
                model.setProperty("/detail/prezzoFissoModel", prezzoFisso);
                model.setProperty("/detail/prezzoFissoModel3", prezzoFisso3)
                model.setProperty("/detail/totale", totale);
                model.setProperty("/detail/prezzo3", prezzo3)

                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("DetailProduct", {}, true);
                this._oRouter = this.getOwnerComponent().getRouter();

                this._oRouter.getRoute("DetailProduct").attachPatternMatched(this._onObjectMatched, this);
            },

            onBackProduct: function (oEvent) {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("Home", {}, true);
                }
            },

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
            onOpenDialogProductAvailability: function (oEvent) {
                var oContext = oEvent.getSource().getParent().getParent().getBindingContext("Clothing").getObject();
                var sdesc = oContext.description;
                this.getModel("dropDownModel").setProperty("/textDisponibilita", "Disponibilità prodotto " + sdesc)
                this._getDialogProductAvailable();
            },
            onCloseProd: function () {
                this._oDialogProdAvailab.close();
            },
            onReset: function () {
                this.bDescending = false;
                var itemsSelected = this.byId("idProductsTableItems").getSelectedItems()
                for (let i = 0; i < itemsSelected.length; i++) {
                    itemsSelected[i].setSelected(false)
                }

                this.fnApplyFiltersAndOrdering();
                var model = this.getModel("dropDownModel");
                model.setProperty("/SelectedCodice", "");
                model.setProperty("/SelectedDescrizione", "");
                model.setProperty("/SelectedCategoria", "");
                model.setProperty("/selectedSerie", "");
                model.setProperty("/SelectedItems", "");

            },
            onSort: function () {
                this.bDescending = !this.bDescending;
                this.fnApplyFiltersAndOrdering();
            },
            fnApplyFiltersAndOrdering: function () {
                var aFilters = [],
                    aSorters = [];
                if (this.bGrouped) {
                    aSorters.push(new Sorter("codice", this.bDescending, this._fnGroup));
                } else {
                    aSorters.push(new Sorter("codice", this.bDescending));
                }
                this.byId("idProductsTableItems").getBinding("items").filter(aFilters).sort(aSorters);
            },
        });
    }
);
