import { notificationConstants } from "../constants/notification.constants";
import { notificatonService } from "../services/notification.service";

export const notificationActions = {
    toggleNotificationPopup,
    closeNotificationPopup,
    addNotification,
    fetchNotifications,
    removeNotification,
    initNotifications
}

function readNotifications(notificationIds) {
    notificatonService.readNotifications(notificationIds).then(
        (res) => { console.log(res) }
    ).catch(error => {
        console.log(error);
    });
}

function initNotifications() {
    return dispatch => {
        notificatonService.fetchNotifications(null, 0).then(
            response => {
                const notifications = response.data.data.data;
                let total = 0;
                notifications.forEach(element => {
                    if (element.read == false) {
                        total = total + 1;
                    }
                });
                dispatch(success(notifications, total, true));
            }
        )
    }
    function success(notifications, total, initialFetch) {
        return {
            type: notificationConstants.FETCH_NOTIFICATIONS_SUCCESS,
            notifications,
            total,
            initialFetch
        };
    }
}

function fetchNotifications(queryOptions, notificationIds, page) {
    return dispatch => {
        notificatonService.fetchNotifications(queryOptions, page).then(
            response => {
                const notifications = response.data.data.data;
                let total = 0;
                notifications.forEach(element => {
                    if (element.read == false) {
                        total = total + 1;
                    }
                });
                dispatch(success(notifications, total, queryOptions.initialFetch));
            }
        ).catch((err) => {
            console.log(err)
        })
    }
    function success(notifications, total, initialFetch) {
        return {
            type: notificationConstants.FETCH_NOTIFICATIONS_SUCCESS,
            notifications,
            total,
            initialFetch
        };
    }
}

function toggleNotificationPopup() {
    return dispatch => {
        dispatch({
            type: notificationConstants.TOGGLE_NOTIFICATION_POPUP
        });
    };
}

function closeNotificationPopup() {
    return dispatch => {
        dispatch({ type: notificationConstants.CLOSE_NOTIFICATION_POPUP });
    };
}

function addNotification(data) {
    return dispatch => {
        dispatch({ type: notificationConstants.ADD_NOTIFICATION, data });
    };
}

function removeNotification(data) {
    return dispatch => {
        dispatch({ type: notificationConstants.REMOVE_NOTIFICATION, data })
    }
}