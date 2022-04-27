sap.ui.define(
    ["./BaseController",
        "sap/m/MessageToast"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.MainView", {
            onInit: function () { },

            onSuccessPress: function () {
                var inputUsername = this.getView().byId("username").getValue();
                var inputPassword = this.getView().byId("password").getValue();
                var a = [
                    { username: 'g.desossi', password: 'giuseppe' },
                    { username: 's.demutiis', password: 'simone' },
                    { username: 's.laspata', password: 'salvatore' }

                ]
                if (a.filter(e => e.username === inputUsername && e.password === inputPassword).length > 0) {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("Home")
                } else {
                    var msg = "username o password sbagliati!";
                    MessageToast.show(msg);
                }

            }
        });
    }
);
