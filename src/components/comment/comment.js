import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Comment } from 'antd';
import axios from 'axios';


const [isShowCommentReplyTo, setIsShowCommentReplyTo] = useState(false);
const handleReplyTo = () => {
    setIsShowCommentReplyTo(true);
};
const ExampleComment = ({ children }) => (
    <Comment
        actions={[<span key="comment-nested-reply-to" onClick={handleReplyTo} >Reply to</span>]}
        author={<a>Han Solo</a>}
        avatar={
            <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
            />
        }
        content={
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure).
        </p>
        }
    >
        {children}
        {isShowCommentReplyTo ? <MessageInput /> : ''}
    </Comment>
);

export function comment() {
    const [isShowCommentReplyTo, setIsShowCommentReplyTo] = useState(false);

    return (
        <Comment

        >

        </Comment>
    );
}

