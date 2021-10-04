import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Form,
    Input,
    Button
} from 'antd';
import {userService} from './../../services/user.service'
import { notification } from 'antd';
const useStyles = makeStyles();



export default function ChangePassword() {
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const openNotificationWithIcon = (type,mess) => {
        notification[type]({
            message: mess,
            style: {
                marginTop: 60
            },
        });
    };
    const onFinish = (values) => {  
        userService.changePassword(values.currentPassword,values.newPassword,values.confirmPassword)
        .then(response=>{
            if(response){
                
                openNotificationWithIcon('success','Thay đổi mật khẩu thành công!')
            }
            else {
                openNotificationWithIcon('error','Thay đổi mật khẩu thất bại!')
            }
        })
        
    };
   
    return (
        
        <Form
            {...formItemLayout}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            scrollToFirstError
        >
            <Form.Item
                name="currentPassword"
                label="Mật khẩu hiện tại"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu của bạn!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="newPassword"
                label="Mật khẩu mới"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu mới!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng xác nhận mật khẩu của bạn!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Mật khẩu bạn vừa nhập không khớp!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Đổi mật khẩu
                    
          </Button>
            </Form.Item>
        </Form>
    );
}
