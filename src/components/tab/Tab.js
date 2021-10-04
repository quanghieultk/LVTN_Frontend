import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddToQueueOutlinedIcon from '@material-ui/icons/AddToQueueOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import StoreOutlinedIcon from '@material-ui/icons/StoreOutlined';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useLocation } from 'react-router';
import { history } from './../../helpers/history';
import { useDispatch, useSelector } from 'react-redux';
import { menuActions } from '../../actions/menu.action';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  noneShawdow: {
    boxShadow: "none",
  },
}));

export default function ScrollableTabsButtonPrevent() {
  const classes = useStyles();

  const idUser = useSelector(state => state.authentication.user.data.user);
  const location = useLocation();
  var menu = useSelector(state => state.menu.menu);
  // const [value, setValue] = useState(menu);

  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    // setValue(newValue);
    dispatch(menuActions.change(newValue));
  };
  return (
    <Tabs
      value={menu}
      onChange={handleChange}
      // variant="scrollable"
      // scrollButtons="on"
      aria-label=""
      centered
    >
      <Tab icon={<HomeOutlinedIcon color='primary' />} aria-label="Home" {...a11yProps(0)} onClick={() => {history.push("/")}} />
      <Tab icon={<LocationOnOutlinedIcon color='primary' />} aria-label="Message" {...a11yProps(1)} onClick={() => { history.push("/place") }} />
      <Tab icon={<FastfoodOutlinedIcon color='disabled' />}  disabled />
      <Tab icon={<StoreOutlinedIcon color='disabled' />} disabled  />
    </Tabs>
  );
}
