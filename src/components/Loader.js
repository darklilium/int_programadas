import React from 'react'
import { Dimmer, Loader, Image, Segment, Container } from 'semantic-ui-react'
import { connect } from 'react-redux';

class Loaderx extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {loaderVisibility, loaderMessage} = this.props;
        return (
            <Container className="wrapper_loader"  >
            <Dimmer active={loaderVisibility}>
              <Loader>{loaderMessage}</Loader>
            </Dimmer>
            </Container>
        );
    }      
}

const mapStateToProps = state =>{
    return {
        loaderVisibility: state.loader.visible,
        loaderMessage: state.loader.message
    };
}


export default connect(mapStateToProps)(Loaderx);