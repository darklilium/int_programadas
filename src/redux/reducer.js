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

function sector(state= {
  idsector: '140694103',
  nombre: '',
  comuna: 'VALPARAISO',
  location: '',
  idDesconexion: 'DX9631'
}, action){

  switch (action.type) {
    case 'GOT_SECTOR_LOCATION':
        return {...state,
          location: action.location.geometry,
          idsector: action.location.attributes.ID_SW,
          nombre: action.location.attributes.NOMBRE_SECTOR}
    break;

    case 'ERROR_GETTING_SECTOR_LOCATION':
      return {...state, location: false}
    break;

    default:
      return state;
  }
}

function search(state = {
  selectedSearch: '',
  interrupted: 'REALICE BÚSQUEDA'
}, action){

    switch (action.type) {
      case 'SELECTED_VALUE_SEARCH':
          return {...state, selectedSearch: action.value}
      break;

      case 'INTERRUPTED':
        return {...state, selectedSearch: action.value, interrupted: action.interrupted}
      break;

      case 'NOT_INTERRUPTED':
        return {...state, selectedSearch: action.value, interrupted: action.ok}
      break;

      default:
        return state;
    }
}

function message(state = {
  message: '',
  visible: false
}, action){
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {...state, message: action.message, visible: true}
    break;

    case 'DISMISS_NOTIFICATION':
      return {...state, message: '', visible: action.visible}
    break;

    default:
      return state;
  }
}

//1/08/2018
function mobile(state={
  symbologyVisibility: true
},action) {
  switch (action.type) {
    case 'TOGGLE_MOBILE_VISIBILITY':
        return {...state, symbologyVisibility: action.visible}
    break;

    default:
      return state;
  }
}

const appReducer = combineReducers({
  login, sector, search, message, mobile
});

const rootReducer = (state,action) => {
  return appReducer(state,action);
}

export default rootReducer;
