import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TimelineIcon from '@material-ui/icons/Timeline';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import React from 'react';
import {
    Switch,
    Route, Link
} from "react-router-dom";
import Accounts from "./Accounts";
import Sessions from "./Sessions";
import Clients from "./Clients";
import { MenuItem } from 'material-ui';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        toolbar: theme.mixins.toolbar,
    }),
);

export default function ClippedDrawer() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar}/>
                <List>
                    <ListItem button key="Accounts" component={Link} to="/accounts" >
                        <ListItemIcon>{<AccountCircleIcon/>}</ListItemIcon>
                        <ListItemText primary="Accounts"/>
                    </ListItem>
                    <ListItem button key="Sessions" component={Link} to="/sessions">
                        <ListItemIcon>{<TimelineIcon/>}</ListItemIcon>
                        <ListItemText primary="Sessions"/>
                    </ListItem>
                    <ListItem button key="Clients" component={Link} to="/clients">
                        <ListItemIcon>{<EqualizerIcon/>}</ListItemIcon>
                        <ListItemText primary="Clients"/>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Switch>
                    <Route path="/accounts" exact component={Accounts}/>
                    <Route path="/sessions" component={Sessions}/>
                    <Route path="/clients" component={Clients}/>
                </Switch>
            </main>
        </div>
    );
}