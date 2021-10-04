import { postConstants } from '../constants/post.constants';
import { postService } from '../services/post.service';
export const postActions = {
    deletePost  ,
    getAllPost,
    createPost,
    updatePost,
    getMorePost,
    resetPost
};


function resetPost(postList) {
    return dispatch=>{
        try{
            dispatch(reset());
        }catch(e){

        }
    }
    function reset(){return { type: postConstants.RESET_POST }}
}

function getAllPost(postList) {
    return dispatch=>{
        try{
            dispatch(allPost(postList));
        }catch(e){

        }
    }
    function allPost(postList){return { type: postConstants.INIT_POST_LIST, postList }}
}

function getMorePost(page) {
    return dispatch=>{
        try{
            postService.getMorePost(page).then(postList=> dispatch(morePost(postList.data.data.data)))
        }catch(e){

        }
    }
    function morePost(postList){return { type: postConstants.ADD_POST_LIST, postList }}
}

function deletePost(postId) {
    return  dispatch =>{
        try {
            dispatch(_delete(postId));
        } catch (error) {
            
        }
    };

    function _delete(postId) { return { type: postConstants.DELETE_POST, postId } }
}

// function getPostByUser(params) {
//     dispatch =>  {

//     }
// }

function createPost(postId) {
  
}

function updatePost(postId) {
    
}


