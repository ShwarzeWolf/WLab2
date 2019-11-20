import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';
import {Provider} from 'react-redux';
import store from "./store";
window.store = store;

ReactDOM.render(
    <Provider store={store}>
        <App id="app"/>
    </Provider>, document.getElementById('root'));