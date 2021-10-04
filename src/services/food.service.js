import axios from 'axios';

export const foodService = {
    getAllFoods
}

function getAllFoods() {
    return axios.get('http://localhost:8000/api/foods', {
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("user")).token
        }
    }).then(response => {
        return response.data.data.data;
    });
}