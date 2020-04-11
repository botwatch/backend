import React from 'react';
import {Redirect, Route} from 'react-router-dom'
import {authenticationService} from "../../services/authentication.service";

export default function PrivateRoute({component: Component, ...rest}) {
    const isLoggedIn = authenticationService.currentUserValue != null;

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} {...rest} />
                ) : (
                    <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                )
            }
        />
    )
}
