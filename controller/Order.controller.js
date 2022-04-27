sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/m/PDFViewer","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,o,i,l,r){"use strict";return e.extend("com.myorg.myUI5App.controller.Order",{onInit:function(){var e={SelectAdd:"",Address:[{Name:"",id:""},{Name:"Non specificato",id:"NS"},{Name:"ARANGUREN,BIZKAIA - NICOLAS MARIA URGOITI S/N - LUCART SPA - ES",id:"AB"},{Name:"PZ - AVIGLIANO - LOC. SERRA VENTARULI - LUCART SPA C/A SIG. ROMANIELLO - IT",id:"PZ"},{Name:"LU - PORCARI - VIA CIARPI, 77 - LUCART SPA - C/A ARIANNA BAROZZI - IT",id:"LU"},{Name:"VE - TORRE DI MOSTO - VIA G. GALILEI, 4 Z.I. - LUCART SPA C/A SIG. MARCO BRAIT - IT",id:"VB"}]};var o=new t(e);this.getView().setModel(o);var i={Enabled:false,RicercaAvanzata:false,SelectedItems:"",SelectNat:"ITA",Nationalities:[{Name:"German",id:"GER"},{Name:"Italy",id:"ITA"},{Name:"Japanese",id:"JP"},{Name:"Mexican",id:"MEX"},{Name:"Turkish",id:"TUR"}],SelectPro:"PZ",provinces:[{Name:"Lucca",id:"LU"},{Name:"Lecco",id:"LC"},{Name:"Macerata",id:"MC"},{Name:"Potenza",id:"PZ"},{Name:"Siracusa",id:"SR"}],SelectedColor:"black",SelectedName:"",Colors:[{Name:"J5 - ARANCIO (M)",id:"darkorange"},{Name:"K1 BIANCO (M)",id:"white"},{Name:"Q2 AZZURRO (M)",id:"blue"},{Name:"S0 VERDE (M)",id:"green"},{Name:"AM _ GRIGIO MELANGE (M)",id:"grey"},{Name:"Q7 - NAVY (M)",id:"black"}]};var l=new t(i);this.getView().setModel(l,"dropDownModel");debugger;var r=new t({visible:false,Source:"https://drive.google.com/file/d/1Fwbo8knPzPBHIZjms291AJQYKIbgjovR/view?usp=sharing",Title:"My Custom Title",Height:"600px"});this.getView().setModel(r,"pdfModel")},constructor:function(e){this._oView=e},onNavHome:function(){var e=sap.ui.core.UIComponent.getRouterFor(this);e.navTo("Home")},_getDialog:function(){if(!this._oDialog){o.load({name:"com.myorg.myUI5App.view.fragment.AddItems",controller:this,id:this.getView().getId()}).then(function(e){e.attachAfterOpen(this.onDialogAfterOpen,this);e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"));this._oDialog=e;e.open()}.bind(this))}else{this._oDialog.open()}},onOpenDialogAddItems:function(){this.getView().getModel("dropDownModel").setProperty("/RicercaAvanzata",false);this._getDialog();debugger},onCloseFilterOptionsDialogCancel:function(e){debugger;this._oDialogFilter;e.getSource().getParent().close()},onSearchDetailItems:function(){this.getView().byId("idProductsTable").setVisible(true)},_getDialogFilter:function(){if(!this._oDialogFilter){debugger;o.load({name:"com.myorg.myUI5App.view.fragment.ItemsFilter",controller:this}).then(function(e){e.addEventDelegate({onAfterRendering:function(){debugger;var e=sap.ui.getCore().byId("idProductsTable");var t=this.getView().getModel("dropDownModel").getProperty("/SelectedItems");e.getBinding("items").filter([new sap.ui.model.Filter("ID",sap.ui.model.FilterOperator.EQ,t)])}},this);e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"));this._oDialogFilter=e;e.open()}.bind(this))}else{this._oDialogFilter.open()}},onOpenDialogFilterItems:function(){debugger;this._getDialogFilter();this._oDialog.close()},_getDialogAddAddress:function(){debugger;if(!this._oDialogAddAddress){o.load({name:"com.myorg.myUI5App.view.fragment.AddAddress",controller:this,id:this.getView().getId()}).then(function(e){e.setModel(this.getView().getModel("dropDownModel"));this._oDialogAddAddress=e;e.open()}.bind(this))}else{this._oDialogAddAddress.open()}},openDialogAddAddress:function(){debugger;this._getDialogAddAddress()},_getDialogViewAddress:function(){debugger;if(!this._oDialogViewAddress){o.load({name:"com.myorg.myUI5App.view.fragment.ViewAddress",controller:this}).then(function(e){e.setModel(this.getView().getModel("dropDownModel"));this._oDialogViewAddress=e;e.open()}.bind(this))}else{this._oDialogViewAddress.open()}},openDialogViewAddress:function(){this._getDialogViewAddress()},onCloseViewAddress:function(e){this._oDialogViewAddress;e.getSource().getParent().close()},onOpenColor:function(e){this.getView().setModel(this.getView().getModel("dropDownModel"));debugger;var t=e.getSource(),i=this.getView();if(!this._pPopover){this._pPopover=o.load({id:i.getId(),name:"com.myorg.myUI5App.view.fragment.SelectColor",controller:this}).then(function(e){i.addDependent(e);return e})}this._pPopover.then(function(e){e.openBy(t)})},onChooseColor:function(e){debugger;var t=e.getSource();var o=t.getBindingContext();var i=o.getPath();var l=this.getView().getModel().getProperty(i).id;this.getView().getModel().setProperty("/SelectedColor",l);var r=this.getView().getModel().getProperty(i).Name;this.getView().getModel().setProperty("/SelectedName",r);this.byId("colors").close()},onCloseColor:function(){this.byId("colors").close()},_getDialogProductAvailable:function(){if(!this._oDialogProdAvailab){o.load({name:"com.myorg.myUI5App.view.fragment.ProductAvailability",controller:this}).then(function(e){e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"),"dropDown");this._oDialogProdAvailab=e;e.open()}.bind(this))}else{this._oDialogProdAvailab.open()}},onOpenDialogProductAvailability:function(){this._getDialogProductAvailable()},onCloseProd:function(e){debugger;this._oDialogProdAvailab.close()},onChangeValueItems:function(){debugger;var e=0;var t=this.getView().getModel("Clothing").getProperty("/sizes/sizes1");var o=this.getView().getModel("Clothing").getProperty("/sizes/sizes2");for(let o=0;o<t.length;o++){var i=t[o].quantita;var l=e+=i}var r=0;for(let e=0;e<o.length;e++){var n=o[e].quantita;var s=r+=n}var g=l+s;this.getView().getModel("Clothing").setProperty("/sizes/totale",g);var a=this.getView().getModel("Clothing").getProperty("/sizes/prezzo");var d=g*a;this.getView().getModel("Clothing").setProperty("/sizes/calcolo",d.toFixed(2))},AdvancedSearch:function(){this._oDialogFilter.close();this.getView().getModel("dropDownModel").setProperty("/RicercaAvanzata",true);this._oDialog.open()},onAddItem:function(e){debugger;var t=this.getView().getModel("Clothing").getProperty("/catalog/clothing/categories");var o=this.getView().getModel("Clothing").getProperty("/catalog/clothing/itemsTreeTable");var i=this.getView().getModel("Clothing").getProperty("/sizes");var l=this.getView().getModel("dropDownModel").getProperty("/SelectedItems");var r=this.getView().getModel("Clothing");var n=t.filter(e=>e.ID==l)[0];var s=sap.ui.getCore().byId("idProductsTable").getSelectedItems();if(n){n=n.description}if(s.length==0){if(i.sizes1.filter(e=>e.quantita>0).length==0&&i.sizes2.filter(e=>e.quantita>0).length==0){return}var g={ID:"MC"+parseInt(1e4*Math.random()),description:"PANTALONE SYMBOL BANDE,NAVY",categories:[]};for(let e=0;e<i.sizes1.length;e++){var a=i.sizes1[e];if(a.quantita>0){g.categories.push({ID:g.ID+a.key,description:g.description+a.key,quantity:a.quantita,size:a.key,days:"Consegna gg 0",date:"2022-04-09",list:"List.",listId:i.prezzo,sale:"Sconto",saleId:"71,48%",priceSale:"Prezzo Scontato",priceSaleId:"7,30",total:"Totale",totalId:i.calcolo})}}for(let e=0;e<i.sizes2.length;e++){var a=i.sizes2[e];if(a.quantita>0){g.categories.push({ID:g.ID+a.key,description:g.description+a.key,quantity:a.quantita,size:a.key,days:"Consegna gg 0",date:"2022-04-09",list:"List.",listId:i.prezzo,sale:"Sconto",saleId:"71,48%",priceSale:"Prezzo Scontato",priceSaleId:"7,30",total:"Totale",totalId:i.calcolo})}}o.push(g)}else{for(let e=0;e<s.length;e++){var d=s[e].getBindingContextPath();var h=r.getProperty(d);o.push(h)}}var c=this.getView().getModel("Clothing");c.updateBindings(true);this._oDialogFilter.close()},onOpenDialogEditItems:function(e){debugger;var t=this.getView().byId("TreeTableBasic");var o=t.getContextByIndex(t.getSelectedIndex()).getObject();var i=t.getContextByIndex(t.getSelectedIndex()).getObject().categories;var l=this.getView().getModel("Clothing").getProperty("/sizes/sizes1");var r=this.getView().getModel("Clothing").getProperty("/sizes/sizes2");if(i){for(let e=0;e<l.length;e++){var n=i.filter(t=>t.size==l[e].key)[0];if(n){l[e].quantita=n.quantity}}}else{for(let e=0;e<l.length;e++){var n=o;if(n.size==l[e].key){l[e].quantita=n.quantity}}}this.getView().getModel("dropDownModel").setProperty("/sizes",l);this.onChangeValueItems();this._getDialogFilter()},onDeleteRow:function(){debugger;var e=this.getView().byId("TreeTableBasic");var t=e.getContextByIndex(e.getSelectedIndex()).getPath();var o=t.slice(0,-1);var i=this.getView().getModel("Clothing").getProperty(o);var l=t.charAt(t.lastIndexOf("/")+1);i.splice(l,1);if(i.length<=0){var r=this.getView().getModel("Clothing").getProperty("/catalog/clothing/categories");for(let e=0;e<r.length;e++){var n=r[e].categories;if(n.length==0){r.splice(l,1)}}}e.getModel("Clothing").updateBindings(true);t.slice(0,-1)},onPressRow:function(){debugger;var e=this.getView().byId("TreeTableBasic").getProperty("selectedIndex");if(e>=0){this.getView().getModel("dropDownModel").setProperty("/Enabled",true)}else{this.getView().getModel("dropDownModel").setProperty("/Enabled",false)}},_getDialogPers:function(){if(!this._oDialogPers){o.load({name:"com.myorg.myUI5App.view.fragment.AddPers",controller:this,id:this.getView().getId()}).then(function(e){e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"));this._oDialogPers=e;e.open()}.bind(this))}else{this._oDialogPers.open()}},onOpenAddPers:function(){this._getDialogPers()},_getDialogFile:function(){debugger;if(!this._oDialogFile){o.load({name:"com.myorg.myUI5App.view.fragment.FileDocument",controller:this}).then(function(e){e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"),"dropDownModel");e.setModel(this.getView().getModel("pdfModel"));this._oDialogFile=e;e.open()}.bind(this))}else{this._oDialogFile.open()}},openFileDocument:function(){this._getDialogFile()},handleLinkPress:function(e){debugger;var t=new i;this.getView().addDependent(t);var o=e.getSource().getModel().getData().Source;var l=o+"GetPdfSet(Serial='C0003',Filename='')/$value";t.setTitle("File preview");t.setSource(l);t.open()},_getDialogSearchFile:function(){debugger;if(!this._oDialogsearchFile){o.load({name:"com.myorg.myUI5App.view.fragment.SearchFileDocument",controller:this}).then(function(e){e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"),"dropDownModel");e.setModel(this.getView().getModel("pdfModel"));this._oDialogsearchFile=e;e.open()}.bind(this))}else{this._oDialogsearchFile.open()}},onOpenDialogSearchFile:function(){this._getDialogSearchFile()},_getDialogCopyItems:function(){debugger;if(!this._oDialogCopyItems){o.load({name:"com.myorg.myUI5App.view.fragment.CopyItems",controller:this}).then(function(e){e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"),"dropDownModel");this._oDialogCopyItems=e;e.open()}.bind(this))}else{this._oDialogCopyItems.open()}},onOpenDialogCopyItems:function(){debugger;var e=this.getView().byId("TreeTableBasic");var t=e.getContextByIndex(e.getSelectedIndex()).getObject();var o=e.getContextByIndex(e.getSelectedIndex()).getObject().categories;var i=this.getView().getModel("dropDownModel").getData().sizes;for(let e=0;e<i.length;e++){var l=o.filter(t=>t.size==i[e].key)[0];if(l){i[e].quantita=l.quantity}}this.getView().getModel("dropDownModel").setProperty("/sizes",i);var r=0;var n=this.getView().getModel("dropDownModel").getProperty("/sizes");for(let e=0;e<n.length;e++){var s=n[e].quantita;r+=s}this.getView().getModel("dropDownModel").setProperty("/totale",r);var g=this.getView().getModel("dropDownModel").getData().prezzo;var a=r*g;this.getView().getModel("dropDownModel").setProperty("/calcolo",a.toFixed(2));this._getDialogCopyItems()},onAddNote:function(){debugger;var e=this.getView().byId("textArea").getValue();var t=this.getView().byId("testoCommento");t.setText(e)},_getDialogItemsHistory:function(){debugger;if(!this._oDialogItemsHistory){o.load({name:"com.myorg.myUI5App.view.fragment.AddItemsHistory",controller:this}).then(function(e){e.setModel(this.getOwnerComponent().getModel("Clothing"),"Clothing");e.setModel(this.getView().getModel("dropDownModel"),"dropDownModel");e.setModel(this.getView().getModel("pdfModel"));this._oDialogItemsHistory=e;e.open()}.bind(this))}else{this._oDialogItemsHistory.open()}},addItemsHistory:function(){this._getDialogItemsHistory()},onFilterInvoices:function(e){debugger;var t=[];if(sQuery){t.push(new l("ID",r.Contains,sQuery))}var o=sap.ui.getCore().byId("tableHistory");var i=o.getBinding("items");i.filter(t)},onAddHistoryItems:function(){debugger;var e=this.getView().getModel("Clothing").getProperty("/catalog/clothing/categories");var t=this.getView().getModel("Clothing").getProperty("/catalog/clothing/itemsTreeTable");var o=this.getView().getModel("Clothing").getProperty("/sizes");var i=this.getView().getModel("dropDownModel").getProperty("/SelectedItems");var l=this.getView().getModel("Clothing");var r=e.filter(e=>e.ID==i)[0];var n=sap.ui.getCore().byId("tableHistory").getSelectedItems();for(let e=0;e<n.length;e++){var s=n[e].getBindingContextPath();var g=l.getProperty(s);t.push(g)}var a=this.getView().getModel("Clothing");a.updateBindings(true);this._oDialogItemsHistory.close()}})});