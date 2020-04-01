import {
    Container,
    CssBaseline, Grid, makeStyles, Paper
} from "@material-ui/core";
import React, {useEffect} from "react";
import {authenticationService} from "../services/authentication.service";
import {accountService} from "../services/account.service";
import {ISession} from "../data/dto/session/ISession";
import SessionCard from "../components/SessionCard";
import SessionsChart from "../components/SessionsChart";

const useStyles = makeStyles({
    root: {
        width: '100%',
        paddingTop: 10,
        backgroundColor: '#f5f5f5'
    }
});

export default function Sessions() {
    const classes = useStyles({});
    const [sessions, setSessions] = React.useState<ISession[]>([]);

    useEffect(() => {
        (async function anyNameFunction() {
            let user = authenticationService.currentUserValue;
            if (user != null) {
                if (user.token != null) {
                    if (await authenticationService.login(user.name, user.token) != null) {
                        let localSessions: any = await accountService.getSessions();
                        setSessions(localSessions);
                        /* if (typeof localSessions !== "string") {
                             let ids = localSessions.flatMap((s) => s.id);
 
                             let localInteractions = await accountService.getInteractions(ids);
                             if (typeof localInteractions !== "string") {
                                 localInteractions.forEach(act => {
                                     let id = act[0].id;
                                     let session = localSessions.find(sess => sess.id == id);
                                     if (session != undefined)
                                         session.actions = act;
                                 });
 
                                 let localexperiences = await accountService.getExperiences(ids);
                                 if (typeof localexperiences !== "string") {
                                     localexperiences.forEach(exp => {
                                         let id = exp[0].id;
                                         let session = localSessions.find(sess => sess.id == id);
                                         if (session != undefined)
                                             session.experiences = exp;
                                     });
                                 }
                                 setSessions(localSessions);
                             }
                         }*/
                    }
                }
            }
        })()
    }, []);

    return (
        <Paper className={classes.root}>
            <Grid container spacing={6}>
                <SessionsChart sessions={sessions}/>
            </Grid>
        </Paper>
    );
}