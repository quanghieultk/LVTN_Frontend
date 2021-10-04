import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MessageIcon from '@material-ui/icons/Message';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
    Avatar,
} from "@chatscope/chat-ui-kit-react";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
    }
}));

export function PeopleSearch(props) {
    const classes = useStyles();
    var avatarImg = "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg";
    return (
        <Card>

            <CardContent>
                <Grid container>
                    <Grid item xs={2} className={classes.nonePadding}>
                        <Avatar src={avatarImg} name={"Zoe"} size="lg" />
                    </Grid>
                    <Grid item xs={8} className={classes.nonePadding}>
                        <Typography variant="h6" className={classes.title} component="h6">
                            Quang Hiếu
                                    </Typography>
                        <Typography className={classes.pos} variant="body2" color="textSecondary">
                            fsdafsadfds
                                    </Typography>
                        <Typography variant="body2" component="p">
                            99 người theo dõi
                                    </Typography>

                    </Grid>
                    <Grid item xs={2} className={classes.iconMessage} >
                        <MessageIcon ></MessageIcon>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
