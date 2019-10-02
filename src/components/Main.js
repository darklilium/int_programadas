import React from 'react';
import styles from '../css/myStyles.scss';
import { Container, Divider, Message, Icon, Button } from 'semantic-ui-react';
import Symbology from './Symbology';
import {
  userLogin, sectorInfo, getSectorLocation,
  showNotification, dismissNotification, saveRegion,
  toggleMobileVisibility,
  toggleLoaderVisibility, toggleLoaderMessage
} from '../redux/actions';
import { connect } from 'react-redux';
import { getTramosInterrumpidos } from '../services/regionsExtent';
import { getURLParameters } from '../services/parameters';
import ArcGISDynamicMapServiceLayer from 'esri/layers/ArcGISDynamicMapServiceLayer';
import getLayer from '../services/layers-service';
import BasemapToggle from "esri/dijit/BasemapToggle";
import env from '../services/config';
import CustomSearch from './CustomSearch';
import mapa from '../services/map_service';
import Search from 'esri/dijit/Search';
import $ from 'jquery';
import Loaderx from './Loader';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.dev = this.dev.bind(this);
    this.prod = this.prod.bind(this);

  }
  //activa modo developer
  dev() {
    var map = mapa.createMap();

    const { login_in, sector, loaderVisibility, changeLoaderVisibility, changeLoaderMessage } = this.props;

    var l = login_in()
      .then(token => {

        var sectores_programados = new ArcGISDynamicMapServiceLayer(getLayer.read_po_sectores_programados_dyn(), { id: "sectores_prog" })
        var layerDefinitions = [];
        layerDefinitions[0] = "WEBPORTAL.dbo.SDD_DESCONEXIONES.id_desconexion='" + sector.idDesconexion + "'";
        sectores_programados.setVisibleLayers = [0];
        sectores_programados.setLayerDefinitions(layerDefinitions);
        map.addLayer(sectores_programados);

        var toggle = new BasemapToggle({
          map: map,
          basemap: "hybrid"
        }, "BasemapToggle");
        toggle.startup();

        var search = new Search({
          map: map,
          zoomScale: 20000,
          countryCode: 'CHL'
        }, "search");
        search.startup();


        /*Zoom para tramos: Query*/
        var tramos = getTramosInterrumpidos(sector.idDesconexion)
          .then(results => {
           
            map.setExtent(results[1].offset(-50, -3), true);
            changeLoaderVisibility(!loaderVisibility);

          }).catch(error => {
            console.log('error : No se ha podido encontrar la desconexión', error);
            changeLoaderMessage("No se ha podido encontrar la desconexión. Intente nuevamente.")

          });

      }).catch(error => {
        console.log('error :', error);
      });

  }
  //activa modo producción
  prod() {
    var map = mapa.createMap();
    var params = getURLParameters();

    const { login_in, sector, loaderVisibility, changeLoaderVisibility, changeLoaderMessage } = this.props;

    var l = login_in()
      .then(token => {

        var sectores_programados = new ArcGISDynamicMapServiceLayer(getLayer.read_po_sectores_programados_dyn(), { id: "sectores_prog" })
        var layerDefinitions = [];
        layerDefinitions[0] = "WEBPORTAL.dbo.SDD_DESCONEXIONES.id_desconexion='" + params.idDesconexion + "'";
        sectores_programados.setVisibleLayers = [0];
        sectores_programados.setLayerDefinitions(layerDefinitions);
        map.addLayer(sectores_programados);

        var toggle = new BasemapToggle({
          map: map,
          basemap: "hybrid"
        }, "BasemapToggle");
        toggle.startup();

        var search = new Search({
          map: map,
          zoomScale: 20000,
          countryCode: 'CHL'
        }, "search");
        search.startup();


        /*Zoom para tramos: Query*/
        var tramos = getTramosInterrumpidos(params.idDesconexion)
          .then(results => {
            //console.log('results :', results);
            map.setExtent(results[1].offset(-50, -3), true);
            changeLoaderVisibility(!loaderVisibility);

          }).catch(error => {
            console.log('error : No se ha podido encontrar la desconexión', error);
            //changeLoaderVisibility(!loaderVisibility);
            changeLoaderMessage("No se ha podido encontrar la desconexión. Intente nuevamente.")
          });

      }).catch(error => {
        console.log('error :', error);
      });

  }

  //activa modo
  componentDidMount() {
    if (env.ENVIRONMENT == 'DEVELOPMENT') {
      this.dev();
    } else {
      this.prod();
    }

  }

  //hace toggle a la simbologia
  SymbologyVisibility() {
    const { toggleMobileVisibility, mobile } = this.props;

    if (mobile) {
      toggleMobileVisibility(false)
      $('.symbology_container').css('visibility', 'visible')

    } else {
      toggleMobileVisibility(true)
      $('.symbology_container').css('visibility', 'hidden')
    }
  }

  render() {
    var { searchValue, message, interrupted } = this.props;
    var msg = null;

    if (message.visible) {

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
    } else {
      msg = null;
    }

    return (

      <Container className="map_container">
        <Loaderx />
        <div id="map"></div>

        <div className="symbology_mobile">
          <Button icon className="btn_symbology_mobile" onClick={this.SymbologyVisibility.bind(this)}>
            <Icon name='external' />
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

//redux de acciones
const mapDispatchToProps = (dispatch) => {
  return {
    login_in: () => dispatch(userLogin()),
    sectorLocation: (id, token) => dispatch(getSectorLocation(id, token)),
    showNotif: (message) => dispatch(showNotification(message)),
    dismissNotif: (value) => dispatch(dismissNotification(value)),
    toggleMobileVisibility: (value) => dispatch(toggleMobileVisibility(value)),
    changeLoaderVisibility: (visible) => dispatch(toggleLoaderVisibility(visible)),
    changeLoaderMessage: (message) => dispatch(toggleLoaderMessage(message))
  }
}

const mapStateToProps = state => {
  return {
    token: state.login.token,
    sector: state.sector,
    searchValue: state.search.selectedSearch,
    interrupted: state.search.interrupted,
    message: state.message,
    mobile: state.mobile.symbologyVisibility,
    loaderVisibility: state.loader.visible
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
export { map };