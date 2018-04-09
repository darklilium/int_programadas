import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/myStyles.scss';
import Map from 'esri/map';
import {Container} from 'semantic-ui-react';
import ToggleSymbology from './ToggleSymbology';
import BottomSidebar from './BottomSidebar';
import Symbology from './Symbology';
import {userLogin,
  showNotification, dismissNotification, saveRegion} from '../redux/actions';
import {connect} from 'react-redux';

import {regionsExtent, getComunaExtent}  from '../services/regionsExtent';
import {getURLParameters} from '../services/parameters';
import ArcGISDynamicMapServiceLayer from 'esri/layers/ArcGISDynamicMapServiceLayer';
import getLayer from '../services/layers-service';
import BasemapToggle from "esri/dijit/BasemapToggle";
import getInfoTemplate from '../services/infoTemplates';
import {conf} from '../services/config';

class Main extends React.Component {

  componentDidMount(){
    const {login_in, token} = this.props;

    var c = getURLParameters();
    if (c.comuna) {
      console.log(`COMUNA: ${c.comuna}`)
    }else{
       console.log("COMUNA DEFAULT: VALPARAISO");
       c.comuna = "VALPARAISO";
    }

    var comuna = getComunaExtent(c.comuna)
      .then(r=>{
          var map = new Map("map", {
            center: [r[0][1] ,r[0][2]],
            basemap: "topo",
            zoom: r[0][3],
            logo: false
          });


          var login = login_in(conf().user,conf().pass)
          .then(logged=>{
              if(logged!=false){
                var interrClienteSED = new ArcGISDynamicMapServiceLayer(getLayer.read_po_sectores(this.props.token),{id:"po_sectores"});
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

              }else{
                console.log("Problemas al realizar login, favor contacte al desarrollador/a.");
              }
          })
          .catch(e=>{
            console.log("Problemas al realizar login, favor contacte al desarrollador/a.");
          });
      });
  }

  render(){
    return (
      <Container className="map_container">
        <div id="map"></div>
        {/*<ToggleSymbology theClass="symb_"/>*/}
        <div className="message_container">
          {/*<BottomSidebar />*/}
        </div>
        <div className="symbology_container">
          <Symbology />
        </div>
        <div id="BasemapToggle"></div>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    login_in: (user,pass) => dispatch(userLogin(user,pass))
  }
}

const mapStateToProps = state => {
  return {
    token: state.login.token
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);
