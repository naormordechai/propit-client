import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import todosReducer from './store/reducers/todos/todos';
import thunk from 'redux-thunk';


const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export const rootReducer = combineReducers({
  todosReducer
})

export type AppState = ReturnType<typeof rootReducer>

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StylesProvider jss={jss}>
        <App />
      </StylesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);