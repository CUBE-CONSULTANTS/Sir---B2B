sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/PDFViewer",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"

], function (
    Controller,
    JSONModel,
    Fragment,
    PDFViewer,
    Filter,
    FilterOperator,
    MessageBox
) {
    "use strict";

    return Controller.extend("com.myorg.myUI5App.controller.Order", {

        /**
         * @override
         */
        onInit: function () {
            var oDataAddress = {
                "SelectAdd": "",

                "Address": [
                    {
                        "Name": "",
                        "id": ""
                    },
                    {
                        "Name": "Non specificato",
                        "id": "NS"
                    },
                    {
                        "Name": "ARANGUREN,BIZKAIA - NICOLAS MARIA URGOITI S/N - LUCART SPA - ES",
                        "id": "AB"
                    },
                    {
                        "Name": "PZ - AVIGLIANO - LOC. SERRA VENTARULI - LUCART SPA C/A SIG. ROMANIELLO - IT",
                        "id": "PZ"
                    },
                    {
                        "Name": "LU - PORCARI - VIA CIARPI, 77 - LUCART SPA - C/A ARIANNA BAROZZI - IT",
                        "id": "LU"
                    },
                    {
                        "Name": "VE - TORRE DI MOSTO - VIA G. GALILEI, 4 Z.I. - LUCART SPA C/A SIG. MARCO BRAIT - IT",
                        "id": "VB"
                    }
                ]
            };


            var oModel = new JSONModel(oDataAddress);
            this.getView().setModel(oModel);

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


                // "SelectedQuantitaPersonalizz": "",
                // "VisibleQuantitaPersonalizz": false,
                "SelectNat": "ITA",
                "Nationalities": [
                    {
                        "Name": "German",
                        "id": "GER"
                    },
                    {
                        "Name": "Italy",
                        "id": "ITA"
                    },
                    {
                        "Name": "Japanese",
                        "id": "JP"
                    },
                    {
                        "Name": "Mexican",
                        "id": "MEX"
                    },
                    {
                        "Name": "Turkish",
                        "id": "TUR"
                    }
                ],

                "SelectPro": "PZ",
                "provinces": [
                    {
                        "Name": "Lucca",
                        "id": "LU"
                    },
                    {
                        "Name": "Lecco",
                        "id": "LC"
                    },
                    {
                        "Name": "Macerata",
                        "id": "MC"
                    },
                    {
                        "Name": "Potenza",
                        "id": "PZ"
                    },
                    {
                        "Name": "Siracusa",
                        "id": "SR"
                    },
                ],
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
                ]
            };

            var oModelDropDown = new JSONModel(oDataDropDown);
            this.getView().setModel(oModelDropDown, 'dropDownModel');
            debugger
            // this._sValidPath = sap.ui.require.toUrl("https://drive.google.com/file/d/1LT3n67YbKvTDkwZVj8TReT01LECPvMgn/view?usp=sharing");
            // this._sInvalidPath = sap.ui.require.toUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/sample/PDFViewerEmbedded/sample_nonexisting.pdf");
            var oPdfModel = new JSONModel({
                visible: false,
                Source: "https://drive.google.com/file/d/1Fwbo8knPzPBHIZjms291AJQYKIbgjovR/view?usp=sharing",
                Title: "My Custom Title",
                Height: "600px"
            });
            this.getView().setModel(oPdfModel, "pdfModel");


        },
        // onOpenColor: function (oEvent) {
        //     this.getView().setModel(this.getView().getModel("dropDownModel"))
        //     debugger;
        //     var oButton = oEvent.getSource(),
        //         oView = this.getView();
        //     // create popover
        //     if (!this._pPopover) {
        //         this._pPopover = Fragment.load({
        //             id: oView.getId(),
        //             name: "com.myorg.myUI5App.view.fragment.SelectColor",
        //             controller: this
        //         }).then(function (oPopover) {
        //             oView.addDependent(oPopover);
        //             return oPopover;
        //         });
        //     }
        //     this._pPopover.then(function (oPopover) {
        //         oPopover.openBy(oButton);
        //     });
        // },
        constructor: function (oView) {
            this._oView = oView
        },
        onNavHome: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Home");
        },
        _getDialog: function () {
            if (!this._oDialog) {
                Fragment.load({
                    name: "com.myorg.myUI5App.view.fragment.AddItems",
                    controller: this,
                    id: this.getView().getId()
                }).then(function (fr) {
                    fr.attachAfterOpen(this.onDialogAfterOpen, this);
                    fr.setModel(this.getOwnerComponent().getModel("Clothing"), "Clothing")
                    fr.setModel(this.getView().getModel("dropDownModel"))
                    this._oDialog = fr
                    fr.open();
                }.bind(this));
            } else {
                this._oDialog.open();
            }

        },

        onOpenDialogAddItems: function () {
            this.getView().getModel("dropDownModel").setProperty("/RicercaAvanzata", false);
            this._getDialog();

            this.handleButtonsVisibility();

        },
        onCloseFilterOptionsDialogCancel: function (oEvent) {
            debugger
            this._oDialogFilter
            oEvent.getSource().getParent().close();
        },
        onSearchDetailItems: function () {
            this.getView().byId("idProductsTable").setVisible(true)
        },
        _getDialogFilter: function () {
            if (!this._oDialogFilter) {
                debugger
                Fragment.load({
                    name: "com.myorg.myUI5App.view.fragment.ItemsFilter",
                    controller: this
                }).then(function (fr) {
                    fr.addEventDelegate({
                        onAfterRendering: function () {
                            debugger
                            var id = sap.ui.getCore().byId("idProductsTable");
                            var articolo = this.getView().getModel("dropDownModel").getProperty("/SelectedItems");
                            id.getBinding("items").filter([new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.EQ, articolo)])

                        }
                    }, this)
                    fr.setModel(this.getOwnerComponent().getModel("Clothing"), "Clothing")
                    fr.setModel(this.getView().getModel("dropDownModel"))
                    this._oDialogFilter = fr
                    fr.open();
                }.bind(this));
            } else {
                this._oDialogFilter.open();
            }
        },

        onOpenDialogFilterItems: function () {
            debugger
            this._getDialogFilter()
            this._oDialog.close();

        },

        _getDialogAddAddress: function () {
            debugger;
            if (!this._oDialogAddAddress) {
                Fragment.load({
                    name: "com.myorg.myUI5App.view.fragment.AddAddress",
                    controller: this,
                    id: this.getView().getId()
                }).then(function (fr) {
                    fr.setModel(this.getView().getModel("dropDownModel"))
                    this._oDialogAddAddress = fr
                    fr.open();
                }.bind(this));
            } else {
                this._oDialogAddAddress.open();
            }
        },
        openDialogAddAddress: function () {
            debugger
            this._getDialogAddAddress();
        },
        _getDialogViewAddress: function () {
            debugger;
            if (!this._oDialogViewAddress) {
                Fragment.load({
                    name: "com.myorg.myUI5App.view.fragment.ViewAddress",
                    controller: this
                }).then(function (fr) {
                    fr.setModel(this.getView().getModel("dropDownModel"))
                    this._oDialogViewAddress = fr
                    fr.open();
                }.bind(this));
            } else {
                this._oDialogViewAddress.open();

            }
        },
        openDialogViewAddress: function () {
            this._getDialogViewAddress()
        },
        onCloseViewAddress: function (oEvent) {

            this._oDialogViewAddress
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
        onOpenDialogProductAvailability: function () {
            this._getDialogProductAvailable();
        },
        onCloseProd: function (oEvent) {
            debugger
            this._oDialogProdAvailab.close();
            // oEvent.getSource().getParent().close();
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
            // this.getView().getModel("dropDownModel").setProperty("/SelectedQuantitaPersonalizz", totale);
            // this.getView().getModel("dropDownModel").setProperty("/VisibleQuantitaPersonalizz", true);

        },
        AdvancedSearch: function () {
            this._oDialogFilter.close();
            this.getView().getModel("dropDownModel").setProperty("/RicercaAvanzata", true);
            this._oDialog.open();
        },
        onAddItem: function (oEvent) {
            debugger
            var oModelTable = this.getView().getModel("Clothing").getProperty("/catalog/clothing/categories");
            var oModelTreeTable = this.getView().getModel("Clothing").getProperty("/catalog/clothing/itemsTreeTable");
            var oModelSizes = this.getView().getModel("Clothing").getProperty("/sizes");
            var codiceId = this.getView().getModel("dropDownModel").getProperty("/SelectedItems");
            var lastOrder = this.getView().getModel("Clothing");
            var descrizione = oModelTable.filter(items => items.ID == codiceId)[0]
            var itemsSelected = sap.ui.getCore().byId("idProductsTable").getSelectedItems();


            if (descrizione) {
                descrizione = descrizione.description
            }

            if (itemsSelected.length == 0) {
                if (oModelSizes.sizes1.filter(items => items.quantita > 0).length == 0 && oModelSizes.sizes2.filter(items => items.quantita > 0).length == 0) {
                    return
                }
                var newItems = {
                    ID: 'MC' + parseInt(10000 * Math.random()),
                    description: "PANTALONE SYMBOL BANDE,NAVY",
                    categories: []
                };
                for (let i = 0; i < oModelSizes.sizes1.length; i++) {
                    var taglia = oModelSizes.sizes1[i]
                    if (taglia.quantita > 0) {
                        newItems.categories.push({ "ID": newItems.ID + taglia.key, "description": newItems.description + taglia.key, "quantity": taglia.quantita, "size": taglia.key, "days": "Consegna gg 0", "date": "2022-04-09", "list": "List.", "listId": oModelSizes.prezzo, "sale": "Sconto", "saleId": "71,48%", "priceSale": "Prezzo Scontato", "priceSaleId": "7,30", "total": "Totale", "totalId": oModelSizes.calcolo })
                    }
                }
                for (let i = 0; i < oModelSizes.sizes2.length; i++) {
                    var taglia = oModelSizes.sizes2[i]
                    if (taglia.quantita > 0) {
                        newItems.categories.push({ "ID": newItems.ID + taglia.key, "description": newItems.description + taglia.key, "quantity": taglia.quantita, "size": taglia.key, "days": "Consegna gg 0", "date": "2022-04-09", "list": "List.", "listId": oModelSizes.prezzo, "sale": "Sconto", "saleId": "71,48%", "priceSale": "Prezzo Scontato", "priceSaleId": "7,30", "total": "Totale", "totalId": oModelSizes.calcolo })
                    }
                }
                oModelTreeTable.push(newItems);
            } else {
                for (let i = 0; i < itemsSelected.length; i++) {
                    var sPath = itemsSelected[i].getBindingContextPath()
                    var CurrentItem = lastOrder.getProperty(sPath);

                    oModelTreeTable.push(CurrentItem);
                }

            }

            var modelClothing = this.getView().getModel("Clothing");
            modelClothing.updateBindings(true)
            this._oDialogFilter.close();
        },




        onOpenDialogEditItems: function (oEvent) {
            debugger

            var table = this.getView().byId("TreeTableBasic");
            var oSelectedItem = table.getContextByIndex(table.getSelectedIndex()).getObject()
            var oSelectedItemCategories = table.getContextByIndex(table.getSelectedIndex()).getObject().categories
            var model = this.getView().getModel("Clothing").getProperty("/sizes/sizes1");
            var model2 = this.getView().getModel("Clothing").getProperty("/sizes/sizes2");
            if (oSelectedItemCategories) {
                for (let i = 0; i < model.length; i++) {
                    var filterSize = oSelectedItemCategories.filter(size =>
                        size.size == model[i].key
                    )[0]
                    if (filterSize) {
                        model[i].quantita = filterSize.quantity
                    }
                }

            } else {
                for (let i = 0; i < model.length; i++) {
                    var filterSize = oSelectedItem
                    if (filterSize.size == model[i].key) {
                        model[i].quantita = filterSize.quantity
                    }
                }

            }
            this.getView().getModel("dropDownModel").setProperty("/sizes", model);
            this.onChangeValueItems();
            this._getDialogFilter();

        },
        onDeleteRow: function () {
            debugger
            //     // var table = this.getView().byId("TreeTableBasic");
            //     // var sPath = table.getContextByIndex(table.getSelectedIndex()).getPath();
            //     // var modelClothing = this.getView().getModel("Clothing").getProperty("/catalog/clothing/categories");
            //     // var number = sPath.charAt(sPath.lastIndexOf('/') + 1);
            //     // modelClothing.splice(number, 1)
            //     // table.getModel("Clothing").updateBindings(true)


            var table = this.getView().byId("TreeTableBasic");
            var sPath = table.getContextByIndex(table.getSelectedIndex()).getPath();
            var sResult = sPath.slice(0, -1)

            var modelClothing = this.getView().getModel("Clothing").getProperty(sResult);
            var number = sPath.charAt(sPath.lastIndexOf('/') + 1);
            modelClothing.splice(number, 1)
            if (modelClothing.length <= 0) {
                var model = this.getView().getModel("Clothing").getProperty("/catalog/clothing/categories");
                for (let i = 0; i < model.length; i++) {
                    var category = model[i].categories
                    if (category.length == 0) {
                        model.splice(number, 1);
                        // table.getModel("Clothing").updateBindings(true)
                    }

                }

            }
            table.getModel("Clothing").updateBindings(true)
            sPath.slice(0, -1)
        },
        onPressRow: function () {
            debugger
            var index = this.getView().byId("TreeTableBasic").getProperty("selectedIndex")

            if (index >= 0) {
                this.getView().getModel("dropDownModel").setProperty("/Enabled", true);
            } else {
                this.getView().getModel("dropDownModel").setProperty("/Enabled", false);
            }
        },
        _getDialogPers: function () {
            if (!this._oDialogPers) {
                Fragment.load({
                    name: "com.myorg.myUI5App.view.fragment.AddPers",
                    controller: this,
                    id: this.getView().getId()
                }).then(function (fr) {
                    fr.setModel(this.getOwnerComponent().getModel("Clothing"), "Clothing")
                    fr.setModel(this.getView().getModel("dropDownModel"))
                    this._oDialogPers = fr
                    fr.open();
                }.bind(this));
            } else {
                this._oDialogPers.open();
            }

        },
        onOpenAddPers: function () {
            this._getDialogPers();
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
        openFileDocument: function () {
            this._getDialogFile();
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
        _getDialogSearchFile: function () {
            debugger
            if (!this._oDialogsearchFile) {
                Fragment.load({
                    name: "com.myorg.myUI5App.view.fragment.SearchFileDocument",
                    controller: this
                }).then(function (fr) {
                    fr.setModel(this.getOwnerComponent().getModel("Clothing"), "Clothing")
                    fr.setModel(this.getView().getModel("dropDownModel"), "dropDownModel")
                    fr.setModel(this.getView().getModel("pdfModel"))
                    this._oDialogsearchFile = fr
                    fr.open();
                }.bind(this));
            } else {
                this._oDialogsearchFile.open();
            }
        },
        onOpenDialogSearchFile: function () {
            this._getDialogSearchFile()
        },
        _getDialogCopyItems: function () {
            debugger
            if (!this._oDialogCopyItems) {
                Fragment.load({
                    name: "com.myorg.myUI5App.view.fragment.CopyItems",
                    controller: this
                }).then(function (fr) {
                    fr.setModel(this.getOwnerComponent().getModel("Clothing"), "Clothing")
                    fr.setModel(this.getView().getModel("dropDownModel"), "dropDownModel")
                    this._oDialogCopyItems = fr
                    fr.open();
                }.bind(this));
            } else {
                this._oDialogCopyItems.open();
            }
        },
        onOpenDialogCopyItems: function () {
            debugger;
            var table = this.getView().byId("TreeTableBasic");
            var oSelectedItem = table.getContextByIndex(table.getSelectedIndex()).getObject()
            var oSelectedItemCategories = table.getContextByIndex(table.getSelectedIndex()).getObject().categories
            var oSizeModel = this.getView().getModel("dropDownModel").getData().sizes;

            for (let i = 0; i < oSizeModel.length; i++) {
                var filterSize = oSelectedItemCategories.filter(size =>
                    size.size == oSizeModel[i].key
                )[0]
                if (filterSize) {
                    oSizeModel[i].quantita = filterSize.quantity
                }
            }

            this.getView().getModel("dropDownModel").setProperty("/sizes", oSizeModel);
            var somma = 0;
            var model = this.getView().getModel("dropDownModel").getProperty("/sizes");
            for (let i = 0; i < model.length; i++) {
                var quantita = model[i].quantita
                somma += quantita
            }
            this.getView().getModel("dropDownModel").setProperty("/totale", somma);
            var prezzo = this.getView().getModel("dropDownModel").getData().prezzo
            var result = somma * prezzo;
            this.getView().getModel("dropDownModel").setProperty("/calcolo", result.toFixed(2));

            this._getDialogCopyItems()
        },
        onAddNote: function () {
            debugger
            var value = this.getView().byId("textArea").getValue();
            var testo = this.getView().byId("testoCommento");
            testo.setText(value);
        },
        _getDialogItemsHistory: function () {
            debugger
            if (!this._oDialogItemsHistory) {
                Fragment.load({
                    name: "com.myorg.myUI5App.view.fragment.AddItemsHistory",
                    controller: this
                }).then(function (fr) {
                    fr.setModel(this.getOwnerComponent().getModel("Clothing"), "Clothing")
                    fr.setModel(this.getView().getModel("dropDownModel"), "dropDownModel")
                    fr.setModel(this.getView().getModel("pdfModel"))
                    this._oDialogItemsHistory = fr
                    fr.open();
                }.bind(this));
            } else {
                this._oDialogItemsHistory.open();
            }
        },
        addItemsHistory: function () {
            this._getDialogItemsHistory();
        },
        onFilterInvoices: function (oEvent) {
            debugger;
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("ID", FilterOperator.Contains, sQuery));
            }

            var oTable = sap.ui.getCore().byId("tableHistory");
            var oBinding = oTable.getBinding("items");
            oBinding.filter(aFilter);
        },




        onAddHistoryItems: function () {
            debugger
            var oModelTable = this.getView().getModel("Clothing").getProperty("/catalog/clothing/categories");
            var oModelTreeTable = this.getView().getModel("Clothing").getProperty("/catalog/clothing/itemsTreeTable");
            var oModelSizes = this.getView().getModel("Clothing").getProperty("/sizes");
            var codiceId = this.getView().getModel("dropDownModel").getProperty("/SelectedItems");
            var lastOrder = this.getView().getModel("Clothing");
            var descrizione = oModelTable.filter(items => items.ID == codiceId)[0]
            var itemsSelected = sap.ui.getCore().byId("tableHistory").getSelectedItems();

            for (let i = 0; i < itemsSelected.length; i++) {
                var sPath = itemsSelected[i].getBindingContextPath()
                var CurrentItem = lastOrder.getProperty(sPath);

                oModelTreeTable.push(CurrentItem);
            }
            var modelClothing = this.getView().getModel("Clothing");
            modelClothing.updateBindings(true);

            this._oDialogItemsHistory.close()
        },



        handleButtonsVisibility: function () {
            debugger
            // var selected = this.byId("idProductsTableItems").getSelectedItems()
            // if (!selected) {
            //     this.byId("idProductsTableItems").getSelectedItems()[0].setProperty("selected", false)
            // }

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

            this._oWizard = this.byId("CreateProductWizard");
            // this._iSelectedStepIndex = 0;
            // this._oSelectedStep = this._oWizard.getSteps()[this._iSelectedStepIndex];
            this._oWizard.discardProgress(this._oWizard.getSteps()[0]);
            this.handleButtonsVisibility();
        },
        onDialogNextButton: function () {
            debugger
            if (this._oWizard.getProgressStep().getValidated()) {
                this._oWizard.nextStep();
            }

            this.handleButtonsVisibility();
        },
        onDialogBackButton: function () {
            debugger
            this._oWizard.previousStep();
            this.handleButtonsVisibility();
        },

        onSelectItems: function () {
            debugger
            this.getView().getModel("dropDownModel").setProperty("/DisponibilitaButtonVisible", true);
            this.getView().getModel("dropDownModel").setProperty("/PersonalizzazioneButtonVisible", true);
            this.getView().getModel("dropDownModel").setProperty("/nextButtonEnabled", true);
            var table = this.getView().byId("idProductsTableItems")
            var index = table.getSelectedItems()
            var items = index[0].getBindingContext("Clothing").getObject();
            var modelItems = this.getView().getModel("dropDownModel");
            modelItems.setProperty("/SelectedTableCodice", items.codice)
            modelItems.setProperty("/SelectedTableDescription", items.description)
            modelItems.setProperty("/SelectedTableCodicePrecedente", items.codicePrecedente)


        },

        _handleMessageBoxOpen: function (sMessage, sMessageBoxType) {
            MessageBox[sMessageBoxType](sMessage, {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.YES) {
                        debugger
                        this._oWizard.discardProgress(this._oWizard.getSteps()[0]);
                        // this._handleNavigationToStep(0);
                        this._oDialog.close();
                    }
                }.bind(this)
            });
        },
        discardProgress: function () {
            debugger
            var oModel = this.getView().getModel();
            this._oWizard.discardProgress(this.byId("ProductTypeStep"));

            var clearContent = function (aContent) {
                for (var i = 0; i < aContent.length; i++) {
                    if (aContent[i].setValue) {
                        aContent[i].setValue("");
                    }

                    if (aContent[i].getContent) {
                        clearContent(aContent[i].getContent());
                    }
                }
            };
        },

        handleWizardCancel: function () {
            this._handleMessageBoxOpen("Are you sure you want to cancel your report?", "warning");
        },
        editStepOne: function () {
            this._handleNavigationToStep(0);
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
        onFilterTable: function (oEvent) {
            var aFilter = [];

            var sCodice = oEvent.getParameters("query").selectionSet[0].getValue();
            var sDescrizione = oEvent.getParameters("query").selectionSet[3].getValue()
            if (sCodice) {
                aFilter.push(new Filter("codice", FilterOperator.Contains, sCodice));
            }
            if (sDescrizione) {
                aFilter.push(new Filter("description", FilterOperator.Contains, sDescrizione));
            }

            var oTable = this.getView().byId("idProductsTableItems");
            var oBinding = oTable.getBinding("items");
            oBinding.filter(aFilter);
        },
        onSelectArticolo: function () {
            debugger
            var index = this.getView().byId("idProductsTable").getSelectedContexts().length
            if (index > 0) {
                this.getView().getModel("dropDownModel").setProperty("/reviewButtonEnabled", true);
            } else {
                this.getView().getModel("dropDownModel").setProperty("/reviewButtonEnabled", false);
            }
            var table = this.getView().byId("idProductsTable").getSelectedItem();
            var context = table.getBindingContext("Clothing").getObject();
            var modelItems = this.getView().getModel("dropDownModel");
            modelItems.setProperty("/SelectedTableCodice", context.ID)
            modelItems.setProperty("/SelectedTableDescription", context.description)
            modelItems.setProperty("/SelectedQuantitaStorico", true)
            modelItems.setProperty("/SelectedQuantita", context.quantity)
            modelItems.setProperty("/prodottoList", context.listId)
            modelItems.setProperty("/prodottoSconto", context.saleId)
            modelItems.setProperty("/prodottoPrezzo", context.priceSaleId)
            modelItems.setProperty("/prodottoTotale", context.totalId)
            modelItems.setProperty("/TestoColore", context.color)

        },

        onAddItems: function () {
            debugger
            var oModelTable = this.getView().getModel("Clothing").getProperty("/catalog/clothing/categories");
            var oModelTreeTable = this.getView().getModel("Clothing").getProperty("/catalog/clothing/itemsTreeTable");
            var oModelSizes = this.getView().getModel("Clothing").getProperty("/sizes");
            var codiceId = this.getView().getModel("dropDownModel").getProperty("/SelectedItems");
            var lastOrder = this.getView().getModel("Clothing");
            var table = this.getView().byId("idProductsTable").getSelectedItem();
            var context = table.getBindingContext("Clothing").getObject();
            var modelItems = this.getView().getModel("dropDownModel");
            var descrizione = oModelTable.filter(items => items.ID == codiceId)[0]
            var itemsSelected = this.getView().byId("idProductsTable").getSelectedItems();

            for (let i = 0; i < itemsSelected.length; i++) {
                var sPath = itemsSelected[i].getBindingContextPath()
                var CurrentItem = lastOrder.getProperty(sPath);

                oModelTreeTable.push(CurrentItem);
            }
            var modelClothing = this.getView().getModel("Clothing");
            modelClothing.updateBindings(true);

            this._oDialog.close()
        },

    });
});