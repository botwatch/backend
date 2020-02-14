import React from 'react';
import {Redirect, Route} from 'react-router-dom'

export default function PrivateRoute({component: Component, ...rest}) {
    const isLoggedIn = false; //TODO make dynamic

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                )
            }
        />
    )
}
