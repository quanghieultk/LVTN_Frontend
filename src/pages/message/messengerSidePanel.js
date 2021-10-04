import React, { useEffect, useState } from 'react';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    Avatar,
    Sidebar,
    Search,
    ConversationList,
    Conversation,
} from "@chatscope/chat-ui-kit-react";
import { useDispatch, useSelector } from 'react-redux';
import { chatAction } from '../../actions/chat.action';

export function MessengerSidePanel() {
    const dispatch = useDispatch();
    const chatRoomList = useSelector(state => state.chat.rooms);
    const currentRoom = useSelector(state => state.chat.currentRoom);
    const clearRoom = useSelector(state => state.chat.roomId);
    const roomId = useSelector(state => state.chat.roomId);
    const avatar_def = 'https://lh3.googleusercontent.com/proxy/CItNmx7VBgaRECNTgSxUsT1WbgM6Zm-89-4XJ_byqWFPb7mHMeLDJqhqe1mjssSFdz6BN8SbhpOJ2XMdUTaXhg--Emg7amXixfnVrC_TFZREG5nn0WkXzwZsA5_GsqAjWtvWGhuqAA';
    function changeRoom(room, ClearRoom) {
        dispatch(chatAction.changeRoom(room, ClearRoom));
        //get last message check read field
    }
    chatRoomList.sort((a, b) => {
        var dateA = a.lastMessage ? new Date(a.lastMessage.createdAt) : '';
        var dateB = b.lastMessage ? new Date(b.lastMessage.createdAt) : '';
        return dateB - dateA;
    })
    useEffect(() => {
        dispatch(chatAction.getChatRooms());
    }, [])
    return (
        <Sidebar position="left" scrollable={false}>
            <Search placeholder="Search..." />
            <ConversationList>
                {
                    chatRoomList ? chatRoomList.map((ele) => {
                        let user = ele.members[0]._id != JSON.parse(localStorage.getItem('user')).data.user._id ? ele.members[0] : ele.members[1];
                        let active = false;
                        if (ele.lastMessage && ele.lastMessage.read == false && currentRoom != null && currentRoom._id != ele._id && user._id != JSON.parse(localStorage.getItem('user')).data.user._id) {
                            active = true;
                        }
                        return <Conversation active={ele.lastMessage && ele.lastMessage.read==false && ele.lastMessage.sender != JSON.parse(localStorage.getItem('user')).data.user._id ? true : false} name={user ? user.firstname : '' + ' ' + user ? user.lastname : ''} info={ele.lastMessage ? ele.lastMessage.text : ''} onClick={(e) => {
                            changeRoom(ele, clearRoom)
                        }} unreadCnt={0}>
                            <Avatar src={user.photo?user.photo:avatar_def} name={user.lastname} status={user.active == true ? "available" : 'unavailable'} />
                        </Conversation>
                    }) : null

                }
            </ConversationList>
        </Sidebar>
    );
}
