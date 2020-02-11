import React from "react";
import MachineComponent from "../components/MachineComponent";
import {Grid, makeStyles} from "@material-ui/core";
import {Ticket} from "../data/Ticket";

export default function MachineGrid({machines, tickets}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {machines.splice(0, 16).map(machine => {
                    let filteredTickets = tickets.filter((ticket: Ticket) => ticket.machineId == machine.machineNumber);
                    return <MachineComponent key={machine.machineNumber} machine={machine} tickets = {filteredTickets}/>
                })}
            </Grid>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        paddingTop: 90,
        backgroundColor: '#f5f5f5'
    }
});