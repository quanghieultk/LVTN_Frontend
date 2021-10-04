import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input, DatePicker, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions/user.actions';
import axios from 'axios';
import { Select } from 'antd';

const { Option } = Select;

const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '72ch',
    },
    width: '600px'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ChangeInfomationModal() {

  const classes = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [interesting, setInteresting] = useState()
  const openNotificationWithIcon = (type, mess) => {
    notification[type]({
      message: mess,
      style: {
        marginTop: 60
      },
    });
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  const userInfo = useSelector(state => state.authentication.user.data.user);
  const dispatch = useDispatch();
  let val=userInfo.interests;
  const onFinish = (values) => {
    values.interests=val;
    console.log(values)
    dispatch(userActions.changeInfoUser(userInfo._id, values))
    openNotificationWithIcon('success', 'Thay đổi thông tin cá nhân thành công!')
    handleCancel();
  };
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  const [value, setValue] = useState([
    {
      name: ['firstname'],
      value: userInfo.firstname,
    }, {
      name: ['lastname'],
      value: userInfo.lastname,
    }, {
      name: ['email'],
      value: userInfo.email,
    }, {
      name: ['address'],
      value: userInfo.address,
    },
    {
      name: ['phonenumber'],
      value: userInfo.phoneNumber,
    }, {
      name: ['interests'],
      value: userInfo.interests.map(ele=>ele.id)
    }
  ]);
  function handleChange(value) {
    val=[]
    interesting.forEach(element => {
      if(value.includes(element.id)){
        console.log("ABC")
        val.push(element)
      }
    });
    userInfo.interests=val
  }
  useEffect(() => {
    axios.get('http://localhost:8000/api/users/interesting/all').then(response => {
      setInteresting(response.data.interesting)
    })
  }, [])
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Chỉnh sửa
      </Button>
      <Modal title="Chỉnh sửa thông tin cá nhân" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} fields={value}>
          <Form.Item {...formItemLayout} name='firstname' label="Tên" rules={[{ required: true }]} >
            <Input />
          </Form.Item>
          <Form.Item {...formItemLayout} name='lastname' label="Họ" rules={[{ required: true }]} >
            <Input />
          </Form.Item>
          <Form.Item  {...formItemLayout} name='birthday' label="Ngày sinh" >
            <DatePicker />
          </Form.Item>
          <Form.Item  {...formItemLayout} name='address' label="Địa chỉ">
            <Input />
          </Form.Item>
          <Form.Item disabled {...formItemLayout} name='email' label="Email" rules={[{ type: 'email', required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item {...formItemLayout} name='phonenumber' label="Số điện thoại">
            <Input />
          </Form.Item>
          <Form.Item {...formItemLayout} name='interests' label="Sở thích">
            <Select
              mode="multiple"
              // allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              // defaultValue={}
              onChange={handleChange}
            >
              {
                interesting ? interesting.map(ele =>
                 <Option key={ele.name} value={ele.id} label={ele.name}>{ele.name}</Option >            

                ) : null
              }
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
            <Button type="primary" htmlType="submit">
              Chỉnh sửa
        </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}