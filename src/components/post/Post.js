import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import LocationOn from '@material-ui/icons/LocationOn';
import Card from '@material-ui/core/Card';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chat from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Popover, Button, Tag } from 'antd';
import Grid from '@material-ui/core/Grid';
import { Rate } from 'antd';
import { Modal } from 'antd';
import Location from './../whatdoyouthing/Location';
import { Form, Input } from 'antd';
import { Upload } from 'antd';
import { commentService } from './../../services/comment.service';
import { postService } from './../../services/post.service';
import { CommentPost } from './../commentPost/CommentPost';
import { authHeader } from './../../helpers/auth-header';
import { postActions } from './../../actions/post.action';
import getBase64 from './../../utils/getBase64';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import { Image } from 'antd';
import Moment from 'react-moment';
import Avatar from '@material-ui/core/Avatar';
import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Divider, GridList, GridListTile, Grow, Paper } from '@material-ui/core';
import { userActions } from '../../actions/user.actions';

import { history } from '../../helpers/history';
import { message, notification } from 'antd';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop: "3%"
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
  itemRate: {
    paddingTop: '7px'
  },
  itemIcon: {
    width: "20%",
    float: "left",
  },
  overlay: {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    height: "100%",
    width: "100%",
    opacity: "0",
    backgroundColor: " #1C1C1C",
    opacity: "0.5",
  },
  '@global':{
    '.MuiGridListTile-tile':{
      borderRadius: "5px",
      paddingBottom: '2px'
    }
  }
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

export function Post(props) {
  var dataPost = props.value;
  const isShow = props.isShow;
  const [isVisibleReview, setIsVisibleReview] = useState(false);
  const [form] = Form.useForm();
  const idPost = dataPost._id;
  const tileData = gridImage(dataPost.photo);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('false');
  const [dataComment, setDataComment] = useState([]);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(props.expand ? true : false);
  const [visible, setVisible] = useState(false);
  const dataUserCurrent = useSelector(state => state.authentication.user.data.user);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [listUserLike, setListUserLike] = useState([]);
  const dispatch = useDispatch();
  const postList = useSelector(state => state.post);
  const user = useSelector(state => state.authentication);
  const [descriptionInput, setDescriptionInput] = useState('');
  const [isShowImageList, setIsShowImageList] = useState(false);
  const { confirm } = Modal;
  const update = props.update ? props.update : null;
  const setUpdate = props.setUpdate ? props.setUpdate : null;
  const openNotificationWithIcon = (type, mess) => {
    notification[type]({
      message: mess,
      style: {
        marginTop: 60
      },
    });
  };
  //getcomment
  let mounted = true;
  const header = authHeader();
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
    postService.getPostLikes(idPost)
      .then(items => {
        if (items !== undefined) {
        setLikes(items[0]?.users_likes.length);
      }
      })
    commentService.getAllCommentPost(idPost)
      .then(items => {
        console.log(items);
        setComments(items?items.length:0);

      })
    return () => mounted = false;
  }, []);
  //modal
  const [rateReviewEdit, setRateReviewEdit] = useState(
    {
      food: 0,
      staffAttitude: 0,
      facilities: 0,
      processServing: 0
    }
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
    handleVisibleChange(false);
    setDescriptionInput(dataPost.description);
    console.log(dataPost);
    setRateReviewEdit(dataPost.rating);
  };
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
  const showConfirm = () => {
    confirm({
      title: 'Bạn muốn xóa bài viết này không?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deletePost();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const deletePost = () => {
    if(dataPost.type==true){
      postService.deleteReview(dataPost._id)
      .then(result => {
        console.log("deleteReview");
        if (result) {
          dispatch(postActions.deletePost(dataPost._id));
          openNotificationWithIcon('success', 'Xóa bài viết thành công!');
          setUpdate(!update);

        }
        else {
          openNotificationWithIcon('error', 'Xóa bài viết thất bại!')
        }
      })
    }else{
      postService.deletePost(dataPost._id)
      .then(result => {
        console.log("result");
        if (result) {
          dispatch(postActions.deletePost(dataPost._id));
          openNotificationWithIcon('success', 'Xóa bài viết thành công!');
          setUpdate(!update);

        }
        else {
          openNotificationWithIcon('error', 'Xóa bài viết thất bại!')
        }
      })
    }
  }

  const onPreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  };
  // const onPreview = async file => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise(resolve => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow.document.write(image.outerHTML);
  // };
  var listImgForEdit = [];
  dataPost.photo.forEach((element, idx) => {
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
  const changeDescription = (e) => {
    setDescriptionInput(e.target.value)
  }
  const onFinish = async (values) => {
    let header = authHeader();
    let config = {
      headers: header
    }
    const data = new FormData();
    data.append('description', descriptionInput);
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
    data.append('type', dataPost.type);
    data.append('restaurant', dataPost.restaurant?._id);
    data.append('rating', JSON.stringify(rateReviewEdit));
    data.append('location', JSON.stringify({
      type: 'point',
      coordinates: dataPost?.location,
      address: dataPost?.location?.address
    }));
    if (!dataPost.type) {
      axios.patch(`http://localhost:8000/api/posts/` + dataPost._id,
        data
        , config)
        .then(res => {
          setIsModalVisible(false);
          postService.getAllPost()
            .then(items => {
              dispatch(postActions.getAllPost(items.data.data.data));
              openNotificationWithIcon('success', 'Chỉnh sửa bài viết thành công!')
            }
            ).catch(err => {
              console.log(err)
              openNotificationWithIcon('success', 'Chỉnh sửa bài viết thành công!')
            }
            );
          message.success('This is a success message');
        }
        ).catch(error => console.log(error));
    }
    else {
      axios.post(`http://localhost:8000/api/review/update/` + dataPost._id,
        data
        , config)
        .then(res => {
          setIsModalVisible(false);
          postService.getAllPost()
            .then(items => {
              dispatch(postActions.getAllPost(items.data.data.data));
              openNotificationWithIcon('success', 'Chỉnh sửa bài viết thành công!')
            }
            ).catch(err => {
              console.log(err)
              openNotificationWithIcon('success', 'Chỉnh sửa bài viết thành công!')
            }
            );
          message.success('This is a success message');
        }
        ).catch(error => console.log(error));
    }

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
      <div style={{ marginBottom: '10px' }}>
        <EditIcon style={{ marginTop: '5px', marginRight: '5px', marginBottom: '-4px' }} fontSize='small'></EditIcon><a style={{ color: 'black' }} onClick={showModal}>Chỉnh sửa bài viết</a>
      </div>
      <div>
        <DeleteIcon style={{ marginTop: '5px', marginRight: '5px', marginBottom: '-4px' }} fontSize='small'></DeleteIcon><a style={{ color: 'black' }} onClick={showConfirm}>Xóa bài viết</a>
      </div>
    </div>
  );

  function likePost(e, userId, authorId) {
    if (isLike == 'error') {
      setIsLike('inherit')
      setLikes(likes - 1);
    }
    else {
      setIsLike('error');
      setLikes(likes + 1);
    }
    postService.likePost(idPost, userId, authorId)
      .then((res) => {
        if (res.status == 200) {
          dispatch(userActions.getInfoUser(dataUserCurrent._id));
        }
      });
  }
  let address = dataPost.location ? dataPost.location.address : '';
  let imageForShow = [];
  let imageHiden = [];
  if (tileData.length > 3) {
    imageForShow = tileData.slice(0, 3);
    imageHiden = tileData.slice(3);
  } else {
    imageForShow = tileData
  }
  return (
    <Card className={classes.root} >
      <CardHeader
        avatar={
          <Link to={"/profile/" + dataPost.author._id}>
            <Avatar aria-label="recipe" className={classes.avatar} src={dataPost.author ? dataPost.author.photo : null}
            />
          </Link>

        }
        action={
          <div>
            {dataPost.type && <Tag color="warning">Review</Tag>}
            {isShow ? <Popover
              content={content}
              trigger="click"
              visible={visible}
              onVisibleChange={handleVisibleChange}
              placement="bottomRight"
            >
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            </Popover> : ''}
          </div>


        }
        title={dataPost.author.lastname + ' ' + dataPost.author.firstname}
        // subheader={dataPost.createdAt+ ', ' + address}
        subheader={<div>
          <Moment format="YYYY/MM/DD hh:mm:ss">{dataPost.createdAt}</Moment>
          <div> {address}</div>
          <div>{
            dataPost.restaurant != undefined ?
              <Link style={{color: "#848484"}}>
                <Typography onClick={(e) => history.push('/restaurant/' + dataPost.restaurant._id)}>
                  {
                    "Restaurant " + dataPost.restaurant.restaurantname
                  }
                </Typography>
              </Link>
              : ''
          }</div>
        </div>}
      />
      <CardContent onClick={e => history.push("/post/" + dataPost._id)} >
        <Typography variant="body2" component="p">
          {dataPost.description != 'undefined' ? dataPost.description : ''}
        </Typography>

      </CardContent>

      <CardMedia
        onDoubleClick={e => history.push("/post/" + dataPost._id)}
        className={classes.media}
      >

        {dataPost.type && (
          <Form.Item className={classes.formItem}  >
            <Grid container>
              <Grid item xs={3}>
                <Typography className={classes.itemRate} variant="subtitle2">
                  Món ăn:
                                </Typography>

              </Grid>
              <Grid item xs={9}>
                <Rate allowHalf disabled defaultValue={dataPost.rating?.food} />
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.itemRate} variant="subtitle2">
                  Thái độ phục vụ:
                                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Rate allowHalf disabled defaultValue={dataPost.rating?.staffAttitude} />
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.itemRate} variant="subtitle2">
                  Tiện nghi:
                                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Rate allowHalf disabled defaultValue={dataPost.rating?.facilities} />
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.itemRate} variant="subtitle2">
                  Quy trình:
                                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Rate allowHalf disabled defaultValue={dataPost.rating?.processServing} />
              </Grid>
            </Grid>
          </Form.Item >
        )}

        <Image.PreviewGroup>
        <GridList cellHeight={250} className={classes.gridList} cols={3}>
          {
            imageForShow.map((tile, index) => (
              index != 2 ?
                <GridListTile key={tile.img} cols={tile.cols || 1} style={{borderRadius: "5px"}}>
                  <Image src={tile.img} alt={tile.title}  height={'100%'}/>
                </GridListTile> :
                <GridListTile key={tile.img} cols={tile.cols || 1} onClick={() => { setIsShowImageList(!isShowImageList); }} >
                  <Image src={tile.img} alt={tile.title} height={'100%'}/>
                  {
                    isShowImageList == false ? <div className={classes.overlay}>
                      <AddIcon></AddIcon>
                    </div> : null
                  }
                </GridListTile>
            ))
          }
        </GridList>
        <Collapse in={isShowImageList}>
          <GridList cellHeight={250} className={classes.gridList} cols={3}>
            {
              imageHiden.map((tile) => (
                <GridListTile key={tile.img} cols={tile.cols || 1} >
                  <Image src={tile.img} alt={tile.title}height={'100%'} />
                </GridListTile>
              ))
            }
          </GridList>
        </Collapse>
        </Image.PreviewGroup>
      </CardMedia>
      <Divider></Divider>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={(e) => likePost(e, dataPost.author._id, dataPost.author._id)}>
          <FavoriteIcon color={isLike} /> {likes}
        </IconButton>
        <IconButton aria-label="add to favorites" onClick={handleExpandClick}>
          <Chat style={{marginRight: '2px'}}/> {comments}
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
            <CommentPost idPost={dataPost._id} authorId={dataPost.author._id}></CommentPost>
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
            <Avatar aria-label="recipe" src={dataPost.author.photo} className={classes.avatar}>
            </Avatar>
          }
          title={dataPost.author.firstname}
          subheader={dataPost.createdAt}
          style={{ padding: '0' }}
          action={
            <ListItem style={{ width: '90%' }} button className={classes.itemIcon} onClick={(e) => { setIsVisibleReview(true) }}>
              <ListItemAvatar>
                <LocationOn style={{ color: '#1976D2' }} />
              </ListItemAvatar>
            </ListItem>
          }
        />
        <Form form={form} style={{ marginTop: '20px' }} onFinish={onFinish}>
          <Form.Item className={classes.formItem} >
            <Input.TextArea value={descriptionInput} onChange={changeDescription} rows={11} />
          </Form.Item>
          {dataPost.type && (<Form.Item className={classes.formItem}  >
             <p style={{ marginBottom: '0px', fontSize: '14px' }}>Đánh giá: </p>
                    <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px', paddingLeft: '17px', marginBottom: '3px' }}>
            <Grid container>
              <Grid item xs={6}>
                <Typography className={classes.itemRate} variant="subtitle2">
                  Món ăn:
                                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Rate allowHalf onChange={changeEditFood} defaultValue={dataPost.rating?.food} />
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.itemRate} variant="subtitle2">
                  Thái độ phục vụ:
                                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Rate allowHalf onChange={changeEditStaffAttitude} defaultValue={dataPost.rating?.staffAttitude} />
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.itemRate} variant="subtitle2">
                  Tiện nghi:
                                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Rate allowHalf onChange={changeEditFacilities} defaultValue={dataPost.rating?.facilities} />
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.itemRate} variant="subtitle2">
                  Quy trình:
                                </Typography>

              </Grid>
              <Grid item xs={6}>
                <Rate allowHalf onChange={changeEditProcessServing} defaultValue={dataPost.rating?.processServing} />
              </Grid>
            </Grid>
            </div>
          </Form.Item >
          )}
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={onPreview}
            beforeUpload={file => {
              return false;
            }}
            multiple
            onChange={onChange}
          >
            {'+ Thêm hình ảnh'}
          </Upload>

          <Form.Item className={classes.formItem}  >
            <Button type="primary" block size='large' htmlType="submit">
              Chỉnh sửa
            </Button>
          </Form.Item>
        </Form>
        <Card>
        </Card>
        <Location isVisible={isVisibleReview} setIsVisible={setIsVisibleReview}>
        </Location>
      </Modal>

    </Card>
  );
}
