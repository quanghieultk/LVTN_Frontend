import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import MessageIcon from '@material-ui/icons/Message';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
    iconMore: {
        textAlign: 'center',
        padding: 'auto 0 auto 0'
    }
}));

export default function FriendList() {

    const classes = useStyles();
    const hangleOnClick = () => {
        console.log("da kich");
    }
    const friendList=useSelector(state=>state.authentication.user);
    console.log(friendList);
    var avatarImg = "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";
    return (
        <Card>
            <CardHeader
                title="Bạn bè"
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }

            />
            <CardContent>

                <Card style={{ width: '50%', float: 'left' }}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={3} className={classes.nonePadding}>
                                <Avatar src={avatarImg} name={"Zoe"} size="lg" />
                            </Grid>
                            <Grid item xs={7} className={classes.nonePadding}>
                                <Typography variant="h6" className={classes.title} component="h6">
                                    Quang Hiếu
                                    </Typography>
                                <Typography className={classes.pos} variant="body2" color="textSecondary">
                                    Bạn bè
                                    </Typography>

                            </Grid>
                            <Grid className={classes.iconMore} item xs={2} >
                                <MoreVertIcon ></MoreVertIcon>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>

    );
}