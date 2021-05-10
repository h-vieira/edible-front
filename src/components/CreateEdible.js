import { Fragment, useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

import { AuthContext } from '../context/AuthContext.js';
import URL from '../utils/constants.js';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    title: { marginTop: theme.spacing(4) },
    form: { 
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: { margin: theme.spacing(3, 0, 2) },
}));

const CreateEdible = () => {

    const classes = useStyles();

    const { isAuth, setIsAuth, error, setError } = useContext(AuthContext);
    const [formState, setFromState] = useState({
        name: '',
        scientificName: '',
        desc: '',
        image: ''
    });
    const { name: formName, scientificName, desc, image  } = formState;
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
            const res = await fetch(`${URL}/edibles`, options);
            const response = await res.json();
            console.log(response)
         

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <Container component="main" maxWidth="lg" justifyContent="center">
            {error && (
                    <Alert severity="error">
                        {error}
                    </Alert>
                )}
                <form className={classes.form} noValidate onSubmit={onSubmit} justifyContent="center">
                    <Grid container spacing={2}>
                    <Typography className={classes.title} variant="h6" >
                        Basic info
                    </Typography>
                        <Grid item xs={12}>
                            <TextField
            
                                variant="outlined"
                                autoComplete="name"
                                required
                                fullWidth
                                type="text"
                                id="name"
                                name="name"
                                label="Name"
                                value={formName}
                                onChange={onChange}
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                multiline
                                rowsMax={4}
                                type="text"
                                autoComplete="desc"
                                name="desc"
                                id="desc"
                                label="Description"
                                value={desc}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    autoComplete="image"
                                    required
                                    fullWidth
                                    name="image"
                                    id="image"
                                    type="text"
                                    label="Image link"
                                    value={image}
                                    onChange={onChange}
                                />
                            </Grid>
                    

                        <Typography className={classes.title} variant="h6" >
                            Advanced info
                        </Typography>

                        <Grid item xs={12}  >
                            <TextField
                                variant="outlined"
                                autoComplete="sName"
                                required
                                fullWidth
                                type="text"
                                id="scientificName"
                                name="scientificName"
                                label="Scientific name"
                                value={scientificName}
                                onChange={onChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        
                        variant="contained"
                        color="success"
                        className={classes.submit}
                    >
                    
                        Save
                    </Button>
                </form>
            </Container>
        </Fragment>
    );
};

export default CreateEdible;
