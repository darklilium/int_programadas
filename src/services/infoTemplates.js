import InfoTemplate from 'esri/InfoTemplate';
import locale from 'dojo/date/locale';

function getInfoTemplate(){
  return {
    getTramos(){
      let chqInfoTemp= new InfoTemplate();
      chqInfoTemp.setTitle("<b>Falla :</b>");
      //var tipo_estado = ${'ARCGIS.DBO.SED_006.codigo'};
      //  console.log(tipo_estado);
      let chqInfoContent =
      "<div style=padding-top: 10px;><b>TIEMPO INICIO DE FALLA: </b> ${ARCGIS.DBO.POWERON_ORDENES.fecha_creacion}<br></div>"+
      "<div style=padding-top: 10px;><b>TIEMPO ESTIMADO REPOSICIÓN:</b> ${ARCGIS.DBO.POWERON_ORDENES.ETR}<br></div>";
      chqInfoTemp.setContent(chqInfoContent);
      return chqInfoTemp;
    },
    getCarsInfo_layerNominal(){
      let chqAlimInfoTemp= new InfoTemplate();
      chqAlimInfoTemp.setTitle("<b>Patente: ${CONTROL_FLOTA.dbo.GPS_MOVIL.id_placa}</b>");

      let chqAlimInfoContent =
      "<div style=padding-top: 10px;><b>Tipo:</b> ${CONTROL_FLOTA.dbo.GPS_MOVIL_TIPO.ds_nombre}<br></div>"+
      "<div style=padding-top: 10px;><b>Características:</b> ${CONTROL_FLOTA.dbo.GPS_CARACTERISTICA.ds_nombre}<br></div>"+
      "<div style=padding-top: 10px;><b>Empresa:</b> ${CONTROL_FLOTA.dbo.GPS_EMPRESA.ds_nombre}<br></div>"+
      "<div style=padding-top: 10px;><b>Zona Operación:</b> ${CONTROL_FLOTA.dbo.GPS_ZONA_OPERACION.ds_nombre}<br></div>"+
      "<div style=padding-top: 10px;><b>Operador:</b> ${CONTROL_FLOTA.dbo.GPS_MOVIL.ds_nom_operador}<br></div>"+
      "<div style=padding-top: 10px;><b>Proceso Nominal:</b> ${CONTROL_FLOTA.dbo.GPS_PROCESO_NOMINAL.ds_nombre}<br></div>"
      /*+
      "<div style=padding-top: 10px;><b>Latitud:</b> ${GISRED.DBO.%GIS_GPS_DATA_MF_Features.LATITUD}<br></div>"+
      "<div style=padding-top: 10px;><b>Longitud:</b> ${GISRED.DBO.%GIS_GPS_DATA_MF_Features.LONGITUD}<br></div>"
      */
      ;
      chqAlimInfoTemp.setContent(chqAlimInfoContent);
      return chqAlimInfoTemp;
    },
    getSectorCentroide(){
      let chqInfoTemp= new InfoTemplate();
      chqInfoTemp.setTitle("<b>Sector: ${ARCGIS.dbo.view_po_web_ext.NOMBRE_SECTOR}</b> ");
      //var tipo_estado = ${'ARCGIS.DBO.SED_006.codigo'};
      //  console.log(tipo_estado);
      let chqInfoContent =
      "<div style=padding-top: 10px;><b>% Clientes Interrumpidos: </b> ${ARCGIS.dbo.view_po_web_ext.PORCENTAJE}<br></div>";

      chqInfoTemp.setContent(chqInfoContent);
      return chqInfoTemp;
    }


  }
}

export default getInfoTemplate();
