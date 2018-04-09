import {innerLogin} from '../services/login-service';

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

function userLogin (user,pass){
  return dispatch => {
    return innerLogin(user,pass)
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

export {showNotification, dismissNotification, saveRegion, userLogin}
