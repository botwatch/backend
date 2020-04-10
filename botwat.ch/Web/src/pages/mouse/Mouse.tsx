import {
    Grid, makeStyles, Theme
} from "@material-ui/core";
import React, {useEffect} from "react";
import {authenticationService} from "../../services/authentication.service";
import {accountService} from "../../services/account.service";
import moment from "moment";
import MouseChart from "./components/MouseChart";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(4)
    },
}));

export interface IMouseData {
    x: number,
    y: number,
    time: Date
}

export default function Mouse() {
    const classes = useStyles();
    const [data, setData] = React.useState<IMouseData[]>();

    useEffect(() => {
        (async function fun() {
            let user = authenticationService.currentUserValue;
            if (user != null) {
                if (user.token != null) {
                    if (await authenticationService.login(user.name, user.token) != null) {
                        let localData: any = await accountService.getMouse(moment().subtract(7, 'days').toDate(), 7);
                        if (typeof localData !== "string") {
                            setData(localData as IMouseData[]);
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
                    lg={8}
                    md={12}
                    xl={9}
                    xs={12}
                >
                    <MouseChart graphData={data}/>
                </Grid>
            </Grid>
        </div>
    );
}