import {
    Card,
    Container,
    CssBaseline, Grid, makeStyles, Paper, Theme
} from "@material-ui/core";
import React, {useEffect} from "react";
import {authenticationService} from "../../services/authentication.service";
import {accountService} from "../../services/account.service";
import {ISession} from "../../data/dto/ISession";
import SessionsChart from "./components/SessionsChart";
import ExperienceCard from "./components/ExperienceCard";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(4)
    },
}));


export default function Dashboard() {
    const classes = useStyles();
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
        <div className={classes.root}>
            <Grid
                container
                spacing={4}
            >
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <ExperienceCard/>
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <ExperienceCard/>
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <ExperienceCard/>
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <ExperienceCard/>
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={12}
                    xl={9}
                    xs={12}
                >
                    <SessionsChart sessions={sessions}/>
                </Grid>
            </Grid>
        </div>
    );
}