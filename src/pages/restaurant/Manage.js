import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Divider } from '@material-ui/core';
import { restaurantService } from '../../services/restaurant.service';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    '@global': {
        '#listRestaurant .MuiListItem-gutters': {
            display: "block"
        }
    }
}));


export function Manage(props) {
    const classes = useStyles();
    const userId = JSON.parse(localStorage.getItem('user')).data.user._id;
    const [data, setData] = useState();
    useEffect(() => {
        restaurantService.getRestaurantByUser(userId)
            .then((res) => { setData(res.data.data.restaurant) })
            .catch(err => console.log(err));
    }, [])
    return (
        <Fragment>
            <h1>Quản lý cửa hàng</h1>
            <Divider></Divider>
            
        </Fragment>
    );
}
