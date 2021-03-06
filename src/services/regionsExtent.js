

import makeSymbol from './makeSymbol';
import Query from 'esri/tasks/query';
import QueryTask from 'esri/tasks/QueryTask';
import layers from './layers-service';
import Graphic from 'esri/graphic';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import Extent from 'esri/geometry/Extent';
import graphicsUtils from 'esri/graphicsUtils';

export var gLayerTramos = new GraphicsLayer();

var gLayerSector = new GraphicsLayer();

function getComunaExtent(comuna){

  var promise = new Promise((resolve,reject)=>{

      resolve(
        regionsExtent().filter(c=>{
          ////console.log(c[0], comuna);
          return c[0]==comuna;
        })
      );

  })
  return promise;
}

function regionsExtent(){
  //region, latx, laty, zoom
  return [
    ["ALGARROBO", -71.67062,-33.3648,13],
    ["CABILDO", -71.0662, -32.4258,13],
    ["CALLE LARGA", -70.6258,-32.8575,13],
    ["CARTAGENA", -71.6046,-33.5482,13],
    ["CASABLANCA", -71.4076, -33.319, 13],
    ["CATEMU", -70.9627,-32.7788,13],
    ["CONCON", -71.5235 ,-32.9239,13],
    ["EL QUISCO", -71.6982,-33.3986, 13],
    ["EL TABO", -71.6669, -33.4557, 13],
    ["HIJUELAS", -71.1437 ,-32.798, 13],
    ["LA CALERA", -71.204 ,-32.7878,13],
    ["LA CRUZ",-71.2273,-32.8258, 13],
    ["LA LIGUA", -71.2326, -32.4499,13],
    ["LIMACHE", -71.2596, -33.0095, 13],
    ["LLAY LLAY", -70.9428,-32.8444,13],
    ["LOS ANDES", -70.5972,-32.8338,13],
    ["NOGALES", -71.2042 , -32.7333,13],
    ["OLMUE",-71.1859,-32.9962,13],
    ["PANQUEHUE", -70.8333,-32.767,13],
    ["PAPUDO", -71.4485 , -32.5072,13],
    ["PETORCA", -70.9333 ,-32.25,13],
    ["PUCHUNCAVI", -71.4117, -32.722,13],
    ["PUTAENDO",-70.7177,-32.6285,13],
    ["QUILLOTA", -71.2497 ,-32.8803,13],
    ["QUILPUE", -71.4311 ,-33.0497,13],
    ["QUINTERO", -71.5333, -32.7723,13],
    ["RINCONADA", -70.701,-32.8352,13],
    ["SAN ANTONIO", -71.6131 , -33.5836,13],
    ["SAN ESTEBAN", -70.5798,-32.8005,13],
    ["SAN FELIPE", -70.7208,-32.75,13],
    ["SANTA MARIA", -70.6587,-32.747,13],
    ["SANTO DOMINGO", -71.6309,-33.6366,13],
    ["VALPARAISO",-71.6272,-33.0394,13],
    ["VILLA ALEMANA", -71.3734,-33.0476,13],
    ["VIÑA DEL MAR",-71.5523, -33.0245, 13],
    ["ZAPALLAR", -71.4589 , -32.5536,13],
    ["CAUQUÉNES", -72.3314, -35.9597,13],
    ["CONSTITUCIÓN", -72.4094, -35.3335,13],
    ["CURACAVI", -71.1575, -33.4004,13],
    ["EMPEDRADO", -72.2861, -35.5924,13],
    ["LINARES", -71.6049, -35.8465,13],
    ["LONGAVÍ", -71.6899, -35.9623,13],
    ["NINHUE", -72.4061, -36.3947,13],
    ["NOGALES", -71.2078, -32.7382,13],
    ["ÑIQUEN", -71.9102, -36.2941,13],
    ["PARRAL", -71.8373, -36.1462,13],
    ["RETIRO", -71.7667, -36.0500,13],
    ["RINCONADA", -72.5351, -36.7295,13],
    ["SAN CARLOS", -71.9862, -36.4199,13]
  ];

}

function getSector(idsector, token){
  var promise = new Promise((resolve, reject)=>{

    var qTask = new QueryTask(layers.read_po_sectores_programados(token));
    var q = new Query();

    q.returnGeometry = true;
    q.outFields=["*"];
    q.where = `ID_SW='${idsector}'`;

    qTask.execute(q, (featureSet)=>{
      //console.log(featureSet.features,"sectoresgetsector");
      resolve(featureSet.features[0])
    }, (error)=>{
      //console.log(error,"Error doing query for getSector");
      reject(error)
    });
  })
  return promise;
}

function getTramosInterrumpidos(sector){
  var promise = new Promise((resolve, reject)=>{

    let mySymbol = makeSymbol.makeLine();

    var qTask = new QueryTask(layers.read_redes_interrumpidas());
    var q = new Query();

    q.returnGeometry = true;
    q.outFields=["*"];
    q.where = "WEBPORTAL.dbo.SDD_DESCONEXIONES.id_desconexion='" + sector + "'";

    qTask.execute(q, (featureSet)=>{
     
      var graphicsArray = featureSet.features.map(f=>{
        return new Graphic(f.geometry, mySymbol, f.attributes)
      });

      var extent = esri.graphicsExtent(graphicsArray); 
      
      resolve([featureSet, extent])
    }, (error)=>{
      console.log(error,"Error doing query for getSector");
      reject(error)
    });

  });

  return promise;
}
export {regionsExtent, getComunaExtent, getSector, getTramosInterrumpidos};
