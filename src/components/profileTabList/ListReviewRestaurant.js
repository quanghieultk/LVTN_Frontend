import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Rate, Comment, Form, Button, Input } from 'antd';
import { notification } from 'antd';
import {
    Conversation,
    Avatar
} from "@chatscope/chat-ui-kit-react";
import { restaurantService } from '../../services/restaurant.service';
const useStyles = makeStyles({
    root: {
        minWidth: 275,

    }
});

export function ListReviewRestaurant(props) {
    const restaurantId = props.restaurantId;
    const dataUserCurrent = useSelector(state => state.authentication.user.data.user);
    const lillyIco = 'https://chatscope.io/storybook/react/static/media/emily.d34aecd9.svg';
    const { TextArea } = Input;
    const [submitting, setSubmitting] = useState(false);
    const [rateStar, setRateStar] = useState(0);
    const [message, setMessage] = useState('');
    const [listReview, setListReview] = useState();
    useEffect(() => {
        restaurantService.getReviewByIdRestaurant(restaurantId)
            .then(items => {
                console.log(items.data.data.restaurant.length);
                console.log(items.data.data.restaurant.length != 0);
                if (items.data.data.restaurant.length != 0) {
                    setListReview(items.data.data.restaurant[0].userReview);
                }
            })
    }, []);
    const openNotificationWithIcon = (type, mess) => {
        notification[type]({
            message: mess,
            style: {
                marginTop: 60
            },
        });
    };
    function reviewFunction(value) {
        setRateStar(value);
    }
    function handleChange(e) {
        setMessage(e.target.value);
    };
    const handleSubmit = () => {
        restaurantService.createReviewRestaurant(restaurantId, rateStar, message)
            .then(response => {
                console.log(response);
                if (response) {
                    
                    openNotificationWithIcon('success', 'Đánh giá nhà hàng thành công!');
                    setMessage('');
                    setRateStar(0);
                    restaurantService.getReviewByIdRestaurant(restaurantId)
                        .then(items => {
                            console.log(items);
                            if (items.status == 200) {
                                setListReview(items.data.data.restaurant[0].userReview);
                                
                                console.log(rateStar);
                            }
                            else {

                            }

                        })
                }
                else {
                    openNotificationWithIcon('error', 'Đánh giá nhà hàng thất bại!')
                }
            }

            )


    };
    return (
        <div style={{
            height: "340px"
        }}>
            <Comment
                avatar={
                    <Avatar
                        src={dataUserCurrent ? dataUserCurrent.photo : ''}
                        alt="Han Solo"
                    />
                }
                content={
                    <>
                        <Form.Item>
                            <TextArea rows={4} onChange={handleChange} value={message} />
                        </Form.Item>
                        <Rate allowHalf autoFocus onChange={reviewFunction} defaultValue={rateStar}></Rate>
                        <Form.Item>
                            <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
                                Add Comment
                        </Button>
                        </Form.Item>
                    </>
                }
            />
            {
                listReview ? listReview.map((value) => {
                    return <Conversation lastSenderName="You" name={value.user.firstname} info={value.review}>
                        <Avatar src={value.user.photo} name={value.user.firstname + ' ' + value.user.lastname} />
                        <Conversation.Operations visible>
                            <Rate allowHalf disabled autoFocus defaultValue={value.point}></Rate>
                        </Conversation.Operations>
                    </Conversation>
                }) : null
            }
        </div>
    );
}