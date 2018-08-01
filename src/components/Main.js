import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/myStyles.scss';

import {Container, Divider, Message, Icon, Button} from 'semantic-ui-react';
import ToggleSymbology from './ToggleSymbology';
import BottomSidebar from './BottomSidebar';
import Symbology from './Symbology';
import {userLogin, sectorInfo, getSectorLocation,
  showNotification, dismissNotification, saveRegion, toggleMobileVisibility} from '../redux/actions';
import {connect} from 'react-redux';

import {regionsExtent, getComunaExtent}  from '../services/regionsExtent';
import {getURLParameters} from '../services/parameters';
import ArcGISDynamicMapServiceLayer from 'esri/layers/ArcGISDynamicMapServiceLayer';
import FeatureLayer from 'esri/layers/FeatureLayer';
import getLayer from '../services/layers-service';
import BasemapToggle from "esri/dijit/BasemapToggle";
import getInfoTemplate from '../services/infoTemplates';
import {conf} from '../services/config';
import env from '../services/config';

import GraphicsLayer from 'esri/layers/GraphicsLayer';
import Graphic from 'esri/graphic';
import makeSymbol from '../services/makeSymbol';
import Extent from 'esri/geometry/Extent';
import scaleUtils from 'esri/geometry/scaleUtils';
import Point from 'esri/geometry/Point';

import VectorTileLayer from "esri/layers/VectorTileLayer";

import CustomSearch from './CustomSearch';
import mapa from '../services/map_service';
import Search from 'esri/dijit/Search';
import $ from 'jquery';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.dev = this.dev.bind(this);
    this.prod = this.prod.bind(this);

  }

  dev () {
    //console.log("DEVELOPMENT");
    var {login_in, sector} = this.props;

    var comuna = getComunaExtent(sector.comuna)
    .then(r=>{

        var map = mapa.createMap([r[0][1] ,r[0][2]],r[0][3]);
        var search = new Search({
            map: mapa.getMap(),
            zoomScale: 20000,
            countryCode: 'CHL'
        }, "search");
        search.startup();

        var login = login_in(conf().user,conf().pass)
        .then(logged=>{

          var {token, sectorLocation, sector} = this.props;

            if(logged!=false){

              //PARA POSTERIORMENTE HACER ZOOM
              sectorLocation(sector.idsector, token)
              .then(located =>{
                if(located){

                var sectores = new ArcGISDynamicMapServiceLayer(getLayer.read_po_sectores_programados_dyn(token),{
                  id:"po_sectores"
                });
                sectores.setVisibleLayers([0]);
                var layerDefinitions = [];
                layerDefinitions[0] = `ID_SW='${sector.idsector}'`;

                sectores.setLayerDefinitions(layerDefinitions);
                //var vtlayer = new VectorTileLayer("http://www.arcgis.com/sharing/rest/content/items/75f4dfdff19e445395653121a95a85db/resources/styles/root.json?f=pjson");

                var sectoresTramos = new ArcGISDynamicMapServiceLayer(getLayer.read_sectores_programados_tramos(token),{
                  id:"po_sectores_tramos"
                });

                sectoresTramos.setInfoTemplates({
                  3: {infoTemplate: getInfoTemplate.getTramos()}
                });
                sectoresTramos.refreshInterval = 1;
                sectoresTramos.setImageFormat("png32");

                sectoresTramos.setVisibleLayers([3]);
                var layerDefinitions2 = [];
                layerDefinitions[3] = `WEBPORTAL.dbo.SDD_DESCONEXIONES.id_desconexion='${sector.idDesconexion}'`;

                sectoresTramos.setLayerDefinitions(layerDefinitions2);

                map.addLayers([sectores, sectoresTramos])

                //console.log(this.props.sector.location,"?");
                var newExtent = new Extent(this.props.sector.location.getExtent())


                var centerX = (newExtent.xmin + newExtent.xmax) / 2;
                var centerY = (newExtent.ymin + newExtent.ymax) / 2;

                var centroid = new Point(centerX,centerY,newExtent.spatialReference)

                map.centerAndZoom(centroid,15)

                }else{
                  //console.log("no located");
                }
              })
              .catch(error=>{
                //console.log(error,"error with login query");
              });

              /*var toggle = new BasemapToggle({
                map: map,
                basemap: "hybrid"
              }, "BasemapToggle");
              toggle.startup();
              */
            }else{
              //console.log("Problemas al realizar login, favor contacte al desarrollador/a.");
            }
        })
        .catch(e=>{
          //console.log("Problemas al realizar login, favor contacte al desarrollador/a.");
        });
    });
  }

  prod (){
      //console.log("PRODUCTION");
      var {login_in, sector} = this.props;
      var params = getURLParameters();

      var comuna = getComunaExtent('VALPARAISO')
      .then(r=>{
          var map = mapa.createMap([r[0][1] ,r[0][2]],r[0][3]);
          var search = new Search({
              map: mapa.getMap(),
              zoomScale: 20000,
              countryCode: 'CHL'
          }, "search");
          search.startup();

          var login = login_in(conf().user,conf().pass)
          .then(logged=>{

            var {token, sectorLocation, sector} = this.props;

              if(logged!=false){

                //PARA POSTERIORMENTE HACER ZOOM
                sectorLocation(params.idsector, token)
                .then(located =>{
                  if(located){

                  var sectores = new ArcGISDynamicMapServiceLayer(getLayer.read_po_sectores_programados_dyn(token),{
                    id:"po_sectores"
                  });
                  sectores.setVisibleLayers([0]);
                  var layerDefinitions = [];
                  layerDefinitions[0] = `ID_SW='${params.idsector}'`;

                  sectores.setLayerDefinitions(layerDefinitions);

                  //Agregar tramos de sector interrumpido basado en id_desconexion:
                  var sectoresTramos = new ArcGISDynamicMapServiceLayer(getLayer.read_sectores_programados_tramos(token),{
                    id:"po_sectores_tramos"
                  });
                  sectoresTramos.setVisibleLayers([3]);
                  var layerDefinitions2 = [];
                  layerDefinitions[3] = `WEBPORTAL.dbo.SDD_DESCONEXIONES.id_desconexion='${params.idsector}'`;

                  sectoresTramos.setLayerDefinitions(layerDefinitions2);

                  sectoresTramos.setInfoTemplates({
                    3: {infoTemplate: getInfoTemplate.getTramos()}
                  });
                  sectoresTramos.refreshInterval = 1;
                  sectoresTramos.setImageFormat("png32");

                  map.addLayers([sectores, sectoresTramos])

                  //console.log(this.props.sector.location,"?");
                  var newExtent = new Extent(this.props.sector.location.getExtent())


                  var centerX = (newExtent.xmin + newExtent.xmax) / 2;
                  var centerY = (newExtent.ymin + newExtent.ymax) / 2;

                  var centroid = new Point(centerX,centerY,newExtent.spatialReference)

                  map.centerAndZoom(centroid,15)

                  }else{
                    //console.log("no located");
                  }
                })
                .catch(error=>{
                  //console.log(error,"aolasd");
                });

                var toggle = new BasemapToggle({
                  map: map,
                  basemap: "hybrid"
                }, "BasemapToggle");
                toggle.startup();

              }else{
                //console.log("Problemas al realizar login, favor contacte al desarrollador/a.");
              }
          })
          .catch(e=>{
            //console.log("Problemas al realizar login, favor contacte al desarrollador/a.");
          });
      });
  }

  componentWillMount(){
    if(env.ENVIRONMENT=='DEVELOPMENT'){
      this.dev();
    }else {
      this.prod();
    }
  }

  SymbologyVisibility(){
    const {toggleMobileVisibility, mobile} = this.props;

    if(mobile){
        toggleMobileVisibility(false)
        $('.symbology_container').css('visibility','hidden')

    }else{
        toggleMobileVisibility(true)
        $('.symbology_container').css('visibility','visible')
    }


  }

  render(){
    var {searchValue, message, interrupted} = this.props;
    var msg = null;

    if(message.visible){

      switch (interrupted) {
        case 'INTERRUMPIDO':
            msg = <Message visible={message.visible} negative color='red'>
                {interrupted}
              </Message>
        break;
        case 'SIN INTERRUPCIÓN':
            msg = <Message visible={message.visible} positive color='green'>
                {interrupted}
              </Message>
        break;
        case 'NO SE ENCUENTRA NÚMERO DE CLIENTE':
            msg = <Message visible={message.visible} info color='blue'>
                {interrupted}
              </Message>
        break;
      }
    }else{
      msg = null;
    }
    return (
      <Container className="map_container">
        <div id="map"></div>

        <div className="symbology_mobile">
          <Button icon className="btn_symbology_mobile" onClick={this.SymbologyVisibility.bind(this)}>
             <Icon name='bars'/>
          </Button>
        </div>

        <div className="symbology_container">
          <Symbology />
            <div className="address_container">
            <div className="symbology_title"><h4>Revisa el estado de tu suministro</h4></div>
              <div id="search"></div>
              <Divider horizontal>O busca tu número de cliente</Divider>
              <CustomSearch />
              {msg}
          </div>
        </div>
        <div className="search_container">

        </div>
        <div id="BasemapToggle"></div>

      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    login_in: (user,pass) => dispatch(userLogin(user,pass)),
    sectorLocation: (id,token) => dispatch(getSectorLocation(id,token)),
    showNotif: (message) => dispatch(showNotification(message)),
    dismissNotif: (value) => dispatch(dismissNotification(value)),
    toggleMobileVisibility: (value) => dispatch(toggleMobileVisibility(value))
  }
}

const mapStateToProps = state => {
  return {
    token: state.login.token,
    sector: state.sector,
    searchValue: state.search.selectedSearch,
    interrupted: state.search.interrupted,
    message: state.message,
    mobile: state.mobile.symbologyVisibility
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);
