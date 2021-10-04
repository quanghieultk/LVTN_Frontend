import { chatConstants } from '../constants/chat.constants'
import { chatService } from "../services/chat.service";

export const chatAction = {
    typing,
    stoppedTyping,
    changeRoom,
    getChatRooms,
    getMessagesForRoom,
    sendMessage,
    sendImage,
    newMessage,
    readMessages,
    changeActivityStatus,
    imageMessageRequest,
    call,
    answer,
    endCall,
    endAnsweringCall,
    searchUsers,
    resetMessageCount,
    reset
}


function typing(roomId) {
    return dispatch => {
        dispatch({ type: chatConstants.TYPING, roomId });
    };
}
function reset() {
    return dispatch => {
        dispatch({ type: chatConstants.RESET });
    };
}

function stoppedTyping(roomId) {
    return dispatch => {
        dispatch({ type: chatConstants.STOPPED_TYPING, roomId });
    };
}
function initiateMessageArray(roomId) {
    return { type: chatConstants.INIT_MESSAGE_ARRAY, roomId };
}

function changeRoom(room, clearRoom) {
    return dispatch => {
        dispatch({ type: chatConstants.CHANGE_ROOM, room, clearRoom })
    }
}



function readMessages(params) {
    const { messageIds, roomId } = params;
    return dispatch => {
        dispatch(read(messageIds, roomId));
        chatService.readMessages(params).then(
            () => { },
            error => {
                console.log(error);
            }
        );
    };
    function read(messageIds, roomId) {
        return { type: chatConstants.READ_MESSAGES, messageIds, roomId };
    }
}

function sendMessage(message) {
    return dispatch => {
        dispatch(request({ ...message, sent: false }));
        chatService.sendMessage(message).then(
            response => {
                dispatch(success(response.data.data.data));
                console.log(response)
            },
            error => {
                console.log(error);
            }
        );
    };

    function request(message) {
        return { type: chatConstants.SEND_MESSAGE_REQUEST, message };
    }

    function success(message) {
        return { type: chatConstants.SEND_MESSAGE_SUCCESS, message };
    }
}



function getChatRooms() {
    return dispatch => {
        dispatch(request());

        chatService.getChatRooms().then(
            response => {
                console.log(response)
                dispatch(success(response.data.rooms));
                response.data.rooms.forEach(room =>
                    dispatch(initiateMessageArray(room._id))
                );
            },
            error => {
                console.log(error);
            }
        );
    };
    function request() {
        return { type: chatConstants.GET_ROOMS_REQUEST };
    }
    function success(rooms) {
        return { type: chatConstants.GET_ROOMS_SUCCESS, rooms };
    }
}



function changeActivityStatus(user) {
    return dispatch => {
        dispatch({ type: chatConstants.CHANGE_ACTIVITY_STATUS, user });
    };
}


function getMessagesForRoom(room) {
    return dispatch => {
        if (room.initialFetch) {
            dispatch(initialRequest(room._id));
        } else {
            dispatch(request(room._id));
        }
        chatService.getMessagesForRoom(room).then(
            response => {
                console.log(response)
                dispatch(
                    success({ messages: response.data.data.data.reverse(), roomId: room._id })
                );
                let messageIdList=[];
                response.data.data.data.forEach(ele=>{
                    if(ele.read==false)
                        messageIdList.push(ele._id)
                })
                chatService.readMessages({roomId: room._id,messageIds: messageIdList})
            },
            error => {
                console.log(error);
            }
        );
    };
    function request(roomId) {
        return { type: chatConstants.GET_MESSAGES_REQUEST, roomId };
    }
    function initialRequest(roomId) {
        return { type: chatConstants.GET_MESSAGES_INITIAL_REQUEST, roomId };
    }
    function success(data) {
        return { type: chatConstants.GET_MESSAGES_SUCCESS, data };
    }
}



function sendImage(data, message) {
    return dispatch => {
        dispatch(request({ ...message, sent: false }));

        chatService.sendImage(data).then(
            response => {
                dispatch(success(response.message));
            },
            error => {
                console.log(error);
            }
        );
    };
    function request(message) {
        return { type: chatConstants.SEND_MESSAGE_REQUEST, message };
    }
    function success(message) {
        return { type: chatConstants.SEND_MESSAGE_SUCCESS, message };
    }
}

function newMessage(message) {
    return dispatch => {
        if (window.location.pathname != "/message")
            dispatch({ type: chatConstants.INC_MESSAGE_COUNT });
        else {
            dispatch(success(message));
        }
    };
    function success(message) {
        return { type: chatConstants.NEW_MESSAGE, message };
    }
}

function resetMessageCount(){
    return dispatch=>{
        dispatch({type: chatConstants.RESET_MESSAGE_COUNT});
    }
}

function imageMessageRequest(message) {
    return dispatch => {
        dispatch(success(message));
    };
    function success(message) {
        return { type: chatConstants.NEW_IMAGE_MESSAGE_REQUEST, message };
    }
}

function call(data) {
    return dispatch => {
        dispatch({ type: chatConstants.OPEN_CALLING_MODAL });

        chatService.call(data).then(
            () => { },
            error => {
                console.log(error);
            }
        );
    };
}

function answer(data) {
    return dispatch => {
        chatService.answer(data).then(
            () => { },
            error => {
                console.log(error);
            }
        );
    };
}

function endCall() {
    return dispatch => {
        dispatch({ type: chatConstants.CLOSE_CALLING_MODAL });
    };
}

function endAnsweringCall() {
    return dispatch => {
        dispatch({ type: chatConstants.CLOSE_ANSWERING_MODAL });
    };
}

function searchUsers(rooms) {
    return dispatch => {
        dispatch({ type: chatConstants.SEARCH_USERS, rooms });
    };
}

