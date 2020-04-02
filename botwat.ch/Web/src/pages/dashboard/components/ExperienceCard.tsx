import {Avatar, Card, CardContent, Grid, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import MoneyIcon from "@material-ui/icons/Money";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
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
        backgroundColor: theme.palette.error.main,
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
        color: theme.palette.error.dark
    },
    differenceValue: {
        color: theme.palette.error.dark,
        marginRight: theme.spacing(1)
    }
}));

export default function ExperienceCard() {
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
                        <Typography variant="h3">390K</Typography>
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <MoneyIcon className={classes.icon}/>
                        </Avatar>
                    </Grid>
                </Grid>
                <div className={classes.difference}>
                    <ArrowDownwardIcon className={classes.differenceIcon}/>
                    <Typography
                        className={classes.differenceValue}
                        variant="body2"
                    >
                        12%
                    </Typography>
                    <Typography variant="caption">
                        Since last month
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}