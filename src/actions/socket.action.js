import { socketService } from "../services/socket.service";
import { socketConstants } from '../constants/socket.constants';
import { chatConstants } from '../constants/chat.constants';
import { notificationActions } from "./notification.action";
import { notificatonService } from "../services/notification.service";
import { chatAction } from "../actions/chat.action";
export const socketActions = {
    connect, disconnect
}
function connect() {
    return dispatch => {
        socketService.connect().then(
            socket => {
                dispatch(connectSocket(socket));
                //notification
                socket.on("newNotification", data => {
                    dispatch(notificationActions.addNotification(data))
                })
                //new message
                socket.on('newMessage', data => {
                    console.log('new Mesage')
                    dispatch(chatAction.newMessage(data));
                })

                // socket.on("readMessages", data => {
                //     dispatch({ type: chatConstants.RECEIVE_READ_MESSAGES, data });
                // });

                // socket.on("typing", data => {
                //     dispatch(chatAction.typing(data.roomId));
                // });

                // socket.on("stoppedTyping", data => {
                //     dispatch(chatAction.stoppedTyping(data.roomId));
                // });

                socket.on("activityStatusUpdate", data => {
                    dispatch(chatAction.changeActivityStatus(data));
                  });
                window.socket = socket;
            }
        )
    }

    function connectSocket(socket) {
        return { type: socketConstants.CONNECT, socket };
    }
}
function disconnect() {
    window.socket.emit('dis');
    window.socket.disconnect();
    window.socket = ''
}