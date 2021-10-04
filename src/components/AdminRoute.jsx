import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AdminRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            if (localStorage.getItem('user')) {
                var data = JSON.parse(localStorage.getItem('user'));
                if (data.data.user.role === "admin") {
                    return <Component {...props} />
                }
            }
            return <Redirect to={{ pathname: '/signIn', state: { from: props.location } }} />        
        }} />
    );
}