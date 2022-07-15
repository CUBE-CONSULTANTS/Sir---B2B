sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/ui/core/Fragment',
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
], function (
    Controller,
    JSONModel,
    Fragment,
    UIComponent,
    History
) {
    "use strict";

    return Controller.extend("com.myorg.myUI5App.controller.DetailProduct", {
        /**
         * @override
         */
        onInit: function () {
            var oDataDropDown = {
                "keyTabBar": "dati",
                "SelectedColor": "black",
                "SelectedName": "",
                "Colors": [
                    {
                        "Name": "ARANCIO HV",
                        "id": "darkorange"
                    },
                    {
                        "Name": "BIANCO",
                        "id": "white"
                    },
                    {
                        "Name": "AZZURRO",
                        "id": "blue"
                    },
                    {
                        "Name": "VERDE",
                        "id": "green"
                    },
                    {
                        "Name": "GRIGIO MELANGE",
                        "id": "grey"
                    },
                    {
                        "Name": "NAVY",
                        "id": "black"
                    },
                    {
                        "Name": "GIALLO HV",
                        "id": "yellow"
                    }
                ]
            };
            var oModelDropDown = new JSONModel(oDataDropDown);
            this.getView().setModel(oModelDropDown, 'dropDownModel');

            this._oRouter = this.getOwnerComponent().getRouter();
            this._oRouter.getRoute("DetailProduct").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oContext) {
            debugger
            var key = this.getView().getModel("dropDownModel").getProperty("/keyTabBar")
            this.byId("idIconTabBarNoIcons").setSelectedKey(key);
        },

        onOpenColor: function (oEvent) {
            this.getView().setModel(this.getView().getModel("dropDownModel"));
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
            var model = this.getView().getModel();
            var modelDrop = this.getView().getModel("dropDownModel");
            var oSelectedItem = oEvent.getSource();
            var oContext = oSelectedItem.getBindingContext();
            var sPath = oContext.getPath();
            var sId = model.getProperty(sPath).id;
            model.setProperty("/SelectedColor", sId);
            var sName = model.getProperty(sPath).Name;
            model.setProperty("/SelectedName", sName);
            this.byId("colors").close();
            var testoColore = this.getView().byId("coloreFinale").getText();
            var totale = this.getView().byId("totalItems2").getText();
            if (testoColore !== "" && totale > 0) {
                modelDrop.setProperty("/reviewButtonEnabled", true);
                modelDrop.setProperty("/SelectedQuantitaStorico", false);
            } else {
                modelDrop.setProperty("/reviewButtonEnabled", false);
            }
            sap.ui.getCore().byId("colors").destroy();
        },
        onChangeValueItems: function () {
            var somma = 0;
            var modelClothing = this.getView().getModel("Clothing");
            var model = modelClothing.getProperty("/detail/taglieObj");
            var model2 = modelClothing.getProperty("/detail/taglieObj1");
            for (let i = 0; i < model.length; i++) {
                var quantita = model[i].quantita
                var sommaQuantita = somma += quantita
            }
            if (model2) {
                var somma1 = 0
                for (let i = 0; i < model2.length; i++) {
                    var quantita2 = model2[i].quantita;
                    var sommaQuantita2 = somma1 += quantita2
                }
                var sommaFinale = sommaQuantita + sommaQuantita2
                modelClothing.setProperty("/detail/totale", sommaFinale);
            } else {
                modelClothing.setProperty("/detail/totale", sommaQuantita);
            }
            var prezzo = modelClothing.getProperty("/detail/prezzo");
            if (sommaFinale) {
                var result = sommaFinale * prezzo;
                modelClothing.setProperty("/detail/calcolo", result.toFixed(2));
            } else {
                var result1 = sommaQuantita * prezzo
                modelClothing.setProperty("/detail/calcolo", result1.toFixed(2));
            }
            // stepInput Listino 3
            var prezzo3 = modelClothing.getProperty("/detail/prezzo3");
            if (sommaFinale) {
                var result3 = sommaFinale * prezzo3;
                modelClothing.setProperty("/detail/calcolo3", result3.toFixed(2));
            } else {
                var result4 = sommaQuantita * prezzo3
                modelClothing.setProperty("/detail/calcolo3", result4.toFixed(2));
            }
            var totQuantita = modelClothing.getProperty("/detail/totale");
            var input = this.byId("stepInput3")
            var input3 = this.byId("stepInput5")
            var prezzoScontato = modelClothing.getProperty("/detail/prezzoFissoModel")
            var prezzoScontato3 = modelClothing.getProperty("/detail/prezzoFissoModel3");
            Number(totQuantita);
            if (totQuantita <= 0) {
                modelClothing.setProperty("/detail/sconto", 0);
                input.setValue(prezzoScontato);
                modelClothing.setProperty("/detail/sconto3", 0)
                input3.setValue(prezzoScontato3)
            }
        },
        onChangeValue: function () {
            var model = this.getView().getModel("Clothing");
            var tot = model.getProperty("/detail/calcolo");
            Number(tot);
            if (tot <= 0) {
                new sap.m.MessageToast.show("Aumentare la quantità dei prodotti")
                this.byId("stepInput4").setValue(0);
                this.byId("stpInput3").setValue("Clothing>/detail/prezzo")
            }
            var sconto = model.getProperty("/detail/sconto");
            var totaleItems = model.getProperty("/detail/totale");
            var prezzoFissoModel = model.getProperty("/detail/prezzoFissoModel");
            var prezzoFisso = prezzoFissoModel * totaleItems
            var risSconto = prezzoFisso * sconto / 100;
            var risultato = prezzoFisso - risSconto
            model.setProperty("/detail/calcolo", risultato.toFixed(2));
            var prezzoSingleItem = risultato / totaleItems;
            model.setProperty("/detail/prezzo", prezzoSingleItem.toFixed(2));
        },
        onChangeValue3: function () {
            var model = this.getView().getModel("Clothing");
            var tot = model.getProperty("/detail/calcolo3");
            Number(tot);
            if (tot <= 0) {
                new sap.m.MessageToast.show("Aumentare la quantità dei prodotti")
                this.byId("list3Input").setValue(0);
                this.byId("stpInput5").setValue("Clothing>/detail/prezzo3")
            } else {
                var sconto3 = model.getProperty("/detail/sconto3");
                var totaleItems = model.getProperty("/detail/totale");
                var prezzoFissoModel3 = model.getProperty("/detail/prezzoFissoModel3");
                var prezzoFisso3 = prezzoFissoModel3 * totaleItems
                var risSconto = prezzoFisso3 * sconto3 / 100;
                var risultato = prezzoFisso3 - risSconto
                model.setProperty("/detail/calcolo3", risultato.toFixed(2));
                var prezzoSingleItem = risultato / totaleItems;
                model.setProperty("/detail/prezzo3", prezzoSingleItem.toFixed(2));
            }
        },
        onBackProductDetail: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("SearchProducts", {}, true);
        },
        onCloseColor: function () {
            this.byId("colors").close();
        },
    });
});