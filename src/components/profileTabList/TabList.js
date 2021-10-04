import React, { useEffect } from 'react';
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
import { userActions } from '../../actions/user.actions';
import { AllPost } from './AllPost';
import { Introduce } from './Introduce'
import ListFriend from '../../pages/friend/ListFriend';
import { ImgOfUser } from './ImgOfUser';
const useStyles = makeStyles((theme) => ({

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



export function TabList(props) {
    const dispatch = useDispatch();
    const idUserFollow = props.idUser;
    // const userInfo = useSelector(state => state.authentication.user.data);
    const userInfo = props.userInfo;
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [isFollow, setIsFollow] = props.follow;
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const dataUserCurrent = useSelector(state => state.authentication.user.data.user);
    useEffect(() => {
        if (dataUserCurrent.followings != null) {
            dataUserCurrent.followings.following.forEach(element => {
                if (element.user === idUserFollow) {
                    setIsFollow(true);
                }
            });
        }

    }, []);

    if (dataUserCurrent._id === idUserFollow) {
        var isCurrentUser = true;
    }

    const followUser = () => {
        userService.follow(idUserFollow)
            .then((res) => {
                if (res.status == 200) {
                    dispatch(userActions.getInfoUser(dataUserCurrent._id));
                    if (isFollow == true) {
                        setIsFollow(false)
                    }
                    else {
                        setIsFollow(true)
                    }
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
                        <Tab label="Bạn bè" {...a11yProps(1)} />
                        <Tab label="Ảnh" {...a11yProps(2)} />

                    </Tabs>
                </Grid>
                <Grid item xs={4} style={{ padding: "1%" }}>
                    {isCurrentUser ? '' :
                        (isFollow ?
                            <Button style={{ float: 'right' }} onClick={followUser} >Đang theo dõi</Button> :
                            <Button style={{ float: 'right' }} onClick={followUser} type="primary">Theo dõi</Button>)}
                </Grid>

                <TabPanel value={value} index={0}>
                    <Grid container>
                        <Grid item xs={4} style={{ padding: "1%" }}>
                            <Introduce userInfo={userInfo} follow={[isFollow, setIsFollow]}></Introduce>
                        </Grid>
                        <Grid item xs={8} style={{ padding: "1%" }}>
                            {isCurrentUser ? <WhatDoYouThing></WhatDoYouThing> : ''}
                            <AllPost idUser={idUserFollow}></AllPost>

                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ListFriend userId={idUserFollow}></ListFriend>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ImgOfUser userId={idUserFollow} userInfo={userInfo}></ImgOfUser>
                </TabPanel>
            </Grid>
        </div>

    );
}
