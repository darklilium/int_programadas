// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/themes/ThemeUtil",["dojo/_base/lang","esri/dijit/geoenrichment/utils/ColorUtil","esri/dijit/geoenrichment/utils/ObjectUtil"],function(l,d,p){var q={getPanelTitleColor:function(b){var a=d.isLightColor(b);return d.transform(b,{dv:a?-50:50}).toHex()},getChartElementBackgroundColor:function(b){var a=d.isLightColor(b);return d.transform(b,{dv:a?-13:13}).toHex()}},t={getThemeColors:function(b){return[b.document.backgroundColor,b.infographic.staticInfographic.icon.backgroundColor,
b.infographic.staticInfographic.highlightedIcon.backgroundColor]},_generateChartColors:function(b,a){var c=[a,d.transform(a,{dv:-20}).toHex(),d.transform(a,{dv:-40}).toHex(),d.transform(a,{dv:-50}).toHex(),d.transform(a,{dv:-55}).toHex(),d.transform(a,{dv:-60}).toHex(),d.transform(a,{dv:-65}).toHex(),d.transform(a,{dv:-70}).toHex()];b!==a&&c.unshift(b);return c},applyThemeColorsToTheme:function(b,a,c,r){var e=a[0],g=a[1];a=a[2];var f=d.getContrastColor(e).toHex(),m="#FFFFFF"===e.toUpperCase()?"#4C4C4C":
f,h=d.isLightColor(e),n=q.getChartElementBackgroundColor(e),k=q.getPanelTitleColor(e),l={Default:{color:m,backgroundColor:"transparent"},ReportTitle:{color:a,backgroundColor:"transparent"},TableHeader:{color:d.getContrastColor(g,void 0,void 0,200).toHex(),backgroundColor:g},GreyText:{color:d.transform(e,{dv:h?-33:33}).toHex(),backgroundColor:"transparent"},BlueText:{color:"#56A5D8",backgroundColor:"transparent"},AlternatingRow:{color:m,backgroundColor:d.transform(e,{dv:h?-7:7}).toHex()}},u=d.isLightColor(e),
e={document:{color:m,backgroundColor:e},table:l,chart:{backgroundColor:"transparent",titleStyle:{color:k},dataLabelsStyle:{color:f},xAxis:{lineColor:f,axisStyle:{color:f},titleStyle:{color:f}},yAxis:{lineColor:f,axisStyle:{color:f},titleStyle:{color:f}},legendStyle:{color:f,backgroundColor:e},ring:{ringBackground:{backgroundColor:n}},gauge:{dataLabelStyle:{color:g},othersColor:n,arrowIndicator:{lineColor:k,backgroundColor:k}},icon:{backgroundColor:g},columnBarBackground:{backgroundColor:n},comparisonInfo:{lineColor:u?
"#666666":"#BBBBBB"}},infographic:{backgroundColor:"transparent",agePyramid:{theme:h?"light":"common",male:{backgroundColor:g},female:{backgroundColor:a}},staticInfographic:{backgroundColor:"transparent",icon:{backgroundColor:g},highlightedIcon:{backgroundColor:a},iconBarBackground:{},titleLine:{color:d.transform(e,{dv:h?-40:40}).toHex()},titleStyle:{color:k},variableLabelStyle:{color:g},variableLabelStyleHighlighted:{color:a},variableLabelStyleContrast:{color:e},variableDescriptionStyle:{color:d.transform(e,
{dv:h?-50:50}).toHex()}}}};r&&r(e);p.populateObject(b,e,!0);b&&b.chart&&(b.chart.colors=c&&c.length?c:t._generateChartColors(g,a))},applyTextStyleToTheme:function(b,a){function c(b){return l.mixin({},a)}var d={document:c(),table:{Default:{color:a.color},ReportTitle:{color:a.color},TableHeader:{color:a.color},AlternatingRow:{color:a.color}},chart:{titleStyle:c(),dataLabelsStyle:c(),xAxis:{axisStyle:c(),titleStyle:c()},yAxis:{axisStyle:c(),titleStyle:c()},legendStyle:c()},infographic:{staticInfographic:{titleStyle:c(),
variableLabelStyle:c(),variableDescriptionStyle:c(),variableLabelStyleHighlighted:c(),variableLabelStyleContrast:c()}}};p.populateObject(b,d,!0)},removeBackgroundFromThemeElements:function(b,a){if(b&&(b.chart.backgroundColor="transparent",b.infographic.backgroundColor="transparent",b.infographic.staticInfographic=b.infographic.staticInfographic||{},b.infographic.staticInfographic.backgroundColor="transparent",a))for(var c in b.table)b.table[c].backgroundColor="transparent"}};return t});