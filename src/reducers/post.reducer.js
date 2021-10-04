import { postConstants } from './../constants/post.constants';
var initialState = {
    postList: [],
    page: 0
};
export function post(state = initialState, action) {
    switch (action.type) {
        case postConstants.RESET_POST:
            return {
                postList: [],
                page: 0
            };
        case postConstants.DELETE_POST:
            return {
                postList: state.postList.filter(val => val._id !== action.postId),
                page: 0
            };
        case postConstants.INIT_POST_LIST:
            return {
                postList: action.postList,
                page: action.postList.length
            }
        case postConstants.ADD_POST_LIST:
            return {
                postList: [...state.postList,...action.postList],
                page: action.postList.length+state.page
            }
        case postConstants.CREATE_POST:
            return {
                // postList
            }
        case 3:
            return {
                menu: 3
            }
        default:
            return state
    }
}