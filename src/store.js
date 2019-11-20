import {createStore} from "redux";
import rootReducer from "./rootReducer";


const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState'))
    : {
        cities: []
    };
const store = createStore(
    rootReducer,
    persistedState,
);
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});
export default store;
