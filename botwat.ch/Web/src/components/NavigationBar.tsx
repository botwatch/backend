import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import {purple} from "@material-ui/core/colors";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        bar: {
            background: 'primary'
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
            <AppBar position="fixed" className={classes.bar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Botwatch
                    </Typography>
                    <RenderLogin loggedIn={false}/>
                </Toolbar>
            </AppBar>
        </div>
    );
}