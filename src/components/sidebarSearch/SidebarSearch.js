import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleIcon from '@material-ui/icons/People';
import Toolbar from '@material-ui/core/Toolbar';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ShareIcon from '@material-ui/icons/Share';
import Divider from '@material-ui/core/Divider';


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
        zIndex: '1000!important',
    },
    drawerContainer: {
        overflow: 'auto',
    },
    titleH2: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        paddingLeft: '17px',
        marginTop: '10px'
    },
    titleP: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        margin: '15px 0px 2px 17px',
        fontWeight: 'bold'
    },
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
}));

export function SideBarSearch() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
  
    const handleClick = () => {
      setOpen(!open);
    };
    return (
        <Drawer
            className={classes.drawer}

            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >

            <Toolbar />
            <h2 className={classes.titleH2}>Kết quả tìm kiếm</h2>
            <Divider />
            <div className={classes.drawerContainer}>
                <p className={classes.titleP}>Bộ lọc</p>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.list}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tất cả" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <RestaurantIcon />
                        </ListItemIcon>
                        <ListItemText primary="Nhà hàng" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Mọi người" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <VisibilityIcon />
                        </ListItemIcon>
                        <ListItemText primary="Review" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ShareIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chia sẻ kinh nghiệm" />
                    </ListItem>
                </List>
                <Divider />
            </div>
        </Drawer>
    );
}
