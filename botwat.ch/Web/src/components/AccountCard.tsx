import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        marginLeft: 12,
        width: 375,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function AccountCard({account}) {
    const classes = useStyles();
    return (
        <Grid item xs={6} sm={3}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {account.alias}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {                            
                            isNaN(account.banTime) ? "Not Banned" : "Banned at" + account.banTime.getUTCMilliseconds()
                        }
                    </Typography>
                    <Typography variant="body2" component="p">
                        Session Count: N/A
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">{account?.authors?.join(", ")}</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}