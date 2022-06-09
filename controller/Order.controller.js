sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/m/PDFViewer","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/m/MessageBox"],function(e,t,o,i,r,s,l){"use strict";return e.extend("com.myorg.myUI5App.controller.Order",{onInit:function(){var e={SelectAdd:"",Address:[{Name:"",id:""},{Name:"Non specificato",id:"NS"},{Name:"ARANGUREN,BIZKAIA - NICOLAS MARIA URGOITI S/N - LUCART SPA - ES",id:"AB"},{Name:"PZ - AVIGLIANO - LOC. SERRA VENTARULI - LUCART SPA C/A SIG. ROMANIELLO - IT",id:"PZ"},{Name:"LU - PORCARI - VIA CIARPI, 77 - LUCART SPA - C/A ARIANNA BAROZZI - IT",id:"LU"},{Name:"VE - TORRE DI MOSTO - VIA G. GALILEI, 4 Z.I. - LUCART SPA C/A SIG. MARCO BRAIT - IT",id:"VB"}]};var o=new t(e);this.getView().setModel(o);var i={Enabled:false,EnabledCancel:true,RicercaAvanzata:false,nextButtonVisible:true,nextButtonEnabled:false,backButtonVisible:false,reviewButtonVisible:false,finishButtonVisible:false,TestoColore:"",visibleCodice:false,PersonalizzazioneButtonVisible:false,visibleDescrizione:false,visibleCategoria:false,visibleSerie:false,DisponibilitaButtonVisible:false,reviewButtonEnabled:true,SelectedItems:"",SelectedCodice:"",SelectedDescrizione:"",SelectedSeries:"",SelectedTableCodice:"",SelectedTableDescription:"",SelectedTableCodicePrecedente:"",SelectedQuantita:"",SelectedQuantitaStorico:false,prodottoList:"",prodottoTotale:"",prodottoPrezzo:"",prodottoSconto:"",SelectNat:"ITA",Nationalities:[{Name:"German",id:"GER"},{Name:"Italy",id:"ITA"},{Name:"Japanese",id:"JP"},{Name:"Mexican",id:"MEX"},{Name:"Turkish",id:"TUR"}],SelectPro:"PZ",provinces:[{Name:"Lucca",id:"LU"},{Name:"Lecco",id:"LC"},{Name:"Macerata",id:"MC"},{Name:"Potenza",id:"PZ"},{Name:"Siracusa",id:"SR"}],SelectedCategoria:"AI",Categories:[{Name:"ANTINCENDIO",id:"AI"},{Name:"ANTIRUMORE",id:"AR"},{Name:"ATTR. ELETTRICHE",id:"AE"}],SelectedColor:"black",SelectedName:"",Colors:[{Name:"J5 - ARANCIO (M)",id:"darkorange"},{Name:"K1 BIANCO (M)",id:"white"},{Name:"Q2 AZZURRO (M)",id:"blue"},{Name:"S0 VERDE (M)",id:"green"},{Name:"AM _ GRIGIO MELANGE (M)",id:"grey"},{Name:"Q7 - NAVY (M)",id:"black"}]};var r=new t(i);this.getView().setModel(r,"dropDownModel");debugger;var s=new t({visible:false,Source:"https://drive.google.com/file/d/1Fwbo8knPzPBHIZjms291AJQYKIbgjovR/view?usp=sharing",Title:"My Custom Title",Height:"600px"});this.getView().setModel(s,"pdfModel")},constructor:function(e){this._oView=e},onNavHome:function(){var e=sap.ui.core.UIComponent.getRouterFor(this);e.navTo("Home")},_getDialog:function(){if(!this._oDialog){o.load({name:"com.myorg.myUI5App.view.fragment.AddItems",controller:this,id:this.getView().getId()}).then(function(e){e.attachAfterOpen(this.onDialogAfterOpen,this);e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"));this._oDialog=e;e.open()}.bind(this))}else{this._oDialog.open()}},onOpenDialogAddItems:function(){this.getView().getModel("dropDownModel").setProperty("/RicercaAvanzata",false);this._getDialog();this.handleButtonsVisibility()},onCloseFilterOptionsDialogCancel:function(e){debugger;this._oDialogFilter;e.getSource().getParent().close()},onSearchDetailItems:function(){this.getView().byId("idProductsTable").setVisible(true)},_getDialogFilter:function(){if(!this._oDialogFilter){debugger;o.load({name:"com.myorg.myUI5App.view.fragment.ItemsFilter",controller:this}).then(function(e){e.addEventDelegate({onAfterRendering:function(){debugger;var e=sap.ui.getCore().byId("idProductsTable");var t=this.getView().getModel("dropDownModel").getProperty("/SelectedItems");e.getBinding("items").filter([new sap.ui.model.Filter("ID",sap.ui.model.FilterOperator.EQ,t)])}},this);e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"));this._oDialogFilter=e;e.open()}.bind(this))}else{this._oDialogFilter.open()}},onOpenDialogFilterItems:function(){debugger;this._getDialogFilter();this._oDialog.close()},_getDialogAddAddress:function(){debugger;if(!this._oDialogAddAddress){o.load({name:"com.myorg.myUI5App.view.fragment.AddAddress",controller:this,id:this.getView().getId()}).then(function(e){e.setModel(this.getView().getModel("dropDownModel"));this._oDialogAddAddress=e;e.open()}.bind(this))}else{this._oDialogAddAddress.open()}},openDialogAddAddress:function(){debugger;this._getDialogAddAddress()},_getDialogViewAddress:function(){debugger;if(!this._oDialogViewAddress){o.load({name:"com.myorg.myUI5App.view.fragment.ViewAddress",controller:this}).then(function(e){e.setModel(this.getView().getModel("dropDownModel"));this._oDialogViewAddress=e;e.open()}.bind(this))}else{this._oDialogViewAddress.open()}},openDialogViewAddress:function(){this._getDialogViewAddress()},onCloseViewAddress:function(e){this._oDialogViewAddress;e.getSource().getParent().close()},_getDialogProductAvailable:function(){if(!this._oDialogProdAvailab){o.load({name:"com.myorg.myUI5App.view.fragment.ProductAvailability",controller:this}).then(function(e){e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"),"dropDown");this._oDialogProdAvailab=e;e.open()}.bind(this))}else{this._oDialogProdAvailab.open()}},onOpenDialogProductAvailability:function(){this._getDialogProductAvailable()},onCloseProd:function(e){debugger;this._oDialogProdAvailab.close()},onChangeValueItems:function(){debugger;var e=0;var t=this.getView().getModel("Clothing").getProperty("/sizes/sizes1");var o=this.getView().getModel("Clothing").getProperty("/sizes/sizes2");for(let o=0;o<t.length;o++){var i=t[o].quantita;var r=e+=i}var s=0;for(let e=0;e<o.length;e++){var l=o[e].quantita;var n=s+=l}var a=r+n;this.getView().getModel("Clothing").setProperty("/sizes/totale",a);var d=this.getView().getModel("Clothing").getProperty("/sizes/prezzo");var g=a*d;this.getView().getModel("Clothing").setProperty("/sizes/calcolo",g.toFixed(2));var c=this.getView().byId("coloreFinale").getText();var h=this.getView().byId("totalItems2").getText();if(c!==""&&h>0){this.getView().getModel("dropDownModel").setProperty("/reviewButtonEnabled",true);this.getView().getModel("dropDownModel").setProperty("/SelectedQuantitaStorico",false)}else{this.getView().getModel("dropDownModel").setProperty("/reviewButtonEnabled",false)}},AdvancedSearch:function(){this._oDialogFilter.close();this.getView().getModel("dropDownModel").setProperty("/RicercaAvanzata",true);this._oDialog.open()},onAddItem:function(e){debugger;var t=this.getView().getModel("Clothing").getProperty("/catalog/clothing/categories");var o=this.getView().getModel("Clothing").getProperty("/catalog/clothing/itemsTreeTable");var i=this.getView().getModel("Clothing").getProperty("/sizes");var r=this.getView().getModel("dropDownModel").getProperty("/SelectedItems");var s=this.getView().getModel("Clothing");var l=t.filter(e=>e.ID==r)[0];var n=sap.ui.getCore().byId("idProductsTable").getSelectedItems();if(l){l=l.description}if(n.length==0){if(i.sizes1.filter(e=>e.quantita>0).length==0&&i.sizes2.filter(e=>e.quantita>0).length==0){return}var a={ID:"MC"+parseInt(1e4*Math.random()),description:"PANTALONE SYMBOL BANDE,NAVY",categories:[]};for(let e=0;e<i.sizes1.length;e++){var d=i.sizes1[e];if(d.quantita>0){a.categories.push({ID:a.ID+d.key,description:a.description+d.key,quantity:d.quantita,size:d.key,days:"Consegna gg 0",date:"2022-04-09",list:"List.",listId:i.prezzo,sale:"Sconto",saleId:"71,48%",priceSale:"Prezzo Scontato",priceSaleId:"7,30",total:"Totale",totalId:i.calcolo})}}for(let e=0;e<i.sizes2.length;e++){var d=i.sizes2[e];if(d.quantita>0){a.categories.push({ID:a.ID+d.key,description:a.description+d.key,quantity:d.quantita,size:d.key,days:"Consegna gg 0",date:"2022-04-09",list:"List.",listId:i.prezzo,sale:"Sconto",saleId:"71,48%",priceSale:"Prezzo Scontato",priceSaleId:"7,30",total:"Totale",totalId:i.calcolo})}}o.push(a)}else{for(let e=0;e<n.length;e++){var g=n[e].getBindingContextPath();var c=s.getProperty(g);o.push(c)}}var h=this.getView().getModel("Clothing");h.updateBindings(true);this._oDialogFilter.close()},onOpenDialogEditItems:function(e){debugger;var t=this.getView().byId("TreeTableBasic");var o=t.getContextByIndex(t.getSelectedIndex()).getObject();var i=t.getContextByIndex(t.getSelectedIndex()).getObject().categories;var r=this.getView().getModel("Clothing").getProperty("/sizes/sizes1");var s=this.getView().getModel("Clothing").getProperty("/sizes/sizes2");if(i){for(let e=0;e<r.length;e++){var l=i.filter(t=>t.size==r[e].key)[0];if(l){r[e].quantita=l.quantity}}}else{for(let e=0;e<r.length;e++){var l=o;if(l.size==r[e].key){r[e].quantita=l.quantity}}}this.getView().getModel("dropDownModel").setProperty("/sizes",r);this.onChangeValueItems();this._getDialogFilter()},onDeleteRow:function(){debugger;var e=this.getView().byId("TreeTableBasic");var t=e.getContextByIndex(e.getSelectedIndex()).getPath();var o=t.slice(0,-1);var i=this.getView().getModel("Clothing").getProperty(o);var r=t.charAt(t.lastIndexOf("/")+1);i.splice(r,1);if(i.length<=0){var s=this.getView().getModel("Clothing").getProperty("/catalog/clothing/categories");for(let e=0;e<s.length;e++){var l=s[e].categories;if(l.length==0){s.splice(r,1)}}}e.getModel("Clothing").updateBindings(true);t.slice(0,-1)},onPressRow:function(){debugger;var e=this.getView().byId("TreeTableBasic").getProperty("selectedIndex");if(e>=0){this.getView().getModel("dropDownModel").setProperty("/Enabled",true)}else{this.getView().getModel("dropDownModel").setProperty("/Enabled",false)}},_getDialogPers:function(){if(!this._oDialogPers){o.load({name:"com.myorg.myUI5App.view.fragment.AddPers",controller:this,id:this.getView().getId()}).then(function(e){e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"));this._oDialogPers=e;e.open()}.bind(this))}else{this._oDialogPers.open()}},onOpenAddPers:function(){this._getDialogPers()},_getDialogFile:function(){debugger;if(!this._oDialogFile){o.load({name:"com.myorg.myUI5App.view.fragment.FileDocument",controller:this}).then(function(e){e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"),"dropDownModel");e.setModel(this.getView().getModel("pdfModel"));this._oDialogFile=e;e.open()}.bind(this))}else{this._oDialogFile.open()}},openFileDocument:function(){this._getDialogFile()},handleLinkPress:function(e){debugger;var t=new i;this.getView().addDependent(t);var o=e.getSource().getModel().getData().Source;var r=o+"GetPdfSet(Serial='C0003',Filename='')/$value";t.setTitle("File preview");t.setSource(r);t.open()},_getDialogSearchFile:function(){debugger;if(!this._oDialogsearchFile){o.load({name:"com.myorg.myUI5App.view.fragment.SearchFileDocument",controller:this}).then(function(e){e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"),"dropDownModel");e.setModel(this.getView().getModel("pdfModel"));this._oDialogsearchFile=e;e.open()}.bind(this))}else{this._oDialogsearchFile.open()}},onOpenDialogSearchFile:function(){this._getDialogSearchFile()},_getDialogCopyItems:function(){debugger;if(!this._oDialogCopyItems){o.load({name:"com.myorg.myUI5App.view.fragment.CopyItems",controller:this}).then(function(e){e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"),"dropDownModel");this._oDialogCopyItems=e;e.open()}.bind(this))}else{this._oDialogCopyItems.open()}},onOpenDialogCopyItems:function(){debugger;var e=this.getView().byId("TreeTableBasic");var t=e.getContextByIndex(e.getSelectedIndex()).getObject();var o=e.getContextByIndex(e.getSelectedIndex()).getObject().categories;var i=this.getView().getModel("dropDownModel").getData().sizes;for(let e=0;e<i.length;e++){var r=o.filter(t=>t.size==i[e].key)[0];if(r){i[e].quantita=r.quantity}}this.getView().getModel("dropDownModel").setProperty("/sizes",i);var s=0;var l=this.getView().getModel("dropDownModel").getProperty("/sizes");for(let e=0;e<l.length;e++){var n=l[e].quantita;s+=n}this.getView().getModel("dropDownModel").setProperty("/totale",s);var a=this.getView().getModel("dropDownModel").getData().prezzo;var d=s*a;this.getView().getModel("dropDownModel").setProperty("/calcolo",d.toFixed(2));this._getDialogCopyItems()},onAddNote:function(){debugger;var e=this.getView().byId("textArea").getValue();var t=this.getView().byId("testoCommento");t.setText(e)},_getDialogItemsHistory:function(){debugger;if(!this._oDialogItemsHistory){o.load({name:"com.myorg.myUI5App.view.fragment.AddItemsHistory",controller:this}).then(function(e){e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"),"dropDownModel");e.setModel(this.getView().getModel("pdfModel"));this._oDialogItemsHistory=e;e.open()}.bind(this))}else{this._oDialogItemsHistory.open()}},addItemsHistory:function(){this._getDialogItemsHistory()},onFilterInvoices:function(e){debugger;var t=[];var o=e.getParameter("query");if(o){t.push(new r("ID",s.Contains,o))}var i=sap.ui.getCore().byId("tableHistory");var l=i.getBinding("items");l.filter(t)},onAddHistoryItems:function(){debugger;var e=this.getView().getModel("Clothing").getProperty("/catalog/clothing/categories");var t=this.getView().getModel("Clothing").getProperty("/catalog/clothing/itemsTreeTable");var o=this.getView().getModel("Clothing").getProperty("/sizes");var i=this.getView().getModel("dropDownModel").getProperty("/SelectedItems");var r=this.getView().getModel("Clothing");var s=e.filter(e=>e.ID==i)[0];var l=sap.ui.getCore().byId("tableHistory").getSelectedItems();for(let e=0;e<l.length;e++){var n=l[e].getBindingContextPath();var a=r.getProperty(n);t.push(a)}var d=this.getView().getModel("Clothing");d.updateBindings(true);this._oDialogItemsHistory.close()},handleButtonsVisibility:function(){debugger;var e=this.getView().getModel("dropDownModel");switch(this._oWizard.getProgress()){case 1:e.setProperty("/nextButtonVisible",true);e.setProperty("/backButtonVisible",false);e.setProperty("/reviewButtonVisible",false);e.setProperty("/finishButtonVisible",false);break;case 2:e.setProperty("/DisponibilitaButtonVisible",false);e.setProperty("/backButtonVisible",true);e.setProperty("/nextButtonEnabled",false);e.setProperty("/nextButtonVisible",false);e.setProperty("/reviewButtonVisible",true);e.setProperty("/reviewButtonEnabled",false);break;case 3:e.setProperty("/finishButtonVisible",true);e.setProperty("/backButtonVisible",false);e.setProperty("/PersonalizzazioneButtonVisible",false);e.setProperty("/reviewButtonVisible",false);break;default:break}},onDialogAfterOpen:function(){debugger;this._oWizard=this.byId("CreateProductWizard");this._oWizard.discardProgress(this._oWizard.getSteps()[0]);this.handleButtonsVisibility()},onDialogNextButton:function(){debugger;if(this._oWizard.getProgressStep().getValidated()){this._oWizard.nextStep()}this.handleButtonsVisibility()},onDialogBackButton:function(){debugger;this._oWizard.previousStep();this.handleButtonsVisibility()},onSelectItems:function(){debugger;this.getView().getModel("dropDownModel").setProperty("/DisponibilitaButtonVisible",true);this.getView().getModel("dropDownModel").setProperty("/PersonalizzazioneButtonVisible",true);this.getView().getModel("dropDownModel").setProperty("/nextButtonEnabled",true);var e=this.getView().byId("idProductsTableItems");var t=e.getSelectedItems();var o=t[0].getBindingContext("Clothing").getObject();var i=this.getView().getModel("dropDownModel");i.setProperty("/SelectedTableCodice",o.codice);i.setProperty("/SelectedTableDescription",o.description);i.setProperty("/SelectedTableCodicePrecedente",o.codicePrecedente)},_handleMessageBoxOpen:function(e,t){l[t](e,{actions:[l.Action.YES,l.Action.NO],onClose:function(e){if(e===l.Action.YES){debugger;this._oWizard.discardProgress(this._oWizard.getSteps()[0]);this._oDialog.close()}}.bind(this)})},discardProgress:function(){debugger;var e=this.getView().getModel();this._oWizard.discardProgress(this.byId("ProductTypeStep"));var t=function(e){for(var o=0;o<e.length;o++){if(e[o].setValue){e[o].setValue("")}if(e[o].getContent){t(e[o].getContent())}}}},handleWizardCancel:function(){this._handleMessageBoxOpen("Are you sure you want to cancel your report?","warning")},editStepOne:function(){this._handleNavigationToStep(0)},onSelectCheckBox:function(e){debugger;var t=e.getSource().getSelected();var o=this.getView().getModel("dropDownModel");if(t===true){o.setProperty("/visibleCodice",true);o.setProperty("/visibleDescrizione",true);o.setProperty("/visibleCategoria",true);o.setProperty("/visibleSerie",true)}else{o.setProperty("/visibleCodice",false);o.setProperty("/visibleDescrizione",false);o.setProperty("/visibleCategoria",false);o.setProperty("/visibleSerie",false)}},onFilterTable:function(e){var t=[];var o=e.getParameters("query").selectionSet[0].getValue();var i=e.getParameters("query").selectionSet[3].getValue();if(o){t.push(new r("codice",s.Contains,o))}if(i){t.push(new r("description",s.Contains,i))}var l=this.getView().byId("idProductsTableItems");var n=l.getBinding("items");n.filter(t)},onSelectArticolo:function(){debugger;var e=this.getView().byId("idProductsTable").getSelectedContexts().length;if(e>0){this.getView().getModel("dropDownModel").setProperty("/reviewButtonEnabled",true)}else{this.getView().getModel("dropDownModel").setProperty("/reviewButtonEnabled",false)}var t=this.getView().byId("idProductsTable").getSelectedItem();var o=t.getBindingContext("Clothing").getObject();var i=this.getView().getModel("dropDownModel");i.setProperty("/SelectedTableCodice",o.ID);i.setProperty("/SelectedTableDescription",o.description);i.setProperty("/SelectedQuantitaStorico",true);i.setProperty("/SelectedQuantita",o.quantity);i.setProperty("/prodottoList",o.listId);i.setProperty("/prodottoSconto",o.saleId);i.setProperty("/prodottoPrezzo",o.priceSaleId);i.setProperty("/prodottoTotale",o.totalId);i.setProperty("/TestoColore",o.color)},onAddItems:function(){debugger;var e=this.getView().getModel("Clothing").getProperty("/catalog/clothing/categories");var t=this.getView().getModel("Clothing").getProperty("/catalog/clothing/itemsTreeTable");var o=this.getView().getModel("Clothing").getProperty("/sizes");var i=this.getView().getModel("dropDownModel").getProperty("/SelectedItems");var r=this.getView().getModel("Clothing");var s=this.getView().byId("idProductsTable").getSelectedItem();var l=s.getBindingContext("Clothing").getObject();var n=this.getView().getModel("dropDownModel");var a=e.filter(e=>e.ID==i)[0];var d=this.getView().byId("idProductsTable").getSelectedItems();for(let e=0;e<d.length;e++){var g=d[e].getBindingContextPath();var c=r.getProperty(g);t.push(c)}var h=this.getView().getModel("Clothing");h.updateBindings(true);this._oDialog.close()}})});