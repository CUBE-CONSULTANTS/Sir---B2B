sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/core/Fragment',
], function (
    Controller,
    Fragment
) {
    "use strict";

    return Controller.extend("com.myorg.myUI5App.controller.Home", {

        goToOrder: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Order");
        },
        goToLogin: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("MainView");
        },
        goOrderDetail: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            // create popover
            if (!this._pPopover) {
                this._pPopover = Fragment.load({
                    id: oView.getId(),
                    name: "com.myorg.myUI5App.view.fragment.Functionality.OrderSection",
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
        goToItemsDetail: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            // create popover
            if (!this._ItemsPopover) {
                this._ItemsPopover = Fragment.load({
                    id: oView.getId(),
                    name: "com.myorg.myUI5App.view.fragment.Functionality.ItemsDetail",
                    controller: this
                }).then(function (oPopover) {
                    oView.addDependent(oPopover);
                    return oPopover;
                });
            }
            this._ItemsPopover.then(function (oPopover) {
                oPopover.openBy(oButton);
            });
        },
        goToHistorical: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            // create popover
            if (!this._historicalPopover) {
                this._historicalPopover = Fragment.load({
                    id: oView.getId(),
                    name: "com.myorg.myUI5App.view.fragment.Functionality.Historical",
                    controller: this
                }).then(function (oPopover) {
                    oView.addDependent(oPopover);
                    return oPopover;
                });
            }
            this._historicalPopover.then(function (oPopover) {
                oPopover.openBy(oButton);
            });
        },
        goToDocument: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            // create popover
            if (!this._documentPopover) {
                this._documentPopover = Fragment.load({
                    id: oView.getId(),
                    name: "com.myorg.myUI5App.view.fragment.Functionality.Document",
                    controller: this
                }).then(function (oPopover) {
                    oView.addDependent(oPopover);
                    return oPopover;
                });
            }
            this._documentPopover.then(function (oPopover) {
                oPopover.openBy(oButton);
            });
        }

    });
});