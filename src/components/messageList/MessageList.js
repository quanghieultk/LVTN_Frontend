import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ConversationList, Sidebar } from '@chatscope/chat-ui-kit-react';
import Search from '@chatscope/chat-ui-kit-react/dist/cjs/Search';
import Conversation from '@chatscope/chat-ui-kit-react/dist/cjs/Conversation';
import Avatar from '@chatscope/chat-ui-kit-react/dist/cjs/Avatar';



export function MessageLists() {
    return (
        <Sidebar position="left" scrollable={false}>
            <Search></Search>
            <ConversationList>
                <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
                    <Avatar>
                        R
                    </Avatar>
                </Conversation>
                <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you">
                    <Avatar>
                        R
                    </Avatar>
                </Conversation>

                <Conversation name="Emily" lastSenderName="Emily" info="Yes i can do it for you" unreadCnt={3}>
                    <Avatar>
                        R
                    </Avatar>
                </Conversation>

                <Conversation name="Kai" lastSenderName="Kai" info="Yes i can do it for you" unreadDot>
                    <Avatar>
                        R
                    </Avatar>
                </Conversation>

                <Conversation name="Akane" lastSenderName="Akane" info="Yes i can do it for you">
                    <Avatar>
                        R
                    </Avatar>
                </Conversation>

                <Conversation name="Eliot" lastSenderName="Eliot" info="Yes i can do it for you">
                    <Avatar>
                        R
                    </Avatar>
                </Conversation>

                <Conversation name="Zoe" lastSenderName="Zoe" info="Yes i can do it for you" active>
                    <Avatar>
                        R
                    </Avatar>
                </Conversation>

                <Conversation name="Patrik" lastSenderName="Patrik" info="Yes i can do it for you">
                    <Avatar>
                        R
                    </Avatar>
                </Conversation>
            </ConversationList>
        </Sidebar>
    );
}
