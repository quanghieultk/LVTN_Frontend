import Map from './../../services/map';
import React, { useState } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { locationActions } from '../../actions/location.actions';
export default function Location(props) {
    const location=useSelector(state=>state.location);
    const dispatch=useDispatch();
    const handleCancel = () => {
        dispatch(locationActions.setLocation([],''));
        props.setIsVisible(false);
    };
    const handleOk=()=>{
        props.setIsVisible(false);
    }
    return (
        <Modal title="Location"
            visible={props.isVisible}
            onCancel={handleCancel}
            onOk={handleOk}
            className="location_modal"
        >
            <Map/>
        </Modal>
    )
}