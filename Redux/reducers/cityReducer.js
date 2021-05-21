const initialState = {
    cities: [],
    citiesFilter: [],
    loading: true
}

const cityReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CITIES':
            return {
                ...state,
                cities: action.payload,
                citiesFilter: action.payload,
                loading: false
            }
        case 'FILTER_VALUE':
            return {
                ...state,
                citiesFilter: state.cities.filter(ciudad => action.payload.trim().toLowerCase() === ciudad.city.toLowerCase().slice(0,action.payload.trim().toLowerCase().length))
            }
        
        default:
            return state
    }
}

export default cityReducer