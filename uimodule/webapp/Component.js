sap.ui.define(
    [
        "sap/ui/core/UIComponent", 
        "com/myorg/myUI5App/model/models",
        "./controller/ErrorHandler"
    ],
    /**
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     * @param {typeof sap.ui.Device} Device
     */
    function (UIComponent, models, ErrorHandler) {
        "use strict";

        return UIComponent.extend("com.myorg.myUI5App.Component", {
            metadata: {
                manifest: "json",
            },

            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                //enable error handling
                this._oErrorHandler = new ErrorHandler(this);

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                this.setModel(models.createHomeModel(), "home");
                this.setModel(models.createSearchProductsModel(), "searchProducts");
            },

            destroy : function () {
                this._oErrorHandler.destroy();
                UIComponent.prototype.destroy.apply(this, arguments);
            }
        });
    }
);
