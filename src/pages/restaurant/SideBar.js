import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Avatar, Collapse } from '@material-ui/core';
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

export function SideBar(props) {
    const [open, setOpen] = React.useState(true);
    const classes = useStyles();
    const user = useSelector(state => state.authentication.user.data.user);
    const menu=props.menu;
    const setMenu=props.setMenu;
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

                    <ListItem button onClick={e=>setMenu(0)}>
                        <ListItemIcon >
                            <RestaurantOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Nhà hàng bạn quản lý" />
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} onClick={e=>setMenu(1)}>
                                <ListItemIcon >
                                    <AddCircleOutlineOutlinedIcon  />
                                </ListItemIcon>
                                <ListItemText primary={"Tạo mới"} />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={e=>setMenu(2)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary={"Nhà hàng đã thích"} />
                    </ListItem>
                    <ListItem button onClick={e=>setMenu(3)}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary={"Bài viết"} />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
}
