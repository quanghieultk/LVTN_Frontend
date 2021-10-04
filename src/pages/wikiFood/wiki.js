import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { PostRestaurant } from '../../components/post/postRestaurant';
import { postRestaurantService } from './../../services/postRestaurant.service';
import Grid from "@material-ui/core/Grid";
import { Header } from '../../components/header/Header';
import { SideBar } from './../../components/sidebar/Sidebar';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  nonePadding: {
    padding: "0!important"
  }
}));
export function Wiki(props) {
  const classes = useStyles();
  const [dataPostRestaurant, setDataPostRestaurant] = useState();
  function changeState(params) {
    console.log(params)
    setDataPostRestaurant(params);
    console.log(dataPostRestaurant)
  }
  function listRestaurantPost(dataPostRestaurant) {

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
            <br></br>
            <Container>
              {console.log(dataPostRestaurant)}
              {

                dataPostRestaurant ? dataPostRestaurant.map((value, index) => {
                  return <PostRestaurant state={dataPostRestaurant} setState={changeState} value={value} index={index} key={value._id} ></PostRestaurant>;
                }) : null
              }
            </Container >
          </Grid>
        </Grid>
      </Container>
    )
  }
  useEffect(() => {
    postRestaurantService.getAllRestaurantPost()
      .then(items => {
        console.log(items)
        setDataPostRestaurant(items)
      }
      ).catch(err => console.log(err));
  }, []);
  return (
    listRestaurantPost(dataPostRestaurant)
  );
}
