import axios from 'axios'
// import {toast } from 'react-toastify'

const itinerariesActions = {
    getItinerariesByCity: (id) => {
        return (dispatch, getState) =>{
            axios.get('https://kbaezmytinerary.herokuapp.com/api/itinerariesByCity/'+id)
            .then(response => {
                dispatch({type: 'GET_ITINERARIES_BY_CITY',
            payload: response.data.respuesta})})
            .catch( error => console.log(error))
        }
    },
    putItinerary: (id, itinerary) => {
        return async (dispatch, getState) => {
            const response = await axios.put('https://kbaezmytinerary.herokuapp.com/api/itineraries/'+id, itinerary)
            if(!response.success){
                return response.data.respuesta
            }
            dispatch({type: 'GET_ITINERARIES_BY_CITY', payload: response.data.respuesta})
            .catch(error => console.log(error))
        }
    },
    putComments: (user,id, comment) => {
        return async (dispatch, getState) => {
            try{
                const response = await axios.put('https://kbaezmytinerary.herokuapp.com/api/itineraries/comments/'+id,{comment}, {
                    headers: {
                        'Authorization' : 'Bearer '+user.token
                    }
                })
                dispatch({type: 'COMMENTS', payload: response.data.respuesta})
                return response.data.respuesta
            }catch(error){
                console.log(error)
                // toast.error('Ops... An error occurred, contact the administrator')
            }
        }
    },
    likes: (user, itinerary) => {
        return async (dispatch, getState) => {
            try{
                const response = await axios.put('https://kbaezmytinerary.herokuapp.com/api/itineraries/like/'+itinerary._id,{itinerary},{
                    headers: {
                        'Authorization': 'Bearer '+user.token
                    }
                })
                dispatch({type: 'LIKES', payload: response.data.respuesta})
            }catch(error){
                console.log(error)
                // toast.error('Ops... An error occurred, contact the administrator')

          }
      }
    },
    deleteComment: (user, comment,itinerary) => {
        return async (dispatch, getState) => {
            try{
                const response = await axios.put('https://kbaezmytinerary.herokuapp.com/api/comments/',{comment,itinerary}, {
                    headers: {
                        'Authorization' : 'Bearer '+user.token
                    }
                })
                dispatch({type: 'COMMENTS', payload: response.data.respuesta})
                return response.data.respuesta
            }catch(error){
                console.log(error)
                // toast.error('Ops... An error occurred, contact the administrator')

            }
        }
    },
    updateComment: (user, comment,itinerary) => {
        return async (dispatch, getState) => {
            try{
                const response = await axios.put('https://kbaezmytinerary.herokuapp.com/api/commentsUpdate/',{comment,itinerary}, {
                    headers: {
                        'Authorization' : 'Bearer '+user.token
                    }
                })
                dispatch({type: 'COMMENTS', payload: response.data.respuesta})
                return response.data.respuesta
            }catch(error){
                console.log(error)
                // toast.error('Ops... An error occurred, contact the administrator')

            }
        }
    }
}

export default itinerariesActions