import {innerLogin} from '../services/login-service';
import {getSector} from '../services/regionsExtent';
import {searchInterruptions} from '../services/search_service';


const showNotification = (message) =>{
  return {
    type: "SHOW_NOTIFICATION",
    message: message
  }
}

const dismissNotification = (visible) => {
  return {
    type: "DISMISS_NOTIFICATION",
    visible: visible
  }
}

const saveRegion = (region) =>{
  return {
    type: "SAVE_REGION",
    region: region
  }
}

function userLogin (){
  return dispatch => {
    return innerLogin()
    .then(token => {
        dispatch({
          type: 'LOGGED_IN',
          token
        })
      return token[2];
    })

    .catch(error=>{
      dispatch({
        type: 'NOT_LOGGED_IN',
        error
      })
      return false;
    })
  }
}

function sectorInfo(params){
  return {
    type: 'GETTING_SECTOR_INFO',
    params
  }
}

function getSectorLocation(idsector, token){

  return dispatch => {
    return getSector(idsector,token)
    .then(location =>{
      //console.log(location,"location");
      dispatch({
        type: 'GOT_SECTOR_LOCATION',
        location
      })
      return true;
    })
    .catch(error => {
      dispatch({
        type: 'ERROR_GETTING_SECTOR_LOCATION',
        error
      })
      return false;
    })
  }
}

function searchValue(value, token) {

  return dispatch => {
    return searchInterruptions(value,token)
    .then(interrupted=>{
      //console.log(interrupted,"respuesta searchInterruptions");
      dispatch({
        type: 'INTERRUPTED',
        value, interrupted
      })

      dispatch({
        type: 'SHOW_NOTIFICATION',
        message: "Cliente SI presenta interrupción de servicio"
      })

    }).catch(ok=>{
      //console.log(ok);
      dispatch({
        type: 'NOT_INTERRUPTED',
        value, ok
      })

      dispatch({
        type: 'SHOW_NOTIFICATION',
        message: "Cliente NO presenta interrupción de servicio"
      })
    })
  }
}

function searchDismiss(visible){
  return dispatch => {

    dispatch({
      type: 'DISMISS_NOTIFICATION',
      visible
    })

  }
}

//01.08.2018
function toggleMobileVisibility(visible){
  return dispatch => {
    dispatch({
      type: 'TOGGLE_MOBILE_VISIBILITY',
      visible
    })
  }
}

/*loader*/
function toggleLoaderVisibility(visible){
  return dispatch => {
    dispatch({
      type: 'TOGGLE_LOADER_VISIBILITY',
      visible
    })
  }
}

function toggleLoaderMessage(message){
  return dispatch => {
    dispatch({
      type: 'TOGGLE_LOADER_MESSAGE',
      message
    })
  }
}


export {showNotification, 
  dismissNotification, 
  saveRegion, 
  userLogin, 
  getSectorLocation, 
  searchValue, 
  searchDismiss, 
  toggleMobileVisibility, 
  toggleLoaderVisibility,
  toggleLoaderMessage}
