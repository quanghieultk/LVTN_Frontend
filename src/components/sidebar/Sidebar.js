import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { history } from '../../helpers/history';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: 280,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 280,
    zIndex: '0!important',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  '@global': {
    '.MuiDrawer-paperAnchorDockedLeft': {
      border: 'none'
    }
  }
}));

export function SideBar() {
  const classes = useStyles();
  const user = useSelector(state => state.authentication.user.data.user)
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <List>
        <Link to={"/profile/" + user._id}>
          <ListItem button key={1}>
            <ListItemIcon>
            { user ?  <Avatar src={user.photo}></Avatar> : <Avatar src={''}></Avatar>}  
            </ListItemIcon>
            <ListItemText primary={user.lastname + " " + user.firstname} />
          </ListItem>
        </Link>
        <Divider></Divider>
        <ListItem button key={2} onClick={() => history.push('/friend/' + user._id)}>
          <ListItemIcon>
            <EmojiPeopleIcon style={{ color: 'blue' }}></EmojiPeopleIcon>
          </ListItemIcon>
          <ListItemText primary={"Bạn bè"} />
        </ListItem>
        <ListItem button key={3} onClick={() => history.push('/restaurantFollow/' + user._id)} >
          <ListItemIcon>
            <FavoriteIcon style={{ color: 'red' }}></FavoriteIcon>
          </ListItemIcon>
          <ListItemText primary={"Yêu thích"} />
        </ListItem>
        <ListItem button key={6} onClick={() => history.push('/message')}>
          <ListItemIcon >
            <WhatsAppIcon style={{ color: 'blue' }}></WhatsAppIcon>
          </ListItemIcon>
          <ListItemText primary={"Nhắn tin"} />
        </ListItem>
      </List>
    </Drawer>
  );
}
