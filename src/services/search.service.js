import { authHeader } from '../helpers/auth-header';
import axios from 'axios';
export const searchService = {
    searchRestaurant,
    searchUser
};
function searchRestaurant(searchKey) {
    return axios({
        method: 'post',
        url: 'http://localhost:8000/api/search/searchRestaurant',
        data: {
            searchKey: searchKey
        },
        headers: authHeader()
    }).then(response => {
        return response.data.data.response;
    })
};
function searchUser(searchKey) {
    return axios({
        method: 'get',
        url: 'http://localhost:8000/api/search/searchUser?description='+searchKey,
        headers: authHeader()
    }).then(response => {
        return response.data.data.response;
    })
};