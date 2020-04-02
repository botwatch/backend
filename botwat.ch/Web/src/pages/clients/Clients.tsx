import {
    Container,
    CssBaseline, Grid, makeStyles
} from "@material-ui/core";
import React, {useEffect} from "react";
import {IClient} from "../../data/dto/IClient";
import {authenticationService} from "../../services/authentication.service";
import {accountService} from "../../services/account.service";
import ClientCard from "./components/ClientCard";


const useStyles = makeStyles({
    root: {
        paddingTop: 10,
        backgroundColor: '#f5f5f5'
    }
});

export default function Clients() {
    const classes = useStyles({});
    const [clients, setClients] = React.useState<string | IClient[]>("NONE");

    useEffect(() => {
        let user = authenticationService.currentUserValue;
        if (user != null) {
            if (user.token != null) {
                authenticationService.login(user.name, user.token).then(user => {
                    accountService.getClients().then(a => setClients(a));
                });
            }
        }
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                {
                    typeof clients !== "string" ? clients?.map((client) => <ClientCard client={client}/>) :
                        <p>none</p>
                }
            </Grid>
        </div>
    );
}