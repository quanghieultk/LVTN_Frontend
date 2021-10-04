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
import { useDispatch, useSelector } from 'react-redux';
import { postService } from './../../services/post.service';
import { postActions } from './../../actions/post.action';

import { Modal } from 'antd';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import getBase64 from './../../utils/getBase64';
import Location from './../../components/whatdoyouthing/Location';
import List from "@material-ui/core/List";
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

export function Experience() {
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

    const [isShowModal, setIsShowModal] = React.useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = React.useState(false);
    const [isShowMap, setIsShowMap] = React.useState(false);
    const [isShowMapEditShare, setIsShowMapEditShare] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [fileListEditShare, setFileListEditShare] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewTitle, setPreviewTitle] = useState('false');
    const [previewImage, setPreviewImage] = useState('');
    const [valueFormEditReview, setValueFormEditReview] = useState();
    useEffect(() => {
        postService.getAllShareAdmin()
            .then(items => {
                dispatch(postActions.getAllPost(items.data.data.data))
            })
    }, []);

    const data = useSelector(state => state.post.postList);
    const location = useSelector(state => state.location);
    const user = useSelector(state => state.authentication.user);

    const date = new Date().toLocaleString();
    const [form] = Form.useForm();
    const [formEditShare] = Form.useForm();

    const onFinish = async (values) => {
        let header = authHeader();
        let config = {
            headers: header
        }
        const data = new FormData();
        data.append('description', values.share.introduction);
        for (const file of fileList) {
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
                setIsShowMap(false);
                setIsShowModal(false);
                postService.getAllShareAdmin()
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
    const onFinishEditShare = async (values) => {
        console.log(valueFormEditReview);
        let header = authHeader();
        let config = {
            headers: header
        }
        const data = new FormData();
        data.append('description', values.introductionEditShare);
        // for (const file of fileListEditShare) {
        //     let fileData = await getBase64(file.originFileObj);
        //     let blod = new Blob([fileData], { type: 'image/png' });
        //     data.append('files', blod, file.name);
        // }
        for (const file of fileListEditShare) {
            let fileData;
            if (file.originFileObj) {
                fileData = await getBase64(file.originFileObj);
            } else {
                fileData = await getBase64FromUrl(file.url);
            }
            let blod = new Blob([fileData], { type: 'image/png' });
            data.append('files', blod, file.name);
        }
        data.append('type', false);
        data.append('location', JSON.stringify({
            type: 'point',
            coordinates: valueFormEditReview.location,
            address: valueFormEditReview.location.address
        }));
        axios.patch(`http://localhost:8000/api/posts/` + valueFormEditReview._id, data, config)
            .then(res => {
                setIsShowMapEditShare(false);
                setIsShowModalEdit(false);
                postService.getAllShareAdmin()
                    .then(items => {
                        dispatch(postActions.getAllPost(items.data.data.data));
                        openNotificationWithIcon('success', 'Chỉnh sửa thành công!');
                        formEditShare.resetFields();
                        setFileListEditShare([]);

                    }
                    ).catch(err => {
                        console.log(err)
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
    const onChangeEditShare = ({ fileList }) => {
        setFileListEditShare(fileList);
    };
    var fileListTempShare = [];
    const onEdit = (value) => {
        setIsShowModalEdit(true);
        setValueFormEditReview(value);
        value?.photo.forEach((element, idx) => {
            fileListTempShare.push({
                uid: idx,
                name: element,
                status: 'done',
                url: element,
            })
        });
        setFileListEditShare(fileListTempShare);
    }
    const onDelete = (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Bạn có chắc chắn xoá không ?')) {
            postService.deletePost(id)
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
            {console.log(valueFormEditReview)}
            <Grid item xs={12}>
                <Button variant="outlined" color="primary" onClick={() => setIsShowModal(true)}>
                    Tạo Experience
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
                                <TableCell align="right">restaurant</TableCell>
                                <TableCell align="right">&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {console.log(data)}
                            {data && data.length > 0 && data.filter(x => !x.type).map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.author.firstname + " " + row.author.lastname}
                                    </TableCell>
                                    <TableCell align="right">{row.createdAt}</TableCell>
                                    <TableCell align="right">{row.description}</TableCell>
                                    <TableCell align="right">{row.location?.address}</TableCell>
                                    <TableCell align="right">{row.restaurant}</TableCell>
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
            <Modal title="Chia sẻ kinh nghiệm"
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
                    <Form.Item className={classes.formItem} name={['share', 'introduction']}>
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
                            Chia sẻ
                        </Button>
                    </Form.Item>
                </Form>
                <Card>
                </Card>
                <Location isVisible={isShowMap} setIsVisible={setIsShowMap}>
                </Location>
            </Modal>
            <Modal title="Chỉnh sửa bài viết"
                visible={isShowModalEdit}
                onOk={() => setIsShowModalEdit(false)}
                onCancel={() => setIsShowModalEdit(false)}
                footer={[null]}
            >
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={valueFormEditReview?.author.photo} className={classes.avatar}>
                        </Avatar>
                    }
                    title={valueFormEditReview?.author.firstname}
                    subheader={date + ' ' + valueFormEditReview?.location.address}
                    style={{ padding: '0' }}
                    action={
                        <ListItem style={{ width: '90%' }} button className={classes.itemIcon} onClick={() => setIsShowMapEditShare(true)}>
                            <ListItemAvatar>
                                <LocationOn style={{ color: '#1976D2' }} />
                            </ListItemAvatar>
                        </ListItem>
                    }
                />
                <Form form={formEditShare} style={{ marginTop: '20px' }} onFinish={onFinishEditShare}
                    fields={[
                        {
                            name: ['introductionEditShare'],
                            value: valueFormEditReview?.description,
                        }
                    ]}>
                    <Form.Item className={classes.formItem} name={'introductionEditShare'}>
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
                    <Upload
                        listType="picture-card"
                        fileList={fileListEditShare}
                        onPreview={onPreview}
                        onChange={onChangeEditShare}
                        beforeUpload={file => {
                            return false;
                        }}
                        multiple
                    >
                        {fileListEditShare.length < 8 && (<div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>)}
                    </Upload>
                    <Form.Item className={classes.formItem}  >
                        <Button type="primary" block size='large' htmlType="submit">
                            Chia sẻ
                        </Button>
                    </Form.Item>
                </Form>
                <Card>
                </Card>
                <Location isVisible={isShowMapEditShare} setIsVisible={setIsShowMapEditShare}>
                </Location>
            </Modal>
        </Grid>


    )
}