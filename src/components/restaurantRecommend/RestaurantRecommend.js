import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Card } from 'antd';
import { List, Avatar } from 'antd';
import axios from 'axios';
import { authHeader } from '../../helpers/auth-header';
import { Drawer } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

}));


export default function RestaurantRecommend() {
    const [data, setData] = useState([]);
    const classes = useStyles();
    let header = authHeader();
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            axios({
                method: 'POST',
                url: 'http://localhost:8000/api/restaurants/getRecommnedRestaurantListByLocation',
                data: {
                    location: {
                        lat: position.coords.latitude,
                        long: position.coords.longitude
                    }
                },
                headers: header
            }).then(res => {
                console.log(res.data.data.listRestaurant)
                setData(res.data.data.listRestaurant)
            }, err => {
                console.log(err)
            })
        })

    }, [])
    return (
      
            <Card size="small" title="Nhà hàng gần đây" style={{ width: '100%' }}>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={''} />}
                                title={<a href={'http://localhost:3000/restaurant/' + item._id}>{item.restaurantname}</a>}
                                description={item.address}
                            />
                        </List.Item>
                    )}
                />
            </Card>
    );
}
