import {Redirect, Route} from 'react-router-dom'
import {authenticationService} from "../../services/authentication.service";
import React from 'react';

export default function PrivateRoute({component: Component, ...rest}) {
    const isLoggedIn = authenticationService.currentUserValue != null;

    return (
        <Route
            {...rest}
            render={props =>
                !isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{pathname: '/', state: {from: props.location}}}/>
                )
            }
        />
    )
}
