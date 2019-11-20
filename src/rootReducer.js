let state = {
    cities: []
};

function updateStorage(state, action) {
    if (action.type === 'ADD_CITY')
        return action;
    else if (action.type === 'REMOVE_CITY')
        return state;
    else
        return state;
};

const addCityAction = {type: 'ADD_CITY', city: 'Surgut'};
const removeCityAction = {type: 'REMOVE_CITY', city: 'Surgut'} ;

state = updateStorage(state, addCityAction);
