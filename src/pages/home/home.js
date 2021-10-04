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
import "./home.css"
import RestaurantRecommend from '../../components/restaurantRecommend/RestaurantRecommend';
import RestaurantHot from '../../components/restaurantRecommend/RestaurantHot';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress, Drawer, LinearProgress, Toolbar } from '@material-ui/core';

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
  },
  loading: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  // drawer: {
  //   width: 280,
  //   flexShrink: 0,
  // },
  // drawerPaper: {
  //   width: 280,
  //   zIndex: '0!important',
  // },
  // drawerContainer: {
  //   overflow: 'auto',
  // },
  // '@global': {
  //   '.MuiDrawer-paperAnchorDockedLeft': {
  //     border: 'none'
  //   }
  // }
}));

export function HomePage() {
  const classes = useStyles();
  //state redux
  const data = useSelector(state => state.post.postList);
  const page = useSelector(state => state.post.page);
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(true);
  let mounted = true;
  useEffect(() => {
    postService.getAllPost(page)
      .then(items => {
        console.log(items);
        dispatch(postActions.getAllPost(items.data.data.data))
        if(items.data.data.data.length<10){
          setHasMore(false)
        }
      }
      ).catch(err => console.log(err));
    return () => mounted = false;
  }, []);
  
  return (
    <Grid container spacing={0} >
      <Grid item xs={12} className={classes.nonePadding}>
        <Header></Header>
      </Grid>
      <Grid item md={3} className="sideBar">
        <SideBar ></SideBar>
      </Grid>
      {/* <Grid item md={1}>
      </Grid> */}
      <Grid item md={6}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <WhatDoYouThing></WhatDoYouThing>
        <InfiniteScroll
          dataLength={page}
          next={() => {
            dispatch(postActions.getMorePost(page))
          }}
          hasMore={hasMore}
          loader={<LinearProgress></LinearProgress>}
        >
          {
            data ? data.map((value) => {
              return <Post value={value} key={value._id} isShow={false}></Post>;
            }) : null
          }
        </InfiniteScroll>

      </Grid>
      {/* <Grid item md={1}>
      </Grid> */}
      <Grid item md={2} className={classes.rightBar}>
        {/* <Drawer
          className={classes.drawer}
          anchor={"right"}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        > */}
          <RestaurantRecommend ></RestaurantRecommend>
          <RestaurantHot></RestaurantHot>
        {/* </Drawer> */}

      </Grid>
    </Grid>
    // </Container>
  );
}
