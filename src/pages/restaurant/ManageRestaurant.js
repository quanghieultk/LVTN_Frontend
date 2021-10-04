import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Header } from '../../components/header/Header';
import { Container } from '@material-ui/core';
import { ManageRestaurantSidebar } from './ManageRestaurantSidebar';
import { FavouriteRestaurant } from './FavouriteRestaurant';
import { RestaurantFeed } from './RestaurantFeed';
import { Manage } from './Manage';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    nonePadding: {
        padding: "0!important"
    }
}));
function renderSwitch(param) {
    switch (param) {
        case 0:
            return <RestaurantFeed></RestaurantFeed>
        case 1:
            return <Manage></Manage>
        case 2:
            return <FavouriteRestaurant></FavouriteRestaurant>
        default:
            return ''
    }
}

export function ManageRestaurant(props) {
    const classes = useStyles();
    const [menu, setMenu] = useState(0);
    function changeMenu(params) {
        setMenu(params);
    }
    const restaurant = props.location.state.restaurant;

    useEffect(() => {
    }, [])
    return (
        <Container>
            <Grid container spacing={3} >
                <Grid item xs={12} className={classes.nonePadding}>
                    <Header></Header>
                </Grid>
                <Grid container style={{ marginTop: "100px" }}>
                    <Grid container>
                        <Grid xs={3}>
                            <ManageRestaurantSidebar restaurant={restaurant} menu={menu} setMenu={changeMenu}></ManageRestaurantSidebar>
                        </Grid>
                        <Grid xs={9}>
                            { 
                                renderSwitch(menu)
                            }
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </Container >
    );
}
