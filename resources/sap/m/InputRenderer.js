/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText","sap/ui/core/Renderer","./InputBaseRenderer","sap/m/library"],function(e,t,i,s){"use strict";var a=s.InputType;var n=t.extend(i);n.apiVersion=2;n.addOuterClasses=function(e,t){e.class("sapMInput");if(t.getDescription()){e.class("sapMInputWithDescription")}};n.writeInnerAttributes=function(e,t){var i=t.getShowSuggestion();e.attr("type",t.getType().toLowerCase());if(t.getType()==a.Number){e.attr("step","any")}if(t.getType()==a.Number&&sap.ui.getCore().getConfiguration().getRTL()){e.attr("dir","ltr").style("text-align","right")}if(i||t.getShowValueStateMessage()){e.attr("autocomplete","off")}if(!t.getEnabled()&&t.getType()=="Password"||t.getShowSuggestion()&&t.isMobileDevice()||t.getValueHelpOnly()&&t.getEnabled()&&t.getEditable()&&t.getShowValueHelp()){e.attr("readonly","readonly")}};n.addInnerClasses=function(e,t){};n.writeDescription=function(e,t){e.openStart("div").class("sapMInputDescriptionWrapper").style("width","calc(100% - "+t.getFieldWidth()+")").openEnd();e.openStart("span",t.getId()+"-descr").class("sapMInputDescriptionText").openEnd().text(t.getDescription()).close("span");e.close("div")};n.writeDecorations=function(e,t){if(t.getDescription()){this.writeDescription(e,t)}if(sap.ui.getCore().getConfiguration().getAccessibility()){if(t.getShowSuggestion()&&t.getEnabled()&&t.getEditable()){e.openStart("span",t.getId()+"-SuggDescr").class("sapUiPseudoInvisibleText").attr("role","status").attr("aria-live","polite").openEnd().close("span")}}};n.addWrapperStyles=function(e,t){e.style("width",t.getDescription()?t.getFieldWidth():"100%")};n.getAriaDescribedBy=function(t){var s=i.getAriaDescribedBy.apply(this,arguments);function a(e){s=s?s+" "+e:e}if(t.getDescription()){a(t.getId()+"-descr")}if(t.getShowValueHelp()&&t.getEnabled()&&t.getEditable()){a(e.getStaticId("sap.m","INPUT_VALUEHELP"));if(t.getValueHelpOnly()){a(e.getStaticId("sap.m","INPUT_DISABLED"))}}return s};n.getAriaRole=function(e){return""};n.getAccessibilityState=function(e){var t=e.getShowSuggestion();var s=i.getAccessibilityState.apply(this,arguments);if(t){s["haspopup"]="listbox"}return s};return n},true);