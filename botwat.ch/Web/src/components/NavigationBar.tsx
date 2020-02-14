import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import {purple} from "@material-ui/core/colors";
import hiveImage from '../resources/hive.png';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        icon: {
            marginRight: theme.spacing(1),
        },
        bar: {
            backgroundColor: theme.palette.primary.main,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        purpleAvatar: {
            color: '#fff',
            backgroundColor: purple[500],
        },
        title: {
            flexGrow: 1,
        },
    }));


export default function NavigationBar() {
    const classes = useStyles({});

    function RenderLogin({loggedIn}) {
        if (loggedIn)
            return (
                <Avatar className={classes.purpleAvatar}>
                    A
                </Avatar>
            );
        return (
            <Button color="inherit">
                Login
            </Button>
        );
    }

    return (
        <div className={classes.root}>
            <AppBar position="sticky" elevation={0} className={classes.bar}>
                <Toolbar>
                    <img src={hiveImage} alt="logo"/>
                    <Typography variant="h6" className={classes.title}>
                        Botwatch
                    </Typography>
                    <RenderLogin loggedIn={false}/>
                </Toolbar>
            </AppBar>
        </div>
    );
}