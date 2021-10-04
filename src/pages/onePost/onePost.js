import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Header } from '../../components/header/Header';
import { SideBar } from './../../components/sidebar/Sidebar';
import { Post } from '../../components/post/Post';
import { WhatDoYouThing } from './../../components/whatdoyouthing/WhatDoYouThing';
import { postService } from './../../services/post.service';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from './../../actions/post.action';
import "./onePost.css"
import RestaurantRecommend from '../../components/restaurantRecommend/RestaurantRecommend';
import { Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  nonePadding: {
    padding: "0!important"
  },
  rightBar: {
    marginTop: '86px',
    marginLeft: '70px'
  }
  

}));

export function OnePost(props) {
  const update=props.location.state!=null?props.location.state.update:true;
  const idPost = props.match.params.idPost;
  const classes = useStyles();
  //state redux
  const [data,setData] = useState();
  useEffect(() => {
    postService.getPostById(idPost)
      .then(items => {
        console.log(items);
        setData(items);
      }
      ).catch(err => console.log(err));
  }, [update]);

  return (
    <Grid container spacing={0} >
      <Grid item xs={12} className={classes.nonePadding}>
        <Header></Header>
      </Grid>
      <Grid item md={2} className="sideBar">
      </Grid>
      <Grid item md={1}>
      </Grid>
      <Grid item md={6}>
        <Toolbar></Toolbar>
        {
            data?<Post value={data} key={idPost} isShow={false} expand={true}></Post>:''
        }
      </Grid>
      <Grid item md={2} className={classes.rightBar}>
      </Grid>

    </Grid>
    // </Container>
  );
}
