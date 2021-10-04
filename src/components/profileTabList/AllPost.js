import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { postService } from './../../services/post.service';
import { Post } from '../../components/post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from './../../actions/post.action';

const useStyles = makeStyles((theme) => ({

}));

export function AllPost(props) {
    const idUser = props.idUser;
    const dataUserCurrent = useSelector(state => state.authentication.user.data.user);
    const [dataPost, setDataPost] = useState([]);
    if (dataUserCurrent._id === idUser) {
        var isOwner = true;
    }
    let mounted = true;
    const dispatch=useDispatch()
    const [update, setUpdate]= useState(true);
    useEffect(() => {
        postService.getPostByUser(idUser)
            .then(items => {
                setDataPost(items)
                // if (items != null) {
                //     if (mounted) {
                //         dispatch(postActions.getAllPost(items));
                //     }
                // }
            })
        return () => mounted = false;
    }, [idUser,update]);


    return (
        <div>
            {
                dataPost ? dataPost.map((value) => {
                    return <Post value={value} key={value._id} isShow={isOwner} update={update} setUpdate={setUpdate}></Post>;
                }) : null
            }
        </div>
    );
}
