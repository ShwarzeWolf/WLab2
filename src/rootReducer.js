import {ADD_CITY, DELETE_CITY} from "./actions/ActionTypes";

const initialState = {
    cities: []
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_CITY) {
        return Object.assign({}, state, {
            cities: state.cities.concat(action.payload)
        });
    } else if (action.type === DELETE_CITY) {
        return Object.assign({}, state, {
            cities: state.cities.filter(function (city) {
                return city.timeAdded !== action.payload.timeAdded;
            })
        });
    }
    return state;
};

export default rootReducer;
