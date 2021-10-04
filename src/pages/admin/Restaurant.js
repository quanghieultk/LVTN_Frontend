import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { restaurantAction } from './../../actions/restaurant.action';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { Rate } from 'antd';
import { Upload, notification } from 'antd';
import Location from './../../components/whatdoyouthing/Location';
import axios from 'axios';
import { postActions } from './../../actions/post.action';
import { postService } from '../../services/post.service';
import { Modal } from 'antd';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import getBase64 from './../../utils/getBase64';
import { Form, Input } from 'antd';
import { authHeader } from './../../helpers/auth-header';
import { PlusOutlined } from '@ant-design/icons';
import LocationOn from '@material-ui/icons/LocationOn';
import { Select } from 'antd';

import { restaurantService } from './../../services/restaurant.service';

const { Option } = Select;

const useStyles = makeStyles({
    table: {
        width: 1100,
    },
    avatar: {
        backgroundColor: '',
    },
    itemIcon: {
        width: "20%",
        float: "left",
    },
    formItem: {
        marginBottom: '0px'
    },
});

export function Restaurant() {
    const classes = useStyles();

    const openNotificationWithIcon = (type, mess) => {
        notification[type]({
            message: mess,
            style: {
                marginTop: 60
            },
        });
    };

    const dispatch = useDispatch();

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('false');
    const [fileList, setFileList] = useState([]);
    const [nameRest, setNameRest] = useState('');
    const [emailRest, setEmailRest] = useState('');
    const [phoneRest, setPhoneRest] = useState('');
    const [interesting, setInteresting] = useState()
    const [isShowModal, setIsShowModal] = React.useState(false);
    const [isShowMap, setIsShowMap] = React.useState(false);
    const [rate, setRate] = useState(
        {
            food: 0,
            staffAttitude: 0,
            facilities: 0,
            processServing: 0
        }
    );
    const [isShowModalEdit, setIsShowModalEdit] = React.useState(false);


    useEffect(() => {
        dispatch(restaurantAction.getAllRestaurant());
        axios.get('http://localhost:8000/api/users/interesting/all').then(response => {
            setInteresting(response.data.interesting)
        })
    }, []);

    const restaurants = useSelector(state => state.restaurant.restaurants);
    const location = useSelector(state => state.location);
    const user = useSelector(state => state.authentication.user);

    const [form] = Form.useForm();
    const date = new Date().toLocaleString();
    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ ...formInput, [name]: newValue });
    };

    const approveRestaurant = (id) => {
        restaurantService.approveRestaurant(id);
        dispatch(restaurantAction.getAllRestaurant());
    }


    const [formInput, setFormInput] = useState({
        user: JSON.parse(localStorage.getItem('user')).data.user._id,
        restaurantname: "",
        address: "",
        location: "",
        email: "",
        phone: "",
        type: "",
        description: "",
        id: "",
        genres: []
    });
    const onEdit = (value) => {
        setIsShowModalEdit(true);
        setFormInput({
            restaurantname: value.restaurantname,
            address: value.address,
            location: JSON.stringify(value.location),
            email: value.email,
            phone: value.phone,
            description: value.description,
            user: JSON.parse(localStorage.getItem('user')).data.user._id,
            id: value._id,
            genres: value.genres
        });
        formInput.genres = value.genres;
        location.address = value.address;
        location.location = [value.location.long, value.location.lat];
    }

    function handleChange(value) {
        var val=[];
        interesting.forEach(element => {
          if(value.includes(element.id)){
            console.log("ABC")
            val.push(element)
          }
        });
        setFormInput({
            ...formInput, genres: val
        });
        formInput.genres=val
      }
    
    const onFinishEdit = async (values) => {
        let header = authHeader();
        let config = {
            headers: header
        }
    
        axios.post(`http://localhost:8000/api/restaurants/update/${formInput.id}`, {
            address: location.address,
            description: formInput.description,
            email: formInput.email,
            location: {
                lat: location.location[1],
                long: location.location[0]
            },
            phone: formInput.phone,
            restaurantname: formInput.restaurantname,
            user: formInput.user,
            isAcive: true,
            genres: formInput.genres.map(x => x._id)
        }, config)
            .then(res => {
                console.log(formInput);
                setIsShowModalEdit(false);
                dispatch(restaurantAction.getAllRestaurant());
            }
            ).catch(error => {
                console.log(error)
                openNotificationWithIcon('error', 'Đề xuất thất bại!')
            });
    };

    const onFinish = async (values) => {
        let header = authHeader();
        let config = {
            headers: header
        }
    
        axios.post(`http://localhost:8000/api/restaurants/create`, {
            address: location.address,
            description: formInput.description,
            email: formInput.email,
            location: {
                lat: location.location[1],
                long: location.location[0]
            },
            phone: formInput.phone,
            restaurantname: formInput.restaurantname,
            user: formInput.user,
            isAcive: true,
            genres: formInput.genres.map(x => x._id)
        }, config)
            .then(res => {
                console.log(formInput);
                setIsShowModal(false);
                dispatch(restaurantAction.getAllRestaurant());
            }
            ).catch(error => {
                console.log(error)
                openNotificationWithIcon('error', 'Đề xuất thất bại!')
            });
    };

    const onDelete = (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Bạn có chắc chắn xoá không ?')) {
            let header = authHeader();
            let config = {
                headers: header
            }

            axios.delete(`http://localhost:8000/api/restaurants/delete/${id}`, config).then(res => {
                dispatch(restaurantAction.getAllRestaurant());
            }).catch(error => {
                console.log(error)
                openNotificationWithIcon('error', 'Xoá không thành công')
            });
        } 
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Button variant="outlined" color="primary" onClick={() => setIsShowModal(true)}>
                    Tạo Restaurant
                </Button>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">restaurantname</TableCell>
                                <TableCell>address</TableCell>
                                <TableCell align="right">description</TableCell>
                                <TableCell align="right">email</TableCell>
                                <TableCell align="right">phone</TableCell>
                                <TableCell align="right">createAt</TableCell>
                                <TableCell align="right">isAcive</TableCell>
                                <TableCell align="right">genres</TableCell>
                                <TableCell align="right">&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurants && restaurants.map((row) => (
                                <TableRow key={row.email}>
                                    <TableCell component="th" scope="row">{row.restaurantname}</TableCell>
                                    <TableCell align="right">{row.address}</TableCell>
                                    <TableCell align="right">{row.description}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.phone}</TableCell>
                                    <TableCell align="right">{row.createAt}</TableCell>
                                    <TableCell align="right">{row.isAcive ? 'true' : 'false'}</TableCell>
                                    <TableCell align="right">{row.genres.map(x => x.name).join(', ')}</TableCell>
                                    <TableCell width={1} align="right">
                                        <Button size="small" variant="contained" onClick={() => onEdit(row)}>
                                            Edit
                                        </Button>
                                        <Button size="small" variant="contained" color="secondary" onClick={() => onDelete(row._id)}>
                                            Delete
                                        </Button>
                                        {!row.isAcive && <Button size="small" variant="contained" color="primary" onClick={() => approveRestaurant(row._id)}>
                                            Approve
                                        </Button>}

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Modal title="Tạo nhà hàng"
                visible={isShowModal}
                onOk={() => setIsShowModal(false)}
                onCancel={() => setIsShowModal(false)}
                footer={[null]}
            >
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={user.data.user.photo} className={classes.avatar}>
                        </Avatar>
                    }
                    title={user.data.user.firstname}
                    subheader={date}
                    style={{ padding: '0' }}
//                     action={
//                         <ListItem style={{ width: '90%' }} button className={classes.itemIcon} onClick={() => setIsShowMap(true)}>
//                             <ListItemAvatar>
//                                 <LocationOn style={{ color: '#1976D2' }} />
//                             </ListItemAvatar>
//                         </ListItem>
//                     }
                />
                <Form form={form} style={{ marginTop: '20px' }} onFinish={onFinish} >
                    <div>
                        <span style={{ marginBottom: '0px', fontSize: '14px', marginRight: '20px', float: 'left' }}> Nhập địa chỉ nhà hàng: </span>
                        {location.address}
                             <ListItem style={{ width: '40px', marginBottom: '0px', float:'right' }} button className={classes.itemIcon} onClick={() => setIsShowMap(true)}>
                             <ListItemAvatar>
                                 <LocationOn style={{ color: '#1976D2' }} />
                             </ListItemAvatar>
                         </ListItem>
                    </div>
                    <Input style={{ marginBottom: '10px' }} name="restaurantname" onChange={handleInput} placeholder="Nhập tên nhà hàng" />
                    <Input style={{ marginBottom: '10px' }} name="email" onChange={handleInput} placeholder="Email" />
                    <Input style={{ marginBottom: '10px' }} name="phone" onChange={handleInput} placeholder="Số điện thoại" />
                    <Form.Item style={{ marginBottom: '10px' }} className={classes.formItem}>
                        <Input.TextArea name="description" onChange={handleInput} placeholder="Mô tả" />
                    </Form.Item>

                    <Form.Item name='interests'>
                        <Select
                        mode="multiple"
                        // allowClear
                        style={{ width: '100%' }}
                        placeholder="Chọn loại nhà hàng"
                        // defaultValue={}
                        onChange={handleChange}
                        >
                        {
                            interesting ? interesting.map(ele =>
                            <Option key={ele.name} value={ele.id} label={ele.name}>{ele.name}</Option >            

                            ) : null
                        }
                        </Select>
                    </Form.Item>

                    <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={() => setPreviewVisible(false)}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>

                    <Form.Item className={classes.formItem}  >
                        <Button type="primary" block size='large' htmlType="submit">
                            Tạo nhà hàng
                        </Button>
                    </Form.Item>
                </Form>
                <Card>
                </Card>
                <Location isVisible={isShowMap} setIsVisible={setIsShowMap}></Location>
            </Modal>

            <Modal title="Chỉnh sửa restaurant"
                visible={isShowModalEdit}
                onOk={() => setIsShowModalEdit(false)}
                onCancel={() => setIsShowModalEdit(false)}
                footer={[null]}
            >
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={user.data.user.photo} className={classes.avatar}>
                        </Avatar>
                    }
                    title={user.data.user.firstname}
                    subheader={date + ' ' + location.address}
                    style={{ padding: '0' }}
                    action={
                        <ListItem style={{ width: '90%' }} button className={classes.itemIcon} onClick={() => setIsShowMap(true)}>
                            <ListItemAvatar>
                                <LocationOn style={{ color: '#1976D2' }} />
                            </ListItemAvatar>
                        </ListItem>
                    }
                />
                <Form form={form} style={{ marginTop: '20px' }} onFinish={onFinishEdit} >
                    <Input value={formInput.restaurantname} style={{ marginBottom: '10px' }} name="restaurantname" onChange={handleInput} placeholder="Nhập tên nhà hàng" />
                    <Input value={formInput.email} style={{ marginBottom: '10px' }} name="email" onChange={handleInput} placeholder="Email" />
                    <Input value={formInput.phone} style={{ marginBottom: '10px' }} name="phone" onChange={handleInput} placeholder="Số điện thoại" />
                    <Form.Item style={{ marginBottom: '10px' }} className={classes.formItem}>
                        <Input.TextArea value={formInput.description} name="description" onChange={handleInput} placeholder="Mô tả" />
                    </Form.Item>

                    <Form.Item>
                        <Select
                        mode="multiple"
                        // allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        value={formInput.genres.map(x => x.id)}
                        onChange={handleChange}
                        >
                        {
                            interesting ? interesting.map(ele =>
                            <Option key={ele.name} value={ele.id} label={ele.name}>{ele.name}</Option >            

                            ) : null
                        }
                        </Select>
                    </Form.Item>

                    <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={() => setPreviewVisible(false)}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>

                    <Form.Item className={classes.formItem}  >
                        <Button type="primary" block size='large' htmlType="submit">
                            Chỉnh sửa nhà hàng
                        </Button>
                    </Form.Item>
                </Form>
                <Card>
                </Card>
                <Location isVisible={isShowMap} setIsVisible={setIsShowMap}></Location>
            </Modal>

        </Grid>


    )
}
