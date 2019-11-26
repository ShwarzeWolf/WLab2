export const ADD_CITY = 'ADD_CITY';
export const REMOVE_CITY = 'REMOVE_CITY';

export function addCity(payload) {
    return {type: ADD_CITY, payload}
}

export function removeCity(payload) {
    return {type: REMOVE_CITY, payload}
}
