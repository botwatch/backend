import {Avatar, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {authenticationService} from "../../../services/authentication.service";
import {purple} from "@material-ui/core/colors";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'fit-content'
    },
    purpleAvatar: {
        width: 60,
        height: 60,
        color: '#fff',
        backgroundColor: purple[500],
    },
    name: {
        marginTop: theme.spacing(1)
    }
}));

export default function Profile() {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Avatar className={classes.purpleAvatar}>
                {authenticationService.currentUserValue.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography
                className={classes.name}
                variant="h4">
                {authenticationService.currentUserValue.name}
            </Typography>
            <Typography variant="body2">{authenticationService.currentUserValue.email}</Typography>
        </div>
    );
}