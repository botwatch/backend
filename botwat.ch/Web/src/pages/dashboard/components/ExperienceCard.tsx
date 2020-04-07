import {Avatar, Card, CardContent, Grid, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import React from "react";


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

export default function ExperienceCard({expCount}) {
    const classes = useStyles();

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
                            Experience
                        </Typography>
                        <Typography variant="h3">{(expCount / 1000).toFixed(2)}K</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <FilterHdrIcon className={classes.icon}/>
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
                            {(expCount / 7000).toFixed(2)}K / day
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