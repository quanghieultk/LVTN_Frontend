import { userConstants } from '../constants/user.constants';
import { userService } from '../services/user.service';
import { alertActions } from './alert.actions';
import { history } from './../helpers/history';
import { socketActions } from './socket.action';
import { notification } from 'antd';
export const userActions = {
    login,
    logout,
    register,
    getAll,
    changeInfoUser,
    delete: _delete,
    getInfoUser,
    forgotPassword,
    resetPassword
};

const openNotificationWithIcon = (type, mess) => {
    notification[type]({
      message: mess,
      style: {
        marginTop: 60
      },
    });
  };

function login(username, password, from) {
    return dispatch => {
        dispatch(request({ username }));
        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user.data));
                    history.push(from);
                    dispatch(socketActions.connect());
                }
            ).catch(
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    openNotificationWithIcon('error', 'Email hoặc mật khẩu không đúng!');
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function changeInfoUser(userId, userInfo) {
    return dispatch => {
    userService.updateUser(userId, userInfo)
        .then(
            user => {
                dispatch(success(user.data));
            },
            error => {
                console.log(error);
            }
        );
    function success(user) {
        console.log(user);
        return { type: userConstants.CHANGE_INFO_USER, user }
    }
}
}

function getInfoUser(userId) {
    return dispatch => {
    userService.getInfoUser(userId)
        .then(
            user => {
                console.log(user);
                if(user!=undefined && user.data.data.user._id===JSON.parse(localStorage.getItem('user')).data.user._id){
                    dispatch(success(user.data));
                }
            },
            error => {
                console.log(error);
            }
        );
    function success(user) {
        console.log(user);
        return { type: userConstants.GET_USER, user }
    }
}
}

function logout() {
    userService.logout();
    history.push('/signIn');
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/signIn');
                    dispatch(alertActions.success('Registration successful'));
                    openNotificationWithIcon('success', 'Đăng kí thành công, hãy kích hoạt tài khoản trong mail của bạn');
                },
                error => {
                    console.log(error);
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    openNotificationWithIcon('error', 'Thông tin đăng ký không đúng!');
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function forgotPassword(username) {
    return dispatch => {
        userService.forgotPassword(username);
        history.push('/signIn');
    }
}

function resetPassword(password, passwordConfirm, token) {
    return dispatch => {
        userService.resetPassword(password, passwordConfirm, token)
        history.push('/');
    }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}
