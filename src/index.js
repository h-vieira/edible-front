import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

import AuthState from './context/AuthContext.js'

ReactDOM.render(
	<StrictMode>

		<Router>
			<AuthState>
				<App />
			</AuthState>
		</Router>

	</StrictMode>,
	document.getElementById('root')
);

