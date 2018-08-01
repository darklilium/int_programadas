import InfoTemplate from 'esri/InfoTemplate';
import locale from 'dojo/date/locale';

function getInfoTemplate(){
  return {
    getTramos(){
      let chqInfoTemp= new InfoTemplate();
      chqInfoTemp.setTitle("<b>Falla :</b>");
      //var tipo_estado = ${'ARCGIS.DBO.SED_006.codigo'};
      //  //console.log(tipo_estado);
      let chqInfoContent =
      "<div style=padding-top: 10px;><b>TIEMPO INICIO DE FALLA: </b> ${WEBPORTAL.dbo.SDD_DESCONEXIONES.hr_inicio}<br></div>"+
      "<div style=padding-top: 10px;><b>TIEMPO ESTIMADO REPOSICIÓN:</b> ${WEBPORTAL.dbo.SDD_DESCONEXIONES.hr_termino}<br></div>";
      chqInfoTemp.setContent(chqInfoContent);
      return chqInfoTemp;
    }
  }
}

export default getInfoTemplate();
