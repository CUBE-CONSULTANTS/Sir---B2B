// @ts-nocheck
sap.ui.define(
    ["./BaseController", "sap/m/MessageToast", "sap/ui/model/json/JSONModel"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.m.MessageToast} MessageToast
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     */
    function (Controller, MessageToast, JSONModel) {
        "use strict";

        return Controller.extend("com.myorg.myUI5App.controller.MainView", {
            onInit: function () {
                this.setModel(
                    new JSONModel({
                        username: "custb2b.test1@sirsafety.it",
                        password: "SIRtest22",
                        isDarkMode: true,
                    }),
                    undefined
                );
            },
            onLoginPress: function () {
                const oRouter = this.getRouter();
                const oModel = this.getOwnerComponent().getModel("oData");
                const { username, password } = this.getModel(undefined).getData();
                const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;
                oModel.setHeaders({ Authorization: basicAuth });
                oModel.read("/login", {
                    success: (_, oResponse) => {
                        const { token } = this.parseResponseBody(oResponse);
                        oModel.setHeaders({ Authorization: `Bearer ${token}` });
                        MessageToast.show("Login Successful");
                        oRouter.navTo("Home");
                    },
                    error: (oError) => {
                        MessageToast.show(this.parseMessage(oError.response) || "Login Failed");
                    },
                });
                // oRouter.navTo("Home")
            },
            onSwitchTheme: function (_) {
                window.history.replaceState("", "", this._updateURLTheme(window.location.href, "$sap-ui-theme", _.getParameter("state")));
            },
            _updateURLTheme: function (url, param, darkMode) {
                const parameters = url.split("?")[1];
                if (!parameters) {
                    url = `${url}?${param}=sap_fiori_3`;
                } else {
                    url = darkMode ? url.replace("sap_fiori_3", "sap_fiori_3_dark") : url.replace("sap_fiori_3_dark", "sap_fiori_3");
                }
                return url;
            },
        });
    }
);
