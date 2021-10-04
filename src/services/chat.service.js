import axios from 'axios';
import { authHeader } from '../helpers/auth-header';

export const chatService = {
    sendMessage,
    getChatRooms,
    getMessagesForRoom,
    readMessages
}
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
}
function getChatRooms(parmams) {
    return axios.post("http://localhost:8000/api/chats/getChatRooms/",null,{headers : authHeader()})
}

function readMessages(params) {
    return axios.post("http://localhost:8000/api/chats/readMessage",params ,{headers:  authHeader()});
}

function getMessagesForRoom(room) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
        body: JSON.stringify({
            ...room
        })
    };

    return axios.post("http://localhost:8000/api/chats/getMessagesForRoom", {roomId: room._id},{headers: authHeader()});
}

function sendMessage(params) {
    return axios.post("http://localhost:8000/api/chats/sendMessage",params,{headers: authHeader()})
}


function sendImage(data) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
        body: data
    };

    return fetch("/api/chat/sendImage/", requestOptions)
        .then(handleResponse)
        .then(res => {
            return res;
        });
}

function call(data) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
        body: JSON.stringify({
            ...data
        })
    };

    return fetch("/api/chat/call/", requestOptions)
        .then(handleResponse)
        .then(res => {
            return res;
        });
}



function answer(data) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
        body: JSON.stringify({
            ...data
        })
    };

    return fetch("/api/chat/answer/", requestOptions)
        .then(handleResponse)
        .then(res => {
            return res;
        });
}



function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

