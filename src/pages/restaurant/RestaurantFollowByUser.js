import React, { useEffect, Fragment, useState } from 'react';
import { Container } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import { Header } from '../../components/header/Header';
import { SideBar } from './../../components/sidebar/Sidebar';
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActionArea, CardContent, CardMedia, Divider, Typography } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import { history } from '../../helpers/history';
import { Rate } from 'antd';
import { userService } from '../../services/user.service';

const useStyles = makeStyles((theme) => ({
    restaurantList: {
        width: '47%',
        marginRight: '10px',
        minWidth: '300px',
        marginBottom: '10px',
        height: '300px'
    },
    media: {
        height: 140,
    },
    '@global': {
        '#listRestaurant .MuiListItem-gutters': {
            display: "block"
        }
    }
}));

export function RestaurantFollowByUser(props) {
    const classes = useStyles();
    const [data, setData] = useState();
    function reviewRestaurant(value){
        console.log("hihiihihih");
        console.log(value);
    }
    useEffect(() => {
        userService.getRestaurantsUserFollow()
            .then((res) => { 
                console.log(res.data.restaurant); 
                setData(res.data.restaurant)
             })
            .catch(err => console.log(err));
    }, [])
    return (
        <Container style={{ backgroundColor: "#FAFAFA" }}>
            <Grid container spacing={3} >
                <Grid item xs={12} className={classes.nonePadding}>
                    <Header></Header>
                </Grid>
                <Grid item xs={3}>
                    <SideBar></SideBar>
                </Grid>
                <Grid item xs={9}>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Container>
                        <Fragment>
                            <h1>Nhà hàng bạn đã thích</h1>
                            <Divider></Divider>
                            <List id="listRestaurant">
                                {console.log(data)}
                            {data ?
                    data.map(ele => {
                        console.log(ele);
                        return ele.restaurant!==null&&<Card onClick={() => { history.push("/restaurant/"+ele.restaurant._id) }} className={classes.restaurantList} style={{ float: 'left' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography variant="h5" component="h2">
                                                {
                                                    ele.restaurant?.restaurantname
                                                }
                                            </Typography>
                                            <Typography gutterBottom variant="caption" component="h2">
                                                {
                                                    ele.restaurant?.address
                                                }
                                            </Typography>
                                            <Typography variant="body2" color="initial" component="p">
                                                {
                                                    ele.restaurant?.description
                                                }
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Rate disabled allowHalf defaultValue={ele.restaurant.rating} />
                                    </CardActions>
                                </Card>
                     })

                     : ""}
                            </List>
                        </Fragment>

                    </Container >
                </Grid>
            </Grid>
        </Container>
    );
}
