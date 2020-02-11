import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import {purple} from "@material-ui/core/colors";
import AutoComplete from '@material-ui/lab/Autocomplete';
import {TextField} from "@material-ui/core";
import App from '../App';
import {Machine} from "../data/Machine";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        bar: {
            background: '#2F87F6',
            border: 0,
            borderRadius: 0,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        autoField: {
            color: '#000',
            width: 300,
            borderRadius: 2,
            backgroundColor: '#f5f5f5',
        },
        autoComplete: {
            borderRadius: 2,
        },
        purpleAvatar: {
            color: '#fff',
            backgroundColor: purple[500],
        },
        title: {
            flexGrow: 1,
        },
    }));


export default function NavigationBar({filter, machines}) {
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
                        Tack
                    </Typography>
                    <AutoComplete
                        id="free-solo-demo"
                        freeSolo         
                        className={classes.autoComplete}
                        onInputChange={filter}
                        options={machines.map(machine => machine.machineNumber)}
                        renderInput={params => <TextField {...params} className={classes.autoField}
                                                          label="Machine Number" margin="normal" variant="outlined"
                                                          fullWidth/>}/>                    
                    <RenderLogin loggedIn={false}/>
                </Toolbar>
            </AppBar>
        </div>
    );
}