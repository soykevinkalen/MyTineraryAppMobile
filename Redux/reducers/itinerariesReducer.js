const initialState = {
    itinerariesByCity: [],
    loading: true
}

const itinerariesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ITINERARIES_BY_CITY':
            return {
                ...state,
                itinerariesByCity: action.payload,
                loading: false
            }
        case "COMMENTS":
            
            return{
                ...state,
                itinerariesByCity: state.itinerariesByCity.map( itinerary => itinerary._id === action.payload._id ? action.payload : itinerary)                
            }
        case "LIKES":
            
            return{
                ...state,
                itinerariesByCity: state.itinerariesByCity.map( itinerary => itinerary._id === action.payload._id ? action.payload : itinerary)

        }

        default:
            return state
    }
}

export default itinerariesReducer