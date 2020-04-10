import {
    Grid, makeStyles, Theme
} from "@material-ui/core";
import React, {useEffect} from "react";
import {authenticationService} from "../../services/authentication.service";
import {accountService} from "../../services/account.service";
import SessionsChart from "./components/SessionsChart";
import moment from "moment";
import {IDashboard} from "../../data/dto/IDashboard";
import StatisticCard from "./components/StatisticCard";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(4)
    },
}));


export default function Dashboard() {
    const classes = useStyles();
    const [data, setData] = React.useState<IDashboard>();
    const [previousData, setPreviousData] = React.useState<IDashboard>();
    useEffect(() => {
        (async function fun() {
            let user = authenticationService.currentUserValue;
            if (user != null) {
                if (user.token != null) {
                    //this 'timeframe
                    if (await authenticationService.login(user.name, user.token) != null) {
                        let localData: any = await accountService.getDashboard(moment().subtract(7, 'days').toDate(), 7);
                        if (typeof localData === "string") return "";
                        localData = localData as IDashboard;
                        //last timeframe
                        let localPreviousData: any = await accountService.getDashboard(moment().subtract(14, 'days').toDate(), 7);
                        if (typeof localPreviousData !== "string") {
                            setPreviousData(localPreviousData as IDashboard);
                            //fill into other variable because graphing libs...
                            let temp = localPreviousData as IDashboard;
                            for (let i = 0; i < localData.graph.length; i++) {
                                localData.graph[i].previousCount = temp.graph[i].count;
                            }
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
                    <StatisticCard statistic={data?.totalExp}
                                   previous={previousData == undefined ? undefined : previousData.totalExp}
                                   title='Experience'
                                   iconName='TrendingUp'/>
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <StatisticCard statistic={data?.totalActions}
                                   previous={previousData == undefined ? undefined : previousData.totalActions}
                                   title='Actions'
                                   iconName='Explore'/>
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <StatisticCard statistic={data == undefined ? undefined : data.totalTime / 60}
                                   previous={previousData == undefined ? undefined : previousData.totalTime / 60}
                                   title='Hours'
                                   iconName='AccessTime'/>
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={12}
                    xl={9}
                    xs={12}
                >
                    <SessionsChart graphData={data?.graph} previousData={previousData}/>
                </Grid>
            </Grid>
        </div>
    );
}