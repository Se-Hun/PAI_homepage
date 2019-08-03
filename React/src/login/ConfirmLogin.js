import React, { Component } from 'react';
import { Route,Redirect } from "react-router-dom";
import { isLoggedIn } from './auth';

//const DefaultLayout = React.lazy(() => import('./containers/'));

const ConfirmLogin = ({ component: Component, ...rest }) => (
    <Route {...rest} render = { (props) => isLoggedIn() ? (
        <Component {...props} /> ) : ( <Redirect to={{
                    pathname: "/login",
                    state: { from: props.location }
                }}
            /> )}
    />
);

export default ConfirmLogin
