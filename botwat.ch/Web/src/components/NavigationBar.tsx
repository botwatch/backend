import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import {red} from "@material-ui/core/colors";
import hiveImage from '../resources/hive.png';
import {authenticationService} from "../services/authentication.service";
import {Link} from "react-router-dom";
import {Fade, Menu, MenuItem} from "@material-ui/core";
import {ExitToApp} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        icon: {
            marginRight: theme.spacing(1),
            width: 32,
            height: 32,
            resizeMode: 'stretch'
        },
        bar: {
            backgroundColor: theme.palette.primary.main,
            zIndex: theme.zIndex.drawer + 1
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        logout: {
            color: '#fff',
        },
        title: {
            flexGrow: 1,
        },
    }));


export default function NavigationBar() {
    const classes = useStyles({});

    function RenderLogin({loggedIn}) {
        const handleLogout = () => {
            authenticationService.logout();
        };
        if (loggedIn)
            return (
                <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleLogout}>
                    <ExitToApp className={classes.logout} />
                </Button>
            );
        return (
            <Button component={Link} to="/login" variant="contained" color="primary" style={{boxShadow: "none"}}>
                Login
            </Button>
        );
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed" elevation={0} className={classes.bar}>
                <Toolbar>
                    <Link to="/" style={{color: 'inherit', textDecoration: 'inherit'}}>
                        <img src={hiveImage} className={classes.icon} alt="logo"/>
                    </Link>
                    <Typography variant="h6" className={classes.title}>
                        Botwatch
                    </Typography>
                    <RenderLogin loggedIn={authenticationService.currentUserValue != null}/>
                </Toolbar>
            </AppBar>
        </div>
    );
}