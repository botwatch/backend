import {Avatar, Card, CardActions, CardContent, Grid, IconButton, makeStyles, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import moment from 'moment';
import CreateTicket from "../pages/CreateTicket";
import {Ticket} from "../data/Ticket";
import {Api} from "../utilities/Api";
import TicketList from "./TicketList";

export default function MachineComponent({machine, tickets}) {
    const classes = useStyles();
    const [machineTickets, setMachineTickets] = useState<Ticket[]>([]);

    const ticketAdded = (ticket: Ticket) => setMachineTickets([...machineTickets, ticket]);
    
    useEffect(() => setMachineTickets(tickets), []);

    return <Grid item xs={6} sm={3}>
        <Card className={classes.card}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {machine.company}
                </Typography>
                <Typography variant="h5" component="h2">
                    {machine.machineNumber}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {machine.softwareVersion > 0 ? `Dataserv ${machine.softwareVersion}` : "No Dataserv"}
                </Typography>
                <Typography variant="body2" component="p">
                    {machine.location}
                    <br/>
                    Started:{moment(machine.firstChange).format('MM/DD/YYYY')}
                    <br/>
                    Age:{moment(machine.firstChange).fromNow(true)}
                </Typography>                
            </CardContent>
                <CardActions>
                    <CreateTicket ticketAdded={ticketAdded} machine={machine} key={machine.machineNumber}/>
                    <IconButton aria-label="Add to notes">
                        <NoteAddIcon/>
                    </IconButton>
                </CardActions>
            </div>
            <TicketList tickets={machineTickets}/>
        </Card>
    </Grid>
}

const useStyles = makeStyles({
    card: {
        minWidth: 375,
        display: 'flex',
        flexDirection: 'row',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '0 1 auto',
    },
    title: {
        fontSize: 16,
    },
    pos: {
        marginBottom: 12,
    },
});