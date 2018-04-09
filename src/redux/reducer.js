import {combineReducers} from 'redux';


function login(state = {}, action) {
  switch (action.type) {
    case 'LOGGED_IN':
      return {...state, token: action.token[2]}
    break;

    case 'NOT_LOGGED_IN':
      return {...state, token: false}
    break;

    default:
      return state;
  }
}

/*
if(action.type==="SHOW_NOTIFICATION"){
  return showNotification(state,action);
}
if(action.type==="DISMISS_NOTIFICATION"){
  return dismissNotification(state,action);
}
if(action.type==="SAVE_REGION"){
    return saveRegion(state,action);
}

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

*/


const appReducer = combineReducers({
  login
});

const rootReducer = (state,action) => {
  return appReducer(state,action);
}

export default rootReducer;
