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
import {Animation, ScatterSeries} from '@devexpress/dx-react-chart';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {Theme} from "@material-ui/core/styles";
import {Skeleton} from "@material-ui/lab";

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

export default function MouseChart({graphData}) {
    const classes = useStyles();
    if (graphData == undefined) return <Skeleton animation="wave" variant="rect" width={'100%'} height={'100%'}/>;
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
                    <ScatterSeries
                        valueField="y"
                        argumentField="x"
                        color={'#b5503b'}
                    />
                    <Title text="Mouse Data"/>
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
