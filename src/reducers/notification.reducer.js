import { notificationConstants } from "../constants/notification.constants";
import { userConstants } from "../constants/user.constants";
export function notification(
    state = {
        isOpen: false,
        notifications: [],
        allNotificationsCount: 0,
        page: 0
    },
    action
) {
    switch (action.type) {
        case notificationConstants.FETCH_NOTIFICATIONS_SUCCESS:
            if (action.initialFetch) {
                return {
                    ...state,
                    notifications: action.notifications,
                    allNotificationsCount: action.total
                }
            }
            return {
                ...state,
                notifications: [...state.notifications, ...action.notifications],
                page: state.notifications.length+action.notifications.length,
                allNotificationsCount: action.total+state.allNotificationsCount
            }
            break;
        case notificationConstants.CLOSE_NOTIFICATION_POPUP:
            return {
                ...state,
                isOpen: false
            }
        case notificationConstants.TOGGLE_NOTIFICATION_POPUP:
            return {
                ...state,
                isOpen: !state.isOpen
            }
        case notificationConstants.ADD_NOTIFICATION:
            return {
                ...state,
                notifications: [action.data.notification, ...state.notifications],
                allNotificationsCount: state.allNotificationsCount + 1,
                page: state.notifications.length + 1
            }
        case notificationConstants.REMOVE_NOTIFICATION:
            state.notifications[action.data].read = true;
            console.log(state.allNotificationsCount)
            return {
                ...state,
                notifications: [...state.notifications],
                allNotificationsCount: (state.allNotificationsCount - 1) < 0 ? 0 : (state.allNotificationsCount - 1),
                page: state.notifications.length
            }
        case notificationConstants.READ_NOTIFICATIOS:
            return {
                ...state,
                notifications: state.notifications.map(e => {
                    return {
                        ...e,
                        read: true
                    };
                })
            };
        case userConstants.GETUSER_SUCCESS:
            return {
                ...state,
                allNotificationsCount: action.user.allNotifications
            };
        default:
            return state;
    }
}