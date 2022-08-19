
const initialState = {
    countries: [],
    activities: [],
    allCountries: [],
    countryDetail: {}
};

function rootReducer(state = initialState, {type, payload}) {
    switch(type) {
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: payload,
                allCountries: payload
            }
        case 'GET_ACTIVITIES':
            return {
                ...state,
                activities: payload
            }
        case 'FILTER_BY_CONTINENT':
            const continentsFiltered = payload === 'all' ? state.allCountries : state.allCountries.filter(c => c.continent === payload);
            return {
                ...state,
                countries: continentsFiltered
            }
        case 'FILTER_BY_ACTIVITY':
            const activitiesFiltered = payload === 'all' ? state.allCountries : state.allCountries.filter(c => c.activities.map(a => a.name).includes(payload))
            return {
                ...state,
                countries: activitiesFiltered
            }
        case 'ORDER':
            let countriesOrdered
            if(payload === 'select') countriesOrdered = state.countries;
            if(payload === 'ascendantly by name') {
                countriesOrdered = state.countries.sort(function(a, b) {
                    if(a.name > b.name) return 1;
                    else if(a.name < b.name) return -1;
                    else return 0;
                })} 
            else if(payload === 'descendantly by name') {
                countriesOrdered = state.countries.sort(function(a, b) {
                    if(a.name > b.name) return -1;
                    else if(a.name < b.name) return 1;
                    else return 0;
                })} 
            else if(payload === 'ascendantly by population') {
                countriesOrdered = state.countries.sort(function(a, b) {
                    return a.population - b.population;
                })}
            else if(payload === 'descendantly by population') {
                countriesOrdered = state.countries.sort(function(a, b) {
                    return b.population - a.population;
                })}
            else if(payload === 'top 5') {
                countriesOrdered = state.countries.sort(function(a, b) {
                   return b.population - a.population;
                })
                countriesOrdered = countriesOrdered.slice(0,5);
            }
            return {
                ...state,
                countries: countriesOrdered
            }
        case 'GET_COUNTRY_BY_NAME':
            return {
                ...state,
                countries: payload
            }
        case 'COUNTRY_DETAIL':
            return {
                ...state,
                countryDetail: payload
            }
        default:
            return state;
    }
};

export default rootReducer;