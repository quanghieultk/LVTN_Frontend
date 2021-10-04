import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import { AutoComplete, Rate } from 'antd';
import { red } from '@material-ui/core/colors';
import { Chip, Divider } from '@material-ui/core';
import { Modal, Button } from 'antd';
import styles from './styles.module.css';
import { Form, Input } from 'antd';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { Upload, notification } from 'antd';
import axios from 'axios';
import { authHeader } from './../../helpers/auth-header';
import { PlusOutlined } from '@ant-design/icons';
import LocationOn from '@material-ui/icons/LocationOn';
import Location from './Location';
import getBase64 from './../../utils/getBase64';
import { postActions } from './../../actions/post.action';
import { postService } from '../../services/post.service';
import ListItemText from "@material-ui/core/ListItemText";
import RateReviewIcon from '@material-ui/icons/RateReview';
import ShareIcon from '@material-ui/icons/Share';
import { searchService } from '../../services/search.service';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { locationActions } from '../../actions/location.actions';
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
        marginTop: "100px",
        marginBottom: "1%"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: '',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: "white",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    itemIcon: {
        width: "20%",
        float: "left",
    },
    formItem: {
        marginBottom: '0px'
    },
    iconReviewShare: {
        width: "33%",
        float: "left"
    },
    twoIcon: {
        width: "100%",
        maxWidth: 1000,
        backgroundColor: theme.palette.background.paper
    },
    itemRate: {
        paddingTop: '7px'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },

}));


export function WhatDoYouThing() {

    const classes = useStyles();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const location = useSelector(state => state.location);
    const user = useSelector(state => state.authentication.user);
    const postList = useSelector(state => state.post);

    // test message success
    const openNotificationWithIcon = (type, mess) => {
        notification[type]({
            message: mess,
            style: {
                marginTop: 60
            },
        });
    };
    // end test message success
    const dispatch = useDispatch();

    const [isVisibleReview, setIsVisibleReview] = useState(false);
    const [isVisibleShare, setIsVisibleShare] = useState(false);
    const [isVisibleRecommend, setIsVisibleRecommend] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalDeXuat, setIsModalDeXuat] = useState(false);
    const [isModalShare, setIsModalShare] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('false');
    const [fileList, setFileList] = useState([]);
    const [fileListShare, setFileListShare] = useState([]);
    const [fileListRecommend, setFileListRecommend] = useState([]);
    const [nameRestRecommend, setNameRestRecommend] = useState('');
    const [open, setOpen] = React.useState(false);
    //create Review 
    const [restaurantId, setRestaurantId] = useState('6094f196ea405234084c5ceb');
    const [rateReview, setRateReview] = useState(
        {
            food: 0,
            staffAttitude: 0,
            facilities: 0,
            processServing: 0
        }
    );
    const [rateRecommend, setRateRecommend] = useState(
        {
            food: 0,
            staffAttitude: 0,
            facilities: 0,
            processServing: 0
        }

    );
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
    function changeRecommendFood(value) {
        setRateRecommend(prevState => ({
            ...prevState,
            food: value
        }))
    }
    function changeRecommendStaffAttitude(value) {
        setRateRecommend(prevState => ({
            ...prevState,
            staffAttitude: value
        }))
    }
    function changeRecommendFacilities(value) {
        setRateRecommend(prevState => ({
            ...prevState,
            facilities: value
        }))
    }
    function changeRecommendProcessServing(value) {
        setRateRecommend(prevState => ({
            ...prevState,
            processServing: value
        }))
    }
    function changeNameRestRecommend(e) {
        setNameRestRecommend(e.target.value);
    }
    //end Create Review
    const onFinishCreateReview = async (values) => {
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
        console.log(restaurantId)
        setOpen(true);
        axios.post(`http://localhost:8000/api/review/create`, data, config)
            .then(res => {
                setOpen(false)
                setIsModalVisible(false);
                setRateReview({
                    food: 0,
                    staffAttitude: 0,
                    facilities: 0,
                    processServing: 0
                })
                postService.getAllPost()
                    .then(items => {
                        dispatch(postActions.getAllPost(items.data.data.data));
                        dispatch(locationActions.resetLocation());
                        openNotificationWithIcon('success', 'Đăng bài thành công!');
                        form.resetFields();
                        setFileList([]);

                    }
                    ).catch(error => {
                        if (error.response && error.response.data) {
                            setOpen(false)
                            openNotificationWithIcon('error', error.response.data.message)
                        }
                    }
                    );
            }
            ).catch(error => {
                if (error.response && error.response.data) {
                    setOpen(false)
                    openNotificationWithIcon('error', error.response.data.message)
                }
            });
    };

    // Create Share
    const onFinishShare = async (values) => {
        setOpen(true);
        let header = authHeader();
        let config = {
            headers: header
        }
        const data = new FormData();
        data.append('description', values.share.introduction);
        for (const file of fileListShare) {
            let fileData = await getBase64(file.originFileObj);
            let blod = new Blob([fileData], { type: 'image/png' });
            data.append('files', blod, file.name);
        }
        data.append('type', false);
        data.append('location', JSON.stringify({
            type: 'point',
            coordinates: location.location,
            address: location.address
        }));
        axios.post(`http://localhost:8000/api/posts`, data, config)
            .then(res => {
                setOpen(false);
                setIsModalShare(false);
                postService.getAllPost()
                    .then(items => {
                        dispatch(postActions.getAllPost(items.data.data.data));
                        dispatch(locationActions.resetLocation());
                        openNotificationWithIcon('success', 'Đăng bài thành công!');
                        formShare.resetFields();
                        setFileListShare([]);

                    }
                    ).catch(error => {
                        if (error.response && error.response.data) {
                            setOpen(false)
                            openNotificationWithIcon('error', error.response.data.message)
                        }
                    }
                    );
            }
            ).catch(error => {
                if (error.response && error.response.data) {
                    setOpen(false)
                    openNotificationWithIcon('error', error.response.data.message)
                }
            });
    };
    // End Share 

    // Create Recommend
    const onFinishRecommend = async (values) => {
        setOpen(true);
        let header = authHeader();
        let config = {
            headers: header
        }
        const data = new FormData();
        data.append('description', values.recommend.introduction);
        for (const file of fileListRecommend) {
            let fileData = await getBase64(file.originFileObj);
            let blod = new Blob([fileData], { type: 'image/png' });
            data.append('image', blod, file.name);
        }
        data.append('type', true);
        data.append('restaurantname', nameRestRecommend);
        data.append('rating', JSON.stringify(rateRecommend));
        data.append('locationRestaurant', JSON.stringify({
            location: {
                lat: location.location[1],
                long: location.location[0],

            }
            // type: 'point',
            // coordinates: location.location,
            // address: location.address
        }));
        data.append('address', location.address);
        data.append('location', JSON.stringify({
            location: {
                lat: location.location[1],
                long: location.location[0],

            }
            // type: 'point',
            // coordinates: location.location,
            // address: location.address
        }));

        // data.append('tags', []);
        // console.log(data);
        axios.post(`http://localhost:8000/api/restaurants/recommendRestaurant`, data, config)
            .then(res => {
                setOpen(false);
                setIsVisibleRecommend(false);
                setRateRecommend({
                    food: 0,
                    staffAttitude: 0,
                    facilities: 0,
                    processServing: 0
                })
                postService.getAllPost()
                    .then(items => {
                        dispatch(postActions.getAllPost(items.data.data.data));
                        dispatch(locationActions.resetLocation());
                        openNotificationWithIcon('success', 'Đề xuất thành công!');
                        formRecommend.resetFields();
                        setFileListRecommend([]);

                    }
                    ).catch(err => {
                        console.log(err)
                    }
                    );
            }
            ).catch(error => {
                console.log(error)
                openNotificationWithIcon('error', 'Đề xuất thất bại!')
            });
    };
    // End Recommend
    const showModal = () => {
        setIsModalVisible(true);
    };
    const showModalDeXuat = () => {
        setIsModalVisible(false);
        setIsModalDeXuat(true);
    };
    const showModalShare = () => {
        setIsModalShare(true);
    };

    const handleOkDeXuat = () => {
        setIsModalDeXuat(false);
    };
    const handleOkShare = () => {
        setIsModalShare(false);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancelDeXuat = () => {
        setIsModalDeXuat(false);
    };
    const handleCancelShare = () => {
        setIsModalShare(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleCancelPreview = () => setPreviewVisible(false);
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
    const onChangeShare = ({ fileList }) => {
        setFileListShare(fileList);
    };
    const onChangeRecommend = ({ fileList }) => {
        setFileListRecommend(fileList);
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Thêm hình ảnh</div>
        </div>
    );
    const [form] = Form.useForm();
    const [formShare] = Form.useForm();
    const [formRecommend] = Form.useForm();
    const date = new Date().toLocaleString();
    const [options, setOption] = useState([
    ]);

    async function searchRes(searchKey) {
        let data = await searchService.searchRestaurant(searchKey);
        console.log(data)
        let list = [];
        data.forEach(element => {
            list.push({
                value: element.restaurantname,
                id: element._id
            });
        });
        setOption(list);
    }
    return (
        <Card className={styles.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} src={user.data.user.photo}>
                    </Avatar>
                }
                subheader={
                    <Chip
                        variant="outlined"
                        label={user.data.user.firstname + " ơi, hôm nay bạn ăn gì thế?"}
                        style={{
                            width: "100%",
                            justifyContent: "left",
                            backgroundColor: "#F2F2F2"
                        }}
                        clickable
                    >
                    </Chip>
                }
            />
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Divider style={{ width: "96%", margin: 'auto' }}></Divider>
            <CardActions disableSpacing className={styles.post} style={{ height: "40%" }}>
                <List className={classes.twoIcon}>
                    <ListItem button className={classes.iconReviewShare} onClick={showModal} style={{ width: "50%", alignContent: "center" }}>
                        <ListItemAvatar>
                            <RateReviewIcon style={{ color: '#1976D2' }}></RateReviewIcon>
                        </ListItemAvatar>
                        <ListItemText primary="Review" />
                    </ListItem>
                    <ListItem button className={classes.iconReviewShare} onClick={showModalShare} style={{ width: "50%", alignContent: "center" }}>
                        <ListItemAvatar>
                            <ShareIcon style={{ color: '#1976D2 ' }}></ShareIcon>
                        </ListItemAvatar>
                        <ListItemText primary="Chia sẻ" />
                    </ListItem>
                </List>
            </CardActions>
            <Modal title="Tạo Review"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
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
                        <ListItem style={{ width: '90%' }} button className={classes.itemIcon} onClick={(e) => { setIsVisibleReview(true) }}>
                            <ListItemAvatar>
                                <LocationOn style={{ color: '#1976D2' }} />
                            </ListItemAvatar>
                        </ListItem>
                    }
                />
                <Form form={form} style={{ marginTop: '20px' }} onFinish={onFinishCreateReview}>
                    <AutoComplete
                        style={{ width: '100%', marginBottom: '10px' }}
                        options={options}
                        filterOption={(inputValue, option) =>
                            option
                        }
                        onChange={(value) => searchRes(value)}
                        onSelect={(value, option) => {
                            console.log(option.id)
                            setRestaurantId(option.id);
                        }}
                        placeholder="Nhập tên nhà hàng"
                    >
                    </AutoComplete>
                    {/* <Button type="primary" style={{ width: '17%' }}>Search</Button> */}
                    <span>Nếu không có nhà hàng bạn muốn tìm, hãy </span> <a onClick={showModalDeXuat}>đề xuất</a> <span>nó!!</span>
                    <br></br>
                    <Form.Item className={classes.formItem} name={['user', 'introduction']}>
                        <Input.TextArea rows={11} placeholder="Hãy nhập mô tả về nhà hàng này!" />
                    </Form.Item>

                    <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancelPreview}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                    <p style={{ marginBottom: '0px', fontSize: '14px' }}>Đánh giá: </p>
                    <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px', paddingLeft: '17px', marginBottom: '3px' }}>
                        <Form.Item className={classes.formItem}  >
                            <Grid container>

                                <Grid item xs={6}>
                                    <Typography className={classes.itemRate} variant="subtitle2">
                                        Món ăn:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Rate allowHalf onChange={changeReviewFood} value={rateReview ? rateReview.food : 0} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography className={classes.itemRate} variant="subtitle2">
                                        Thái độ phục vụ:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Rate allowHalf onChange={changeReviewStaffAttitude} value={rateReview ? rateReview.staffAttitude : 0} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography className={classes.itemRate} variant="subtitle2">
                                        Tiện nghi:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Rate allowHalf onChange={changeReviewFacilities} value={rateReview ? rateReview.facilities : 0} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography className={classes.itemRate} variant="subtitle2">
                                        Quy trình:
                                    </Typography>

                                </Grid>
                                <Grid item xs={6}>
                                    <Rate allowHalf onChange={changeReviewProcessServing} value={rateReview ? rateReview.processServing : 0} />
                                </Grid>
                            </Grid>
                        </Form.Item >
                    </div>
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
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    <Form.Item className={classes.formItem}  >
                        <Button type="primary" block size='large' htmlType="submit">
                            Đăng bài
                        </Button>
                    </Form.Item>
                </Form>
                <Card>
                </Card>
                <Location isVisible={isVisibleReview} setIsVisible={setIsVisibleReview}>
                </Location>
            </Modal>
            {/* modal de xuat */}
            <Modal title="Đề xuất"
                visible={isModalDeXuat}
                onOk={handleOkDeXuat}
                onCancel={handleCancelDeXuat}
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
                // action={
                //     <ListItem style={{ width: '90%' }} button className={classes.itemIcon} onClick={(e) => { setIsVisibleRecommend(true) }}>
                //         <ListItemAvatar>
                //             <LocationOn style={{ color: '#1976D2' }} />
                //         </ListItemAvatar>
                //     </ListItem>
                // }
                />

                <Form form={formRecommend} style={{ marginTop: '20px' }} onFinish={onFinishRecommend} >
                    <Input style={{ marginBottom: '10px' }} value={nameRestRecommend} onChange={changeNameRestRecommend} placeholder="Nhập tên nhà hàng" />
                    <div>
                        <span style={{ marginBottom: '0px', fontSize: '14px', marginRight: '20px', float: 'left' }}> Nhập địa chỉ nhà hàng: </span>
                        {location.address}
                        <Form.Item style={{marginBottom: '0px', float: 'right', width:'40px'}} button className={classes.itemIcon} onClick={(e) => { setIsVisibleRecommend(true) }}>
                        <ListItemAvatar>
                            <LocationOn style={{ color: '#1976D2' }} />
                        </ListItemAvatar>
                    </Form.Item>
                    </div>
                    <Form.Item style={{width: '100%'}} className={classes.formItem} name={['recommend', 'introduction']}>
                        <Input.TextArea rows={11} placeholder="Hãy nhập mô tả về nhà hàng này!" />
                    </Form.Item>
                    

                    <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancelPreview}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                    <p style={{ marginBottom: '0px', fontSize: '14px' }}>Đánh giá: </p>
                    <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px', paddingLeft: '17px', marginBottom: '3px' }}>
                        <Form.Item className={classes.formItem} >
                            <Grid container >
                                <Grid item xs={6}>
                                    <Typography className={classes.itemRate} variant="subtitle2">
                                        Món ăn:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Rate allowHalf onChange={changeRecommendFood} defaultValue={0} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography className={classes.itemRate} variant="subtitle2">
                                        Thái độ phục vụ:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Rate allowHalf onChange={changeRecommendStaffAttitude} defaultValue={0} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography className={classes.itemRate} variant="subtitle2">
                                        Tiện nghi:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Rate allowHalf onChange={changeRecommendFacilities} defaultValue={0} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography className={classes.itemRate} variant="subtitle2">
                                        Quy trình:
                                    </Typography>

                                </Grid>
                                <Grid item xs={6}>
                                    <Rate allowHalf onChange={changeRecommendProcessServing} defaultValue={0} />
                                </Grid>
                            </Grid>
                        </Form.Item >
                    </div>

                    <Upload
                        listType="picture-card"
                        fileList={fileListRecommend}
                        onPreview={onPreview}
                        onChange={onChangeRecommend}
                        beforeUpload={file => {
                            return false;
                        }}
                        multiple
                    >
                        {fileListRecommend.length >= 8 ? null : uploadButton}
                    </Upload>
                    <Form.Item className={classes.formItem}  >
                        <Button type="primary" block size='large' htmlType="submit">
                            Đăng Đề xuất
                        </Button>
                    </Form.Item>
                </Form>
                <Card>
                </Card>
                <Location isVisible={isVisibleRecommend} setIsVisible={setIsVisibleRecommend}></Location>
            </Modal>
            {/* End Modal De Xuat */}
            {/* Modal SHARE */}
            <Modal title="Chia sẻ kinh nghiệm"
                visible={isModalShare}
                onOk={handleOkShare}
                onCancel={handleCancelShare}
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
                        <ListItem style={{ width: '90%' }} button className={classes.itemIcon} onClick={(e) => { setIsVisibleShare(true) }}>
                            <ListItemAvatar>
                                <LocationOn style={{ color: '#1976D2' }} />
                            </ListItemAvatar>
                        </ListItem>
                    }
                />
                <Form form={formShare} style={{ marginTop: '20px' }} onFinish={onFinishShare}>
                    <Form.Item className={classes.formItem} style={{marginBottom: '3px'}} name={['share', 'introduction']}>
                        <Input.TextArea rows={11} placeholder= "Nhập mô tả chia sẻ kinh nghiệm của bản thân!" />
                    </Form.Item>

                    <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancelPreview}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                    <Upload
                        listType="picture-card"
                        fileList={fileListShare}
                        onPreview={onPreview}
                        onChange={onChangeShare}
                        beforeUpload={file => {
                            return false;
                        }}
                        multiple
                    >
                        {fileListShare.length >= 8 ? null : uploadButton}
                    </Upload>
                    <Form.Item className={classes.formItem}  >
                        <Button type="primary" block size='large' htmlType="submit">
                            Chia sẻ
                        </Button>
                    </Form.Item>
                </Form>
                <Card>
                </Card>
                <Location isVisible={isVisibleShare} setIsVisible={setIsVisibleShare}>
                </Location>
            </Modal>
            {/* END MODAL SHARE */}
        </Card >

    );
}
