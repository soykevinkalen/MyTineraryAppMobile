import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState =  {
    userLogged: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOG_USER':   
            if(action.payload){
                AsyncStorage.setItem('userLogged', JSON.stringify({firstName: action.payload.firstName, lastName: action.payload.lastName, userImage: action.payload.userImage, email: action.payload.email}))
                AsyncStorage.setItem('token', action.payload.token)
            }
            
            return {
                ...state,
                userLogged: action.payload
            }
        case 'LOGOUT_USER':
            AsyncStorage.clear()
            return {
                ...state,
                userLogged: null
            }
        default:
            return state
    }
}

export default authReducer