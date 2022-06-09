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
            debugger
            this._oRouter = this.getOwnerComponent().getRouter();
            this._oRouter.getRoute("DetailProduct").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function () {
            debugger
            var key = this.byId("iconTabDatiGen").getKey();
            this.byId("idIconTabBarNoIcons").setSelectedKey("dati");
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
            // var sData = {};
            // var oModelHelp = new sap.ui.model.json.JSONModel({
            //     coloreText: {}
            // })
            // var model = this.getView().getModel("Clothing").getProperty("/ricercaAvanzata");
            // var aArray = [];
            // for (let i = 0; i < model.length; i++) {
            //     var colori = model[i].colori
            //     aArray.push(colori);
            // };

            // var model = this.getView().getModel("Clothing").getProperty("/ricercaAvanzata");
            // model.forEach(el => {
            //     if (!aArray.find(item => item.colori === el.colori)) {
            //         aArray.push(el)
            //     }
            // });
            // oModelHelp.setProperty("/coloreText", aArray.filter(a => a.colori))

            // var modelColor = this.getView().getModel().getProperty("/Colors");
            // var aArray1 = [];
            // for (let i = 0; i < modelColor.length; i++) {
            //     var colori = modelColor[i].Name
            //     aArray1.push(colori);
            // };

            // var intersection = aArray.filter(function (e) {
            //     return aArray1.indexOf(e) > -1
            // })
            // console.log(intersection)


            debugger
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
        onChangeValueItems: function () {
            debugger
            var somma = 0;
            var model = this.getView().getModel("Clothing").getProperty("/detail/taglieObj");
            var model2 = this.getView().getModel("Clothing").getProperty("/detail/taglieObj1");
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
                this.getView().getModel("Clothing").setProperty("/detail/totale", sommaFinale);
            } else {
                this.getView().getModel("Clothing").setProperty("/detail/totale", sommaQuantita);
            }
            var prezzo = this.getView().getModel("Clothing").getProperty("/detail/prezzo");
            if (sommaFinale) {
                var result = sommaFinale * prezzo;
                this.getView().getModel("Clothing").setProperty("/detail/calcolo", result.toFixed(2));

            } else {
                var result1 = sommaQuantita * prezzo
                this.getView().getModel("Clothing").setProperty("/detail/calcolo", result1.toFixed(2));

            }
            // stepInput Listino 3
            var prezzo3 = this.getView().getModel("Clothing").getProperty("/detail/prezzo3");
            if (sommaFinale) {
                var result3 = sommaFinale * prezzo3;
                this.getView().getModel("Clothing").setProperty("/detail/calcolo3", result3.toFixed(2));

            } else {
                var result4 = sommaQuantita * prezzo3
                this.getView().getModel("Clothing").setProperty("/detail/calcolo3", result4.toFixed(2));

            }





        },
        onChangeValue: function () {
            debugger
            var prezzo = this.getView().getModel("Clothing").getProperty("/sizes/calcolo");
            var sconto = this.getView().getModel("Clothing").getProperty("/detail/sconto");
            var totaleItems = this.getView().getModel("Clothing").getProperty("/detail/totale");
            var prezzoFissoModel = this.getView().getModel("Clothing").getProperty("/detail/prezzoFissoModel");
            var prezzoFisso = prezzoFissoModel * totaleItems

            var risSconto = prezzoFisso * sconto / 100;
            var risultato = prezzoFisso - risSconto
            this.getView().getModel("Clothing").setProperty("/detail/calcolo", risultato.toFixed(2));
            var prezzoSingleItem = risultato / totaleItems;
            this.getView().getModel("Clothing").setProperty("/detail/prezzo", prezzoSingleItem.toFixed(2));
        },
        onChangeValue3: function () {
            debugger
            var sconto3 = this.getView().getModel("Clothing").getProperty("/detail/sconto3");
            var totaleItems = this.getView().getModel("Clothing").getProperty("/detail/totale");
            var prezzoFissoModel3 = this.getView().getModel("Clothing").getProperty("/detail/prezzoFissoModel3");
            var prezzoFisso3 = prezzoFissoModel3 * totaleItems
            var risSconto = prezzoFisso3 * sconto3 / 100;
            var risultato = prezzoFisso3 - risSconto

            this.getView().getModel("Clothing").setProperty("/detail/calcolo3", risultato.toFixed(2));
            var prezzoSingleItem = risultato / totaleItems;
            this.getView().getModel("Clothing").setProperty("/detail/prezzo3", prezzoSingleItem.toFixed(2));

        },
        onBackProduct: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("SearchProducts", {}, true);
            }
        },
        onCloseColor: function () {
            this.byId("colors").close();
        },
    });
});