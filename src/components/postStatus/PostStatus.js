import React, { useState } from 'react';
import { DatePicker } from 'antd';
import TextField from '@material-ui/core/TextField';
export function PostStatus() {
    // const [isModalVisible, setIsModalVisible] = useState(false);

    // const showModal = () => {
    //     setIsModalVisible(true);
    // };

    // const handleOk = () => {
    //     setIsModalVisible(false);
    // };

    // const handleCancel = () => {
    //     setIsModalVisible(false);
    // };

    return (
        //   
        <div><TextField
            id="date"
            label="Birthday"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
                shrink: true,
            }}        /> 
            <DatePicker />
 </div>

    );
};
