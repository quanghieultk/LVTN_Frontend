import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Avatar, Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useDispatch } from 'react-redux';
import { Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import getBase64 from './../../utils/getBase64';
import { PlusOutlined } from '@ant-design/icons';
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
        boxShadow: 'none',
    },
    input: {
        display: 'none',
    },
    '@global': {
        '#coverRestaurant': {
            height: "300px"
        }
    },
    '@global': {
        '.MuiAvatar-circle': {
            border: "1px solid"
        }
    },
}));
const SmallAvatar = withStyles((theme) => ({
    root: {
        width: 35,
        height: 35,
        border: `2px solid ${theme.palette.background.paper}`,
    },
}))(Avatar);
export function CoverImageRestaurant(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('false');
    const [fileList, setFileList] = useState([]);
    const [data, setData]=useState();
    // const idUser = props.idUser;
    const handleExpandClick = () => {
        setExpanded(!expanded);
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
        // userService.changeProfilePicture(form).then((res) => {
        //     alert("da thay doi");
        //     dispatch(userActions.getInfoUser(idUser));
        // }).catch(err => {
        //     console.log(err)
        // });
        setIsVisibleChangeAvatarModal(false);
    };
    // const handleChangeBackground = async () => {
    //     const form = new FormData();
    //     for (const file of fileList) {
    //         let fileData = await getBase64(file.originFileObj);
    //         let blod = new Blob([fileData], { type: 'image/png' });
    //         form.append('photo', blod, file.name);
    //     }
    //     userService.changeBackgroundPicture(form).then((res) => {
    //         alert("da thay doi");
    //         dispatch(userActions.getInfoUser(idUser));
    //     }).catch(err => {
    //         console.log(err)
    //     });
    //     setIsVisibleChangeBackgroundModal(false);
    // };
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
    // useEffect(() => {
    //     userService.getInfoUser(idUser)
    //     .then(items=>
    //         {
    //             setData(items.data.data);
    //         })
    //     let background = data ? data.user.background : null;
    //     document.getElementById('backgroundImage').style.backgroundImage = `url(${background})`;
    // },[])
    useEffect(()=>{
        document.getElementById('coverRestaurant').style.backgroundImage = `url(https://www.incimages.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg)`;
    })
    return (
        
        <Card className={classes.root}>
            {/* {console.log(data)} */}
            <Paper style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "100%", postion: "relative" }} id="coverRestaurant" >
                {
                    // idUser == JSON.parse(localStorage.getItem('user')).data.user._id ? 
                    // <div>
                    //     <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setIsVisibleChangeBackgroundModal(!isVisibleChangeBackgroundModal)}>
                    //         <PhotoCamera />
                    //     </IconButton>
                    //     <Modal
                    //         title="Cập nhật ảnh bìa"
                    //         visible={isVisibleChangeBackgroundModal}
                    //         // onOk={handleChangeBackground}
                    //         onCancel={() => setIsVisibleChangeBackgroundModal(false)}
                    //         className="location_modal"
                    //     >
                    //         <ImgCrop
                    //             rotate
                    //             modalOk="Lưu"
                    //         >
                    //             <Upload
                    //                 listType="picture-card"
                    //                 fileList={fileList}
                    //                 onPreview={onPreview}
                    //                 onChange={onChange}
                    //                 beforeUpload={file => {
                    //                     return false;
                    //                 }}
                    //                 maxCount={1}
                    //             >
                    //                 <div>
                    //                     <PlusOutlined />
                    //                     <div style={{ marginTop: 8 }}>Upload</div>
                    //                 </div>
                    //             </Upload>
                    //         </ImgCrop>
                    //     </Modal>
                    // </div> 
                    // : ''
                }
            </Paper>
        </Card >
    );
}