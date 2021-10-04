import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import FriendList from '../../components/friendList/FriendList';
import { WhatDoYouThing } from '../../components/whatdoyouthing/WhatDoYouThing';
import { Button } from 'antd';
import { userService } from './../../services/user.service';
import { AllPostRestaurant } from './AllPostRestaurant';
// import { IntroduceRestaurant } from './IntroduceRestaurant';
import ListUserFollow from '../../pages/restaurant/ListUserFollow';
import { restaurantService } from '../../services/restaurant.service';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import RoomIcon from '@material-ui/icons/Room';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import EmailIcon from '@material-ui/icons/Email';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
}));
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
            style={{
                width: "100%"
            }}
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
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}


export function TabListRestaurant(props) {
    const dispatch = useDispatch();
    // const idUserFollow = props.idUser;
    const restaurantId = props.restaurantId;
    const [restaurantInfo, setRestaurantInfo] = useState();
    const userInfo = useSelector(state => state.authentication.user.data);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [isFollowRestaurant, setIsFollowRestaurant] = props.followRestaurant;
    const [listRestaurantUserFollow, setListRestaurantUserFollow] = useState([]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [followNumber, setFollowNumber] = useState(0);
    useEffect(() => {
        userService.getRestaurantsUserFollow()
            .then(items => {
                console.log(items);
                if (items.data.restaurant !== []) {
                    setListRestaurantUserFollow(items.data.restaurant);
                    items.data.restaurant.forEach(element => {
                        if (element.restaurant?._id === restaurantId) {
                            setIsFollowRestaurant(true);
                        }
                    })
                }
            }).catch(error=>{
                console.log(error);
            })
        restaurantService.getRestaurantById(restaurantId)
            .then(items => {
                setRestaurantInfo(items.data.data.data);
            })

        restaurantService.getUserFollowRestaurant(restaurantId)
            .then((items) => {
                setFollowNumber(items.data.data.follow.follow ? items.data.data.follow.follow.length : 0)
            })
    }, []);


    const followRestaurant = () => {
        userService.followRestaurant(restaurantId)
            .then((res) => {
                if (res.status == 200) {

                    setIsFollowRestaurant(!isFollowRestaurant)
                    setFollowNumber(isFollowRestaurant ? followNumber - 1 : followNumber + 1);
                }
            })
            ;
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={8} style={{ padding: "1%" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        scrollButtons="off"
                        aria-label="scrollable prevent tabs example"
                        centered
                        variant="fullWidth"
                        style={{
                            width: "100%"
                        }}
                    >
                        <Tab sty label="Bài viết" {...a11yProps(0)} />
                        {/* <Tab label="Đánh giá" {...a11yProps(1)} /> */}
                        <Tab label="Follower" {...a11yProps(1)} />
                        {/* <Tab label="Ảnh" {...a11yProps(2)} /> */}

                    </Tabs>
                </Grid>
                {console.log(isFollowRestaurant)}
                <Grid item xs={4} style={{ padding: "1%" }}>
                    {
                        (isFollowRestaurant ?
                            <Button style={{ float: 'right' }} onClick={followRestaurant} >Đang theo dõi</Button> :
                            <Button style={{ float: 'right' }} onClick={followRestaurant} type="primary">Theo dõi</Button>)
                    }
                </Grid>

                <TabPanel value={value} index={0}>
                    <Grid container>
                        <Grid item xs={4} style={{ padding: "1%" }}>
                            {/* <IntroduceRestaurant restaurantIdFollow={restaurantId} followRestaurant={[isFollowRestaurant, setIsFollowRestaurant]}></IntroduceRestaurant> */}
                            <Card className={classes.root} variant="outlined">
                                <CardContent >
                                    <Typography className={classes.title}>
                                        Giới thiệu
                                    </Typography>
                                </CardContent>

                                {restaurantInfo ?
                                    <List><ListItem >
                                        <ListItemIcon>
                                            <RoomIcon style={{ color: 'blue' }}></RoomIcon>
                                        </ListItemIcon>
                                        <ListItemText primary={restaurantInfo ? "Địa chỉ " + restaurantInfo?.address : "Chưa có địa chỉ"} />
                                    </ListItem>
                                        <ListItem >
                                            <ListItemIcon>
                                                <EmailIcon style={{ color: 'blue' }}></EmailIcon>
                                            </ListItemIcon>
                                            <ListItemText primary={restaurantInfo ? "Email " + restaurantInfo?.email : 'Chưa có email'} />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemIcon>
                                                <RssFeedIcon style={{ color: 'blue' }}></RssFeedIcon>
                                            </ListItemIcon>
                                            <ListItemText primary={"Có " + followNumber + " người theo dõi"} />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemIcon>
                                                <RssFeedIcon style={{ color: 'blue' }}></RssFeedIcon>
                                            </ListItemIcon>
                                            <ListItemText primary={restaurantInfo? "Nhà hàng "+restaurantInfo.genres.map(ele=>ele.name): null} />
                                        </ListItem>
                                    </List> : ''}
                            </Card>
                        </Grid>
                        <Grid item xs={8} style={{ padding: "1%" }}>
                            <WhatDoYouThing></WhatDoYouThing>
                            <AllPostRestaurant restaurantId={restaurantId}></AllPostRestaurant>

                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <ListUserFollow restaurantId={restaurantId}></ListUserFollow>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <FriendList></FriendList>
                </TabPanel>

            </Grid>
        </div>

    );
}
