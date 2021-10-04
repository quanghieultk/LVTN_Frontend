import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { Restaurant } from './Restaurant';
import { Review } from './Review';
import { Experience } from './Experience';
import { User } from './User';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    rootTab: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    table: {
        minWidth: 1100,
    },
}));

export function Admin() {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit">
                                Admin
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <div className={classes.rootTab}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                            <Tab label="Nhà hàng" {...a11yProps(0)} />
                            <Tab label="Kinh nghiệm" {...a11yProps(1)} />
                            <Tab label="Đánh giá" {...a11yProps(2)} />
                            <Tab label="Người dùng" {...a11yProps(3)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <Restaurant />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Experience />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Review />
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <User />
                        </TabPanel>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
