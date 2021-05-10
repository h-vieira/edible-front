import React, { Fragment, useContext } from 'react';
import { Link as RLink, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
	root: { 
		position: 'sticky',
		flexGrow: 1,
		height: '10vh'
	},
	menuButton: { marginRight: theme.spacing(2), },
	title: { flexGrow: 1, },
}));


const Navbar = () => {
	const classes = useStyles();
	const signin = () => {return <Redirect to='/sign-in'/>}
	const preventDefault = (event) => event.preventDefault();
	const { isAuth, logOut } = useContext(AuthContext);
	
	const [auth, setAuth] = React.useState(true);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

  	const handleChange = (event) => {
    	setAuth(event.target.checked);
  	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

  	return (
    	<div className={classes.root}>
      		<AppBar position="sticky">
        		<Toolbar>
        			<Typography className={classes.title} variant="h6" >
          				<Link href="/"   color="inherit" rel="noreferrer">
            				IsThisEdible
          				</Link>
        			</Typography>
					<Typography className={classes.title} variant="h6" >
						<Link href="/ediblepedia"   color="inherit" rel="noreferrer">
							Ediblepedia
						</Link>
					</Typography>

					{ !isAuth && (
					<Fragment>
						<Button component={RLink} to="/sign-up" color="inherit">SignUp</Button>
						<Button component={RLink} to="/sign-in" color="inherit">SignIn</Button>
					</Fragment>
					)}
					{ isAuth && (
						<Fragment>
						<Button component={RLink} to="/create-edible" color="inherit">Add Edible</Button>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						
							<Menu  
							id="menu-appbar" 
							anchorEl={anchorEl} 
							anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
							keepMounted 
							transformOrigin={{ vertical: 'top', horizontal: 'right', }}
							open={open}
							onClose={handleClose}
							>
							<MenuItem component={RLink} to="/activity">My activity</MenuItem>
							<MenuItem component={RLink} to="/Profile">My account</MenuItem>
							<MenuItem onClick={logOut} >LogOut</MenuItem>
						</Menu>
						</Fragment>
					)}
        		</Toolbar>
      		</AppBar>
    	</div>
  	);
};
 
export default Navbar;
