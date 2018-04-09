// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/dataProviders/commands/createHTML/DomProcessor","dojo/promise/all dojo/dom-attr dojo/dom-class dojo/dom-construct dojo/dom-style dojo/query dojo/when esri/dijit/geoenrichment/utils/DomUtil esri/dijit/geoenrichment/utils/DynamicStyleUtil esri/dijit/geoenrichment/utils/ImageInfoUtil ../supportClasses/HeaderFooterRenderer".split(" "),function(x,p,q,g,m,c,y,r,t,z,u){var n={PROPS_TO_REMOVE:{"data-dojo-attach-point":1,id:1,widgetid:1},processMainNode:function(h,
e,v,k){var f=[],l=function(a){var d=[],b=c(".reportContainerGrid_gridContainerWrapper",a);1<b.length?(b.forEach(function(a){a.parentNode.removeChild(a)}),c(".esriGEReportPlayer_reportContainerGrid",a).forEach(function(a,d){0<d&&a.parentNode.removeChild(a)}),b.forEach(function(b){var e=g.toDom(a.outerHTML);c(".reportContainerGrid_gridStackContainer",e)[0].appendChild(b);d.push(e)})):d.push(a);return d}(function(){var a=g.toDom(h.domNode.outerHTML);n.processNode(a,f);c(".esriGEReportPlayer_reportContainerGrid",
a).forEach(function(a){m.set(a,{width:"auto",height:"auto"})});c(".reportContainerGrid_mainContainer",a).forEach(function(a){m.set(a,{width:"auto",height:"auto"})});w.processTooltips(a);return a}());(function(a){a.forEach(function(b,c){var d=h.getNumberOfPages(),f=Math.floor(c/d);u.addHeaderAndFooterToPage({pageNode:b.children[0],headerFooterParams:e&&e[f],documentOptions:v,pageIndex:k?c:c%d,numPages:k?a.length:d})})})(l);var b=function(a){return function(a){return a&&a.replace(/esriMapsAnalystXNonSelectable|esriGENonSelectable|esriMapsAnalystXClickable|dojogfxstrokestyle="solid"/g,
"")}(a.map(function(a){return a.outerHTML}).join(""))}(l);(function(a){a.forEach(function(a){g.destroy(a)})})(l);return{domString:b,additionalStyleNodes:f}},processNode:function(c,e){function h(b){return!(r.isHidden(b)||"none"===m.get(b,"display")||q.contains(b,"esriTriStateCheckBoxIcon"))}function k(b,a){a=void 0===a?!0:a;for(var d in l.PROPS_TO_REMOVE)(a||"id"!==d)&&p.remove(b,d)}function f(b){if("svg"!==b.localName){var a=t.getStyle(b.id);a&&a.forEach(function(a){e.push(a)});k(b,!a);if(!h(b))g.destroy(b);
else if(b.children){for(var a=[],d=0;d<b.children.length;d++)a.push(b.children[d]);for(;a.length;)f(a.shift())}}}var l=this;f(c)}},w={processTooltips:function(h){c(".selectableLegendRootLabel",h).forEach(function(c){c.title=c.innerHTML})}};return{getDomString:function(c,e,g,k){return n.processMainNode(c,e,g,k)}}});