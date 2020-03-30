import {
    Container,
    CssBaseline, Grid, makeStyles
} from "@material-ui/core";
import React, {useEffect} from "react";
import {authenticationService} from "../services/authentication.service";
import {accountService} from "../services/account.service";
import {ISession} from "../data/dto/session/ISession";
import SessionCard from "../components/SessionCard";

const useStyles = makeStyles({
    root: {
        paddingTop: 10,
        backgroundColor: '#f5f5f5'
    }
});

export default function Sessions() {
    const classes = useStyles({});
    const [sessions, setSessions] = React.useState<string | ISession[]>("NONE");

    useEffect(() => {
        (async function anyNameFunction() {
            let user = authenticationService.currentUserValue;
            if (user != null) {
                if (user.token != null) {
                    if (await authenticationService.login(user.name, user.token) != null) {
                        let localSessions: ISession[] = await accountService.getSessions();
                        let ids = localSessions.flatMap((s) => s.id);
                        
                        let localInteractions = await accountService.getInteractions(ids);
                        if (typeof localInteractions !== "string") {
                            localInteractions.forEach(act => {
                                let id = act[0].id;
                                let session = localSessions.find(sess => sess.id == id);
                                if (session != undefined)
                                    session.actions = act;
                            });
                        }

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
                }
            }
        })()
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                {
                    typeof sessions !== "string" ?
                        sessions?.map((session) => <SessionCard session={session}/>)
                        : <p>none</p>
                }
            </Grid>
        </div>
    );
}