sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/Fragment","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/m/MessageBox","sap/m/MessageToast"],function(e,t,o,i,r,s,n){"use strict";return e.extend("com.myorg.myUI5App.controller.Home",{onInit:function(){var e={Enabled:false,EnabledCancel:true,RicercaAvanzata:false,nextButtonVisible:true,nextButtonEnabled:false,backButtonVisible:false,reviewButtonVisible:false,finishButtonVisible:false,TestoColore:"",visibleCodice:false,PersonalizzazioneButtonVisible:false,visibleDescrizione:false,visibleCategoria:false,visibleSerie:false,DisponibilitaButtonVisible:false,reviewButtonEnabled:true,SelectedItems:"",SelectedCodice:"",SelectedDescrizione:"",SelectedSeries:"",SelectedTableCodice:"",SelectedTableDescription:"",SelectedTableCodicePrecedente:"",SelectedQuantita:"",SelectedQuantitaStorico:false,prodottoList:"",prodottoTotale:"",prodottoPrezzo:"",prodottoSconto:"",columnVisible:false,selectedCategory:"",selectedCheck:false,valueDays:0,SelectedCategoria:"AI",Categories:[{Name:"ANTINCENDIO",id:"AI"},{Name:"ANTIRUMORE",id:"AR"},{Name:"ATTR. ELETTRICHE",id:"AE"}],SelectedColor:"black",SelectedName:"",Colors:[{Name:"J5 - ARANCIO (M)",id:"darkorange"},{Name:"K1 BIANCO (M)",id:"white"},{Name:"Q2 AZZURRO (M)",id:"blue"},{Name:"S0 VERDE (M)",id:"green"},{Name:"AM _ GRIGIO MELANGE (M)",id:"grey"},{Name:"Q7 - NAVY (M)",id:"black"}]};var t=new o(e);this.getView().setModel(t,"dropDownModel")},goToOrder:function(){this.getView().getModel("Clothing").setProperty("/catalog/clothing/itemsTreeTable",[]);var e=sap.ui.core.UIComponent.getRouterFor(this);e.navTo("Order")},goToModication:function(){var e=sap.ui.core.UIComponent.getRouterFor(this);e.navTo("Order");var t=this.getView().getModel("Clothing").getProperty("/catalog/clothing/categories");this.getView().getModel("Clothing").setProperty("/catalog/clothing/itemsTreeTable",t)},goToLogin:function(){var e=sap.ui.core.UIComponent.getRouterFor(this);e.navTo("MainView")},goOrderDetail:function(e){var o=e.getSource(),i=this.getView();if(!this._pPopover){this._pPopover=t.load({id:i.getId(),name:"com.myorg.myUI5App.view.fragment.Functionality.OrderSection",controller:this}).then(function(e){i.addDependent(e);return e})}this._pPopover.then(function(e){e.openBy(o)})},goToItemsDetail:function(e){var o=e.getSource(),i=this.getView();if(!this._ItemsPopover){this._ItemsPopover=t.load({id:i.getId(),name:"com.myorg.myUI5App.view.fragment.Functionality.ItemsDetail",controller:this}).then(function(e){i.addDependent(e);return e})}this._ItemsPopover.then(function(e){e.openBy(o)})},goToHistorical:function(e){var o=e.getSource(),i=this.getView();if(!this._historicalPopover){this._historicalPopover=t.load({id:i.getId(),name:"com.myorg.myUI5App.view.fragment.Functionality.Historical",controller:this}).then(function(e){i.addDependent(e);return e})}this._historicalPopover.then(function(e){e.openBy(o)})},goToDocument:function(e){var o=e.getSource(),i=this.getView();if(!this._documentPopover){this._documentPopover=t.load({id:i.getId(),name:"com.myorg.myUI5App.view.fragment.Functionality.Document",controller:this}).then(function(e){i.addDependent(e);return e})}this._documentPopover.then(function(e){e.openBy(o)})},_getDialog:function(){debugger;if(!this._oDialog){t.load({name:"com.myorg.myUI5App.view.fragment.SearchItems",controller:this,id:this.getView().getId()}).then(function(e){e.attachAfterOpen(this.onDialogAfterOpen,this);e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"));this._oDialog=e;e.open()}.bind(this))}else{this._oDialog.open()}},handleButtonsVisibility:function(){debugger;var e=this.getView().getModel("dropDownModel");switch(this._oWizard.getProgress()){case 1:e.setProperty("/nextButtonVisible",true);e.setProperty("/backButtonVisible",false);e.setProperty("/reviewButtonVisible",false);e.setProperty("/finishButtonVisible",false);break;case 2:e.setProperty("/DisponibilitaButtonVisible",false);e.setProperty("/backButtonVisible",true);e.setProperty("/nextButtonEnabled",false);e.setProperty("/nextButtonVisible",false);e.setProperty("/reviewButtonVisible",true);e.setProperty("/reviewButtonEnabled",false);break;case 3:e.setProperty("/finishButtonVisible",true);e.setProperty("/backButtonVisible",false);e.setProperty("/PersonalizzazioneButtonVisible",false);e.setProperty("/reviewButtonVisible",false);break;default:break}},onDialogAfterOpen:function(){debugger;var e=this.getView().getModel("dropDownModel");var t=e.getProperty("/columnVisible");if(t){e.setProperty("/columnVisible",false)}var o=this.getView().byId("checkBoxFiltro").getSelected();if(o===true){e.setProperty("/visibleCodice",false);e.setProperty("/visibleDescrizione",false);e.setProperty("/visibleCategoria",false);e.setProperty("/visibleSerie",false)}e.setProperty("/selectedCheck",false);e.setProperty("/selectedCategory","");e.setProperty("/SelectedCodice","");e.setProperty("/SelectedDescrizione","");this._oWizard=this.byId("CreateProductWizard");this._oWizard.discardProgress(this._oWizard.getSteps()[0]);this.handleButtonsVisibility()},onGoToRicercaArticolo:function(){debugger;this._getDialog()},onSelectCheckBox:function(e){debugger;var t=e.getSource().getSelected();var o=this.getView().getModel("dropDownModel");if(t===true){o.setProperty("/visibleCodice",true);o.setProperty("/visibleDescrizione",true);o.setProperty("/visibleCategoria",true);o.setProperty("/visibleSerie",true)}else{o.setProperty("/visibleCodice",false);o.setProperty("/visibleDescrizione",false);o.setProperty("/visibleCategoria",false);o.setProperty("/visibleSerie",false)}},onFilterTable:function(){debugger;this.getView().byId("idProductsTableItems").removeSelections();var e=[];var t=this.getView().getModel("dropDownModel");var o=t.getProperty("/SelectedCodice");var s=t.getProperty("/SelectedDescrizione");var n=t.getProperty("/selectedCategory");var l=t.getProperty("/columnVisible");if(!l){t.setProperty("/columnVisible",true)}if(o){e.push(new i("codice",r.Contains,o))}if(s){e.push(new i("description",r.Contains,s))}if(n){e.push(new i("categoria",r.Contains,n))}var a=this.getView().byId("idProductsTableItems");var d=a.getBinding("items");d.filter(e)},onSelectItems:function(){debugger;this.getView().getModel("dropDownModel").setProperty("/DisponibilitaButtonVisible",true);this.getView().getModel("dropDownModel").setProperty("/PersonalizzazioneButtonVisible",true);this.getView().getModel("dropDownModel").setProperty("/nextButtonEnabled",true);var e=this.getView().byId("idProductsTableItems");var t=e.getSelectedItems();var o=t[0].getBindingContext("Clothing").getObject();var i=this.getView().getModel("dropDownModel");i.setProperty("/SelectedTableCodice",o.codice);i.setProperty("/SelectedTableDescription",o.description);i.setProperty("/SelectedTableCodicePrecedente",o.codicePrecedente)},_getDialogProductAvailable:function(){if(!this._oDialogProdAvailab){t.load({name:"com.myorg.myUI5App.view.fragment.ProductAvailability",controller:this}).then(function(e){e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"),"dropDown");this._oDialogProdAvailab=e;e.open()}.bind(this))}else{this._oDialogProdAvailab.open()}},onOpenDialogProductAvailability:function(){this._getDialogProductAvailable()},handleWizardCancel:function(){debugger;this._handleMessageBoxOpen("Are you sure you want to cancel your report?","warning")},_handleMessageBoxOpen:function(e,t){s[t](e,{actions:[s.Action.YES,s.Action.NO],onClose:function(e){if(e===s.Action.YES){this._oWizard.discardProgress(this._oWizard.getSteps()[0]);this.byId("wizardDialog").close();this.getView().getModel().setData(Object.assign({},oData))}}.bind(this)})},onCloseProd:function(e){debugger;this._oDialogProdAvailab.close()},_getDialogFile:function(){debugger;if(!this._oDialogFile){t.load({name:"com.myorg.myUI5App.view.fragment.FileDocument",controller:this}).then(function(e){e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"),"dropDownModel");e.setModel(this.getView().getModel("pdfModel"));this._oDialogFile=e;e.open()}.bind(this))}else{this._oDialogFile.open()}},openFileDocument:function(){this._getDialogFile()},handleLinkPress:function(e){debugger;var t=new PDFViewer;this.getView().addDependent(t);var o=e.getSource().getModel().getData().Source;var i=o+"GetPdfSet(Serial='C0003',Filename='')/$value";t.setTitle("File preview");t.setSource(i);t.open()},onDialogNextButton:function(){debugger;if(this._oWizard.getProgressStep().getValidated()){this._oWizard.nextStep()}this.handleButtonsVisibility()},onChangeValueItems:function(){debugger;var e=0;var t=this.getView().getModel("Clothing").getProperty("/sizes/sizes1");var o=this.getView().getModel("Clothing").getProperty("/sizes/sizes2");for(let o=0;o<t.length;o++){var i=t[o].quantita;var r=e+=i}var s=0;for(let e=0;e<o.length;e++){var n=o[e].quantita;var l=s+=n}var a=r+l;this.getView().getModel("Clothing").setProperty("/sizes/totale",a);var d=this.getView().getModel("Clothing").getProperty("/sizes/prezzo");var g=a*d;this.getView().getModel("Clothing").setProperty("/sizes/calcolo",g.toFixed(2));var c=this.getView().byId("coloreFinale").getText();var p=this.getView().byId("totalItems2").getText();if(c!==""&&p>0){this.getView().getModel("dropDownModel").setProperty("/reviewButtonEnabled",true);this.getView().getModel("dropDownModel").setProperty("/SelectedQuantitaStorico",false)}else{this.getView().getModel("dropDownModel").setProperty("/reviewButtonEnabled",false)}},onOpenColor:function(e){this.getView().setModel(this.getView().getModel("dropDownModel"));debugger;var o=e.getSource(),i=this.getView();if(!this._pPopover){this._pPopover=t.load({id:i.getId(),name:"com.myorg.myUI5App.view.fragment.SelectColor",controller:this}).then(function(e){i.addDependent(e);return e})}this._pPopover.then(function(e){e.openBy(o)})},onChooseColor:function(e){debugger;var t=e.getSource();var o=t.getBindingContext();var i=o.getPath();var r=this.getView().getModel().getProperty(i).id;this.getView().getModel().setProperty("/SelectedColor",r);var s=this.getView().getModel().getProperty(i).Name;this.getView().getModel().setProperty("/SelectedName",s);this.byId("colors").close();var n=this.getView().byId("coloreFinale").getText();var l=this.getView().byId("totalItems2").getText();if(n!==""&&l>0){this.getView().getModel("dropDownModel").setProperty("/reviewButtonEnabled",true);this.getView().getModel("dropDownModel").setProperty("/SelectedQuantitaStorico",false)}else{this.getView().getModel("dropDownModel").setProperty("/reviewButtonEnabled",false)}sap.ui.getCore().byId("colors").destroy()},onChangeDate:function(){debugger;var e=this.getView().byId("daysPicker").getDateValue();var t=new Date;var o=t.getDate();var i=e.getDate();var r=t.getMonth()+1;var s=t.getMonth()+1;var l=t.getFullYear();var a=t.getFullYear();if(r<10){r="0"+r}if(o<10){r="0"+o}var d=l+"-"+r+"-"+o;var g=a+"-"+s+"-"+i;var c=this.getView().byId("calculateDays");var p=e.getTime()-t.getTime();if(p>=0){var u=Math.abs(e.getTime()-t.getTime());var h=Math.ceil(u/(1e3*60*60*24));this.getView().getModel("dropDownModel").setProperty("/valueDays",h);c.setValueState("None")}else{c.setValueState("Error");var v="Inserire una data valida";n.show(v);this.getView().getModel("dropDownModel").setProperty("/reviewButtonEnabled",true)}},onCloseColor:function(){this.byId("colors").close()},onDialogBackButton:function(){this._iSelectedStepIndex=this._oWizard.getSteps().indexOf(this._oSelectedStep);var e=this._oWizard.getSteps()[this._iSelectedStepIndex-1];if(this._oSelectedStep){this._oWizard.goToStep(e,true)}else{this._oWizard.previousStep()}this._iSelectedStepIndex--;this._oSelectedStep=e;this.handleButtonsVisibility();this.getView().getModel("dropDownModel").setProperty("/nextButtonEnabled",true)},editStepOne:function(){debugger;var e=this.getView().byId("CreateProductWizard");var t=e.getSteps()[0];this.getView().byId("CreateProductWizard").goToStep(t)},editStepTwo:function(){debugger;var e=this.getView().byId("CreateProductWizard");var t=e.getSteps()[1];this.getView().byId("CreateProductWizard").goToStep(t)}})});