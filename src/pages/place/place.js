import React, { useEffect, Fragment, useState } from 'react';
import { Badge, Container, Toolbar } from '@material-ui/core';
import { PostRestaurant } from '../../components/post/postRestaurant';
import { postRestaurantService } from './../../services/postRestaurant.service';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import { Header } from '../../components/header/Header';
import { SideBar } from './../../components/sidebar/Sidebar';
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActionArea, CardContent, CardMedia, Divider, Typography } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { restaurantService } from '../../services/restaurant.service';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { history } from '../../helpers/history';
import { Rate } from 'antd';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { authHeader } from '../../helpers/auth-header';
import { getJsonFromCsv } from "convert-csv-to-json";
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme) => ({
    restaurantList: {
        width: '30%',
        marginRight: '10px',
        minWidth: '300px',
        marginBottom: '10px',
        height: '300px'
    },
    media: {
        height: 140,
    },
    tabs: {
        marginLeft : '30%'
    },
    '@global': {
        '#listRestaurant .MuiListItem-gutters': {
            display: "block"
        }
    }
}));

export function Place(props) {
    const classes = useStyles();
    const [data, setData] = useState();
    const [dataNear, setDataNear] = useState();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    let header = authHeader();
    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:8000/api/restaurants/getListRestaurantByRating',
            headers: header
        }).then(response => {
            // let csvBuffer = new Buffer(res.data.data.list, 'base64');
            // let csvText = csvBuffer.toString('ascii');
            
            let data=response.data.replace(/'/g, '"').trim()
            console.log(data)
            console.log(JSON.parse(data))
            setData(JSON.parse(data));
        }, err => {
            console.log(err)
        })
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
                setDataNear(res.data.data.listRestaurant)
            }, err => {
                console.log(err)
            })
        })
    }, [])
    return (
        <Container style={{ backgroundColor: "#FAFAFA" }}>
            <Toolbar></Toolbar>
            <Tabs
                // orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Xếp hạng" {...a11yProps(0)} />
                <Tab label="Gần đây" {...a11yProps(1)} />
            </Tabs>
            <Grid container spacing={3} >
                <Grid item xs={12} className={classes.nonePadding}>
                    <Header></Header>
                </Grid>
                <Grid item xs={3}>
                    <SideBar></SideBar>
                </Grid>
                <Grid item xs={9}>
                    <TabPanel value={value} index={0}>
                        <Container>
                            <Fragment>
                                <h1>Xếp hạng nhà hàng</h1>
                                <Divider></Divider>
                                <List id="listRestaurant">
                                    {data ?
                                        data.map((ele, index) => {
                                            return <Badge
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                overlap='circle'
                                                badgeContent={index + 1}
                                                color="primary"
                                                style={{width:'42%', float: 'left'}}
                                            >
                                                <Card onClick={() => { history.push("/restaurant/" + ele._id) }} className={classes.restaurantList} style={{ float: 'left', height: '400px' }}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            className={classes.media}
                                                            image="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
                                                            title="Contemplative Reptile"
                                                        />
                                                        <CardContent>
                                                            <Typography variant="h5" component="h2">
                                                                {
                                                                    ele.restaurantname
                                                                }
                                                            </Typography>
                                                            <Typography gutterBottom variant="caption" component="h2">
                                                                {
                                                                    ele.address
                                                                }
                                                            </Typography>
                                                            <CardActions>
                                                                <Rate disabled allowHalf defaultValue={ele.rating} />
                                                             </CardActions>
                                                            <Typography variant="body2" color="initial" component="p">
                                                                {
                                                                    ele.description
                                                                }
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                    
                                                </Card>
                                            </Badge>
                                        })

                                        : ""}
                                </List>

                            </Fragment>

                        </Container >
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Container>
                            <Fragment>
                                <h1>Nhà hàng gần bạn</h1>
                                <Divider></Divider>
                                <List id="listRestaurantNear">
                                    {dataNear ?
                                        dataNear.map(ele => {
                                            return <Card onClick={() => { history.push("/restaurant/" + ele._id) }} className={classes.restaurantList} style={{ float: 'left', height: '400px' }}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={classes.media}
                                                        image="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
                                                        title="Contemplative Reptile"
                                                    />
                                                    <CardContent>
                                                        <Typography variant="h5" component="h2">
                                                            {
                                                                ele.restaurantname
                                                            }
                                                        </Typography>
                                                        <Typography gutterBottom variant="caption" component="h2">
                                                            {
                                                                ele.address
                                                            }
                                                        </Typography>
                                                         <CardActions>
                                                            <Rate disabled allowHalf defaultValue={ele.rating} />
                                                        </CardActions>
                                                        <Typography variant="body2" color="initial" component="p">
                                                            {
                                                                ele.description
                                                            }
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                               
                                            </Card>
                                        })

                                        : ""}
                                </List>
                            </Fragment>

                        </Container >
                    </TabPanel>
                </Grid>
            </Grid>
        </Container>
    );
}
