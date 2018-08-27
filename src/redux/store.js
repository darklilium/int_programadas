import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import env from '../services/config';


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

export default function configureStore(initialState) {

  if(env.MODE='DEVELOPMENT') {
    return createStore(reducer, initialState, composeEnhancers(
      applyMiddleware(thunk)
    ));
  }else{
      return createStore(reducer, initialState, applyMiddleware(thunk));
  }
}

/*
export default function configureStore(initialState) {
      return createStore(reducer, initialState, applyMiddleware(thunk));
}
*/