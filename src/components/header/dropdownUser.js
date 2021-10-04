import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './../../actions/user.actions';
import { history } from './../../helpers/history';
import { userService } from '../../services/user.service';
import { socketActions } from '../../actions/socket.action';
import SettingsIcon from '@material-ui/icons/Settings';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import { chatAction } from '../../actions/chat.action';
import { postActions } from '../../actions/post.action';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '300px',
    backgroundColor: theme.palette.background.paper,
  },
}));

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }


export default function DropdownUser(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(postActions.resetPost);
    dispatch(chatAction.reset);
    dispatch(userActions.logout);
    dispatch(socketActions.disconnect)
  };
  const idUser = useSelector(state => state.authentication.user.data.user);
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <Link to={
          "/profile/" + idUser._id
        }>
          <ListItem>
            <ListItemIcon>
              <AccountCircleIcon style={{ color: 'black' }}></AccountCircleIcon>
            </ListItemIcon>
            <ListItemText primary="Xem trang cá nhân" />
          </ListItem>
        </Link>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon style={{ color: 'black' }}></SettingsIcon>
          </ListItemIcon>
          <ListItemText primary="Cài đặt" onClick={() => { history.push(idUser ? "/setting/" + idUser._id : '') }} />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <MeetingRoomIcon style={{ color: 'black' }}></MeetingRoomIcon>
          </ListItemIcon>
          <ListItemText primary="Đăng xuất" onClick={logout} />
        </ListItem>

      </List>
    </div>
  );
}
