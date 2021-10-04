import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { connect } from 'react-redux';

// import "./signUp.scss"
import { userActions } from '../../actions/user.actions';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Signup (props){
    
    const Classes = useStyles();
    const [checked, setChecked] = React.useState(false);

    const [user, setUser] = useState({
        role: "user",
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordConfirm: '',
        companyName: '',
        companyAddress: '',
        birthday: '',
        phoneNumber:'',
        photo: ''

    });
    const [submit, setSubmit] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setSubmit(true);
        if (user.firstname && user.lastname  && user.password) {
            props.register(user);
        }
    }

    function handle(e){
        const {name, value}=e.target;
        const user1=user;
        setUser({
            ...user1,
            [name]: value
        })
    }
    const handleChange = () => {
        setChecked((prev) => !prev);
    };


    return (
        <Container id="formSignUp" component="main" maxWidth="xs">
            <CssBaseline />
            <div className={Classes.paper}>
                <Avatar className={Classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={Classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstname"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstname"
                                label="Tên đệm và tên"
                                autoFocus
                                onChange={handle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastname"
                                label="Họ"
                                name="lastname"
                                autoComplete="lname"
                                onChange={handle}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                onChange={handle}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handle}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="passwordConfirm"
                                label="Xác nhận mật khẩu"
                                type="password"
                                id="passwordConfirm"
                                autoComplete="current-password"
                                onChange={handle}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={Classes.submit}
                    >
                        Đăng ký
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signIn" variant="body2">
                                Bạn đã có tài khoản? Đăng nhập
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedSignUp = connect(mapStateToProps, actionCreators)(Signup);
export { connectedSignUp as SignUp };
