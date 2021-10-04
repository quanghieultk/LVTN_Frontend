import { foodService } from '../services/food.service';
import { foodConstants } from '../constants/food.constants';

export const foodAction = {
    getAllFoods
}

function getAllFoods() {
    return dispatch => {
        foodService.getAllFoods().then(response => {
            if (response) {
                dispatch({
                    type: foodConstants.GET_FOODS,
                    foods: response
                });
            }
            
        })
    }
}