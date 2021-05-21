import axios from 'axios'

const activitiesActions = {
    getActivitiesByItinerary: (id) => {
        return async (dispatch, getState) =>{
            const response = await axios.get('https://kbaezmytinerary.herokuapp.com/api/activitiesByItinerary/'+id)
            return response
        }
    }
}

export default activitiesActions