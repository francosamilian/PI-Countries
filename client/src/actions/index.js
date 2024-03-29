import axios from 'axios';

export function getCountries() {
    return async function(dispatch) {
        let countries = await axios.get('https://pi-countries-production-17a8.up.railway.app/countries'); 
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: countries.data
        })
    }
}

export function getActivities() {
    return async function(dispatch) {
        let activities = await axios.get('https://pi-countries-production-17a8.up.railway.app/activities');
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

export function getCountryByName(name) {
    return async function(dispatch) {
        try {
            let country = await axios.get(`https://pi-countries-production-17a8.up.railway.app/countries?name=${name}`);
            return dispatch({
                type: 'GET_COUNTRY_BY_NAME',
                payload: country.data,
            })
        } catch (e) {
            alert('Country not found');
            console.log(e)
        }
    }
}

export function createActivity(payload) {  
    return async function() {  
        try {
            await axios.post('https://pi-countries-production-17a8.up.railway.app/activities', payload);
        } catch (e) {
            console.log(e)
        }                                                 
    }
}

export function countryDetail(id) {
    return async function(dispatch) {
        try {
            let country = await axios.get(`https://pi-countries-production-17a8.up.railway.app/countries/${id}`);
            return dispatch({
                type: 'COUNTRY_DETAIL',
                payload: country.data
            })
        } catch (e) {
            console.log(e);
        }
    }
}