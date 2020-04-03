import {Avatar, Card, CardContent, Grid, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import React, {useEffect} from "react";
import {ISession} from "../../../data/dto/ISession";
import moment from "moment";
import groupArray from "group-array";
import {IExperience} from "../../../data/dto/IExperience";
import {IInteraction} from "../../../data/dto/IInteraction";
import {Skeleton} from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        fontWeight: 700
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        height: 56,
        width: 56
    },
    icon: {
        height: 32,
        width: 32
    },
    difference: {
        marginTop: theme.spacing(2),
        display: 'flex',
        alignItems: 'center'
    },
    differenceIcon: {
        color: theme.palette.primary.light
    },
    differenceValue: {
        color: theme.palette.primary.light,
        marginRight: theme.spacing(1)
    }
}));

export default function ActionsCard({sessions}) {
    const classes = useStyles();

    let localSessions = sessions as ISession[];
    if (localSessions.length == 0) return <Skeleton animation="wave" variant="rect" width={'100%'} height={185}/>;

    let weeklySessions = localSessions.filter(session => moment(session.start).isAfter(
        moment().endOf('day').subtract(1, 'week')
    ));

    let actions: IInteraction[] = weeklySessions.flatMap(session => session.actions);

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid
                    container
                    justify="space-between"
                >
                    <Grid item>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            Actions
                        </Typography>
                        <Typography variant="h3">{(actions.length / 1000).toFixed(2)}K</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <DirectionsRunIcon className={classes.icon}/>
                        </Avatar>
                    </Grid>
                </Grid>
                <Grid
                    container
                    className={classes.difference}
                    justify="space-between"
                >
                    <Grid item>
                        <DateRangeRoundedIcon className={classes.differenceIcon}/>
                        <Typography
                            className={classes.differenceValue}
                            variant="body2"
                        >
                            {(actions.length / 7000).toFixed(2)}K / day
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption">
                            This week
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}