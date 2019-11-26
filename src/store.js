import {createStore, applyMiddleware} from "redux";
import rootReducer from "./rootReducer";
import thunk from 'redux-thunk';

const persistedState = localStorage.getItem('reduxState') ?
    JSON.parse(localStorage.getItem('reduxState')): {
        cities: []
    };

const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunk),
);

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});

export default store;
