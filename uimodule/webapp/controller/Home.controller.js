sap.ui.define(
    ["./BaseController"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} BaseController
     */
    function (BaseController) {
        "use strict";

        return BaseController.extend("com.myorg.myUI5App.controller.Home", {
            onInit: function () {},

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