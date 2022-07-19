sap.ui.define(
    ["sap/ui/model/json/JSONModel", "sap/ui/Device"],
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     *
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     *
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device) {
        "use strict";

        return {
            createDeviceModel: function () {
                const oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },
            
            createHomeModel: function() {
                return new JSONModel({
                    tiles: [
                        {
                            header: "ricercaArtHeader",
                            subHeader: "ricercaArtSubHeader",
                            mode: "ContentMode",
                            frameType: "TwoByOne",
                            headerImage: "sap-icon://search",
                            navigationPattern: "SearchProducts",
                            customData: {
                                key: "go",
                                value: "lista"
                            }
                        }
                    ]
                })
            },

            createSearchProductsModel: function() {
                return new JSONModel({
                    filterBar: {
                        filterItems: [
                            { 
                                name: "A", 
                                visible: true,
                                oDataField: "Idprodotto",
                                label: "codice", 
                                control: {
                                    type: "Input",
                                    value: ""
                                }
                            },
                            { 
                                name: "B", 
                                visible: true,
                                oDataField: "Descrizione",
                                label: "descrizione", 
                                control: {
                                    type: "Input",
                                    value: ""
                                }
                            },
                            { 
                                name: "C", 
                                visible: true,
                                oDataField: "CategoriaDpi",
                                label: "categoria", 
                                control: {
                                    type: "Select",
                                    value: ""
                                }
                            },
                            { 
                                name: "D", 
                                visible: true,
                                oDataField: "IdserieWeb",
                                label: "serie", 
                                control: {
                                    type: "Select",
                                    value: ""
                                }
                            },
                            { 
                                name: "E", 
                                visible: true,
                                oDataField: "",
                                label: "articolo", 
                                control: {
                                    type: "Input",
                                    value: ""
                                }
                            }
                        ]
                    },
                    table: {
                        items: []
                    }
                })
            }
        };
    }
);
