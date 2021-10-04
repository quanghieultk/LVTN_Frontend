import React, { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { Header } from './../../components/header/Header';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { foodAction } from '../../actions/food.action';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    nonePadding: {
        padding: "0!important"
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const tileData = [
    {
        img: 'https://res.cloudinary.com/elca/image/upload/v1618641272/gldei3c63jv9xewpzhmx.jpg',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://res.cloudinary.com/elca/image/upload/v1618641272/gldei3c63jv9xewpzhmx.jpg',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://res.cloudinary.com/elca/image/upload/v1618641272/gldei3c63jv9xewpzhmx.jpg',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://res.cloudinary.com/elca/image/upload/v1618641272/gldei3c63jv9xewpzhmx.jpg',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://res.cloudinary.com/elca/image/upload/v1618641272/gldei3c63jv9xewpzhmx.jpg',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://res.cloudinary.com/elca/image/upload/v1618641272/gldei3c63jv9xewpzhmx.jpg',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://res.cloudinary.com/elca/image/upload/v1618641272/gldei3c63jv9xewpzhmx.jpg',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://res.cloudinary.com/elca/image/upload/v1618641272/gldei3c63jv9xewpzhmx.jpg',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://res.cloudinary.com/elca/image/upload/v1618641272/gldei3c63jv9xewpzhmx.jpg',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://res.cloudinary.com/elca/image/upload/v1618641272/gldei3c63jv9xewpzhmx.jpg',
        title: 'Image',
        author: 'author',
    }, {
        img: 'https://res.cloudinary.com/elca/image/upload/v1618641272/gldei3c63jv9xewpzhmx.jpg',
        title: 'Image',
        author: 'author',
    },
];


export function Market(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();
    const foods = useSelector(state => state.food.foods);

    const stripe = window.Stripe("pk_test_51InPLOKD93gQZ0sCgoMYndjVUFg5npwtEs0vTtStWRbRNCo1xpVJ0tu6SB0xWDY8rVJwtkCEBj9NgIei9gnqLW9g00kzNEgQtH");

    useEffect(() => {
        dispatch(foodAction.getAllFoods());
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const bookFood = async foodId => {
        try {
            const session = await axios.get(`http://localhost:8000/api/bookings/checkoutSession/${foodId}`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("user")).token
                }
            });

            await stripe.redirectToCheckout({
                sessionId: session.data.session.id
            });
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Container>
            <Grid container spacing={3} >
                <Grid item xs={12} className={classes.nonePadding}>
                    <Header></Header>
                </Grid>
                <Grid container style={{ marginTop: "100px" }}>
                    <Grid container>
                        <Grid xs={2}>
                            <List component="nav" aria-label="secondary mailbox folders">
                                <ListItem button>
                                    <ListItemText primary="Đăng đồ ăn" onClick={handleClickOpen} />
                                </ListItem>
                                <ListItemLink href="#simple-list">
                                    <ListItemText primary="Trở lại" />
                                </ListItemLink>
                            </List>
                        </Grid>
                        <Grid xs={10}>
                            <GridList cellHeight={180} className={classes.gridList} cols={4}>
                                {foods.length > 0 && foods.map(food => (
                                    <GridListTile key={food.photo}>
                                        <img src={food.photo} alt={food.name} />
                                        <GridListTileBar
                                            title={food.name}
                                            subtitle={<div>
                                                <span>{food.description}</span><br/>
                                                <span>Giá {food.price}</span>
                                            </div>
                                            }
                                            actionIcon={
                                                <IconButton className={classes.icon} onClick={() => bookFood(food._id)}>
                                                    <AddShoppingCartIcon />
                                                </IconButton>
                                            }
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Đăng đồ ăn</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Nhập thông tin đồ ăn bạn muốn bán.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Tên"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Mô tả"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Giá tiền"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="photo"
                        label="Ảnh"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Huỷ
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Đăng
                    </Button>
                </DialogActions>
            </Dialog>
        </Container >
    );
}
