import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions/user.actions';
import { useLocation } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        www.cuisine.com
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ResetPassword(props) {
  const token = props.match.params.token;
  const classes = useStyles();

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [password, setPassword] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const loggingIn = useSelector(state => state.authentication.loggingIn);
  const dispatch = useDispatch();
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);

    if (passwordConfirm && password) {
      dispatch(userActions.resetPassword(password, passwordConfirm, token));
    }

  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === 'passwordConfirm') {
      setPasswordConfirm(value);
    };
  }

  return (
    <Container id="formSignIn" component="main" maxWidth="xs">

      <div className={classes.paper} >
        <Avatar className={classes.avatar}>

        </Avatar>
        <Typography component="h1" variant="h5">
          Đặt lại mật khẩu
        </Typography>
        <form id="formLogin" className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwordConfirm"
            label="Xác nhận mật khẩu"
            type="password"
            id="passwordConfirm"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            form="formLogin"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export { ResetPassword };