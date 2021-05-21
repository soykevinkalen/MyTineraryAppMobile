const initialState =  {
    userLogged: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOG_USER':   
            if(action.payload){
                localStorage.setItem('userLogged', JSON.stringify({firstName: action.payload.firstName, lastName: action.payload.lastName, userImage: action.payload.userImage, email: action.payload.email}))
                localStorage.setItem('token', action.payload.token)
            }
            
            return {
                ...state,
                userLogged: action.payload
            }
        case 'LOGOUT_USER':
            localStorage.clear()
            return {
                ...state,
                userLogged: null
            }
        default:
            return state
    }
}

export default authReducer