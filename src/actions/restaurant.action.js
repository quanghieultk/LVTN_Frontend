import { restaurantConstant } from './../constants/restaurant.constants';
import { restaurantService } from './../services/restaurant.service';


export const restaurantAction = {
    getAllRestaurant
}


function getAllRestaurant() {
    return dispatch => {
        restaurantService.getAllRestaurant().then(response => {
            if (response) {
                dispatch({
                    type: restaurantConstant.GET_ALL_RESTAURANT,
                    restaurants: response
                })
            }
        })
    }
}