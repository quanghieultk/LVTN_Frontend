import { authHeader } from '../helpers/auth-header';
import axios from 'axios';
export const postRestaurantService = {
    getAllRestaurantPost,
    deleteRestaurantPost,
    getRestaurantPostByUser,
    getRestaurantPostLikes,
    likeRestaurantPost,
    getPostByIdRestaurant
};
function getAllRestaurantPost() {
    console.log("hello")
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/restaurants/allRestaurantPost`, config)
        .then(res =>
            res.data.data.data
        )
        .catch(error => console.log(error));
    ;
}
function getPostByIdRestaurant(restaurantId) {
    console.log("hello")
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/restaurants/getPostByRestaurantId/${restaurantId}`, config)
        .then(res =>
            res.data.data.data
        )
        .catch(error => console.log(error));
    ;
}



// function getSearchRestaurantPost(description) {
//     let header = authHeader();
//     let config = {
//         headers: header
//     }
//     return axios.get(`http://localhost:8000/api/posts?description=${description}`, config)
//     .then(res =>
//         res.data.data.data
//     )
//     .catch(error => console.log(error));
// }
function deleteRestaurantPost(idPostRes) {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.delete(`http://localhost:8000/api/restaurants/deleteRestaurantPost/${idPostRes}`, config);

}
function getRestaurantPostByUser(idUser) {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/restautants/getRestaurantPostByUser/${idUser}`, config)
        .then(res =>
            res.data.data.data
        )
        .catch(error => console.log(error));
}

function getRestaurantPostLikes(idPostRes) {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/restautants/getRestaurantPostLikes/${idPostRes}`, config)
        .then(res =>
            res.data.data.data
        )
        .catch(error => console.log(error));
}

function likeRestaurantPost(idPostRes) {
    return axios({
        method: 'post',
        url: 'http://localhost:8000/api/restautants/likeRestaurantPost',
        data: {
            "postId": idPostRes,
        },
        headers: authHeader()
    })
        .then((response) => {
            return response
        }, (error) => {
            console.log(error);
        });
}
