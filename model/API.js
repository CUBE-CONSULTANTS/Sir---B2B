sap.ui.define(["sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t){"use strict";return{getBusinessPartnerSet:function(e){return new Promise((t,r)=>{e.read("/GetBusinessPartnerSet('custb2b.test1@sirsafety.it')",{urlParameters:{$format:"json"},success:function(e){t(e)},error:function(e){t(e)}})})},getMatchCode:function(r){return new Promise((n,s)=>{r.read("/MatchCodeSet",{filters:[new e("Atnam",t.EQ,"")],urlParameters:{$expand:"F4Set",$format:"json"},success:function(e){n(e)},error:function(e){n(e)}})})},getArticoloList:function(r,n){const s=n.map(r=>new e(r.oDataField,t.EQ,r.value));return new Promise((e,t)=>{r.read("/T_DATISet",{filters:s,urlParameters:{$top:100,$skip:0,$format:"json"},success:function(t){e(t)},error:function(t){e(t)}})})},getArticoloDetails:function(e,t){const{P_MATNR:r,P_LANGU:n}=t;return new Promise((t,s)=>{e.read(`/GetArticoloSet(P_MATNR='${r}',P_LANGU='${n}')`,{urlParameters:{$expand:"T_DATISet,T_TESTISet,T_NORMESet,T_PERFORMANCESet,T_WEB_JOB_CATEGORYSet,T_SPECIFICHESet",$format:"json"},success:function(e){t(e)},error:function(e){t(e)}})})},getDisponibilita:function(e,t){const{P_ID_PROD:r,P_ID_TAGLIA:n}=t;return new Promise((t,s)=>{e.read(`/GetDisponibilitaSet(P_ID_PROD=${r},P_ID_TAGLIA=${n})`,{urlParameters:{$expand:"ET_ZTSD_DISPOSet",$format:"json"},success:function(e){t(e)},error:function(e){t(e)}})})}}});