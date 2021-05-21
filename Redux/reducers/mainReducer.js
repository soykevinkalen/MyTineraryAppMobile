import { combineReducers } from "redux";
import cityReducer from './cityReducer'
import itinerariesReducer from './itinerariesReducer'
import authReducer from './authReducer'


const mainReducer = combineReducers({
    city: cityReducer,
    itinerary: itinerariesReducer,
    auth: authReducer
})

export default mainReducer