import { authHeader } from '../helpers/auth-header';
import axios from 'axios';
export const restaurantService = {
    getRestaurantByUser,
    getAllRestaurant,
    getRestaurantById,
    createReviewRestaurant,
    getReviewByIdRestaurant,
    getUserFollowRestaurant,
    approveRestaurant
};
function getRestaurantByUser(userId) {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/restaurants/getListRestaurant/` + userId, config);
}

function getRestaurantById(restaurantId) {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/restaurants/getRestaurantById/` + restaurantId, config);
}

function getAllRestaurant() {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/restaurants/allRestaurant/`, config).then(response => {
        return response.data.data.restaurant;
    });
}

function createReviewRestaurant(restaurantId, point, review) {
    console.log('service: ' + restaurantId + '   ' + point + '  ' + review)
    return axios({
        method: 'post',
        url: 'http://localhost:8000/api/restaurants/createReviewRestaurant',
        data: {
            "restaurant": restaurantId,
            "point": point,
            "review": review
        },
        headers: authHeader()
    })
        .then((response) => {
            return true;
        }, (error) => {
            return false;
        });
}

function getReviewByIdRestaurant(restaurantId) {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/restaurants/getReviewRestaurant/${restaurantId}`, config);
}

function getUserFollowRestaurant(restaurantId) {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/restaurants/getUserFollowRestaurant/${restaurantId}`, config)
        .then(res =>
            res
        )
        .catch(error => console.log(error));
}

function approveRestaurant(restaurantId) {
    return axios({
        method: 'post',
        url: `http://localhost:8000/api/restaurants/approveRestaurant/${restaurantId}`,
        headers: authHeader()
    })
        .then((response) => {
            return true;
        }, (error) => {
            return false;
        });
}


// function  createRestaurant(formInput){
//     let header = authHeader();
//     let config = {
//         headers: header
//     }
//     return axios.post(`http://localhost:8000/api/restaurants/create`, formInput, config)
// }
// function getAllRestaurant(description) {
//     let header = authHeader();
//     let config = {
//         headers: header
//     }
//     return axios.get(`http://localhost:8000/api/restaurants/getAllRestaurant`, config);
// }