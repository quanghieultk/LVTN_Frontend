import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Header } from '../../components/header/Header';
import { SideBarSearch } from './../../components/sidebarSearch/SidebarSearch';
import { Post } from '../../components/post/Post';
import { Card, CardActionArea, CardContent, CardMedia, Container, List, Toolbar, Typography } from '@material-ui/core';
import { postService } from '../../services/post.service';
import { searchService } from '../../services/search.service';
import { history } from '../../helpers/history';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    nonePadding: {
        padding: "0!important"
    },
    people: {
        marginTop: '100px'
    },
    avatarSize: {
        width: '50px',
        height: '50px'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    iconMessage: {
        textAlign: 'center',
        paddingTop: '35px'
    },
    restaurantList: {
        width: '47%',
        marginRight: '10px',
        minWidth: '300px',
        marginBottom: '10px',
        height: '300px'
    }, media: {
        height: 140,
    }, tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    '@global': {
        '#listRestaurant .MuiListItem-gutters': {
            display: "block"
        }
    }
}));
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
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
export function Search(props) {
    const dataSearch = props.match.params.description;
    const classes = useStyles();
    const [dataPost, setDataPost] = useState();
    const [restaurantList, setRestaurantList] = useState();
    const [userList, setUserList] = useState();
    const [value, setValue] = React.useState(0);
    let mounted = true;
    async function searchRes(searchKey) {
        let data = await searchService.searchRestaurant(searchKey);
        setRestaurantList(data);
    }
    async function searchUser(searchKey) {
        let data = await searchService.searchUser(searchKey);
        console.log(data)
        setUserList(data);
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);

    };
    useEffect(() => {
        postService.getSearchPost(dataSearch)
            .then(items => {
                if (mounted) {
                    setDataPost(items);
                }
            })
        searchRes(dataSearch);
        searchUser(dataSearch);
        // dispatch(socketAction.connect());
        return () => mounted = false;
    }, []);
    return (
        <Container>
            <Grid container spacing={3} >
                <Grid item xs={12} className={classes.nonePadding}>
                    <Header></Header>
                </Grid>
                <Grid item xs={3}>
                    {/* <SideBarSearch></SideBarSearch> */}
                    <Toolbar></Toolbar>
                    <h1>Kết quả tìm kiếm</h1>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                    >
                        <Tab label="Tất cả" {...a11yProps(0)} />
                        <Tab label="Nhà hàng" {...a11yProps(1)} />
                        <Tab label="Mọi người" {...a11yProps(2)} />
                        <Tab label="Bài viết" {...a11yProps(3)} />
                    </Tabs>
                </Grid>
                <Grid item xs={8} className={classes.people}>
                    <TabPanel value={value} index={0}>
                        {
                            restaurantList ? restaurantList.map(ele => {
                                return <Card minWidth="100%" onClick={() => history.push('/restaurant/' + ele._id)}>
                                    <CardContent >
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            Nhà Hàng
                                    </Typography>
                                        <Typography variant="h5" component="h2">{ele.restaurantname}</Typography>
                                    </CardContent>
                                </Card>
                            }) : ''
                        }
                        {console.log(userList)}
                        {

                            userList ? userList.map(ele => {
                                return <Link to={
                                    '/profile/' + ele._id
                                }>
                                    <Card
                                    >
                                        <CardContent>
                                            <Grid container>
                                                <Grid item xs={2} className={classes.nonePadding}>
                                                    <Avatar className={classes.avatarSize}
                                                        name={"Zoe"} size="lg" />
                                                </Grid>
                                                <Grid item xs={8} className={classes.nonePadding}>
                                                    <Typography variant="h6" className={classes.title} component="h6">
                                                        {ele.firstname + ' ' + ele.lastname}
                                                    </Typography>
                                                    {/* <Typography className={classes.pos} variant="body2" color="textSecondary">
                                                        {ele.user.address}
                                                    </Typography> */}


                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                    {/* <Card minWidth="100%">
                                        <CardContent >
                                            <Typography variant="h5" component="h2">{ele.firstname + ' ' + ele.lastname}</Typography>
                                        </CardContent>
                                    </Card> */}
                                </Link>

                            }) : ''
                        }
                        {

                            dataPost ? dataPost.map((value) => {
                                return <Post value={value} key={value._id} isShow={false} ></Post>;
                            }) : null
                        }

                        {/* <ImageList></ImageList>
                        <FriendList></FriendList>
                        <RestaurantNearMe></RestaurantNearMe> */}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {/* <h1>Restaurant</h1> */}
                        {
                            restaurantList ? restaurantList.map(ele => {
                                return <Card minWidth="100%" onClick={() => history.push('/restaurant/' + ele._id)}>
                                    <CardContent >
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            Nhà Hàng
                                    </Typography>
                                        <Typography variant="h5" component="h2">{ele.restaurantname}</Typography>
                                    </CardContent>
                                </Card>
                            }) : ''
                        }
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {/* <h1>User</h1> */}
                        {
                            userList ? userList.map(ele => {
                                return <Link to={
                                    '/profile/' + ele._id
                                }>
                                    <Card
                                    >
                                        <CardContent>
                                            <Grid container>
                                                <Grid item xs={2} className={classes.nonePadding}>
                                                    <Avatar className={classes.avatarSize}
                                                        name={"Zoe"} size="lg" />
                                                </Grid>
                                                <Grid item xs={8} className={classes.nonePadding}>
                                                    <Typography variant="h6" className={classes.title} component="h6">
                                                        {ele.firstname + ' ' + ele.lastname}
                                                    </Typography>
                                                    {/* <Typography className={classes.pos} variant="body2" color="textSecondary">
                                                        {ele.user.address}
                                                    </Typography> */}


                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                    {/* <Card minWidth="100%">
                                        <CardContent >
                                            <Typography variant="h5" component="h2">{ele.firstname + ' ' + ele.lastname}</Typography>
                                        </CardContent>
                                    </Card> */}
                                </Link>

                            }) : ''
                        }
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        {/* <h1>Post</h1> */}
                        {

                            dataPost ? dataPost.map((value) => {
                                return <Post value={value} key={value._id} isShow={false} ></Post>;
                            }) : null
                        }
                    </TabPanel>
                </Grid>
            </Grid >
        </Container >
    );
}
