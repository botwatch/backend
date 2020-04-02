import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Button
} from '@material-ui/core';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import {Animation} from '@devexpress/dx-react-chart';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import moment from "moment";
import {Theme} from "@material-ui/core/styles";
import {Skeleton} from "@material-ui/lab";
import {ISession} from "../../../data/dto/ISession";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%'
    },
    chartContainer: {
        height: 400
    },
    actions: {
        justifyContent: 'flex-end'
    }
}));

interface Count {
    date: string,
    count: number
}


export default function SessionsChart({sessions}) {
    const classes = useStyles();

    let count: Count[] = [];
    for (let i = 0; i < 7; i++) count.push({date: "", count: 0} as Count);
    let localSessions = sessions as ISession[];
    let weeklySessions = localSessions.filter(session => moment(session.start).isBetween(
        moment().startOf('day').subtract(1, 'week'), moment()
    ));
    if (weeklySessions.length == 0) return <Skeleton animation="wave" variant="rect" width={'100%'} height={400}/>;

    weeklySessions.forEach(session => {
        for (let i = 0; i < 7; i++) {
            let day = moment().subtract(i, 'days');
            let index = 6 - i;
            count[index].date = i == 0 ? "Today" : moment().subtract(i, 'days').format('dddd');
            if (moment(session.start).isSame(day, 'day')) {
                count[index].count++;
            }
        }
    });


    console.info(count);
    return (
        <Card className={classes.root}>
            <CardHeader
                action={
                    <Button
                        size="small"
                        variant="text"
                    >
                        Last 7 days <ArrowDropDownIcon/>
                    </Button>
                }
                title="This Week"
            />
            <Divider/>
            <CardContent>
                <Chart data={count}>
                    <ArgumentAxis/>
                    <ValueAxis/>
                    <BarSeries
                        valueField="count"
                        argumentField="date"
                        color={'#3F51B5'}
                    />
                    <Title text="Sessions run"/>
                    <Animation/>
                </Chart>
            </CardContent>
            <Divider/>
            <CardActions className={classes.actions}>
                <Button
                    color="primary"
                    size="small"
                    variant="text"
                >
                    Overview <ArrowRightIcon/>
                </Button>
            </CardActions>
        </Card>
    );
};
