import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { postRestaurantService } from '../../services/postRestaurant.service';
import { PostRestaurant } from '../post/postRestaurant';
import { Post } from '../post/Post';
const useStyles = makeStyles((theme) => ({

}));

export function AllPostRestaurant(props) {
    const restaurantId = props.restaurantId;
    const [dataPostRestaurant, setDataPostRestaurant] = useState([]);

    useEffect(() => {
        postRestaurantService.getPostByIdRestaurant(restaurantId)
            .then(items => {
                    console.log(items)
                    setDataPostRestaurant(items);
            })
    }, []);


    return (
        <div>
            {
                dataPostRestaurant ? dataPostRestaurant.map((value) => {
                    return <Post value={value} key={value._id}></Post>;
                }) : null
            }
        </div>
    );
}
