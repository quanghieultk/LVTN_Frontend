import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { commentService } from './../../services/comment.service';
import { Comment } from 'antd';
import { CommentChildren } from './CommentChildren';
import Avatar from '@material-ui/core/Avatar';
import {
    MessageInput
} from "@chatscope/chat-ui-kit-react";
const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: red[500],
    },
}));

export function CommentPost(props) {
    var idPost = props.idPost;
    //comment
    const [dataComment, setDataComment] = useState([]);
    let mounted = true;
    useEffect(() => {
        commentService.getAllCommentPost(idPost)
            .then(items => {
                if (mounted) {
                    mounted = false;
                    setDataComment(items);
                }
            })
        return () => mounted = false;
    }, []);
    const [messageInputValue, setMessageInputValue] = useState("");
    const sendMessage = (messageInputValue) => {
        let userId=JSON.parse(localStorage.getItem('user'))._id;
        let authorId=props.authorId
        commentService.createComment(idPost, messageInputValue,userId,authorId);

        setMessageInputValue("");
        commentService.getAllCommentPost(idPost)
            .then(items => {
                if (mounted) {
                    mounted = false;
                    setDataComment(items);
                }

            })
        return () => mounted = false;
    };
    
    const [isShowCommentReplyTo, setIsShowCommentReplyTo] = useState(false);
    const [idCommentParent, setIdCommentParent] = useState();
    const handleReplyTo = (value) => {
        setIsShowCommentReplyTo(true);
        setIdCommentParent(value);
    };
    
    return (
        <div>
            <MessageInput attachButton = {false} onChange={val => setMessageInputValue(val)}
                onSend={(messageInputValue) => sendMessage(messageInputValue)}  />
            {
                dataComment?dataComment.map((value) => {
                    return <Comment
                        actions={[<span key="comment-nested-reply-to" onClick={() => handleReplyTo(value._id)} >Reply to</span>]}
                        author={<a>{value.author.firstname+ value.author.lastname}</a>}
                        avatar={
                            <Avatar
                                src={value.author.photo}
                                alt=""
                            />
                        }
                        content={
                            <p>
                                {value.text}
                            </p>
                        }
                    >
                        <CommentChildren idComment={value._id} isShowInput = {isShowCommentReplyTo&&idCommentParent == value._id}></CommentChildren>
                    </Comment>
                }):null
            }
        </div>

    );
}
