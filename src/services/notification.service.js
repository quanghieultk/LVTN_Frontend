import axios from "axios";
import { authHeader } from "../helpers/auth-header";
export const notificatonService = {
    readNotifications,
    fetchNotifications,
    logout
};


function logout() {
    localStorage.removeItem("user")
}
function readNotifications(notificationIds) {
    return axios.post("http://localhost:8000/api/notifications/readNotifications/",
        { notificationIds: notificationIds },
        { headers: authHeader() }
    );
}
function fetchNotifications(queryOptions,page) {
    console.log(page)
    const requestOptions = {
        headers: authHeader(),
        body: JSON.stringify({
            ...queryOptions
        })
    };

    return axios.get("http://localhost:8000/api/notifications/getNotifications/"+page, requestOptions);
}

