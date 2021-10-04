import {foodConstants} from '../constants/food.constants';

export function food(
    state = {
        foods: []
    },
    action
) {
    switch (action.type) {
        case foodConstants.GET_FOODS:
            return {
                ...state,
                foods: action.foods
            }
    
        default:
            return state;
    }
}