import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { commentService } from './../../services/comment.service';
import { Comment } from 'antd';
import Avatar from '@material-ui/core/Avatar';
import {
    MessageInput
} from "@chatscope/chat-ui-kit-react";
const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: red[500],
    },
}));

export function CommentChildren(props) {
    var idComment = props.idComment;
    var isShowInput = props.isShowInput;
    console.log(props.isShowInput);
    //comment
    const [dataCommentChildren, setDataCommentChildren] = useState([]);
    let mounted = true;
    useEffect(() => {
        commentService.getAllCommentReply(idComment)
            .then(items => {
                if (mounted) {
                    mounted = false;
                    setDataCommentChildren(items);
                }

            })
        return () => mounted = false;
    }, []);
    //
    const [messageChildrenInputValue, setMessageChildrenInputValue] = useState("");
    const sendMessageChildren = (idComment, messageChildrenInputValue) => {

        commentService.createCommentReply(idComment, messageChildrenInputValue);
        setMessageChildrenInputValue("");
        commentService.getAllCommentReply(idComment)
            .then(items => {
                    setDataCommentChildren(items);
                }
            )
    };
    //
    return (
        <div>
            {dataCommentChildren ? dataCommentChildren.map((value) => {
                        return <Comment
                            author={<a>{value.author.firstname+ value.author.lastname}</a>}
                            avatar={
                                <Avatar
                                    src={value.author.photo}
                                    alt="Han Solo"
                                />
                            }
                            content={
                                <p>
                                    {value.text}
                                </p>
                            }
                        >

                        </Comment> 

                    }):null}
            {isShowInput?<MessageInput onChange={val => setMessageChildrenInputValue(val)} attachButton = {false}
                            onSend={(messageChildrenInputValue) => sendMessageChildren(idComment, messageChildrenInputValue)} />: ''}
        </div>

    );
}
