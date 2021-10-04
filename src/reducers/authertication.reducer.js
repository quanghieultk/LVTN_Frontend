import { userConstants } from '../constants/user.constants';

let user = JSON.parse(localStorage.getItem('user'));
// let user="";
const initialState = user? { loggedIn: true, user} : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user.email

      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggingIn: true,
        user: ""
      };
    case userConstants.LOGOUT:
      return {
        loggingIn: true,
        user: ""
      };
    case userConstants.CHANGE_INFO_USER:
      {
        user.data=action.user.data
        localStorage.setItem('user', JSON.stringify(user));
      return {
        loggingIn: true,
        user: action.user
      }
    }
    case userConstants.GET_USER:
      {
        user.data=action.user?action.user.data:null;
        localStorage.setItem('user', JSON.stringify(user));
        // localStorage.setItem('userInfo', JSON.stringify(action.user));
        // console.log(action.user);
        return {
          loggingIn: true,
          user: action.user
        }
      }
      
    default:
      return state
  }
}