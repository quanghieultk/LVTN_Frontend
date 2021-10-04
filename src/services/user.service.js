import { authHeader } from '../helpers/auth-header';
import axios from 'axios';
export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    updateUser,
    delete: _delete,
    changePassword,
    getInfoUser,
    follow,
    changeProfilePicture,
    changeBackgroundPicture,
    getFollwer,
    getFollwing,
    followRestaurant,
    getRestaurantsUserFollow,
    forgotPassword,
    resetPassword
};

function login(username, password) {
    return axios({
        method: 'post',
        url: 'http://localhost:8000/api/users/login',
        data: {
            "email": username,
            "password": password
        }
    })
        .then(handleResponse)
        .then((user) => {
            localStorage.setItem('user', JSON.stringify(user.data));
            return user;
        })
}

function forgotPassword(username) {
    return axios({
        method: 'post',
        url: 'http://localhost:8000/api/users/forgotPassword',
        data: {
            "email": username
        }
    })
        .then(handleResponse)
        .then((response) => {
            console.log(response);
        })
}

function resetPassword(password, passwordConfirm, token) {
    return axios({
        method: 'patch',
        url: `http://localhost:8000/api/users/resetPassword/${token}`,
        data: {
            "password": password,
            "passwordConfirm": passwordConfirm
        }
    })
        .then(handleResponse)
        .then((user) => {
            localStorage.setItem('user', JSON.stringify(user.data));
            return user;
        })
}

function logout() {
    // remove user from local storage to log user out
    
    localStorage.removeItem('user');
}

function getAll() {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/users`, config);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://localhost:8000/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(user)
    // };

    return axios.post(`http://localhost:8000/api/users/signup`, user).then(handleResponse);
}

function updateUser(userId, userInfo) {
    return axios({
        method: 'patch',
        url: `http://localhost:8000/api/users/${userId}`,
        data: {
            "firstname": userInfo.firstname,
            "lastname": userInfo.lastname,
            "birthday": userInfo.birthday,
            "address": userInfo.address,
            "email": userInfo.email,
            "interests": userInfo.interests
        }
    })
        .then((response) => {
            return response
        }, (error) => {
            console.log(error);
            return false;
        });
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`http://localhost:8000/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.status === 200) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            window.location.reload(true);
        }
        const error = response.message;
        return Promise.reject(error);
    }
    return response;
}

function changePassword(currentPassword, password, passwordConfirm) {

    return axios({
        method: 'patch',
        url: 'http://localhost:8000/api/users/updatePassword',
        data: {
            "currentPassword": currentPassword,
            "password": password,
            "passwordConfirm": passwordConfirm
        },
        headers: authHeader()
    })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                return true;
            }
        }, (error) => {
            console.log(error);
            return false;
        });

}

function getInfoUser(idUser) {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/users/${idUser}`, config)
        .then(res =>
            res
        )
        .catch(error => console.log(error));

}
function follow(idUser) {
    return axios({
        method: 'post',
        url: 'http://localhost:8000/api/users/followUser',
        data: {
            "userId": idUser,
        },
        headers: authHeader()
    })
        .then((response) => {
            return response;
        }, (error) => {
            console.log(error);
        });
}

function followRestaurant(idRestaurant) {
    return axios({
        method: 'post',
        url: 'http://localhost:8000/api/users/followRestaurant',
        data: {
            "restaurant": idRestaurant,
        },
        headers: authHeader()
    })
        .then((response) => {
            return response;
        }, (error) => {
            console.log(error);
        });
}

function changeProfilePicture(data) {
    let config={
        headers: authHeader()
    }
    return axios.post('http://localhost:8000/api/users/changeProfilePicture',data,config);
}

function changeBackgroundPicture(data) {
    let config={
        headers: authHeader()
    }
    return axios.post('http://localhost:8000/api/users/changeBackgroundPicture',data,config);
}

function getFollwer(userId) {
    let config={
        headers: authHeader()
    }
    return axios.get('http://localhost:8000/api/users/followers/'+userId,config);
}

function getFollwing(userId) {
    let config={
        headers: authHeader()
    }
    return axios.get('http://localhost:8000/api/users/followings/'+userId,config);
}
function getRestaurantsUserFollow() {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/users/restaurant/getRestaurantFollow`, config)
        .then(res =>
            res
        )
        .catch(error => console.log(error));
}
