import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from 'uuid';
import {
    Avatar,
    ConversationHeader,
    VoiceCallButton,
    VideoCallButton,
    ChatContainer,
    EllipsisButton,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useDispatch, useSelector } from 'react-redux';
import { chatAction } from '../../actions/chat.action';
import TypingIndicator from '@chatscope/chat-ui-kit-react/dist/cjs/TypingIndicator';
// import { MessageInput } from './messageInput';
const useStyles = makeStyles((theme) => ({
    formMessage: {
        height: "750px",
        position: "relative"
    },
    nonePadding: {
        padding: "0!important"
    }
}));

export function MessContent(props) {
    const [messageInputValue, setMessageInputValue] = useState("");
    const dispatch = useDispatch();

    const userId = useSelector(state => state.chat.currentRoom.members[0]._id);
    const profilePicture = useSelector(state => state.chat.currentRoom.members[0].photo);
    const callingModal = useSelector(state => state.chat.callingModal);
    const socket = useSelector(state => state.socket.socket);
    const currentRoom = useSelector(state => state.chat.currentRoom);
    const roomId = useSelector(state => state.chat.roomId);
    const content = props.content;
    const messageList = content.messages;
    const avatar_def = 'https://lh3.googleusercontent.com/proxy/CItNmx7VBgaRECNTgSxUsT1WbgM6Zm-89-4XJ_byqWFPb7mHMeLDJqhqe1mjssSFdz6BN8SbhpOJ2XMdUTaXhg--Emg7amXixfnVrC_TFZREG5nn0WkXzwZsA5_GsqAjWtvWGhuqAA';
    let receiver = currentRoom.members[0]._id != JSON.parse(localStorage.getItem('user')).data.user._id ? currentRoom.members[0] : currentRoom.members[1]
    function onSubmitMessage(val) {
        let receiver = currentRoom.members[0]._id != JSON.parse(localStorage.getItem('user')).data.user._id ? currentRoom.members[0] : currentRoom.members[1]
        console.log({
            receiver: receiver,
            text: val,
            roomId,
            sender: userId,
            uuid: uuidv4()
        })
        if (val !== '') {
            dispatch(chatAction.sendMessage({
                receiver: receiver,
                text: val,
                roomId,
                sender: userId,
                uuid: uuidv4()
            }))
        }
        setMessageInputValue('');
    }

    function fetchMessage() {
        // const lastId=content.messages[0]._id;
        dispatch(chatAction.getMessagesForRoom(
            {
                ...currentRoom,
                // lastId,
                initialFetch: false
            }
        ))
    }

    useEffect(() => {
        fetchMessage()
    }, [roomId])
    return (
        <ChatContainer>
            <ConversationHeader>
                <ConversationHeader.Back />
                <Avatar src={receiver.photo} name={receiver.lastname} />
                <ConversationHeader.Content userName={receiver.lastname + ' ' + receiver.firstname} info="Active 10 mins ago" />
                <ConversationHeader.Actions>
                    <VoiceCallButton />
                    <VideoCallButton />
                    <EllipsisButton orientation="vertical" />
                </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList
                typingIndicator={
                    <TypingIndicator content="Zoe is typing" />
                }
            >
                {
                    messageList ? messageList.map(ele => {
                        return <Message model={{
                            message: ele.text,
                            sentTime: ele.createdAt,
                            sender: ele.sender != JSON.parse(localStorage.getItem('user')).data.user._id,
                            direction: ele.sender != JSON.parse(localStorage.getItem('user')).data.user._id ? "incoming" : "outgoing",
                            position: "single"
                        }}>
                            <Avatar src={ele.sender != JSON.parse(localStorage.getItem('user')).data.user._id ? receiver.photo : JSON.parse(localStorage.getItem('user')).data.user.photo}
                                name={ele.sender != JSON.parse(localStorage.getItem('user')).data.user._id?receiver.lastname:JSON.parse(localStorage.getItem('user')).data.user.lastname}
                            />
                        </Message>
                    }) : null
                }
                {/* 
                <Message model={{
                    message: "Hello my friend",
                    sentTime: "15 mins ago",
                    sender: "Patrik",
                    direction: "outgoing",
                    position: "single"
                }} avatarSpacer />
                <Message model={{
                    message: "Hello my friend",
                    sentTime: "15 mins ago",
                    sender: "Zoe",
                    direction: "incoming",
                    position: "first"
                }} avatarSpacer /> */}
            </MessageList>
            <MessageInput placeholder="Type message here" value={messageInputValue} onChange={val => setMessageInputValue(val)} onSend={(val) => onSubmitMessage(val)} />
        </ChatContainer>
    );
}
