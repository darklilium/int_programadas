import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

function showNotification(state,action){
  //console.log(state,action,"hola from showNotification");
  return Object.assign({}, state, {message: action.message});
}

function dismissNotification(state,action){
  //console.log(action,state,"hola desde dismissNotification store");
  return Object.assign({}, state, {visible: action.visible});
}

function saveRegion(state,action){
   return Object.assign({}, state, {region: action.region});
}

const reducer = (state, action) => {

  if(action.type==="SHOW_NOTIFICATION"){
    return showNotification(state,action);
  }
  if(action.type==="DISMISS_NOTIFICATION"){
    return dismissNotification(state,action);
  }
  if(action.type==="SAVE_REGION"){
      return saveRegion(state,action);
  }

  return state;
}

export default createStore(reducer,{message: [], visible: true, region: []}, composeWithDevTools())
