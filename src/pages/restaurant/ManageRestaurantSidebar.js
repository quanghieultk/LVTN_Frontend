import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Avatar } from '@material-ui/core';
import StarBorder from '@material-ui/icons/StarBorder';
import { useSelector } from 'react-redux';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        zIndex: '0!important',
    },
    drawerContainer: {
        overflow: 'auto',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    '@global': {
        '.MuiDrawer-paperAnchorDockedLeft': {
            border: 'none'
        }
    }
}));

export function ManageRestaurantSidebar(props) {
    const [open, setOpen] = React.useState(true);
    const classes = useStyles();
    const user = useSelector(state => state.authentication.user.data.user);
    const menu = props.menu;
    const setMenu = props.setMenu
    const restaurant = props.restaurant;

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItem button >
                        <ListItemIcon >
                            <Avatar src={user ? user.photo : null}></Avatar>
                        </ListItemIcon>
                        <ListItemText primary={user.firstname + " " + user.lastname} />

                    </ListItem>
                    <Divider></Divider>
                    <div style={{padding: "3%"}}>
                        <h1>Quản lý trang </h1>
                        <h3>
                            {restaurant ? restaurant : ''}
                        </h3>
                    </div>
                    <Divider></Divider>
                    <ListItem button onClick={e => setMenu(0)}>
                        <ListItemIcon >
                            <RestaurantOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Bảng tin" />
                    </ListItem>
                    <ListItem button onClick={e => setMenu(1)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary={"Quản lý cửa hàng"} />
                    </ListItem>
                    <ListItem button onClick={e => setMenu(2)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary={"Hộp thư"} />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
}
