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
import { postService } from './../../services/post.service';
import { postActions } from './../../actions/post.action';

import { Modal } from 'antd';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import getBase64 from './../../utils/getBase64';
import Location from './../../components/whatdoyouthing/Location';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import LocationOn from '@material-ui/icons/LocationOn';
import { Form, Input } from 'antd';
import { authHeader } from './../../helpers/auth-header';
import axios from 'axios';
import { Rate } from 'antd';
import { Upload, notification } from 'antd';
import { AutoComplete } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { userService } from '../../services/user.service';
import { userActions } from '../../actions/user.actions';

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
    itemRate: {
        paddingTop: '7px'
    }
});

export function User() {
    const classes = useStyles();

    const openNotificationWithIcon = (type, mess) => {
        notification[type]({
            message: mess,
            style: {
                marginTop: 60
            },
        });
    };

    const [review, setReview] = React.useState({});
    const [isShowModal, setIsShowModal] = React.useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = React.useState(false);
    const [isShowMap, setIsShowMap] = React.useState(false);
    const [fileList, setFileList] = useState([]);
    const [fileListEditReview, setFileListEditReview] = useState([]);
    const [restaurantId, setRestaurantId] = useState('6094f196ea405234084c5ceb');
    const [rateReview, setRateReview] = useState(
        {
            food: 0,
            staffAttitude: 0,
            facilities: 0,
            processServing: 0
        }
    );
    const [rateReviewEdit, setRateReviewEdit] = useState(
        {
            food: 0,
            staffAttitude: 0,
            facilities: 0,
            processServing: 0
        }
    );
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewTitle, setPreviewTitle] = useState('false');
    const [previewImage, setPreviewImage] = useState('');
    const [valueFormEdit, setValueFormEdit] = useState();
    const [isShowMapEditReview, setIsShowMapEditReview] = useState(false);
    const [descriptionInput, setDescriptionInput] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    const data = useSelector(state => state.users.items);
    const location = useSelector(state => state.location);
    const user = useSelector(state => state.authentication.user);

    const date = new Date().toLocaleString();
    const [form] = Form.useForm();
    const [formEditReview] = Form.useForm();
    const options = [
        { value: 'Burns Bay Road' },
        { value: 'Downing Street' },
        { value: 'Wall Street' },
    ];

    function changeReviewFood(value) {
        setRateReview(prevState => ({
            ...prevState,
            food: value
        }))
    }

    function changeReviewStaffAttitude(value) {
        setRateReview(prevState => ({
            ...prevState,
            staffAttitude: value
        }))
    }

    function changeReviewFacilities(value) {
        setRateReview(prevState => ({
            ...prevState,
            facilities: value
        }))
    }

    function changeReviewProcessServing(value) {
        setRateReview(prevState => ({
            ...prevState,
            processServing: value
        }))
    }

    function changeEditFood(value) {
        setRateReviewEdit(prevState => ({
            ...prevState,
            food: value
        }))
    }

    function changeEditStaffAttitude(value) {
        setRateReviewEdit(prevState => ({
            ...prevState,
            staffAttitude: value
        }))
    }

    function changeEditFacilities(value) {
        setRateReviewEdit(prevState => ({
            ...prevState,
            facilities: value
        }))
    }

    function changeEditProcessServing(value) {
        setRateReviewEdit(prevState => ({
            ...prevState,
            processServing: value
        }))
    }

    const onFinish = async (values) => {
        let header = authHeader();
        let config = {
            headers: header
        }
        
        axios.post(`http://localhost:8000/api/users/signup`, formInput, config)
            .then(res => {
                setIsShowModal(false);
                dispatch(userActions.getAll());
            }
            ).catch(error => {
                console.log(error)
                openNotificationWithIcon('error', 'Đăng bài thất bại!')
            });
    };
    const getBase64FromUrl = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            }
        });
    }
    const onFinishEdit = async (values) => {
        console.log(rateReviewEdit);
        let header = authHeader();
        let config = {
            headers: header
        }

        axios.patch(`http://localhost:8000/api/users/`+formInput._id, {
            firstname: formInput.firstname,
            lastname: formInput.lastname,
            email: formInput.email,
            active: true,
            address: formInput.address,
            phoneNumber: formInput.phoneNumber
        }, config)
            .then(res => {
                setIsShowModalEdit(false);
                dispatch(userActions.getAll());
            }
            ).catch(error => {
                console.log(error)
                openNotificationWithIcon('error', 'Chỉnh sửa thất bại!')
            });
    };

    const onPreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    const onChange = ({ fileList }) => {
        setFileList(fileList);
    };
    const onChangeEditReview = ({ fileList }) => {
        setFileListEditReview(fileList);
    };
    const changeDescription = (e)=>{
        setDescriptionInput(e.target.value)
    }
    var fileListTempShare = [];
    const onEdit = (value) => {
        setIsShowModalEdit(true);
        console.log(value);
        setFormInput(value);
    }

    const onDelete = (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Bạn có chắc chắn xoá không ?')) {
            let header = authHeader();
            let config = {
                headers: header
            }

            axios.delete(`http://localhost:8000/api/users/${id}`, config).then(res => {
                dispatch(userActions.getAll());
            }).catch(error => {
                console.log(error)
                openNotificationWithIcon('error', 'Xoá không thành công')
            });
        } 
    }

    const [formInput, setFormInput] = useState({
        firstname: "",
        lastname: "",
        email: "",
        active: true,
        password: "",
        passwordConfirm: "",
        address: "",
        phoneNumber: null
    });

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ ...formInput, [name]: newValue });
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Button variant="outlined" color="primary" onClick={() => setIsShowModal(true)}>
                    Tạo User
                </Button>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>fullname</TableCell>
                                <TableCell align="right">email</TableCell>
                                <TableCell align="right">active</TableCell>
                                <TableCell align="right">role</TableCell>
                                <TableCell align="right">address</TableCell>
                                <TableCell align="right">phoneNumber</TableCell>
                                <TableCell align="right">&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.length > 0 && data.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.firstname + " " + row.lastname}
                                    </TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.active ? 'true' : 'false'}</TableCell>
                                    <TableCell align="right">{row.role}</TableCell>
                                    <TableCell align="right">{row.address}</TableCell>
                                    <TableCell align="right">{row.phoneNumber}</TableCell>
                                    <TableCell align="right">
                                        <Button size="small" variant="contained" color="primary" onClick={() => onEdit(row)}>
                                            Edit
                                        </Button>
                                        <Button size="small" variant="contained" color="secondary" onClick={() => onDelete(row._id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Modal title="Tạo User"
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
                <Form form={form} style={{ marginTop: '20px' }} onFinish={onFinish}>
                    <Input style={{ marginBottom: '10px' }} name="firstname" onChange={handleInput} placeholder="Nhập họ và tên đệm" />
                    <Input style={{ marginBottom: '10px' }} name="lastname" onChange={handleInput} placeholder="Nhập tên" />
                    <Input style={{ marginBottom: '10px' }} name="email" onChange={handleInput} placeholder="Nhập email" />
                    <Input type="password" style={{ marginBottom: '10px' }} name="password" onChange={handleInput} placeholder="Nhập mật khẩu" />
                    <Input type="password" style={{ marginBottom: '10px' }} name="passwordConfirm" onChange={handleInput} placeholder="Nhập xác nhận mật khẩu" />
                    <Input style={{ marginBottom: '10px' }} name="address" onChange={handleInput} placeholder="Nhập địa chỉ" />
                    <Input style={{ marginBottom: '10px' }} name="phoneNumber" onChange={handleInput} placeholder="Nhập số điện thoại" />
                    
                    <Form.Item className={classes.formItem}  >
                        <Button type="primary" block size='large' htmlType="submit">
                            Tạo User
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Chỉnh sửa User"
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
                <Form form={form} style={{ marginTop: '20px' }} onFinish={onFinishEdit}>
                    <Input value={formInput.firstname} style={{ marginBottom: '10px' }} name="firstname" onChange={handleInput} placeholder="Nhập họ và tên đệm" />
                    <Input value={formInput.lastname} style={{ marginBottom: '10px' }} name="lastname" onChange={handleInput} placeholder="Nhập tên" />
                    <Input value={formInput.email} style={{ marginBottom: '10px' }} name="email" onChange={handleInput} placeholder="Nhập email" />
                    <Input value={formInput.address} style={{ marginBottom: '10px' }} name="address" onChange={handleInput} placeholder="Nhập địa chỉ" />
                    <Input value={formInput.phoneNumber} style={{ marginBottom: '10px' }} name="phoneNumber" onChange={handleInput} placeholder="Nhập số điện thoại" />
                    
                    <Form.Item className={classes.formItem}  >
                        <Button type="primary" block size='large' htmlType="submit">
                            Chỉnh sửa User
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

        </Grid>
    )
}