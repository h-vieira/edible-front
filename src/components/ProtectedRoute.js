import { Fragment, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isAuth } = useContext(AuthContext);
    return (
        <Fragment>
           { isAuth ? <Route {...rest} render={() => <Component />} /> : <Redirect to='sign-in' /> }
        </Fragment>
    )
}

export default ProtectedRoute;
