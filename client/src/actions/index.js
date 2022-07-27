import axios from 'axios';

export function getCountries() {
    return async function(dispatch) {
        let countries = await axios.get('http://localhost:3001/countries', {}); 
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: countries.data
        })
    }
}

export function getActivities() {
    return async function(dispatch) {
        let activities = await axios.get('http://localhost:3001/activities', {});
        return dispatch({
            type: 'GET_ACTIVITIES',
            payload: activities.data
        })
    }
}

export function filterByContinent(payload) {
    return {
        type: 'FILTER_BY_CONTINENT',
        payload
    }
}

export function filterByActivity(payload) {
    return {
        type: 'FILTER_BY_ACTIVITY',
        payload
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER',
        payload
    }
}