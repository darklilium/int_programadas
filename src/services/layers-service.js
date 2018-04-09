import env from './config';
import cookieHandler from 'cookie-handler';

function getLayer(){
  var serviceMain, serviceURL;

  (env.BUILDFOR=="INTERNA") ? serviceMain = 'http://gisred.chilquinta/arcgis/' : serviceMain = 'https://gisred.chilquinta.cl:6443/arcgis/'

  serviceURL = serviceMain + 'rest/services/';
  var token = cookieHandler.get('tkn');

  return {
    read_tokenURL(){
      return serviceMain + "tokens/generateToken";
    },
    read_po_sectores(token){
      return serviceURL + "Interrupciones/PO_WEB_EXT/MapServer?f=json&token=" + token;
    }

  }
}

export default getLayer();
