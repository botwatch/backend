import {Avatar, Card, CardContent, Grid, Icon, SvgIcon, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Skeleton} from "@material-ui/lab";
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import React, {Component} from "react";
import humanFormat from 'human-format';
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

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
    avgIcon: {
        color: theme.palette.primary.light
    },
    avgValue: {
        color: theme.palette.primary.light,
        marginRight: theme.spacing(1)
    },
    caption: {
        alignItems: 'center'
    },
    difference: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1),
        display: 'flex',
        alignItems: 'center'
    },
    differenceIconUp: {
        color: theme.palette.success.dark
    },
    differenceIconDown: {
        color: theme.palette.error.dark
    }
}));

class MaterialIcon extends Component<{ icon: string, className: string }> {
    render() {
        let {icon, className} = this.props;
        let iconName = icon.replace(/Icon$/, '');
        let resolved = require(`@material-ui/icons/${iconName}`).default;

        if (!resolved) {
            throw Error(`Could not find @material-ui/icons/${iconName}`)
        }

        return React.createElement(resolved, {className: `${className}`});
    }
}

export default function StatisticCard({statistic, previous, title, iconName}) {
    const classes = useStyles();
    if (statistic == undefined) return <Skeleton animation="wave" variant="rect" width={'100%'} height={186}/>;
    let change = ((statistic - previous) / previous) * 100;
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
                            {title}
                        </Typography>
                        <Typography variant="h3">{humanFormat(statistic, {decimals: 1, separator: ''})}</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <MaterialIcon icon={iconName} className={classes.icon}/>
                        </Avatar>
                    </Grid>
                </Grid>
                <Grid
                    container
                    className={classes.difference}
                    justify="space-between"
                >
                    <Grid item>
                        <DateRangeRoundedIcon className={classes.avgIcon}/>
                        <Typography
                            className={classes.avgValue}
                            variant="body2"
                        >
                            {humanFormat(statistic / 7, {decimals: 1, separator: ''})} / day
                        </Typography>
                    </Grid>
                    <Grid item>
                        <div className={classes.difference}>
                            {
                                change >= 0 ? <ArrowUpwardIcon className={classes.differenceIconUp}/> :
                                    <ArrowDownwardIcon className={classes.differenceIconDown}/>
                            }
                            <Typography
                                className={change >= 0 ? classes.differenceIconUp : classes.differenceIconDown}
                                variant="body2"
                            >
                                {change.toFixed(2)}%
                            </Typography>
                        </div>
                        <Typography className={classes.caption} variant="caption">
                            Since last week
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}