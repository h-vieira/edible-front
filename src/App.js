import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import { teal, amber, deepOrange } from '@material-ui/core/colors';
/* our components */
import ProtectedRoute from './components/ProtectedRoute.js'
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Home from './components/Home.js';
import Edible from './components/Edible.js';
import Ediblepedia from './components/Ediblepedia.js';
import SignUp from './components/SignUp.js';
import SignIn from './components/SignIn.js';
import NotFound from './components/404.js';
import Profile from './components/Profile.js';
import CreateEdible from './components/CreateEdible.js';
/* import Edible from './components/Edible.js'; */

const theme = createMuiTheme({
  
    palette: {
      primary: { main: '#0097a7'},
      secondary: deepOrange,
    },
    spacing: 16,
  });

const App = () => {
	return ( 
		<ThemeProvider theme={theme}>

			<Navbar />

				<Switch>
					<Route exact path='/'  render={() => <Home />} />
					<Route exact path="/edible/:id" render={() => <Edible />} />

					<ProtectedRoute exact path='/create-edible' component={CreateEdible} />
					<Route exact path='/ediblepedia' render={() => <Ediblepedia />} />
					<Route exact path='/sign-up/' render={() => <SignUp />} />
					<Route exact path='/sign-in/' render={() => <SignIn />} />
					<ProtectedRoute exact path='/profile' component={Profile} />
					
					<Route path='*' render={() => <NotFound />} />
					
				</Switch>
			<Footer />

		</ThemeProvider>
	);
}

export default App;
