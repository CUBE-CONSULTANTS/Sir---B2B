sap.ui.define([
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (Filter, FilterOperator) {
  "use strict";
  return {

    // Get (Read)
    getBusinessPartnerSet: function(oDataModel) {
      return new Promise((resolve, reject) => {
        oDataModel.read("/GetBusinessPartnerSet('custb2b.test1@sirsafety.it')", {
          urlParameters: {
            $format: "json"
          },
          success: function(res) {
            resolve(res);
          },
          error: function(res) {
            resolve(res);
          }
        });
      })
    },

    // GET Expanded Entity
    getMatchCode: function(oDataModel) {
      return new Promise((resolve, reject) => {
        oDataModel.read("/MatchCodeSet", {
          filters: [
            new Filter("Atnam", FilterOperator.EQ, "")
          ],
          urlParameters: {
            $expand: "F4Set",
            $format: "json"
          },
          success: function(res) {
            resolve(res);
          },
          error: function(res) {
            resolve(res);
          }
        });
      });
    },

    // GET Expanded Entity 
    getArticoloList: function(oDataModel, aFilters) {
      const aODataFilters = aFilters.map(el => {
        return new Filter(el.oDataField, FilterOperator.EQ, el.value);
      })

      return new Promise((resolve, reject) => {
        oDataModel.read("/T_DATISet", {
          filters: aODataFilters,
          urlParameters: {
            $top: 100,
            $skip: 0,
            $format: "json"
          },
          success: function(res) {
            resolve(res);
          },
          error: function(res) {
            resolve(res);
          }
        });
      });
    },

    // GET Expanded Entity
    getArticoloDetails: function(oDataModel, oParameters) {
      const { P_MATNR, P_LANGU } = oParameters;

      return new Promise((resolve, reject) => {
        oDataModel.read(`/GetArticoloSet(P_MATNR='${P_MATNR}',P_LANGU='${P_LANGU}')`, {
          urlParameters: {
            $expand: "T_DATISet,T_TESTISet,T_NORMESet,T_PERFORMANCESet,T_WEB_JOB_CATEGORYSet,T_SPECIFICHESet",
            $format: "json"
          },
          success: function(res) {
            resolve(res);
          },
          error: function(res) {
            resolve(res);
          }
        });
      });
    },

    getDisponibilita: function(oDataModel, oParameters) {
      const { P_ID_PROD, P_ID_TAGLIA } = oParameters;

      return new Promise((resolve, reject) => {
        oDataModel.read(`/GetDisponibilitaSet(P_ID_PROD=${P_ID_PROD},P_ID_TAGLIA=${P_ID_TAGLIA})`, {
          urlParameters: {
            $expand: "ET_ZTSD_DISPOSet",
            $format: "json"
          },
          success: function(res) {
            resolve(res);
          },
          error: function(res) {
            resolve(res);
          }
        });
      });
    }
  };
});
