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

    return (

      <div className="symbology_wrapper">
        {/* titulos*/}
        <div className="symbology_title"><h3>INTERRUPCIONES DE SUMINISTRO POR SECTOR</h3></div>
        <div className="symbology_subtitle">

          <h3>Simbología:</h3>
          <h4>Porcentaje de clientes afectados:</h4>
        </div>
        {/*simbolos*/}
        <div className="symbology_image_range">
          <div className="symbology_range">
            <div className="range"><Icon name='square' className="range_red"/><div className="img_red">00-25% Clientes Afectados</div></div>
            <div className="range"><Icon name='square' className="range_orange"/><div className="img_orange">25-50% Clientes Afectados</div></div>
            <div className="range"><Icon name='square' className="range_yellow"/><div className="img_yellow">50-75% Clientes Afectados</div></div>
            <div className="range"><Icon name='square' className="range_green"/><div className="img_green">75-100% Clientes Afectados</div></div>
            <div className="range"><img src={env.CSSDIRECTORY+"images/tramo.png"}></img>
                Red Eléctrica
                <Tooltip
                  visible={this.state.visible}
                  animation="zoom"
                  onVisibleChange={this.onVisibleChange}
                  trigger="hover"
                  overlay={<span style={{fontSize: '15px'}}>Selecciona la red para conocer el tiempo estimado de reposición del servicio.</span>}
                  ><a href="#" className="help_icon" onClick={preventDefault}><Icon name='help circle'/></a>
                </Tooltip>
            </div>

          </div>
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
      region: state.region
    };
  }

export default connect(mapStateToProps,{saveRegion})(Symbology);
