import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Header } from '../../components/header/Header';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './../../actions/user.actions';
import { menuActions } from '../../actions/menu.action';
import { SideBar } from './../../components/sidebar/Sidebar';
import ListFriend from './ListFriend'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    nonePadding: {
        padding: "0!important"
    }
}));

export function Friend(props) {
    const idUser = props.match.params.id;
    const classes = useStyles();
    const userInfo = useSelector(state => state.authentication.user.data);
    const [isFollow, setIsFollow] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(menuActions.change(-1));
        dispatch(userActions.getInfoUser(idUser));
    }, [isFollow]);
    return (
        <Container>
            <Grid container spacing={3} >
                <Grid item xs={12} className={classes.nonePadding}>
                    <Header></Header>
                </Grid>
                <Grid container style={{ marginTop: "100px" }}>
                    <Grid item xs={3}>
                        <SideBar></SideBar>
                    </Grid>
                    <Grid item xs={9}>
                        <ListFriend userId={idUser} />
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    );
}
