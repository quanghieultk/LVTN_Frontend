import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chat from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Popover, Button } from 'antd';
import { Modal } from 'antd';
import { Form, Input } from 'antd';
import { Upload } from 'antd';
import { commentService } from './../../services/comment.service';
import { postService } from './../../services/post.service';
import { CommentPost } from './../commentPost/CommentPost';
import { authHeader } from './../../helpers/auth-header';
import { postActions } from './../../actions/post.action';
import getBase64 from './../../utils/getBase64'
import axios from 'axios';
import Moment from 'react-moment';
import {
    Avatar
} from "@chatscope/chat-ui-kit-react";
import { GridList, GridListTile } from '@material-ui/core';
import { userActions } from '../../actions/user.actions';
import { postRestaurantService } from '../../services/postRestaurant.service';
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
        marginTop: "1%"
    },
    media: {
        padding: "2%",
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
        backgroundColor: "",
    },
}));

function gridImage(imageList) {
    let result = [];
    imageList.forEach(element => {
        result.push({
            img: element,
            title: 'Image',
            author: 'author',
            cols: 1,
        })
    });
    return result;
}

export function PostRestaurant(props) {
    var dataPost = props.value;
    const statePostRestaurant = props.state;
    const setStatePostRestaurant = props.setState;
    var index = props.index;
    const idPost = dataPost._id;
    const tileData = gridImage(dataPost.image);
    const [dataComment, setDataComment] = useState([]);
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [visible, setVisible] = useState(false);
    const dataUserCurrent = useSelector(state => state.authentication.user.data.user);
    const [likes, setLikes] = useState(0);
    const [listUserLike, setListUserLike] = useState([]);
    const dispatch = useDispatch();
    const postList = useSelector(state => state.post);
    const user = useSelector(state => state.authentication);

    var avatarImg = "";
    //getcomment
    let mounted = true;
    const header = authHeader();
    let config = {
        headers: header
    }
    useEffect(() => {
        commentService.getAllCommentPost(dataPost._id)
            .then(items => {
                if (mounted) {
                    mounted = false;
                    setDataComment(items);
                }

            })
        dataUserCurrent.postLikes.forEach(element => {

            if (element.post === idPost) {
                setIsLike('error');
            }
        });
        // postService.getPostLikes(idPost)
        //     .then(items => {
        //         setListUserLike(items[0].users_likes);
        //         setLikes(items[0].users_likes.length);
        //     })
        return () => mounted = false;
    }, []);
    //modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
        handleVisibleChange(false);
    };
    const deletePost = () => {
        console.log(statePostRestaurant);
        postRestaurantService.deleteRestaurantPost(dataPost._id)
            .then(result => {
                
                // console.log(statePostRestaurant.pop(index));
                statePostRestaurant.splice(index, 1);
                    console.log(statePostRestaurant)
                    setStatePostRestaurant(statePostRestaurant)
                
            }).catch((error) => {
                console.log(error);
            })
    }

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };
    var listImgForEdit = [];
    dataPost.image.forEach((element, idx) => {
        listImgForEdit.push({
            uid: idx,
            name: element,
            status: 'done',
            url: element,
        })
    });
    const [fileList, setFileList] = useState(listImgForEdit);
    const [isLike, setIsLike] = useState('inherit');

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
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
    const onFinish = async (values) => {
        let header = authHeader();
        let config = {
            headers: header
        }
        const data = new FormData();
        data.append('description', values.introduction);
        for (const file of fileList) {
            let fileData;
            if (file.originFileObj) {
                fileData = await getBase64(file.originFileObj);
            } else {
                fileData = await getBase64FromUrl(file.url);
            }
            let blod = new Blob([fileData], { type: 'image/png' });
            data.append('files', blod, file.name);
        }
        data.append('hashtags', []);
        data.append('location', null);
        data.append('tags', ["c", "d"]);
        axios.patch(`http://localhost:8000/api/posts/` + dataPost._id,
            data
            , config)
            .then(res => {
                setIsModalVisible(false);
                postService.getAllPost()
                    .then(items => {
                        dispatch(postActions.getAllPost(items.data.data.data))
                    }
                    ).catch(err => console.log(err));
                alert('da dang');
            }
            ).catch(error => console.log(error));
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    //end modal
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleVisibleChange = (visible) => {
        setVisible(visible);
    };
    const content = (
        <div>
            <div>
                <a style={{ color: 'black' }} onClick={showModal}>Chỉnh sửa bài viết</a>
            </div>
            <div>
                <a style={{ color: 'black' }} onClick={deletePost}>Xóa bài viết</a>
            </div>
        </div>
    );

    function likePost(e) {
        if (isLike == 'error') {
            setIsLike('inherit')
            setLikes(likes - 1);
        }
        else {
            setIsLike('error');
            setLikes(likes + 1);
        }
        postService.likePost(idPost)
            .then((res) => {
                if (res.status == 200) {
                    dispatch(userActions.getInfoUser(dataUserCurrent._id));
                }
            });
    }
    let address = dataPost.location ? dataPost.location.address : '';
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} src={dataPost.author ? dataPost.author.photo : null} 
                    // onClick={
                    //     // () => {
                    //     //     history.push({
                    //     //         pathname: "/profile/" + dataPost.author._id,
                    //     //     });
                    //     //     history.go();
                    //     // }
                    // } 
                    />
                }
                action={
                    <Popover
                        content={content}
                        title="Title"
                        trigger="click"
                        visible={visible}
                        onVisibleChange={handleVisibleChange}
                        placement="bottomRight"
                    >
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    </Popover>

                }
                title="dsfsdfds"
                // subheader={dataPost.createdAt+ ', ' + address}
                subheader={<div>
                    <Moment format="YYYY/MM/DD hh:mm:ss">{dataPost.createdAt}</Moment>
                    <div> {address}</div>
                </div>}
            />
            <CardContent>
                
                    {/* {dataPost.description != 'undefined' ? dataPost.description : ''} */}
                    <h3>Tên nhà hàng: {dataPost.restaurant} </h3>
                    <h3>{dataPost.foodName} </h3>
                    <h4>Nguyên liệu</h4>
                    <p>fdsafsafdsfadsgyfusindimfsudnfkdsfds</p>
                    <h4>Công thức chế biến</h4>
                    <p>{dataPost.cookingRecipe}</p>
                    <h4>Mô tả</h4>
                    <p>{dataPost.description}</p>

            </CardContent>
            <CardMedia
                className={classes.media}
            >
                <GridList cellHeight={160} className={classes.gridList} cols={3}>
                    {tileData.map((tile) => (
                        <GridListTile key={tile.img} cols={tile.cols || 1} >
                            <img src={tile.img} alt={tile.title} />
                        </GridListTile>
                    ))
                    }
                </GridList>
            </CardMedia>

            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={(e) => likePost(e)}>
                    <FavoriteIcon /> 10
                </IconButton>
                <IconButton aria-label="add to favorites" onClick={handleExpandClick}>
                    <Chat />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <div style={{ overflow: "visible" }} >
                        <CommentPost idPost={dataPost._id}></CommentPost>
                    </div>
                </CardContent>
            </Collapse>
            <Modal title="Chỉnh sửa bài viết"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[null]}
            >
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={avatarImg} className={classes.avatar}>
                        </Avatar>
                    }
                    title="sdfdsf"
                    subheader={dataPost.createdAt}
                    style={{ padding: '0' }}
                />
                <Form style={{ marginTop: '20px' }} onFinish={onFinish} fields={[
                    {
                        name: ['introduction'],
                        value: dataPost.description,
                    }
                ]}>
                    <Form.Item className={classes.formItem} name={'introduction'} >
                        <Input.TextArea />
                    </Form.Item>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        beforeUpload={file => {
                            return false;
                        }}
                        multiple
                        onChange={onChange}
                    >
                        {'+ Upload'}
                    </Upload>
                    <Form.Item className={classes.formItem}  >
                        <Button type="primary" block size='large' htmlType="submit">
                            Submit
            </Button>
                    </Form.Item>
                </Form>
                <Card>
                </Card>
            </Modal>

        </Card>
    );
}