import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Header } from '../../components/header/Header';
import { TabList } from '../../components/profileTabList/TabList';
import { CoverImage } from '../../components/coverImage/CoverImage';
import { Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { userService } from './../../services/user.service';
import { menuActions } from '../../actions/menu.action';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    nonePadding: {
        padding: "0!important"
    }
}));

export function Profile(props) {
    const idUser = props.match.params.id;
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState();
    const [isFollow, setIsFollow] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        userService.getInfoUser(idUser)
            .then(items => {
                if (items !== undefined) {
                    setUserInfo(items.data.data)
                }
            })
        dispatch(menuActions.change(-1));
    }, [isFollow,idUser]);
    return (
        <Container>
            <Grid container spacing={3} >
                <Grid item xs={12} className={classes.nonePadding}>
                    <Header></Header>
                </Grid>
                <Grid container style={{ marginTop: "100px" }}>
                    <Grid item xs={12} style={{ marginBottom: "1vh" }}  >
                        <CoverImage idUser={idUser} userInfo={userInfo} setUserInfo={setUserInfo}></CoverImage>
                    </Grid>
                    <Grid container>
                        <Grid xs={12}>
                            <div style={{ margin: 'auto', width: '100%' }}>
                                <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: "1%" }}>{userInfo ? userInfo.user.firstname + " " + userInfo.user.lastname : ''}</h1>
                            </div>
                        </Grid>
                        <Grid xs={12}>
                            <TabList idUser={idUser} follow={[isFollow, setIsFollow]} userInfo={userInfo} ></TabList>
                        </Grid>

                    </Grid>
                    <Grid item xs={4} style={{ padding: "1%" }}>
                        {/* <Post></Post> */}
                    </Grid>
                    <Grid item xs={8} style={{ padding: "1%" }}>

                    </Grid>

                </Grid>
            </Grid>
        </Container >
    );
}
