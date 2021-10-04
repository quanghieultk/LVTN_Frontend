import { authHeader } from '../helpers/auth-header';
import axios from 'axios';
export const postService = {
    getAllPost,
    deletePost,
    deleteReview,
    getPostByUser,
    getPostLikes,
    likePost,
    getSearchPost,
    getPostById,
    getMorePost,
    getAllShareAdmin,
    getAllReviewAdmin
};
function getAllReviewAdmin(){
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/posts/getAllReviewAdmin`, config);
}
function getAllShareAdmin(){
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/posts/getAllShareAdmin`, config);
}
function getAllPost() {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/posts/getPostUserFollow/0`, config);
}

function getMorePost(page) {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/posts/getPostUserFollow/`+page, config);
}

function getSearchPost(description) {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/search/searchPost?description=${description}`, config)
    .then(res =>
        res.data.data.response
    )
    .catch(error => console.log(error));
}
function deletePost(idPost) {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.delete(`http://localhost:8000/api/posts/${idPost}`, config)
        .then(res =>
                {
                    return true
                }
            )
            .catch(error => {
                return false
            })
    ;
}
function deleteReview(idPost){
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.delete(`http://localhost:8000/api/posts/deleteReview/${idPost}`, config)
        .then(res =>
                {
                    return true
                }
            )
            .catch(error => {
                return false
            })
    ;
}
function getPostByUser(idUser) {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/posts/getPostByUser/${idUser}`, config)
        .then(res =>
            res.data.data.data
        )
        .catch(error => console.log(error));
}

function getPostLikes(idPost) {
    let header = authHeader();
    let config = {
        headers: header
    }
    return axios.get(`http://localhost:8000/api/posts/getPostLikes/${idPost}`, config)
        .then(res =>
            res.data.data.data
        )
        .catch(error => console.log(error));
}

function getPostById(idPost) {
    let header = authHeader();
    let config = {
        headers: header
    }
    console.log(idPost);
    return axios.get(`http://localhost:8000/api/posts/${idPost}`, config)
        .then(res =>
            res.data.data.data
        )
        .catch(error => console.log(error));
}


function likePost(idPost,userId,authorId){
    return axios({
        method: 'post',
        url: 'http://localhost:8000/api/posts/likePost',
        data: {
            "postId": idPost,
            "userId": userId,
            "authorId": authorId
        },
        headers: authHeader()
    });
}

// create Review
// function createReview(idPost,userId,authorId){
//     return axios({
//         method: 'post',
//         url: 'http://localhost:8000/api/posts/likePost',
//         data: {
//             "postId": idPost,
//             "userId": userId,
//             "authorId": authorId
//         },
//         headers: authHeader()
//     });
// }
