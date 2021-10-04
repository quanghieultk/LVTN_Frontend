import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { restaurantService } from '../../services/restaurant.service';
import RoomIcon from '@material-ui/icons/Room';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import EmailIcon from '@material-ui/icons/Email';
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

export function IntroduceRestaurant(props) {
    const restaurantId = props.restaurantIdFollow;
    const [restaurantInfo, setRestaurantInfo] = useState();
    const [isFollow, setIsFollow] = props.followRestaurant;
    const classes = useStyles();
    // const bull = <span className={classes.bullet}>•</span>;
    const [followNumber, setFollowNumber] = useState(0);
    useEffect(() => {
        restaurantService.getRestaurantById(restaurantId)
            .then(items => {
                setRestaurantInfo(items.data.data.data);
            })

        restaurantService.getUserFollowRestaurant(restaurantId)
            .then((items) => {
                setFollowNumber(items.data.data.follow.follow ? items.data.data.follow.follow.length : 0)
            })



    }, []);
    return (
        <Card className={classes.root} variant="outlined">
            {console.log(restaurantInfo)}
            <CardContent >
                <Typography className={classes.title}>
                    Giới thiệu ABC
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
                </List> : ''}
        </Card>
    );
}