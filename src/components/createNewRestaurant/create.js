import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { authHeader } from '../../helpers/auth-header';
import { notification } from 'antd';
const useStyles = makeStyles((theme) => ({
    root: {
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));
export function CreateNewRestaurant(props) {
    const classes = useStyles();
    const openNotificationWithIcon = (type, mess) => {
        notification[type]({
            message: mess,
            style: {
                marginTop: 60
            },
        });
    };
    const currencies = [
        {
            value: 'Hải sản',
            label: 'Hải sản',
        },
        {
            value: 'Nhật',
            label: 'Nhật',
        },
        {
            value: 'Hàn Quốc',
            label: 'Hàn Quốc',
        },
        {
            value: 'Bún, mì, phở ...',
            label: 'Bún, mì, phở ...',
        },
    ];
    const [formInput, setFormInput] = useState({
        user: JSON.parse(localStorage.getItem('user')).data.user._id,
        restaurantname: "",
        address: "",
        email: "",
        phone: "",
        type: "",
        description: ""
    });
    const [currency, setCurrency] = React.useState('EUR');
    const handleChange = (event) => {
        setCurrency(event.target.value);
        const name = event.target.name;
        const newValue = event.target.value;
        setFormInput({ ...formInput, [name]: newValue });
    };
    function handleSubmit(event) {
        event.preventDefault();
        console.log(formInput);
        let header = authHeader();
        let config = {
            headers: header
        }
        //check input before submit
        //axios to send formInput
        axios.post(`http://localhost:8000/api/restaurants/create`, formInput, config)
            .then((res) => { 
                openNotificationWithIcon('success', 'Tạo nhà hàng thành công!')
            }
            )
            .catch(err => {
                openNotificationWithIcon('error','Tạo nhà hàng thất bại!')
            }
                );
    }
    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ ...formInput, [name]: newValue });
    };
    return (
        <Card style={{ padding: "2%" }}>
            <form className={classes.root} onSubmit={handleSubmit}>
                <TextField
                    id="restaurantname"
                    label="Tên nhà hàng"
                    style={{ margin: 8 }}
                    placeholder=""
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    name="restaurantname"
                    onChange={handleInput}
                />
                <TextField
                    id="address"
                    label="Địa chỉ"
                    style={{ margin: 8 }}
                    placeholder=""
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    name="address"
                    onChange={handleInput}
                />
                <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    value={currency}
                    onChange={handleChange}
                    helperText="Loại nhà hàng"
                    variant="outlined"
                    style={{ margin: 8 }}
                    name="type"
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="standard-full-width"
                    label="Số điện thoại"
                    style={{ margin: 8 }}
                    placeholder=""
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    name="phone"
                    onChange={handleInput}
                />
                <TextField
                    id="outlined-basic"
                    label="email"
                    style={{ margin: 8 }}
                    placeholder=""
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                    name="email"
                    onChange={handleInput}
                />
                <TextField
                    id="description"
                    label="Mô tả"
                    style={{ margin: 8 }}
                    placeholder=""
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    name="description"
                    onChange={handleInput}
                />
                <div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ float: 'right' }}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Card>
    );
}