import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Header } from '../../components/header/Header';
import { CoverImageRestaurant } from '../../components/coverImage/CoverImageRestaurant';
import { Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { TabListRestaurant } from '../../components/profileTabList/TabListRestaurant';
import {restaurantService} from '../../services/restaurant.service';
import { Rate } from 'antd';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    nonePadding: {
        padding: "0!important"
    },
    rateRestaurant: {
        textAlign: 'center'
    }
}));

export function ReviewRestaurant(props) {
    const restaurantId = props.match.params.restaurantId;
    const classes = useStyles();
    const [restaurantInfo, setRestaurantInfo] = useState();
    const [isFollowRestaurant, setIsFollowRestaurant] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        restaurantService.getRestaurantById(restaurantId)
            .then(items => {
                    setRestaurantInfo(items.data.data.data)
            })
        // dispatch(menuActions.change(-1));
        // dispatch(userActions.getInfoUser(restaurantId));
    }, [isFollowRestaurant]);
    return (
        <Container>
            {console.log(restaurantInfo)}
            <Grid container spacing={3} >
                <Grid item xs={12} className={classes.nonePadding}>
                    <Header></Header>
                </Grid>
                <Grid container style={{ marginTop: "100px" }}>
                    <Grid item xs={12} style={{ marginBottom: "1vh", height:'300px' }} >
                        <CoverImageRestaurant restaurantId={restaurantId}></CoverImageRestaurant>
                    </Grid>
                    
                    <Grid container>
                        <Grid xs={12}>
                            <div style={{ margin: 'auto', width: '100%' }}>
                                <h1 style={{ display: 'flex', justifyContent: 'center', marginBottom: "1%" }}>{restaurantInfo ? restaurantInfo.restaurantname:''}</h1>
                            </div>
                        </Grid>
                        <Grid item xs={12} className={classes.rateRestaurant} style={{ marginBottom: "1vh" }} >
                            <Rate allowHalf disabled value={restaurantInfo?restaurantInfo.rating:0}></Rate>
                        </Grid>
                        <Grid xs={12}>
                            <TabListRestaurant restaurantId={restaurantId} followRestaurant={[isFollowRestaurant, setIsFollowRestaurant]}></TabListRestaurant>
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
