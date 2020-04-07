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
import ActionsCard from "./components/ActionsCard";
import moment from "moment";
import {IDashboard} from "../../data/dto/IDashboard";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(4)
    },
}));


export default function Dashboard() {
    const classes = useStyles();
    const [data, setData] = React.useState<IDashboard>();

    useEffect(() => {
        (async function fun() {
            let user = authenticationService.currentUserValue;
            if (user != null) {
                if (user.token != null) {
                    if (await authenticationService.login(user.name, user.token) != null) {
                        let localData: any = await accountService.getDashboard(moment().subtract(7, 'days').toDate(), 7);
                        if (typeof localData !== "string") {
                            setData(localData as IDashboard);
                        }
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
                    <ExperienceCard expCount={data?.totalExp}/>
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <ActionsCard actionCount={data?.totalActions}/>
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={12}
                    xl={9}
                    xs={12}
                >
                    <SessionsChart graphData={data?.graph}/>
                </Grid>
            </Grid>
        </div>
    );
}