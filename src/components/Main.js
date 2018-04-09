import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/myStyles.scss';
import Map from 'esri/map';
import {Container} from 'semantic-ui-react';
import ToggleSymbology from './ToggleSymbology';
import BottomSidebar from './BottomSidebar';
import Symbology from './Symbology';
import {innerLogin} from '../services/login-service';
import {showNotification, dismissNotification, saveRegion} from '../redux/actions';
import {connect} from 'react-redux';
import store from '../redux/store';
import {regionsExtent, getComunaExtent}  from '../services/regionsExtent';
import {getURLParameters} from '../services/parameters';
import ArcGISDynamicMapServiceLayer from 'esri/layers/ArcGISDynamicMapServiceLayer';
import getLayer from '../services/layers-service';
import BasemapToggle from "esri/dijit/BasemapToggle";
import getInfoTemplate from '../services/infoTemplates';

class Main extends React.Component {

  componentDidMount(){

    var c = getURLParameters();


    if (c.comuna) {
      console.log(`COMUNA: ${c.comuna}`)
    }else{
       console.log("COMUNA DEFAULT: VALPARAISO");
       c.comuna = "VALPARAISO";
    }

    var comuna = getComunaExtent(c.comuna);
    comuna.then(r=>{
        var map = new Map("map", {
          center: [r[0][1] ,r[0][2]],
          basemap: "topo",
          zoom: r[0][3],
          logo: false
        });


        var login = innerLogin('vialactea\\usrgis','N3L4y5HZ');
        login.then(r=>{
          store.dispatch(showNotification("Agregar comentarios aquí"));
          store.dispatch(dismissNotification(false));
          //store.dispatch(saveRegion("Valparaíso"))

          //continue
          //agregando layer clientes sed.
          var interrClienteSED = new ArcGISDynamicMapServiceLayer(getLayer.read_po_sectores(),{id:"po_sectores"});
            interrClienteSED.setInfoTemplates({
              0: {infoTemplate: getInfoTemplate.getSectorCentroide()},
              1: {infoTemplate: getInfoTemplate.getTramos()}
            });

            interrClienteSED.refreshInterval = 1;
            interrClienteSED.setImageFormat("png32");

      
          map.addLayers([interrClienteSED]);

          var toggle = new BasemapToggle({
            map: map,
            basemap: "hybrid"
          }, "BasemapToggle");
          toggle.startup();

        },e=>{
          store.dispatch(showNotification("Error al visualizar el mapa. Login incorrecto."));
          store.dispatch(dismissNotification(true));
          //store.dispatch(saveRegion(""))
        });

    });


  }
  render(){
    return (

      <Container className="map_container">
        <div id="map"></div>
        {/*<ToggleSymbology theClass="symb_"/>*/}
        <div className="message_container">
          <BottomSidebar />
        </div>
        <div className="symbology_container">
          <Symbology />
        </div>
        <div id="BasemapToggle"></div>
      </Container>


    );
  }
}



export default Main;
