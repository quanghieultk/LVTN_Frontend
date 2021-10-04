import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { history } from '../../helpers/history';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { userService } from '../../services/user.service';
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import CardContent from '@material-ui/core/CardContent';
import MessageIcon from '@material-ui/icons/Message';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        padding: '0!important'
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
    avatarSize: {
        width: '70px',
        height: '70px'
    }
    // '@global': {
    //     'div.MuiAvatar-root': {
    //         width: '70px',
    //         height: '70px'
    //     }
    // }
}));

export default function ListFriend(props) {
    const classes = useStyles();
    const [listFollwers, setListFollwers] = useState();
    const [listFollwings, setListFollwings] = useState();
    useEffect(() => {
        userService.getFollwer(props.userId).then(res => {
            setListFollwers(res.data.data.friendList[0].followers);
        }).catch(err => [
            console.log(err)
        ])
        userService.getFollwing(props.userId).then(res => {
            setListFollwings(res.data.data.friendList[0].following);
        }).catch(err => [
            console.log(err)
        ])
    }, [])
    return (
        <div>
            <Typography>Người theo dõi</Typography>
            <List className={classes.root}>
                {
                    listFollwers ? listFollwers.map((ele) => {
                        return <Card
                            style={{ margin: "1%" }}
                        >
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={2} className={classes.nonePadding}>
                                        <Avatar className={classes.avatarSize}
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
                                    <Grid item xs={8} className={classes.nonePadding}>
                                        <Typography variant="h6" className={classes.title} component="h6">
                                            {ele.user.firstname + ele.user.lastname}
                                        </Typography>
                                        <Typography className={classes.pos} variant="body2" color="textSecondary">
                                            {ele.user.address}
                                        </Typography>


                                    </Grid>
                                    <Grid item xs={2} className={classes.iconMessage} >
                                        <MessageIcon ></MessageIcon>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        // <ListItem alignItems="flex-start">
                        //     <ListItemAvatar>
                        //         <Avatar className={classes.avatarImg}  alt="Remy Sharp" src={ele.user.photo} />
                        //     </ListItemAvatar>
                        //     <ListItemText
                        //         primary={ele.user.firstname}
                        //         secondary={
                        //             <React.Fragment>
                        //                 <Typography
                        //                     component="span"
                        //                     variant="body2"
                        //                     className={classes.inline}
                        //                     color="textPrimary"
                        //                 >
                        //                     {ele.user.address}
                        //                 </Typography>
                        //             </React.Fragment>
                        //         }
                        //     />
                        // </ListItem>
                    }) : null
                }
            </List>
            <Typography>Đang theo dõi</Typography>
            <List className={classes.root}>
                {
                    listFollwings ? listFollwings.map((ele) => {
                        return <Card
                            style={{ margin: "1%" }}
                            onClick={
                                () => {
                                    history.push({
                                        pathname: "/profile/" + ele.user._id,
                                    });
                                    history.go();
                                }
                            }>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={2} className={classes.nonePadding}>
                                        <Avatar className={classes.avatarSize} src={ele.user?.photo} name={"Zoe"} size="lg" />
                                    </Grid>
                                    <Grid item xs={8} className={classes.nonePadding}>
                                        <Typography variant="h6" className={classes.title} component="h6">
                                            {ele.user?.firstname + ele.user?.lastname}
                                        </Typography>
                                        <Typography className={classes.pos} variant="body2" color="textSecondary">
                                            {ele.user?.address}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2} className={classes.iconMessage} >
                                        <MessageIcon ></MessageIcon>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    }) : null
                }
            </List>
        </div>
    );
}
