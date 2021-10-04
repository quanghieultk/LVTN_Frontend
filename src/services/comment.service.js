import { authHeader } from '../helpers/auth-header';
import axios from 'axios';
export const commentService = {
    getAllCommentPost,
    getAllCommentReply,
    createComment,
    createCommentReply
};
function getAllCommentPost(idPost) {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/comments/commentPost/${idPost}`, config)
        .then(res =>
            res.data.data.data
        )
        .catch(error => console.log(error));

}
function getAllCommentReply(idComment) {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/commentReplies/commentCommentReply/${idComment}`, config)
        .then(res =>
            res.data.data.data
        )
        .catch(error => console.log(error));

}
function createComment(idPost, message,userId ,authorId) {
    return axios({
        method: 'post',
        url: 'http://localhost:8000/api/comments',
        data: {
            "text": message,
            "postId": idPost,
            "userId": userId,
            "authorId": authorId
        },
        headers: authHeader()
    })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
}
function createCommentReply(idComment, message) {
    return axios({
        method: 'post',
        url: 'http://localhost:8000/api/commentReplies',
        data: {
            "text": message,
            "commentId": idComment
        },
        headers: authHeader()
    })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
}
