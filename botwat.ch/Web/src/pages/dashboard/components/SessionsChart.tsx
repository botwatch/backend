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
    ValueAxis, LineSeries, Legend,
} from '@devexpress/dx-react-chart-material-ui';
import {Animation, Stack} from '@devexpress/dx-react-chart';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {Theme} from "@material-ui/core/styles";
import {Skeleton} from "@material-ui/lab";
import {IDashboard, IGraph} from "../../../data/dto/IDashboard";
import moment from "moment";

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

export default function SessionsChart({graphData, previousData}) {
    const classes = useStyles();
    if (graphData == undefined) return <Skeleton animation="wave" variant="rect" width={'100%'} height={400}/>;
    (graphData as IGraph[])?.forEach(graph => {
        graph.dateString = `${moment().dayOfYear(graph.date - 7).format('M-D')} / ${moment().dayOfYear(graph.date).format('M-D')}`
    });
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
                <Chart data={graphData}>
                    <ArgumentAxis/>
                    <ValueAxis/>
                    <BarSeries
                        name="Last week"
                        valueField="previousCount"
                        argumentField="dateString"
                        color={'#ff9827'}
                    />
                    <BarSeries
                        name="This week"
                        valueField="count"
                        argumentField="dateString"
                        color={'#3F51B5'}
                    />
                    <Stack/>
                    <Legend position="top"/>
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
