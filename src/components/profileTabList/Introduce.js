import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import { useSelector } from 'react-redux';
import RoomIcon from '@material-ui/icons/Room';
const useStyles = makeStyles({
    root: {
        minWidth: 275,

    },
    bullet: {
        display: 'inline-block',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    pos: {
        marginBottom: 12,
    },
});

export function Introduce(props) {
    const userInfo = props.userInfo;
    const [isFollow, setIsFollow] = props.follow;
    const classes = useStyles();
    console.log(userInfo)
    const [followNumber, setFollowNumber] = useState(userInfo !== undefined ? userInfo.user.followers.followers.length : 0);
    const [address, setAddress] = useState(userInfo !== undefined ? userInfo.user.address : '');
    useEffect(() => {
        setFollowNumber(userInfo !== undefined ? userInfo.user.followers.followers.length : 0);
        setAddress(userInfo !== undefined ? userInfo.user.address : '');
    }, [isFollow, userInfo]);
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent >
                <Typography className={classes.title}>
                    Giới thiệu
                </Typography>
            </CardContent>
            <List>
                {address !== '' ? <ListItem >
                    <ListItemIcon>
                        <RoomIcon style={{ color: 'blue' }}></RoomIcon>
                    </ListItemIcon>
                    <ListItemText primary={address ? "Sống tại " + address : 'Chưa có địa chỉ'} />
                </ListItem> : null}
                <ListItem >
                    <ListItemIcon>
                        <RssFeedIcon style={{ color: 'blue' }}></RssFeedIcon>
                    </ListItemIcon>
                    <ListItemText primary={"Có " + followNumber + " người theo dõi"} />
                </ListItem>
            </List>
        </Card>
    );
}