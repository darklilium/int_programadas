// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/form/templates/InputText.html":'\x3cdiv class\x3d"gxeInput gxeInputText"\x3e\r\n  \x3cinput class\x3d"gxeEditOnly"  type\x3d"text" size\x3d"${size}" maxlength\x3d"${maxlength}"\r\n    data-dojo-attach-point\x3d"focusNode"\r\n    data-dojo-attach-event\x3d"onchange: _onChange, onkeyup: _onKeyup"/\x3e\r\n  \x3cdiv class\x3d"gxeViewOnlyText gxeViewOnly" data-dojo-attach-point\x3d"viewOnlyNode"\x3e\x3c/div\x3e\r\n  \x3cdiv class\x3d"gxeContainer" data-dojo-attach-point\x3d"containerNode"\x3e\x3c/div\x3e\r\n  \x3cdiv class\x3d"gxeHint gxeEditOnly" data-dojo-attach-point\x3d"hintNode"\x3e\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/form/InputText","dojo/_base/declare dojo/_base/lang dojo/has ../base/InputBase dojo/text!./templates/InputText.html ../../../kernel".split(" "),function(c,d,e,f,g,h){c=c([f],{templateString:g,size:60,small:!1,maxlength:2048,useUniqueId:!1,regenerateIfTemplate:!1,postCreate:function(){this.inherited(arguments)},postMixInProperties:function(){this.inherited(arguments);this.small&&(this.size=30)},connectXNode:function(a,b){this.inherited(arguments);var c=a.value;!b&&this.useUniqueId&&
this.setInputValue(this._generateId());b&&!a.fixed||"undefined"===typeof c||null===c||this.setInputValue(c)},_generateId:function(){var a=null,a="function"===typeof Date.now?Date.now():(new Date).getTime(),b=(""+Math.random()).replace("0.","r");return(a+""+b).replace(/-/g,"")},getInputValue:function(){return this.focusNode?this.focusNode.value:null},importValue:function(a,b){if(this.useUniqueId)try{a.asTemplate&&this.regenerateIfTemplate||null!==b&&0<d.trim(b).length&&this.setInputValue(b)}catch(k){}else this.setInputValue(b)},
_onChange:function(a){this.emitInteractionOccurred()},_onKeyup:function(a){this.emitInteractionOccurred()},setInputValue:function(a){"undefined"===typeof a&&(a=null);this.focusNode.value=a;this.emitInteractionOccurred();this.applyViewOnly()}});e("extend-esri")&&d.setObject("dijit.metadata.form.InputText",c,h);return c});