import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import React from 'react';
import {
    Switch,
    Route, Link, Redirect
} from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Accounts from "./accounts/Accounts";
import Clients from "./clients/Clients";
import {Divider, useMediaQuery} from "@material-ui/core";
import {useTheme} from "@material-ui/styles";
import Profile from "./dashboard/components/Profile";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        top: {
            marginTop: '60px'
        },
        root: {
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            marginTop: '60px',
            padding: theme.spacing(2)
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        divider: {
            margin: theme.spacing(2, 0)
        },
        content: {
            flexGrow: 1,
            marginTop: '60px',
            marginLeft: '240px'
        },
        nav: {
            padding: theme.spacing(2),
            marginBottom: theme.spacing(2)
        }
    }),
);

export default function ClippedDrawer() {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:780px)');

    return (
        <div>
            <Drawer
                className={classes.drawer}
                variant={isDesktop ? "permanent" : "temporary"}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.root}>
                    <Profile/>
                    <Divider className={classes.divider}/>
                    <div/>
                    <List className={classes.nav}>
                        <ListItem button key="Dashboard" component={Link} to="/dashboard" disableGutters>
                            <ListItemIcon>{<HomeIcon/>}</ListItemIcon>
                            <ListItemText primary="Dashboard"/>
                        </ListItem>
                        <ListItem button key="Accounts" component={Link} to="/accounts" disableGutters>
                            <ListItemIcon>{<AccountCircleIcon/>}</ListItemIcon>
                            <ListItemText primary="Accounts"/>
                        </ListItem>
                        <ListItem button key="Clients" component={Link} to="/clients" disableGutters>
                            <ListItemIcon>{<EqualizerIcon/>}</ListItemIcon>
                            <ListItemText primary="Clients"/>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Switch>
                    <Redirect from="/" exact to="/dashboard" />
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/accounts" component={Accounts}/>
                    <Route path="/clients" component={Clients}/>
                </Switch>
            </main>
        </div>
    );
}