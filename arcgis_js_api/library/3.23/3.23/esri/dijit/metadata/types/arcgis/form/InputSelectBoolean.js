// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/types/arcgis/form/InputSelectBoolean","dojo/_base/declare dojo/_base/lang dojo/Deferred dojo/has ../../../../../kernel ../../../form/InputSelectOne ../../../form/Option dojo/i18n!../../../nls/i18nArcGIS".split(" "),function(b,f,g,h,k,l,d,e){b=b([l],{allInline:!0,serializeIfFalse:!1,falseLabel:e.booleanOptions._false,trueLabel:e.booleanOptions._true,falseValue:"False",trueValue:"True",postCreate:function(){this.inherited(arguments)},fetchOptionWidgets:function(){var c=new g,
a=[];a.push(new d({label:this.falseLabel,value:this.falseValue}));a.push(new d({label:this.trueLabel,value:this.trueValue}));c.resolve(a);return c},getXmlValue:function(){var c=this.inherited(arguments);return null===c||this.serializeIfFalse||c!==this.falseValue?c:null},importValue:function(c,a){if("undefined"!==typeof a&&null!==a&&a.toLowerCase){var b=a.toLowerCase();if("true"===b||"1"===b)a=this.trueValue;else if("false"===b||"0"===b)a=this.falseValue}this.setInputValue(a)}});h("extend-esri")&&
f.setObject("dijit.metadata.types.arcgis.form.InputSelectBoolean",b,k);return b});