import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MapIcon from '@material-ui/icons/Map';
import HomeIcon from '@material-ui/icons/Home';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import React, {useState} from 'react';
import {
    Switch,
    Route, Link, Redirect
} from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Accounts from "./accounts/Accounts";
import Clients from "./clients/Clients";
import {Divider, useMediaQuery} from "@material-ui/core";
import GameMap from "./map/GameMap";
import Profile from "./dashboard/components/Profile";
import Mouse from "./mouse/Mouse";
import MouseIcon from '@material-ui/icons/Mouse';
import {useTheme} from "@material-ui/styles";

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
            [theme.breakpoints.up('lg')]: {
                marginTop: 64,
                height: 'calc(100% - 64px)'
            }
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
            [theme.breakpoints.up('lg')]: {
                marginLeft: '240px'
            }
        },
        nav: {
            padding: theme.spacing(2),
            marginBottom: theme.spacing(2)
        }
    }),
);

export default function Home({openSidebar, setOpenSidebar, isDesktop}) {
    const classes = useStyles(); 

    return (
        <div>
            <Drawer
                open={openSidebar}
                onClose={() => setOpenSidebar(false)}
                anchor="left"
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
                        <ListItem button key="Map" component={Link} to="/map" disableGutters>
                            <ListItemIcon>{<MapIcon/>}</ListItemIcon>
                            <ListItemText primary="Map"/>
                        </ListItem>
                        <ListItem button key="Mouse" component={Link} to="/mouse" disableGutters>
                            <ListItemIcon>{<MouseIcon/>}</ListItemIcon>
                            <ListItemText primary="Mouse"/>
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
                    <Redirect from="/" exact to="/dashboard"/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/map" component={GameMap}/>
                    <Route path="/mouse" component={Mouse}/>
                    <Route path="/accounts" component={Accounts}/>
                    <Route path="/clients" component={Clients}/>
                </Switch>
            </main>
        </div>
    );
}