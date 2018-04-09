// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/reportContainers/containerGridUtils/QueryUtil",["dojo/dom-geometry"],function(h){var g={getLayoutCells:function(c,a,b){var d=[];c.getGrids().forEach(function(a){(a=a.getFieldCells({floatingCells:b&&b.floatingCells}))&&(d=d.concat(a))});return a?d.filter(function(b){return!a||b&&b.content&&b.content[a]}):d},findFirstEmptyLayoutCell:function(c){return function(){var a;g.getLayoutCells(c,"isEmpty").some(function(b){if(b.content.isEmpty())return a=b,
!0});return a}()},getFocusedLayoutCell:function(c){var a=[];c.getGrids().forEach(function(b){(b=b.getFocusedCells())&&(a=a.concat(b))});return a[0]},hasFocusedChild:function(c){return c.getGrids().some(function(a){return(a=a&&a.getFocusedCells())&&!!a.length})},collectFieldInfos:function(c,a){var b=[];g.getLayoutCells(c,"collectFieldInfos",{floatingCells:!0}).some(function(d){(d=d.content.collectFieldInfos(a))&&(b=b.concat(d))});return b},getSectionIndex:function(c,a){var b=0,d;c.getGrids().some(function(c){return c.getFieldCells().some(function(c){if(c===
a)return d=!0;b++})});return d&&b},getLayoutCellBySectionIndex:function(c,a){var b=0,d;c.getGrids().some(function(c){return c.getFieldCells().some(function(c){if(b===a)return d=c,!0;b++})});return d},screenToPageCoords:function(c,a,b,d){d=d||{};var f;c.getGrids().some(function(e){e=h.position(e.domNode);if(e.y<b&&e.y+e.h>b)return f={x:a-e.x,y:b-e.y},d.returnInScreenCoordinates||(e=c.getZoomInfo().scale,f.x/=e,f.y/=e),!0});return f}};return g});