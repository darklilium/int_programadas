import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'
import {connect} from 'react-redux';
import {dismissNotification,showNotification} from  '../redux/actions';


class BottomSidebar extends Component {

  render() {

    if (this.props.visible) {
      return (
        <Message
          onDismiss={this.props.handleDismiss}
          header='¡Bienvenido!'
          content= {this.props.message}
          color= 'black'
        />
      )
    }
    return null
  }
}


  const mapStateToProps = state => {
    return {
      message: state.message,
      visible: state.visible
    };
  }

  const mapDispatchToProps = dispatch =>{
    return {
      handleDismiss(visible) {
          dispatch(dismissNotification(false));
          dispatch(showNotification(''))
      }
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(BottomSidebar);
