import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Header } from '../../components/header/Header';
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import InfomationTab from './../../components/informationTab/informationTab';
import ChangePassword from './../../components/changePassword/changePassword';
import { Container } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    nonePadding: {
        padding: "0!important"
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        height: 500
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`
    };
}
export function Setting() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Container>
            <Grid container spacing={3} >
                <Grid item xs={12} className={classes.nonePadding}>
                    <Header></Header>
                </Grid>
                <Grid container style={{ marginTop: "100px" }}>
                    <Grid item xs={12} style={{ maxHeight: "40vh", marginBottom: "1vh" }} >
                        <div className={classes.root}>
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={value}
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                                className={classes.tabs}
                            >
                                <Tab label="Thông tin cá nhân" {...a11yProps(0)} />
                                <Tab label="Đổi mật khẩu" {...a11yProps(1)} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                <InfomationTab></InfomationTab>
                            </TabPanel>
                            <TabPanel value={value} index={1}  style={{
                                width: '60%',
                                textAlign: 'center',
                                paddingLeft: '10%'}} >
                                <ChangePassword></ChangePassword>
                            </TabPanel>
                        </div>
                </Grid>
            </Grid>
            </Grid>
        </Container >

    );
}
