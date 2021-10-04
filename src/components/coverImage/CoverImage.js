import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Badge from '@material-ui/core/Badge';
import { Avatar, Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useDispatch } from 'react-redux';
import { Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import getBase64 from './../../utils/getBase64';
import { PlusOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { userService } from '../../services/user.service';
import { userActions } from '../../actions/user.actions';
const useStyles = makeStyles((theme) => ({
    large: {
        width: "100%",
        height: "100%",
        margin: "auto",
    },
    root: {
        maxWidth: "100%%",
        maxHeight: "100%%",
        height: "100%",
        boxShadow: 'none'
    },
    input: {
        display: 'none',
    },
    '@global': {
        '.MuiAvatar-circle': {
            border: "1px solid"
        },
        // '.MuiGrid-grid-xs-12 > .MuiPaper-elevation1.MuiPaper-rounded.MuiPaper-root':{
        //     backgroundColor: "#FAFAFA"
        // }
    }
}));
const SmallAvatar = withStyles((theme) => ({
    root: {
        width: 35,
        height: 35,
        border: `2px solid ${theme.palette.background.paper}`,
    },
}))(Avatar);
export function CoverImage(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('false');
    const [fileList, setFileList] = useState([]);
    // const [data, setData]=useState();
    const data=props.userInfo;
    const setData=props.setUserInfo;
    const idUser = props.idUser;
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const openNotificationWithIcon = (type,mess) => {
        notification[type]({
            message: mess,
            style: {
                marginTop: 60
            },
        });
    };
    const dispatch = useDispatch();
    // const data = useSelector(state => state.authentication.user.data);
    const [isVisibleChangeAvatarModal, setIsVisibleChangeAvatarModal] = useState(false);
    const [isVisibleChangeBackgroundModal, setIsVisibleChangeBackgroundModal] = useState(false);
    const handleOk = async () => {
        const form = new FormData();
        for (const file of fileList) {
            let fileData = await getBase64(file.originFileObj);
            let blod = new Blob([fileData], { type: 'image/png' });
            form.append('photo', blod, file.name);
        }
        userService.changeProfilePicture(form).then((res) => {
            openNotificationWithIcon('success','Cập nhật ảnh đại diện thành công!');
            // dispatch(userActions.getInfoUser(idUser));
            userService.getInfoUser(idUser)
            .then(items => {
                let data=JSON.parse(localStorage.getItem('user'));
                data.data.user.photo=items.data.data.photo;
                localStorage.setItem('user',JSON.stringify(data));
                setData(items.data.data);
                dispatch(userActions.getInfoUser(idUser))

            })
        }).catch(err => {
            console.log(err);
            openNotificationWithIcon('error','Cập nhật ảnh đại diện thất bại!')
        });
        setIsVisibleChangeAvatarModal(false);
    };
    const handleChangeBackground = async () => {
        const form = new FormData();
        for (const file of fileList) {
            let fileData = await getBase64(file.originFileObj);
            let blod = new Blob([fileData], { type: 'image/png' });
            form.append('photo', blod, file.name);
        }
        userService.changeBackgroundPicture(form).then((res) => {
            openNotificationWithIcon('success','Cập nhật ảnh bìa thành công!');
            userService.getInfoUser(idUser)
            .then(items => {
                let data=JSON.parse(localStorage.getItem('user'));
                data.data.user.photo=items.data.data.photo;
                localStorage.setItem('user',JSON.stringify(data));
                setData(items.data.data);
                dispatch(userActions.getInfoUser(idUser))

            })
        }).catch(err => {
            console.log(err)
            openNotificationWithIcon('error','Cập nhật ảnh bìa thất bại!')
        });
        setIsVisibleChangeBackgroundModal(false);
    };
    const handleCancel = () => {
        setIsVisibleChangeAvatarModal(false);
    };
    const onChange = ({ fileList }) => {
        setFileList(fileList);
    };
    const onPreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };
    useEffect(() => {
        let background = data!=undefined ? data.user.background : null;
        document.getElementById('backgroundImage').style.backgroundImage = `url(${background})`;
    },[data])

    return (
        
        <Card className={classes.root}>
            <Paper style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "100%", postion: "relative" }} id="backgroundImage" >
                {
                    idUser == JSON.parse(localStorage.getItem('user')).data.user._id ? <div>
                        <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setIsVisibleChangeBackgroundModal(!isVisibleChangeBackgroundModal)}>
                            <PhotoCamera />
                        </IconButton>
                        <Modal
                            title="Cập nhật ảnh bìa"
                            visible={isVisibleChangeBackgroundModal}
                            onOk={handleChangeBackground}
                            onCancel={() => setIsVisibleChangeBackgroundModal(false)}
                            className="location_modal"
                        >
                            {/* <ImgCrop
                                rotate
                                modalOk="Lưu"
                            > */}
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={onPreview}
                                    onChange={onChange}
                                    beforeUpload={file => {
                                        return false;
                                    }}
                                    maxCount={1}
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            {/* </ImgCrop> */}
                        </Modal>
                    </div> : ''
                }
                <div style={{ width: "20%", top: "0", margin: "auto", paddingTop: "5%" }}>
                    <Paper style={{ boxShadow: "none", width: "100%", borderRadius: "50%", margin: "auto", border: '1px' }}>
                        <Badge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={
                                idUser == JSON.parse(localStorage.getItem('user')).data.user._id ? <SmallAvatar title="cập nhật ảnh đại diện" alt="Change avatar" onClick={e => { }}>
                                    <PhotoCamera onClick={e => { setIsVisibleChangeAvatarModal(!isVisibleChangeAvatarModal) }}></PhotoCamera>
                                    <Modal
                                        title="Cập nhật ảnh đại diện"
                                        visible={isVisibleChangeAvatarModal}
                                        onOk={handleOk}
                                        onCancel={handleCancel}
                                        className="location_modal"
                                    >
                                        <ImgCrop
                                            rotate
                                            modalOk="Lưu"
                                        >
                                            <Upload
                                                listType="picture-card"
                                                fileList={fileList}
                                                onPreview={onPreview}
                                                onChange={onChange}
                                                // beforeUpload={file => {
                                                //     return false;
                                                // }}
                                                maxCount={1}
                                            >
                                                <div>
                                                    <PlusOutlined />
                                                    <div style={{ marginTop: 8 }}>Upload</div>
                                                </div>
                                            </Upload>
                                        </ImgCrop>
                                    </Modal>
                                </SmallAvatar> : ''
                            }
                        >
                            <Avatar alt="" src={data ? data.user.photo : null} className={classes.large} />
                        </Badge>
                    </Paper>
                </div>
            </Paper>
        </Card >
    );
}