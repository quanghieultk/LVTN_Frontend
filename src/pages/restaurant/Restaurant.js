import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Header } from '../../components/header/Header';
import { Container } from '@material-ui/core';
import { SideBar } from './SideBar';
import { ListRestaurant } from './ListRestaurant';
import { FavouriteRestaurant } from './FavouriteRestaurant';
import { CreateNewRestaurant } from '../../components/createNewRestaurant/create'

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
            return <ListRestaurant></ListRestaurant>
        case 1:
            return <CreateNewRestaurant></CreateNewRestaurant>
        case 2:
            return <FavouriteRestaurant></FavouriteRestaurant>
        default:
            return ''
    }
}

export function Restaurant(props) {
    const classes = useStyles();
    const [menu, setMenu] = useState(0);
    function changeMenu(params) {
        setMenu(params);
    }
    useEffect(() => {
        
    },[])
    return (
        <Container>
            <Grid container spacing={3} >
                <Grid item xs={12} className={classes.nonePadding}>
                    <Header></Header>
                </Grid>
                <Grid container style={{ marginTop: "100px" }}>
                    <Grid container>
                        <Grid xs={3}>
                            <SideBar menu={menu} setMenu={changeMenu}></SideBar>
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
