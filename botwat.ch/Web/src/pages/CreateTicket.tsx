import {
    Button,
    CardActions,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField
} from "@material-ui/core";
import BugReportIcon from '@material-ui/icons/BugReport';
import React from "react";
import {Ticket} from "../data/Ticket";

export default function CreateTicket({ticketAdded, machine}) {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [desc, setDesc] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTitle("");
        setDesc("");
    };

    async function handleSubmit() {
        let ticket: Ticket = {
            id: 0,
            machineId: machine.machineNumber,
            user: "TODO",
            title: title,
            description: desc,
            open: true,
            started: new Date(),
            comments: null
        };
        await fetch('ticket', {
            method: 'post',
            body: JSON.stringify(ticket),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(ticketAdded(ticket));
        handleClose();
    }

    return (
        <div>
            <IconButton aria-label="Create a ticket" onClick={handleClickOpen}>
                <BugReportIcon/>
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Ticket</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Now creating a ticket for {machine.machineNumber}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        value={title}
                        onChange={(event: any) => setTitle(event.target.value)}
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        value={desc}
                        onChange={(event: any) => setDesc(event.target.value)}
                        margin="dense"
                        id="desc"
                        label="Description"
                        multiline
                        placeholder="Description"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleSubmit}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}