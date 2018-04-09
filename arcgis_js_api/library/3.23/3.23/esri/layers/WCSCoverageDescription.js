// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.
//>>built
define("esri/layers/WCSCoverageDescription","dojo/_base/declare dojo/_base/lang dojo/has ../kernel ./TimeInfo ../geometry/Extent".split(" "),function(u,n,y,z,x,r){var w=function(c,b){var a;for(a=0;a<c.length;a++)if(b(c[a]))return a;return-1};u=u(null,{declaredClass:"esri.layers.WCSCoverageDescription",version:null,id:null,description:null,lonLatEnvelope:null,extent:null,supportedFormats:null,supportedInterpolations:null,bandInfo:null,timeInfo:null,multidimensionalInfo:null,resolution:null,columns:null,
rows:null,nativeCoverageDescription:null,_useEPSGAxis:!1,_REVERSED_LAT_LONG_RANGES:[[4001,4999],[2044,2045],[2081,2083],[2085,2086],[2093,2093],[2096,2098],[2105,2132],[2169,2170],[2176,2180],[2193,2193],[2200,2200],[2206,2212],[2319,2319],[2320,2462],[2523,2549],[2551,2735],[2738,2758],[2935,2941],[2953,2953],[3006,3030],[3034,3035],[3058,3059],[3068,3068],[3114,3118],[3126,3138],[3300,3301],[3328,3335],[3346,3346],[3350,3352],[3366,3366],[3416,3416],[20004,20032],[20064,20092],[21413,21423],[21473,
21483],[21896,21899],[22171,22177],[22181,22187],[22191,22197],[25884,25884],[27205,27232],[27391,27398],[27492,27492],[28402,28432],[28462,28492],[30161,30179],[30800,30800],[31251,31259],[31275,31279],[31281,31290],[31466,31700]],constructor:function(c,b){this.version=b;this._parse=n.hitch(this,this._parse);c&&n.mixin(this,this._parse(c,b))},_parse:function(c,b){var a,d,h;this.version=b;switch(b){case "1.0.0":a=this._parse100(c);this._useEPSGAxis=!1;this.id=a.name;this.description=a.description||
a.label;this.lonLatEnvelope=a.lonLatEnvelope;this.extent=a.domainSet.spatialDomain.envelope;this.supportedFormats=a.supportedFormats;d=a.domainSet;h=a.rangeSet;a.supportedInterpolations&&0<a.supportedInterpolations.length&&(this.supportedInterpolations=a.supportedInterpolations.map(function(b){var a=null;-1<b.toLowerCase().indexOf("nearest")?a=0:-1<b.toLowerCase().indexOf("linear")?a=1:-1<b.toLowerCase().indexOf("cubic")&&(a=2);return a}).filter(function(b){return null!==b}));break;case "1.1.0":case "1.1.1":case "1.1.2":a=
this._parse110(c);this.id=a.identifier;this.description=a["abstract"]||a.title;this.extent=a.domain.spatialDomain.envelope;this.supportedFormats=a.supportedFormats;d=a.domain;h=a.range;a.range[0].supportedInterpolations&&0<a.range[0].supportedInterpolations.length&&(this.supportedInterpolations=a.range[0].supportedInterpolations.map(function(b){var a=null;-1<b.toLowerCase().indexOf("nearest")?a=0:-1<b.toLowerCase().indexOf("linear")?a=1:-1<b.toLowerCase().indexOf("bicubic")&&(a=2);return a}).filter(function(b){return null!==
b}));break;case "2.0.1":a=this._parse201(c);this._useEPSGAxis=!0;this.id=a.coverageId;this.description=a.description||a.coverageId;this.extent=a.boundedBy.envelope;this.supportedFormats=a.serviceParameters.supportedFormats;d=a.domainSet;h=a.rangeType;break;default:throw"unsupported WCS version "+b;}this.nativeCoverageDescription=a;this.resolution=a.resolution;this.columns=d.columns||d.spatialDomain.columns;this.rows=d.rows||d.spatialDomain.rows;this.bandInfo=this._getBandInfo(h);this.timeInfo=this._getTimeInfo(a);
this.multidimensionalInfo=this._getMultidimensionalInfo(a)},_getElements:function(c,b){if(!c)return null;if(!b)return c;var a=b;-1<b.indexOf("/")?(a=b.slice(0,b.indexOf("/")),b=b.slice(b.indexOf("/")+1)):b="";return b?this._getElement(c,a).getElementsByTagNameNS("*",b):c.getElementsByTagNameNS("*",a)},_getElement:function(c,b){if(!c)return null;if(!b)return c;var a=b;-1<b.indexOf("/")?(a=b.slice(0,b.indexOf("/")),b=b.slice(b.indexOf("/")+1)):b="";a=this._getElements(c,a);return 0<a.length?b?this._getElement(a[0],
b):a[0]:null},_getElementValue:function(c,b){var a=this._getElement(c,b);return a?(a=a.textContent||a.text||a.nodeValue||a.innerText)?a.trim():null:null},_getElementValues:function(c,b){var a=this._getElements(c,b),d=[],h,k;for(k=0;k<a.length;k++)if(h=a[k].textContent||a[k].text||a[k].nodeValue||a[k].innerText)h=h.trim(),""!==h&&d.push(h);return d},_checkTagName:function(c,b){if(null===c||null===b||null===c.tagName||void 0===c.tagName)return!1;var a=c.tagName.toLowerCase(),d=b.toLowerCase();return a===
d||0<a.indexOf(":"+d)},_parseTimeResolution:function(c){if(!c)return{resolution:null,units:null};var b=c.toUpperCase(),a=["Y","M","D"],d=["H","M","S"];c="Years Months Days Hours Minutes Seconds".split(" ");var h;-1===b.indexOf("PT")?(b=b.slice(1),a=w(a,function(a){return-1<b.indexOf(a)}),-1<a&&(h=c[a])):(b=b.slice(2),a=w(d,function(a){return-1<b.indexOf(a)}),h=c[3+a]);return{resolution:parseFloat(b.substring(0,b.length-1)),units:h}},_getMultidimensionalInfo:function(c){var b,a,d=this.version,h=[];
if(0===d.indexOf("1.1"))(a=c.range.filter(function(a){return-1===a.identifier.toLowerCase().indexOf("field_1")&&!a.axis.some(function(a){return"band"===a.identifier.toLowerCase()})}))&&0<a.length&&(a.forEach(function(a){var b=a.axis.map(function(a){a={name:a.identifier.trim(),field:a.identifier.trim(),unit:a.valuesUnit?a.valuesUnit.trim():"",hasRegularIntervals:!1,values:a.values.map(function(a){return parseFloat(a.trim())})};a.extent=[Math.min.apply(null,a.values),Math.max.apply(null,a.values)];
return a});h.push({name:a.identifier.trim(),description:a.description?a.description.trim():"",unit:"",dimensions:b})}),0<h.length&&(b={variables:h}));else if(0===d.indexOf("2.0")&&(a=[],c.rangeType.forEach(function(b){a=a.concat(b.filter(function(a){return-1===a.name.toLowerCase().indexOf("band")}))}),a&&0<a.length)){var k=[],d=function(a){var b,g="";Math.abs(a-1/24)<1/24*.01?(b=1,g="Hours"):.01>Math.abs(a-1)?(b=1,g="Days"):1>a?(b=Math.round(24*a),g="Hours"):27.99<a&&31.01>a?(b=1,g="Months"):12>Math.round(a/
30)?(b=12>Math.round(a/30),g="Months"):364.99<a&&366.01>a&&(b=1,g="Years");return{interval:b,intervalUnit:g}},m=c.boundedBy,e,l,p,f;for(e=2;e<c.domainSet.axisLabels.length;e++)l=(m.uomLabels&&m.uomLabels.length)>e?m.uomLabels[e]:"",l=(p=-1<c.domainSet.axisLabels[e].toLowerCase().indexOf("time")||"iso8601"===l.toLowerCase())?d(c.domainSet.offset[e]):{interval:c.domainSet.offset[e],intervalUnit:l},f={name:c.domainSet.axisLabels[e].trim(),field:c.domainSet.axisLabels[e].trim(),unit:m.uomLabels&&m.uomLabels.length>
e?m.uomLabels[e].trim():"",hasRegularIntervals:!0},n.mixin(f,l),f.extent=p?[(new Date).setTime(864E5*(c.boundedBy.envelopeAllDims.mins[e]-25569)),(new Date).setTime(864E5*(c.boundedBy.envelopeAllDims.maxs[e]-25569))]:[m.envelopeAllDims.mins[e],m.envelopeAllDims.maxs[e]],k.push(f);a.forEach(function(a){h.push({name:a.name.trim(),description:a.description.trim(),unit:a.uom.trim(),dimensions:k})});0<h.length&&(b={variables:h})}return b},_getBandInfo:function(c){var b,a,d=!1,h;switch(this.version){case "1.0.0":for(b=
0;b<c.length&&!d;b++)for(a=0;a<c[b].axis.length;a++)if("band"===c[b].axis[a].name.toLowerCase()){h=c[b].axis[a].values;d=!0;break}break;case "1.1.0":case "1.1.1":case "1.1.2":for(b=0;b<c.length&&!d;b++)for(a=0;a<c[b].axis.length;a++)if("band"===c[b].axis[a].identifier.toLowerCase()){h=c[b].axis[a].values;d=!0;break}break;case "2.0.1":for(b=0;b<c[0].length;b++)-1<c[0][b].name.toLowerCase().indexOf("band")&&(h=h||[],h.push(c[0][b].name))}return h},_useLatLong:function(c){var b,a;for(a=0;a<this._REVERSED_LAT_LONG_RANGES.length;a++){var d=
this._REVERSED_LAT_LONG_RANGES[a];if(c>=d[0]&&c<=d[1]){b=!0;break}}return b},_getTimeInfo:function(c){var b,a;switch(this.version){case "1.0.0":case "1.1.0":case "1.1.1":case "1.1.2":(c=(c.domainSet||c.domain).temporalDomain)&&(b=new x({timeExtent:[c.begin,c.end],interval:c.resolution,intervalUnit:c.unit}));break;case "2.0.1":a=w(c.domainSet.axisLabels,function(a){return-1<a.toLowerCase().indexOf("time")}),-1<a&&(b=new x({startTimeField:c.domainSet.axisLabels[a],timeExtent:[(new Date).setTime(864E5*
(c.boundedBy.envelopeAllDims.mins[a]-25569)),(new Date).setTime(864E5*(c.boundedBy.envelopeAllDims.maxs[a]-25569))]}))}return b},_parse100:function(c){var b={name:null,label:null,lonLatEnvelope:null,supportedFormats:null,supportedCRSs:null,domainSet:null,rangeSet:null,description:null,metadataLink:null,supportedInterpolations:null},a=c.childNodes.length,d=this._checkTagName,h=n.hitch(this,function(a){var b=this._getElementValues(a,"requestResponseCRSs").map(function(a){return a.split(":")[1]});a=
this._getElementValues(a,"nativeCRSs").map(function(a){return a.split(":")[1]});return{requestResponseCRSs:b,nativeCRSs:a}}),k=n.hitch(this,function(a){var b=this._getElementValues(a,"interpolationMethod"),g=a.getAttribute("default");return void 0!==g||null!==g?[g].concat(b.filter(function(a){return a.toLowerCase()!==g.toLowerCase()})):b}),m=n.hitch(this,function(a){var b=this._getElements(a,"pos");a=this._getElementValue(b[0]).split(" ");b=this._getElementValue(b[1]).split(" ");return new r({xmin:parseFloat(a[0]),
ymin:parseFloat(a[1]),xmax:parseFloat(b[0]),ymax:parseFloat(b[1]),spatialReference:{wkid:4326}})}),e=n.hitch(this,function(a){var b=[];a=this._getElements(a,"RangeSet");var c,g,f,d,e,h,l,k;for(l=0;l<a.length;l++){c={};c.name=this._getElementValue(a[l],"name");c.label=this._getElementValue(a[l],"label");c.axis=[];g=this._getElements(a[l],"AxisDescription");for(k=0;k<g.length;k++){f={};f.name=this._getElementValue(g[k],"name");f.label=this._getElementValue(g[k],"label");d=[];d=this._getElementValues(g[k],
"singleValue");if(0===d.length&&(e=this._getElementValue(g[k],"min"),h=this._getElementValue(g[k],"max"),null!==e&&null!==h))for(e=parseInt(e,10);e<=parseInt(h,10);e++)d.push(e);f.values=d;c.axis.push(f)}b.push(c)}return b}),l=n.hitch(this,function(a){var b={},c={},f=this._getElement(a,"spatialDomain"),g=this._getElement(f,"Envelope")||this._getElement(f,"EnvelopeWithTimePeriod"),d=g.getAttribute("srsName").split(":"),d=d[d.length-1],e=this._getElements(g,"pos"),g=this._getElementValue(e[0]).split(" "),
e=this._getElementValue(e[1]).split(" ");c.envelope=new r({xmin:parseFloat(g[0]),ymin:parseFloat(g[1]),xmax:parseFloat(e[0]),ymax:parseFloat(e[1]),spatialReference:{wkid:parseInt(d,10)}});var d=this._getElement(f,"RectifiedGrid"),g=this._getElementValue(d,"low").split(" "),e=this._getElementValue(d,"high").split(" "),d=parseInt(e[0],10)-parseInt(g[0],10)+1,g=parseInt(e[1],10)-parseInt(g[1],10)+1,e=this._getElementValue(f,"origin/pos").split(" "),l=this._getElements(f,"offsetVector"),f=parseFloat(this._getElementValue(l[0]).split(" ")[0]),
l=parseFloat(this._getElementValue(l[0]).split(" ")[1]);c.columns=d;c.rows=g;c.offset={x:f,y:l};c.origin={x:parseFloat(e[0]),y:parseFloat(e[1])};b.spatialDomain=c;c={begin:null,end:null};f=[];if(d=this._getElement(a,"temporalDomain")){a=this._getElements(d,"timeposition");if(0<a.length){for(d=0;d<a.length;d++)f.push(new Date(this._getElementValue(a[d])));c.begin=f[0];c.end=f[f.length-1];c.values=f}else if(a=this._getElement(d,"timePeriod"))c.begin=new Date(this._getElementValue(a,"beginPosition")),
c.end=new Date(this._getElementValue(a,"endPosition")),a=this._getElementValue(a,"timeResolution"),c=n.mixin(c,this._parseTimeResolution(a));b.temporalDomain=c}return b}),p,f;for(p=0;p<a;p++)f=c.childNodes[p],d(f,"description")?b.description=this._getElementValue(f):d(f,"name")?b.name=this._getElementValue(f):d(f,"label")?b.label=this._getElementValue(f):d(f,"supportedFormats")?b.supportedFormats=this._getElementValues(f,"formats"):d(f,"supportedCRSs")?b.supportedCRSs=h(f):d(f,"supportedInterpolations")?
b.supportedInterpolations=k(f):d(f,"lonLatEnvelope")?b.lonLatEnvelope=m(f):d(f,"rangeSet")?b.rangeSet=e(f):d(f,"domainSet")&&(b.domainSet=l(f),b.resolution=b.domainSet.spatialDomain.offset);return b},_parse110:function(c){var b={title:null,"abstract":null,identifier:null,supportedFormats:null,supportedCRSs:null,domain:null,range:null,metadata:null},a=c.childNodes.length,d=this._checkTagName,h=n.hitch(this,function(a){var b=[];a=this._getElements(a,"Field");var c,g,d,e,h;for(c=0;c<a.length;c++){d=
{};d.identifier=this._getElementValue(a[c],"Identifier");d.description=this._getElementValue(a[c],"Description");d.definition=this._getElementValue(a[c],"Definition");d.Abstract=this._getElementValue(a[c],"Abstract");d.Title=this._getElementValue(a[c],"Title");d.supportedInterpolations=this._getElementValues(a[c],"InterpolationMethod");d.axis=[];h=this._getElements(a[c],"Axis");for(g=0;g<h.length;g++)e={},e.identifier=h[g].getAttribute("identifier"),e.valuesUnit=this._getElementValue(h[g],"valuesUnit"),
e.dataType=this._getElementValue(h[g],"DataType"),e.values=this._getElementValues(h[g],"Key"),d.axis.push(e);b.push(d)}return b}),k=n.hitch(this,function(a){for(var b={},c={},g=this._getElement(a,"SpatialDomain"),d=this._getElement(g,"GridCRS"),e=this._getElementValue(d,"GridBaseCRS"),h=this._getElementValue(d,"GridOrigin"),h=h?h.split(" "):[0,0],d=this._getElementValue(d,"GridOffsets").split(" "),q=this._getElements(g,"BoundingBox"),k,l,m,t,v,g=0;g<q.length;g++)"urn:ogc:def:crs:OGC::imageCRS"===
q[g].getAttribute("crs")?(m=this._getElementValue(q[g],"LowerCorner").split(" "),t=this._getElementValue(q[g],"UpperCorner").split(" "),k=parseInt(t[0],10)-parseInt(m[0],10)+1,l=parseInt(t[1],10)-parseInt(m[1],10)+1):0<q[g].getAttribute("crs").indexOf("EPSG")&&(v=q[g].getAttribute("crs").split("::")[1],m=this._getElementValue(q[g],"LowerCorner").split(" "),t=this._getElementValue(q[g],"UpperCorner").split(" "),c.envelope=new r({xmin:parseFloat(m[0]),ymin:parseFloat(m[1]),xmax:parseFloat(t[0]),ymax:parseFloat(t[1]),
spatialReference:{wkid:parseInt(v,10)}}));g=k>l;q=c.envelope.xmax-c.envelope.xmin>c.envelope.ymax-c.envelope.ymin;this._useLatLong(v)&&(g===q?this._useEPSGAxis=!1:(this._useEPSGAxis=!0,c.envelope=new r({xmin:c.envelope.ymin,ymin:c.envelope.xmin,xmax:c.envelope.ymax,ymax:c.envelope.xmax,spatialReference:{wkid:parseInt(v,10)}})));c.columns=k;c.rows=l;c.origin={x:parseFloat(h[0]),y:parseFloat(h[1])};c.offset={x:parseFloat(d[0]),y:parseFloat(d[1])};c.gridBaseCRS=e;b.spatialDomain=c;c={begin:null,end:null};
e=[];if(h=this._getElement(a,"temporalDomain")){a=this._getElements(h,"timeposition");if(0<a.length){for(g=0;g<a.length;g++)e.push(new Date(this._getElementValue(a[g])));c.begin=e[0];c.end=e[e.length-1];c.values=e}else a=this._getElements(h,"timePeriod"),0<a.length&&(c.begin=new Date(this._getElementValue(a[0],"beginPosition")),c.end=new Date(this._getElementValue(a[0],"endPosition")),a=this._getElementValue(a[0],"timeResolution"),c=n.mixin(c,this._parseTimeResolution(a)));b.temporalDomain=c}return b}),
m,e;for(m=0;m<a;m++)e=c.childNodes[m],d(e,"Title")?b.title=this._getElementValue(e):d(e,"Abstract")?b["abstract"]=this._getElementValue(e):d(e,"Identifier")?b.identifier=this._getElementValue(e):d(e,"SupportedFormat")?(b.supportedFormats||(b.supportedFormats=[]),b.supportedFormats.push(this._getElementValue(e))):d(e,"SupportedCRS")?(b.supportedCRSs||(b.supportedCRSs=[]),b.supportedCRSs.push(this._getElementValue(e))):d(e,"Range")?b.range=h(e):d(e,"Domain")&&(b.domain=k(e),b.resolution=b.domain.spatialDomain.offset);
return b},_parse201:function(c){var b={coverageId:null,boundedBy:null,domainSet:null,rangeType:null,serviceParameters:null,coverageFunction:null,extension:null},a=c.childNodes.length,d=function(a){return parseFloat(a)},h=function(a){return parseInt(a,10)},k=this._checkTagName,m=n.hitch(this,function(a){var b={envelope:null,axisLabels:null,uomLabels:null,envelopeAllDims:null};a=this._getElement(a,"Envelope");var c=a.getAttribute("srsName"),c=c.slice(c.lastIndexOf("/")+1),g=a.getAttribute("axisLabels"),
e=this._getElementValue(a,"lowerCorner").split(" ").map(d),f=this._getElementValue(a,"upperCorner").split(" ").map(d);"y lat latitude north nor n b".split(" ").some(function(a){return a===g[0].toLowerCase()})?b.envelope=new r({xmin:e[1],ymin:e[0],xmax:f[1],ymax:f[0],spatialReference:{wkid:parseInt(c,10)}}):b.envelope=new r({xmin:e[0],ymin:e[1],xmax:f[0],ymax:f[1],spatialReference:{wkid:parseInt(c,10)}});b.axisLabels=g;b.envelopeAllDims={mins:e,maxs:f};a=a.getAttribute("uomLabels").trim().split(" ");
b.uomLabels=a.length?a:null;return b}),e=n.hitch(this,function(a){var b=[];a=this._getElements(a,"DataRecord");var c,d,e,g,f,h,k=function(a){return a.map(function(a){return parseFloat(a)})};for(g=0;g<a.length;g++){c=this._getElements(a[g],"field");d=[];for(f=0;f<c.length;f++){e={};e.name=c[f].getAttribute("name");e.description=this._getElementValue(c[f],"description")||"";e.uom=this._getElement(c[f],"uom").getAttribute("code")||"";if(h=this._getElementValue(c[f],"interval"))h=h.split(" "),e.allowedValues=
k(h);d.push(e)}b.push(d)}return b}),l=n.hitch(this,function(a){var b={},c=this._getElement(a,"RectifiedGrid"),e=this._getElementValue(c,"low").split(" ").map(h),f=this._getElementValue(c,"high").split(" ").map(h);a=[];var g;for(g=0;g<e.length;g++)a.push(f[g]-e[g]+1);var k=this._getElementValue(c,"axisLabels").split(" "),e=this._getElementValue(c,"origin/pos").split(" ").map(d),c=this._getElements(c,"offsetVector"),f=[];for(g=0;g<c.length;g++)f.push(parseFloat(this._getElementValue(c[g]).split(" ")[g]));
"y lat latitude north nor n b".split(" ").some(function(a){return a===k[0].toLowerCase()})?(b.columns=a[1],b.rows=a[0],b._resolution={y:f[0],x:f[1]}):(b.columns=a[0],b.rows=a[1],b._resolution={x:f[0],y:f[1]});b.gridSamples=a;b.axisLabels=k;b.offset=f;b.origin=e;return b}),p,f;for(p=0;p<a;p++)f=c.childNodes[p],k(f,"coverageId")?b.coverageId=this._getElementValue(f):k(f,"ServiceParameters")?b.serviceParameters={supportedFormats:this._getElementValues(f,"nativeFormat")}:k(f,"boundedBy")?b.boundedBy=
m(f):k(f,"rangeType")?b.rangeType=e(f):k(f,"domainSet")&&(b.domainSet=l(f),b.resolution=b.domainSet._resolution);return b}});y("extend-esri")&&n.setObject("layers.WCSCoverageDescription",u,z);return u});