import {restaurantConstant} from './../constants/restaurant.constants';

export function restaurant(
    state = {
        restaurants: []
    },
    action
) {
    switch (action.type) {
        case restaurantConstant.GET_ALL_RESTAURANT:
            return {
                ...state,
                restaurants: action.restaurants
            }
        default:
            return state;
    }
}