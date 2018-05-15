import getLayer from './layers-service';
import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/query';

function searchInterruptions(nis,token){
  console.log(nis,token);
  var promise = new Promise((resolve,reject)=>{

    var qtask = new QueryTask(getLayer.read_nisAfectados(token));
    var q = new Query();
    q.returnGeometry = true;
    q.outFields = ["*"];
    q.where = `ARCGIS.dbo.CLIENTES_DATA_DATOS_006.nis=${nis}`;
    qtask.execute(q,(featureSet)=>{
      (featureSet.features.length>0) ? resolve('INTERRUMPIDO') : reject('SIN PROBLEMAS');
    },(error)=>{
      reject("NO SE ENCUENTRA NIS")
    });
  });
  return promise;
}

export {searchInterruptions}
