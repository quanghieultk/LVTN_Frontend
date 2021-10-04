import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { history } from '../../helpers/history';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import CardContent from '@material-ui/core/CardContent';
import MessageIcon from '@material-ui/icons/Message';
import { restaurantService } from '../../services/restaurant.service';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    nonePadding: {
        padding: "0!important"
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    iconMessage: {
        textAlign: 'center',
        paddingTop: '35px'
    },
    '@global': {
        // '.MuiAvatar-root': {
        //     width: '70px',
        //     height: '70px'
        // }
    }
}));

export default function ListUserFollow(props) {
    const classes = useStyles();
    const restaurantId = props.restaurantId;
    const [listFollwers, setListFollwers] = useState();
    useEffect(() => {
        restaurantService.getUserFollowRestaurant(restaurantId)
            .then((items) => {
                console.log(items.data.data.follow.follow);
                setListFollwers(items.data.data.follow.follow)
            })
    }, [])
    return (
        <div>
            <List className={classes.root}>

                <Grid container>
                    {

                        listFollwers ? listFollwers.map((ele) => {
                            return <Grid item md={6} style={{marginBottom:'5px'}}>
                                <Card style={{width: '98%'}}>
                                    <CardContent>
                                        <Grid container>
                                            <Grid item md={2} className={classes.nonePadding}>
                                                <Avatar
                                                    onClick={
                                                        () => {
                                                            console.log('sdfsd')
                                                            history.push({
                                                                pathname: "/profile/" + ele.user._id,
                                                            });
                                                            history.go();
                                                        }
                                                    }
                                                    src={ele.user.photo} name={"Zoe"} size="lg" />
                                            </Grid>
                                            <Grid item md={8} className={classes.nonePadding}>
                                                <Typography variant="h6" className={classes.title} component="h6">
                                                    {ele.user.firstname + ele.user.lastname}
                                                </Typography>
                                                <Typography className={classes.pos} variant="body2" color="textSecondary">
                                                    {ele.user.address}
                                                </Typography>
                                                <Typography variant="body2" component="p">
                                                    99 người theo dõi
                                    </Typography>

                                            </Grid>
                                            <Grid item md={2} className={classes.iconMessage} >
                                                <MessageIcon ></MessageIcon>
                                            </Grid>
                                        </Grid>
                                   </CardContent>
                                    </Card>
                                    </Grid>
                        }) : null
                    }

                </Grid>
            </List>
        </div>
    );
}
