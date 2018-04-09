// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/grid/coreUtils/GridCellRenderer","dojo/_base/declare dojo/aspect ./GridDataUtil ./GridStyleUtil ./GridLayoutCalculator ./GridCellContentScaler ./GridCellContentSynchronizer ../../supportClasses/conditionalStyling/ConditionalStyleUtil ../../supportClasses/templateJsonUtils/fieldInfo/FieldInfoRenderer ../../supportClasses/templateJsonUtils/fieldInfo/FieldInfoTooltipUtil ../../supportClasses/templateJsonUtils/fieldInfo/FieldInfoBuilder ../../themes/ReportThemes esri/dijit/geoenrichment/ReportPlayer/core/sections/SectionTypes esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/ViewModes ./GridQueryUtil ../../../_devConfig".split(" "),
function(k,t,f,u,v,q,w,x,r,D,E,y,z,g,A,B){function l(a){return a[a.parentGrid.hasRealBorders?"getContentWidth":"getWidth"]()}function n(a){return a[a.parentGrid.hasRealBorders?"getContentHeight":"getHeight"]()}var C={color:"#FF0000"},m=k(null,{_parentState:null,constructor:function(a,b,c){var d=this;q.fitContentInsideCell(a);this._setParentState(a);c.forEach(function(c){var e=c[1];b.own(t.after(a,c[0],function(){d._checkParentChanged(e,a)&&(q.fitContentInsideCell(a),w.syncParentFieldInfoWithElementState(a,
b))}))})},_setParentState:function(a){var b=a.getFullStyle();this._parentState={width:a.getWidth(),height:a.getHeight(),horizontalAlign:b.horizontalAlign,verticalAlign:b.verticalAlign}},_checkParentChanged:function(a,b){var c;switch(a){case "width":var d=b.getWidth();this._parentState.width!==d&&(this._parentState.width=d,c=!0);break;case "height":d=b.getHeight();this._parentState.height!==d&&(this._parentState.height=d,c=!0);break;case "horizontalAlign":case "verticalAlign":if(d=b.getFullStyle(),
this._parentState.horizontalAlign!==d.horizontalAlign||this._parentState.verticalAlign!==d.verticalAlign)this._parentState.horizontalAlign=d.horizontalAlign,this._parentState.verticalAlign=d.verticalAlign,c=!0}return c}});return k(null,{renderCellContent:function(a){var b=a.parentGrid,c=f.getFieldInfo(a);if(B.emulateErrors.reportContainerRenderError)throw Error("Error test: something crashed whend building the UI layout!");if(c){if(c.isChart){this._placeChartInCell(b,a);return}if(c.isImage||c.isShape){this._placeImageOrShapeInCell(b,
a,c.isImage);return}if(c.isReportSection){this._placeReportSectionInCell(b,a);return}if(c.isInfographic){this._placeInfographicInCell(b,a);return}c.isMissing&&a.setStyle(C);b=this._getRenderedContent(a,c)}else b=a.gridData[a.column.field]||"";this._applyRenderedContent(a,b);a.setContent(null);c&&c.isRichText&&a.setHoverTooltip&&a.setHoverTooltip("")},updateViewMode:function(a){var b=f.getFieldInfo(a);b&&(b.hasVariable||b.script||b.alias||b.isRichText)&&this._applyRenderedContent(a,this._getRenderedContent(a,
b))},_getRenderedContent:function(a,b){var c=this._prepareRenderContextForFieldCell(a,b);return r.renderFieldInfoInTableCell(b,c)},_applyRenderedContent:function(a,b){f.setFieldCellContent(a,b&&b.label||b);if(b)if(a.setNumberValue(b.numberValue),b.conditionalStyle)a.setStyle(b.conditionalStyle),a.__hasConditionalStyle=!0;else if(!1===b.conditionalStyle||a.__hasConditionalStyle&&"string"===typeof b)delete a.__hasConditionalStyle,a.setStyle(u.combineCellStyle(a.parentGrid,a.gridData,a.column));a.parentGrid&&
a.parentGrid.viewModel.dynamicReportInfo&&a.setUrl(f.getFieldCellUrl(a))},_prepareRenderContextForFieldCell:function(a,b){var c=a.parentGrid,d;d=c.getSpecificViewMode();var e=c.getViewMode()===g.PREVIEW_VALUES;!b||"SiteNote"!==b.name&&"SiteNotes"!==b.name||(e=!0);d&&(d.richText===g.PREVIEW_VALUES&&b&&b.isRichText?e=!0:d.variable===g.PREVIEW_VALUES&&b&&(b.hasVariable||b.script)&&(e=!0));d=e;e=c.getViewMode()===g.EDIT;return{previewValues:d,previewConditionalStyle:!d&&!e,getPreviewValueFunction:c.getPreviewValueFunction,
fieldData:c.viewModel.dynamicReportInfo&&c.viewModel.dynamicReportInfo.fieldData,featureIndex:c.previewFeatureIndex||c.isMultiFeatureTable()&&v.calcRingIndexForCell(a),rowIndex:a.gridData&&a.gridData.index,isGraphicReport:c.viewModel.reportStyle===y.GRAPHIC}},_placeChartInCell:function(a,b){var c={viewModel:a.viewModel,themeContext:a.themeContext,theme:a.theme,previewFeatureIndex:a.previewFeatureIndex,parentWidget:a,onContentLoadingStart:a.onContentLoadingStart.bind(a),onContentLoadingEnd:a.onContentLoadingEnd.bind(a)};
return this._createChartPageFromParams(a,b,c)},_createChartPageFromParams:function(a,b,c){var d=f.getFieldInfo(b).chartJson;a=a.viewModel.layoutBuilder.createElement("chart",{node:b.getContentContainerNode(),placeFunc:function(a){b.setContent(a)},json:d,creationParams:c});new m(b,a,[["onWidthChanged","width"],["onHeightChanged","height"]]);return a},_placeImageOrShapeInCell:function(a,b,c){var d=f.getFieldInfo(b),e=d[c?"imageJson":"shapeJson"],p=l(b),g=n(b);if(c){if(d.triggerJson&&a.viewModel.dynamicReportInfo){var k=
r.getValueFromFieldData(d.triggerJson.fieldInfo,{fieldData:a.viewModel.dynamicReportInfo.fieldData,formatValue:!1});x.processImageJsonForTrigger(e,k,d.triggerJson);b.setNumberValue(k)}e.style.width&&e.style.height&&!e.fitParent&&Math.round(e.style.width)!==Math.round(p)&&Math.round(e.style.height)!==Math.round(g)?e.fitParent=!1:(e.fitParent=!0,e.style.width=p,e.style.height=g)}else e.style.width=p,e.style.height=g;var h,d={viewModel:a.viewModel,themeContext:a.themeContext,theme:a.theme,parentWidget:a,
alignParams:b.getFullStyle(),imageTriggerJson:d.triggerJson,getPreviewValueFunction:a.getPreviewValueFunction,applyThemeStyle:a.applyThemeStyle,onInitialized:function(){if(b.domNode){var a=l(b),c=n(b);h&&h.resize&&h.resize({w:a,h:c},b.getFullStyle())}},onContentLoadingStart:a.onContentLoadingStart.bind(a),onContentLoadingEnd:a.onContentLoadingEnd.bind(a)};h=this._createImageOrShapeFromParams(a,b,e,c,d);new m(b,h,[["onWidthChanged","width"],["onHeightChanged","height"],["setStyle","horizontalAlign"]]);
return h},_createImageOrShapeFromParams:function(a,b,c,d,e){return a.viewModel.layoutBuilder.createElement(d?"image":"shape",{node:b.getContentContainerNode(),placeFunc:function(a){b.setContent(a)},relativeParent:b.domNode,json:c,creationParams:e})},_placeReportSectionInCell:function(a,b){var c={"class":"adjustableGrid_inCellSection"};c.json=f.getFieldInfo(b).sectionJson;c.viewModel=a.viewModel;c.themeContext=a.themeContext;c.theme=a.theme;c.viewPortContainer=a.viewPortContainer;c.parentWidget=a;
c.initialWidth=l(b);c.onContentLoadingStart=a.onContentLoadingStart.bind(a);c.onContentLoadingEnd=a.onContentLoadingEnd.bind(a);c.hasFixedLayout=!1;return this._createReportSectionFromParams(a,b,c)},_createReportSectionFromParams:function(a,b,c){c.parentGridCell=b;c=c.json&&c.json.stack&&c.json.type!==z.EMPTY?a.viewModel.layoutBuilder.createElement("section",c,b.getContentContainerNode()):a.viewModel.layoutBuilder.createElement("emptySection",c,b.getContentContainerNode());b.setContent(c);c.setViewMode&&
c.setViewMode(a.getViewMode());new m(b,c,[["onWidthChanged","width"],["onHeightChanged","height"]]);return c},_placeInfographicInCell:function(a,b){var c=f.getFieldInfo(b).infographicJson,d={viewModel:a.viewModel,themeContext:a.themeContext,theme:a.theme,parentWidget:a,width:l(b),height:n(b),adjustElementsWhenResized:A.cellHasFloatingTableParent(b),onContentLoadingStart:a.onContentLoadingStart.bind(a),onContentLoadingEnd:a.onContentLoadingEnd.bind(a)},c=this._createInfographicFromParams(a,b,c,d);
c.setViewMode&&c.setViewMode(a.getViewMode());return c},_createInfographicFromParams:function(a,b,c,d){a=a.viewModel.layoutBuilder.createElement("infographic",{node:b.getContentContainerNode(),placeFunc:function(a){b.setContent(a)},json:c,creationParams:d});new m(b,a,[["onWidthChanged","width"],["onHeightChanged","height"]]);return a}})});