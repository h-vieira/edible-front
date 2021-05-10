import React, { Fragment, useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

import { AuthContext } from '../context/AuthContext.js';
import URL from '../utils/constants.js';
import { Redirect } from 'react-router';

const Copyright = () => {
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
};

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

const SignUp = () => {
    const classes = useStyles();
    
    const { isAuth, setIsAuth, error, setError } = useContext(AuthContext); //hook needs to be inside component
    const [formState, setFromState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const { firstName, lastName, email, password } = formState;

    // [] -> dinamic keys. whenever the fild of target name <name> changes
    //       it will call the onChange event and give it the target value
    const onChange = evt => setFromState({ ...formState, [evt.target.name]: evt.target.value });
    
    const onSubmit = async evt => {
        evt.preventDefault();
        for (const field in formState ) {
            if (!formState[field]) return alert(`${field} is required`);
        }
        const options = {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        };
        try {
            const res = await fetch(`${URL}/auth/signUp`, options);
            const { token, error } = await res.json();
            if (error) {
                setError(error);
                return () => setTimeout(setError(''), 3000);
            } 
            localStorage.setItem('token', token);
            setIsAuth(true);

        } catch (error) {
            console.log(error);
        }
    };

    if (isAuth) return <Redirect to='/' />

    return (
        <Fragment>
            <Container component="main" maxWidth="xs">
                {error && (
                    <Alert severity="error">
                        {error}
                    </Alert>
                )}
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    autoFocus
                                    autoComplete="fname"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    type="text"
                                    label="First Name"
                                    value={firstName}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    autoComplete="lname"
                                    name="lastName"
                                    required
                                    fullWidth
                                    id="lastName"
                                    type="text"
                                    label="Last Name"
                                    value={lastName}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    autoComplete="email"
                                    name="email"
                                    required
                                    fullWidth
                                    id="email"
                                    type="email"
                                    label="Email Address"
                                    value={email}
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    autoComplete="current-password"
                                    name="password"
                                    required
                                    fullWidth
                                    id="password"
                                    type="password"
                                    label="Password"
                                    value={password}
                                    onChange={onChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/sign-in" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </Fragment>
    );
};

export default SignUp;

