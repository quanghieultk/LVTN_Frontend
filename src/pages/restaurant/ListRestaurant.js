import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Card, CardActionArea, CardContent, Divider, Typography } from '@material-ui/core';
import { restaurantService } from '../../services/restaurant.service';
import { history } from '../../helpers/history';
import { Rate } from 'antd';

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


export function ListRestaurant(props) {
    const userId = JSON.parse(localStorage.getItem('user')).data.user._id;
    const [data, setData] = useState();
    useEffect(() => {
        restaurantService.getRestaurantByUser(userId)
            .then((res) => { setData(res.data.data.restaurant) })
            .catch(err => console.log(err));
    }, [])
    return (
        <Fragment>
            <h1>Nhà hàng bạn quản lý</h1>
            <Divider></Divider>
            <List id="listRestaurant">
                {data ?
                    data.map(ele => {
                        return <ListItem onClick={(e) => {
                            console.log(ele);
                            history.push({
                                pathname: '/restaurant/' + ele._id,
                                state: {
                                    restaurant: ele.restaurantname
                                }
                            },
                            )
                        }}>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {
                                                ele.restaurantname
                                            }
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {
                                                ele.address
                                            }
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {
                                                ele.description
                                            }
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {
                                                ele.restauranttype
                                            }
                                        </Typography>
                                        <Rate disabled allowHalf defaultValue={2.5}/>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </ListItem>
                    })

                    : ""
                }
            </List>
        </Fragment>
    );
}
