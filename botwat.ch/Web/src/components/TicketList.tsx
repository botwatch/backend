import {Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {Ticket} from "../data/Ticket";
import {red} from "@material-ui/core/colors";

export default function TicketList({tickets}) {
    const classes = useStyles();

    return <List className={classes.root}>
        {tickets.map(ticket => {
            return <div>
                <ListItem alignItems="flex-start" className={classes.list}>
                    <ListItemAvatar>
                        <Avatar className={classes.redAvatar}>{tickets.indexOf(ticket) + 1}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={ticket.title}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {ticket.user}-
                                </Typography>
                                {ticket.description}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li"/>
            </div>
        })}
    </List>;
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        maxHeight: 150,
        overflow: 'auto',
    },
    inline: {
        display: 'inline'    },
    list: {
        backgroundColor: "#f4f4f4",
        
    },
    redAvatar: {
        backgroundColor: red[500]
    },
});