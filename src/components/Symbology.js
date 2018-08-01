import store from '../redux/store';
import React,  { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {saveRegion} from '../redux/actions';
import { Icon } from 'semantic-ui-react';
import {Container} from 'semantic-ui-react';
import env from '../services/config';
import Tooltip from 'rc-tooltip';

function preventDefault(e) {
  e.preventDefault();
}

class Symbology extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible: false
    }


  }
  onVisibleChange = (visible) => {
      this.setState({
        visible,
      });
  }

  render(){
    const {nombreSector} = this.props;

    return (

      <div className="symbology_wrapper">
        {/* titulos*/}
        <div className="symbology_title"><h4>INTERRUPCIONES PROGRAMADAS</h4></div>
          <div className="symbology_title"><h4><b>SECTOR: {nombreSector}</b></h4></div>
        <div className="symbology_subtitle">
          {/*<p>Para conocer el horario estimado de reposición del suministro, debes hacer clic sobre la red.</p>*/}
        </div>
        {/*simbolos*/}
        <div className="symbology_image_range">
        <p>Haz click sobre la red para conocer la hora estimada de reposición.</p>
        <div className="symbol_"><img src={env.CSSDIRECTORY+"images/tramo.png"}></img></div>

        
        </div>
      </div>

    )
  }
}

/*
o	00-25%     VERDE               B4FFB4
o	25-50%     AMARILLO          FFFFB4
o	50-75%     AZUL                     B4F5FF
o	75-100%  NARANJO           FFDCB4

*/
  const mapStateToProps = state => {
    return {
      region: state.region,
      nombreSector: state.sector.nombre,
      idsector: state.sector.idsector
    };
  }

export default connect(mapStateToProps,{saveRegion})(Symbology);
