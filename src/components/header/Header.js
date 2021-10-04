import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';
import TabPanel from './../tab/Tab';
import Grid from '@material-ui/core/Grid';
import DropdownUser from './dropdownUser';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { history } from '../../helpers/history';
import { notificationActions } from '../../actions/notification.action';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card, CardHeader, CircularProgress, LinearProgress, List, ListItem, ListItemText, Paper, Popover } from '@material-ui/core';
import { chatAction } from '../../actions/chat.action';
import { Link } from 'react-router-dom';
import { notificatonService } from '../../services/notification.service';
import InfiniteScroll from "react-infinite-scroll-component";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    color: "black"
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuDropdown: {
    height: '600px',
    top: '30px!important',
    right: '0px!important'
  },
  '@global': {
    '.MuiAppBar-root': {
      backgroundColor: 'white'
    }
  }
}));

export function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [searchKey, setSearchkey] = useState('');
  const dispatch = useDispatch();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const open = Boolean(anchorElNotification);
  const id = open ? 'simple-popover' : undefined;
  const notification = useSelector(state => state.notification);
  const user = useSelector(state => state.users);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = (event) => {
    setAnchorElNotification(null);
  };


  const handleNotificationMenuOpen = (event) => {
    setAnchorElNotification(event.currentTarget);
  };
  function search(e) {
    if (e.nativeEvent.key === 'Enter') {
      history.push("/search/" + searchKey);
      history.go()
    };
  }
  function changeSearch(event) {
    setSearchkey(event.target.value);
  }
  useEffect(() => {
    dispatch(notificationActions.initNotifications())
  }, [])
  const menuId = 'primary-search-account-menu';
  const renderMenu = (

    <Menu
      className={classes.menuDropdown}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <DropdownUser></DropdownUser>

    </Menu>
  );

  const renderNotification = (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorElNotification}
      onClose={handleNotificationClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      elevation={15}
    >
      <List id="listNotification" style={{ maxHeight: 300, overflow: 'auto' }}>
        <InfiniteScroll
          dataLength={notification.page}
          next={() => {
            const lastId = notification.notifications.length;
            const page = notification.page;
            dispatch(notificationActions.fetchNotifications({ initialFetch: false, lastId }, null, page));
          }}
          hasMore={true}
          loader={<LinearProgress></LinearProgress>}
          scrollableTarget="listNotification"
        >
          {(notification.notifications != null && notification.notifications.length != 0) ? notification.notifications.map((ele, index) => {
            return <ListItem key={index} onClick={() => { dispatch(notificationActions.removeNotification(index)); notificatonService.readNotifications(ele._id) }} selected={ele.read == false} style={{width: "100%"}}>
              {
                ele.type == "like_post" ? <Link to={{
                  pathname: "/post/" + ele.post,
                  state: {
                    update: ele.post
                  }
                }} style={{width: "100%"}}>{
                    <Card>
                      <CardHeader
                        avatar={<Avatar src={ele.sender.photo}>
                        </Avatar>}
                        title={ele.sender.firstname + " đã like bài viết của bạn"}
                      >
                      </CardHeader>
                    </Card>

                  }
                  {/* */}
                  {


                  }
                </Link >
                  : ele.type == 'post_comment' ? <Link onClick={() => { }} to={{
                    pathname: "/post/" + ele.post,
                    state: {
                      update: ele.post
                    }
                  }} style={{width: "100%"}}>
                    <Card >
                      <CardHeader
                        avatar={<Avatar src={ele.sender.photo}>
                        </Avatar>}
                        title={ele.sender.firstname + " đã bình luận bài viết của bạn"}
                      >
                      </CardHeader>
                    </Card>
                  </Link>
                    : ele.type == 'follow' ? <Link to={"/profile/" + ele.sender._id}  style={{width: "100%"}}>
                      <Card>
                      <CardHeader
                        avatar={<Avatar src={ele.sender.photo}>
                        </Avatar>}
                        title={ele.sender.firstname + " đã theo dõi bạn"}
                      >
                      </CardHeader>
                    </Card>
                    </Link>
                      : ''
              }
            </ListItem>
          }) : ''}
        </InfiniteScroll>
      </List>
    </Popover>
  )


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu

      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsNoneOutlinedIcon color='primary' />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleOutlinedIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container spacing={3} >
            <Grid item xs={3}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon color='primary' />
                </div>
                <OutlinedInput
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={changeSearch}
                  onKeyUp={search}
                  placeholder={"Tìm kiếm"}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <TabPanel></TabPanel>
            </Grid>
            <Grid item xs={3} style={{ justifyContent: "right" }}>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop} style={{ flexDirection: "row-reverse" }}>
                <IconButton aria-label="" color="inherit" onClick={() => {
                  dispatch(chatAction.resetMessageCount());
                  history.push("/message");
                }}>
                  <Badge badgeContent={user.data == undefined ? 0 : user.data.messagesCount} color="secondary">
                    <MailOutlinedIcon color='primary' />
                  </Badge>
                </IconButton>
                <IconButton aria-describedby={id} aria-label="" color="inherit" onClick={handleNotificationMenuOpen}>
                  <Badge badgeContent={notification.allNotificationsCount} color="secondary">
                    <NotificationsNoneOutlinedIcon color='primary' />
                  </Badge>

                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircleOutlinedIcon color='primary' />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotification}
    </div>
  );
}
