import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { postService } from './../../services/post.service';
import { Post } from '../../components/post/Post';
import { Image } from 'antd';
import axios from 'axios';
import { authHeader } from '../../helpers/auth-header';
import { GridList, GridListTile } from '@material-ui/core';
import { Card } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: "100%",
    },
}));
export function ImgOfUser(props) {
    const userId = props.userId;
    const userInfo = props.userInfo;
    const classes = useStyles();
    const [imgList, setImg] = useState();
    let mounted = true;
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/getImageOfUser/' + userId, { headers: authHeader() })
            .then((result) => {
                if (mounted) {
                    var list = [];
                    result.data.restaurant.forEach(ele => {
                        list = list.concat(ele.photo);
                    })
                    setImg(list);
                }
            }).catch(err => {
                console.log(err)
            })
        return () => mounted = false;
    }, [userInfo]);
    return (
        <div>
            <GridList cellHeight={200} className={classes.gridList} cols={4}>
                {imgList ? imgList.map((ele) =>
                    <GridListTile key={ele} cols={1}>
                        <Image
                            width='100%'
                            src={ele}
                        />
                        {/* <img src={ele} alt={ele} /> */}
                    </GridListTile>
                ) : ''}
            </GridList>
        </div>
    );
}
