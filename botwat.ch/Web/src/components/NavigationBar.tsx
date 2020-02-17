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
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        purpleAvatar: {
            color: '#fff',
            backgroundColor: red[500],
        },
        title: {
            flexGrow: 1,
        },
    }));


export default function NavigationBar() {
    const classes = useStyles({});

    function RenderLogin({loggedIn}) {
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
            authenticationService.logout();
        };
        if (loggedIn)
            return (
                <div>
                    <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                        <Avatar className={classes.purpleAvatar}>
                            {authenticationService.currentUserValue.name.charAt(0).toUpperCase()}
                        </Avatar>
                    </Button>
                    <Menu
                        id="fade-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        getContentAnchorEl={null}
                        anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                        transformOrigin={{vertical: "top", horizontal: "center"}}
                        open={anchorEl != null}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </div>
            );
        return (
            <Button component={Link} to="/login" variant="contained" color="primary" style={{boxShadow: "none"}}>
                Login
            </Button>
        );
    }

    return (
        <div className={classes.root}>
            <AppBar position="sticky" elevation={0} className={classes.bar}>
                <Link to="/" style={{color: 'inherit', textDecoration: 'inherit'}}>
                    <Toolbar>
                        <img src={hiveImage} className={classes.icon} alt="logo"/>
                        <Typography variant="h6" className={classes.title}>
                            Botwatch
                        </Typography>
                        <RenderLogin loggedIn={authenticationService.currentUserValue != null}/>
                    </Toolbar>
                </Link>
            </AppBar>
        </div>
    );
}