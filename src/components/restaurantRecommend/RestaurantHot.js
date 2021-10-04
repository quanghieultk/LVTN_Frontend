import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Card } from 'antd';
import { List, Avatar } from 'antd';
import axios from 'axios';
import { authHeader } from '../../helpers/auth-header';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({

}));


export default function RestaurantHot() {
    const userInterests=useSelector(state=>state.authentication)
    const [data, setData] = useState([]);
    const classes = useStyles();
    let header = authHeader();
    useEffect(() => {
        let interests=[];
        if (userInterests.user.data.user.interests !== undefined) {
            userInterests.user.data.user.interests.map(ele=>interests.push(ele._id))
        axios({
            method: 'GET',
            url: 'http://localhost:8000/api/restaurants/getListRestaurantTop',
            headers: header,
            params:{
                interests: interests
            }
        }).then(response => {
            // console.log(res.data.data.listRestaurant)
            // setData(res.data.data.listRestaurant)
            let data = response.data.replace(/'/g, '"').trim()
            console.log(data)
            console.log(JSON.parse(data))
            setData(JSON.parse(data));
        }, err => {
            console.log(err)
        })
        }
    }, [])
    return (
        <Card size="small" title="Gợi ý dành cho bạn" style={{ width: '100%' }}>
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
