// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/dataProviders/DataProviderGE","dojo/_base/declare dojo/_base/lang dojo/promise/all dojo/when ./_CommandSupport ./_SerializationSupport ./_ServerSerializationSupport ./supportClasses/CustomReportsManager ./supportClasses/TemplateJsonLoader ./supportClasses/ReportDataProcessor ./supportClasses/InfographicOptionsProvider ./supportClasses/AreasPreprocessor ./supportClasses/GEUtil ./supportClasses/attachments/DefaultAttachmentsStore ../core/themes/ThemeLibrary ../core/themes/ReportThemes ../core/supportClasses/templateJsonUtils/countryConfig esri/dijit/geoenrichment/utils/UrlUtil".split(" "),
function(l,q,r,n,t,u,v,d,w,g,x,y,m,z,A,p,h,B){return l([t,u,v],{analysisAreasLimit:-1,cacheTemplates:!0,printMapTaskUrl:null,_infographicOptionsProvider:null,constructor:function(){this._infographicOptionsProvider=new x},_getAttachmentsStore:function(b){return(new z(b)).initialize()},getCustomReports:function(b,c){return d.getCustomReports(b,c)},_currentContext:null,getReportData:function(b,c){var f=this;c=c||function(){};B.registerCORS(b.geoenrichmentUrl);var a=q.mixin({},b);a.fieldData={runReportTaskID:null,
metadata:{},areaData:[],errors:[]};this._currentContext=a;this._infographicOptionsProvider.setServerUrl(a);d.resetCache();return n(y.preprocessAreas(a,{analysisAreasLimit:f.analysisAreasLimit}),function(){c(.25);return r({initGE:m.initialize(a.geoenrichmentUrl),countryInfo:m.getCountryInfo(a.geoenrichmentUrl,a.countryID),reportObject:d.getCustomReportByID(a),infographicOptions:f._infographicOptionsProvider.getInfographicOptions(a),attachmentsStore:f._getAttachmentsStore(a),templateJson:w.getTemplateJsonByID(a,
f.cacheTemplates),runReportResult:g.runReportAndGetData(a)}).then(function(b){var e=b.reportObject,f=b.infographicOptions,d=b.attachmentsStore,k=b.templateJson,l=b.runReportResult;c(.75);if(!k||!e||!a.fieldData)return null;g.applyRunReportAndGetDataResults(l,a);h.setCountry(b.countryInfo.country);h.setHierarchyID(e.hierarchy);h.setGeographiesModel(b.countryInfo.geographiesModels[h.getHierarchyID()]);return n(d&&g.populateReportDataFromAttachmentsStore(a,d),function(){c(1);k.theme||(k.theme=A.getReportThemeById(e.isGraphicReport?
p.GRAPHIC:p.CLASSIC));return{isClassic:!e.isGraphicReport,reportType:e.type,reportTitle:e.title,templateJson:k,reportObject:e,fieldData:a.fieldData,analysisAreas:a.analysisAreas,infographicOptions:f,attachmentsStore:d,geClient:m.getClient(),config:{portalUrl:a.portalUrl,geoenrichmentUrl:a.geoenrichmentUrl,countryID:a.countryID,reportID:a.reportID}}})})})},_getCurrentContext:function(){return this._currentContext},enrichFieldData:function(b,c){return g.enrichFieldData(b,c)}})});