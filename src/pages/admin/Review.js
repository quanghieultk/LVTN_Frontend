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

export function Review() {
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
        postService.getAllReviewAdmin()
            .then(items => {
                dispatch(postActions.getAllPost(items.data.data.data))
            })
    }, []);

    const data = useSelector(state => state.post.postList);
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
        const data = new FormData();
        data.append('description', values.user.introduction);
        for (const file of fileList) {
            let fileData = await getBase64(file.originFileObj);
            let blod = new Blob([fileData], { type: 'image/png' });
            data.append('files', blod, file.name);
        }
        data.append('type', true);
        data.append('restaurant', restaurantId);
        data.append('rating', JSON.stringify(rateReview));
        data.append('location', JSON.stringify({
            type: 'point',
            coordinates: location.location,
            address: location.address
        }));

        // data.append('tags', []);
        console.log(data);
        axios.post(`http://localhost:8000/api/review/create`, data, config)
            .then(res => {
                setIsShowModal(false);
                setRateReview({
                    food: 0,
                    staffAttitude: 0,
                    facilities: 0,
                    processServing: 0
                })
                postService.getAllReviewAdmin()
                    .then(items => {
                        dispatch(postActions.getAllPost(items.data.data.data));
                        openNotificationWithIcon('success', 'Đăng bài thành công!');
                        form.resetFields();
                        setFileList([]);

                    }
                    ).catch(err => {
                        console.log(err)
                        openNotificationWithIcon('error', 'Đăng bài thất bại!')
                    }
                    );
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
    const onFinishEditReview = async (values) => {
        console.log(rateReviewEdit);
        let header = authHeader();
        let config = {
            headers: header
        }
        const data = new FormData();
        data.append('description', descriptionInput);
        // for (const file of fileList) {
        //     let fileData = await getBase64(file.originFileObj);
        //     let blod = new Blob([fileData], { type: 'image/png' });
        //     data.append('files', blod, file.name);
        // }
        for (const file of fileListEditReview) {
            let fileData;
            if (file.originFileObj) {
                fileData = await getBase64(file.originFileObj);
            } else {
                fileData = await getBase64FromUrl(file.url);
            }
            let blod = new Blob([fileData], { type: 'image/png' });
            data.append('files', blod, file.name);
        }
        data.append('type', true);
        data.append('restaurant', valueFormEdit.restaurant?._id);
        data.append('rating', JSON.stringify(rateReviewEdit));
        data.append('location', JSON.stringify({
            type: 'point',
            coordinates: valueFormEdit?.location,
            address: valueFormEdit?.location?.address
        }));

        // data.append('tags', []);
        console.log(valueFormEdit.restaurant._id);
        console.log(rateReviewEdit);

        axios.post(`http://localhost:8000/api/review/update/`+valueFormEdit._id, data, config)
            .then(res => {
                setIsShowModalEdit(false);
                postService.getAllReviewAdmin()
                    .then(items => {
                        dispatch(postActions.getAllPost(items.data.data.data));
                        openNotificationWithIcon('success', 'Chỉnh sửa thành công!');
                        form.resetFields();
                        setFileList([]);

                    }
                    ).catch(err => {
                        console.log(err)
                        openNotificationWithIcon('error', 'Chỉnh sửa thất bại!')
                    }
                    );
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
        setValueFormEdit(value);
        value?.photo.forEach((element, idx) => {
            fileListTempShare.push({
                uid: idx,
                name: element,
                status: 'done',
                url: element,
            })
        });
        setRateReviewEdit(value.rating);
        console.log(rateReviewEdit);
        setFileListEditReview(fileListTempShare);
        setDescriptionInput(value.description);
    }

    const onDelete = (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Bạn có chắc chắn xoá không ?')) {
            postService.deleteReview(id)
            .then(result => {
                if (result) {
                    dispatch(postActions.deletePost(id));
                    openNotificationWithIcon('success', 'Xóa bài viết thành công!')
                }
                else {
                    openNotificationWithIcon('error', 'Xóa bài viết thất bại!')
                }
            })
        }
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Button variant="outlined" color="primary" onClick={() => setIsShowModal(true)}>
                    Tạo Review
                </Button>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>author</TableCell>
                                <TableCell align="right">createdAt</TableCell>
                                <TableCell align="right">description</TableCell>
                                <TableCell align="right">location</TableCell>
                                <TableCell align="right">rating</TableCell>
                                <TableCell align="right">restaurant</TableCell>
                                <TableCell align="right">&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.length > 0 && data.filter(x => x.type).map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.author.firstname + " " + row.author.lastname}
                                    </TableCell>
                                    <TableCell align="right">{row.createdAt}</TableCell>
                                    <TableCell align="right">{row.description}</TableCell>
                                    <TableCell align="right">{row.location?.address}</TableCell>
                                    <TableCell align="right">{row.rating?.avarage}</TableCell>
                                    <TableCell align="right">{row.restaurant?.restaurantname}</TableCell>
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
            <Modal title="Tạo Review"
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
                    <AutoComplete
                        style={{ width: '83%', marginBottom: '10px' }}
                        options={options}
                        filterOption={(inputValue, option) =>
                            option
                        }
                    >
                    </AutoComplete>
                    <Button type="primary" style={{ width: '17%' }}>Search</Button>
                    <Form.Item className={classes.formItem} name={['user', 'introduction']}>
                        <Input.TextArea />
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
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography className={classes.itemRate} variant="subtitle2">
                                    Món ăn:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Rate allowHalf onChange={changeReviewFood} defaultValue={rateReview.food} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.itemRate} variant="subtitle2">
                                    Thái độ phục vụ:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Rate allowHalf onChange={changeReviewStaffAttitude} defaultValue={rateReview.staffAttitude} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.itemRate} variant="subtitle2">
                                    Tiện nghi:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Rate allowHalf onChange={changeReviewFacilities} defaultValue={rateReview.facilities} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.itemRate} variant="subtitle2">
                                    Quy trình:
                                </Typography>

                            </Grid>
                            <Grid item xs={6}>
                                <Rate allowHalf onChange={changeReviewProcessServing} defaultValue={rateReview.processServing} />
                            </Grid>
                        </Grid>
                    </Form.Item >
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={onPreview}
                        onChange={onChange}
                        beforeUpload={file => {
                            return false;
                        }}
                        multiple
                    >
                        {fileList.length < 8 && (<div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>)}
                    </Upload>
                    <Form.Item className={classes.formItem}  >
                        <Button type="primary" block size='large' htmlType="submit">
                            Đăng bài
                        </Button>
                    </Form.Item>
                </Form>
                <Card>
                </Card>
                <Location isVisible={isShowMap} setIsVisible={setIsShowMap}>
                </Location>
            </Modal>
            {/* Edit Review                     */}
            {console.log(valueFormEdit)}
            {console.log(rateReviewEdit)}
            <Modal title="Chỉnh sửa Review"
                visible={isShowModalEdit}
                onOk={() => setIsShowModalEdit(false)}
                onCancel={() => setIsShowModalEdit(false)}
                footer={[null]}
            >
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={valueFormEdit?.author.photo} className={classes.avatar}>
                        </Avatar>
                    }
                    title={valueFormEdit?.author.firstname}
                    subheader={date + ' ' + valueFormEdit?.location?.address}
                    style={{ padding: '0' }}
                    action={
                        <ListItem style={{ width: '90%' }} button className={classes.itemIcon} onClick={() => setIsShowMapEditReview(true)}>
                            <ListItemAvatar>
                                <LocationOn style={{ color: '#1976D2' }} />
                            </ListItemAvatar>
                        </ListItem>
                    }
                />
                <Form form={formEditReview} style={{ marginTop: '20px' }} onFinish={onFinishEditReview}
                    // fields={[
                    //     {
                    //         name: ['introductionEditReview'],
                    //         value: valueFormEdit?.description,
                    //     }
                    // ]}
                >
                    {/* <AutoComplete
                        style={{ width: '83%', marginBottom: '10px' }}
                        options={options}
                        filterOption={(inputValue, option) =>
                            option
                        }
                    >
                    </AutoComplete> */}
                    {/* <Button type="primary" style={{ width: '17%' }}>Search</Button> */}
                    <Form.Item className={classes.formItem}
                    //  name={'introductionEditReview'}
                     >
                        <Input.TextArea value ={descriptionInput} onChange={changeDescription}/>
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
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography className={classes.itemRate} variant="subtitle2">
                                    Món ăn:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Rate allowHalf onChange={changeEditFood} defaultValue={rateReviewEdit?.food} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.itemRate} variant="subtitle2">
                                    Thái độ phục vụ:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Rate allowHalf onChange={changeEditStaffAttitude} defaultValue={rateReviewEdit?.staffAttitude} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.itemRate} variant="subtitle2">
                                    Tiện nghi:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Rate allowHalf onChange={changeEditFacilities} defaultValue={rateReviewEdit?.facilities} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.itemRate} variant="subtitle2">
                                    Quy trình:
                                </Typography>

                            </Grid>
                            <Grid item xs={6}>
                                <Rate allowHalf onChange={changeEditProcessServing} defaultValue={rateReviewEdit?.processServing} />
                            </Grid>
                        </Grid>
                    </Form.Item >
                    <Upload
                        listType="picture-card"
                        fileList={fileListEditReview}
                        onPreview={onPreview}
                        onChange={onChangeEditReview}
                        beforeUpload={file => {
                            return false;
                        }}
                        multiple
                    >
                        {fileListEditReview.length < 8 && (<div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>)}
                    </Upload>
                    <Form.Item className={classes.formItem}  >
                        <Button type="primary" block size='large' htmlType="submit">
                            Đăng bài
                        </Button>
                    </Form.Item>
                </Form>
                <Card>
                </Card>
                <Location isVisible={isShowMapEditReview} setIsVisible={setIsShowMapEditReview}>
                </Location>
            </Modal>
            {/* End Edit Review */}

        </Grid>


    )
}