import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/myStyles.scss';

import {Container, Divider, Message} from 'semantic-ui-react';
import ToggleSymbology from './ToggleSymbology';
import BottomSidebar from './BottomSidebar';
import Symbology from './Symbology';
import {userLogin, sectorInfo, getSectorLocation,
  showNotification, dismissNotification, saveRegion} from '../redux/actions';
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



export class SearchNIS extends React.Component {
    render() {
        return (
          <div id="search2">nis</div>
        );
    }

}

export class SearchAddress extends React.Component {

    render() {
        return (
          <div id="search"></div>
        );
    }

}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.dev = this.dev.bind(this);
    this.prod = this.prod.bind(this);

  }

  dev () {
    console.log("DEVELOPMENT");
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

          const {token, sectorLocation, sector} = this.props;

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
                map.addLayers([sectores])

                //console.log(this.props.sector.location,"?");
                var newExtent = new Extent(this.props.sector.location.getExtent())


                var centerX = (newExtent.xmin + newExtent.xmax) / 2;
                var centerY = (newExtent.ymin + newExtent.ymax) / 2;

                var centroid = new Point(centerX,centerY,newExtent.spatialReference)

                map.centerAndZoom(centroid,15)

                }else{
                  console.log("no located");
                }
              })
              .catch(error=>{
                console.log(error,"aolasd");
              });

              /*var toggle = new BasemapToggle({
                map: map,
                basemap: "hybrid"
              }, "BasemapToggle");
              toggle.startup();
              */
            }else{
              console.log("Problemas al realizar login, favor contacte al desarrollador/a.");
            }
        })
        .catch(e=>{
          console.log("Problemas al realizar login, favor contacte al desarrollador/a.");
        });
    });
  }

  prod (){
      console.log("PRODUCTION");
      var {login_in, sector} = this.props;
      var params = getURLParameters();

      var comuna = getComunaExtent(params.comuna)
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

            const {token, sectorLocation, sector} = this.props;

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
                  layerDefinitions[0] = `ID_SW='${sector.idsector}'`;

                  sectores.setLayerDefinitions(layerDefinitions);

                  map.addLayers([sectores])

                  //console.log(this.props.sector.location,"?");
                  var newExtent = new Extent(this.props.sector.location.getExtent())


                  var centerX = (newExtent.xmin + newExtent.xmax) / 2;
                  var centerY = (newExtent.ymin + newExtent.ymax) / 2;

                  var centroid = new Point(centerX,centerY,newExtent.spatialReference)

                  map.centerAndZoom(centroid,15)

                  }else{
                    console.log("no located");
                  }
                })
                .catch(error=>{
                  console.log(error,"aolasd");
                });

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

  componentWillMount(){
    if(env.ENVIRONMENT=='DEVELOPMENT'){
      this.dev();
    }else {
      this.prod();
    }
  }

  render(){
    var {searchValue, message, interrupted} = this.props;
    var msg = null;
    switch (interrupted) {
      case 'INTERRUMPIDO':
          msg = <Message negative color='red'>
              {interrupted}
            </Message>
      break;
      case 'SIN PROBLEMAS':
          msg = <Message positive color='green'>
              {interrupted}
            </Message>
      break;
      case 'NO SE ENCUENTRA NIS':
          msg = <Message info color='blue'>
              {interrupted}
            </Message>
      break;

    }
    return (
      <Container className="map_container">
        <div id="map"></div>

        <div className="symbology_container">
          <Symbology />
            <div className="address_container">
            <div className="symbology_title"><h4>REVISA EL ESTADO DE TU SUMINISTRO</h4></div>
              <div id="search"></div>
              <Divider horizontal>Y/O Busca tu NIS</Divider>
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
    sectorLocation: (id,token) => dispatch(getSectorLocation(id,token))
  }
}

const mapStateToProps = state => {
  return {
    token: state.login.token,
    sector: state.sector,
    searchValue: state.search.selectedSearch,
    interrupted: state.search.interrupted,
    message: state.message
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);
