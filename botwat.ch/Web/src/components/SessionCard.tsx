import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid} from "@material-ui/core";
import moment from 'moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {IInteraction} from "../data/dto/interaction/IInteraction";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginLeft: 12,
            width: 375,
        },
        expander: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
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
    }),
);

export default function SessionCard({session}) {
    const classes = useStyles();
    return (
        <Grid item xs={6} sm={3}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {moment(session.start).format('HH:mm:ss - MM/DD/YYYY')}
                    </Typography>
                    <div className={classes.expander}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>Actions</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                {session.actions?.map((action:IInteraction) => <Typography>Mouse: {action.mouseX},{action.mouseY}</Typography>) }
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography className={classes.heading}>Experience</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    0 Experience gained, hmm maybe this should be implemented.
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                    <Typography className={classes.pos} color="textSecondary">
                        {session.actions ==null ? 0 : session.actions.length} actions in session
                    </Typography>
                    <Typography variant="body2" component="p">
                        Account: {session.account?.alias}
                    </Typography>
                </CardContent>         
            </Card>
        </Grid>
    );
}