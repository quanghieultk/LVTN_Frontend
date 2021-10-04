import { combineReducers } from 'redux'

import { alert } from '../reducers/alert.reducer';
import { authentication } from '../reducers/authertication.reducer';
import { registration } from '../reducers/registration.reducer';
import { users } from '../reducers/users.reducer';
import { menu } from '../reducers/menu.reducer';
import { post } from '../reducers/post.reducer';
import { location } from '../reducers/location.reducer';
import { chat } from '../reducers/chat.reducer';
import { socket } from '../reducers/socket.reducer';
import { notification } from '../reducers/notification.reducer';
import { food } from '../reducers/food.reducer';
import { restaurant } from '../reducers/restaurant.reducer';

export default combineReducers({
    authentication,
    registration,
    users,
    alert,
    menu,
    post,
    location,
    chat,
    socket,
    notification,
    food,
    restaurant
});
