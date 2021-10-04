import { userConstants } from '../constants/user.constants';
import { chatConstants } from '../constants/chat.constants';
var initialState = {
  userInfo: {

  }
}
export function users(state = {}, action) {
  switch (action.type) {
    case chatConstants.INC_MESSAGE_COUNT:
      let messageCount = state.data != undefined ? state.data.messagesCount : 0;
      return {
        ...state,
        data: {
          ...state.data,
          messagesCount: messageCount + 1,
        },
      };

    case chatConstants.RESET_MESSAGE_COUNT:
      return {
        ...state,
        data: {
          ...state.data,
          messagesCount: 0,
        },
      };

    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.users.data.data.data
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}