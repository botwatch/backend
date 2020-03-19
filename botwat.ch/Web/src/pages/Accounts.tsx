import {
    Container,
    CssBaseline, Grid, makeStyles
} from "@material-ui/core";
import React, {useEffect} from "react";
import {authenticationService} from "../services/authentication.service";
import {accountService} from "../services/account.service";
import {IClient} from "../data/dto/client/IClient";
import AccountCard from "../components/AccountCard";
import {IOldSchoolAccount} from "../data/dto/account/IOldSchoolAccount";

const useStyles = makeStyles({
    root: {
        paddingTop: 10,
        backgroundColor: '#f5f5f5'
    }
});

export default function Accounts() {
    const classes = useStyles({});
    const [accounts, setAccounts] = React.useState<string | IOldSchoolAccount[]>("NONE");

    useEffect(() => {
        let user = authenticationService.currentUserValue;
        if (user != null) {
            if (user.token != null) {
                authenticationService.login(user.name, user.token).then(user => {
                    accountService.getAccounts().then(a => setAccounts(a));                    
                });
            }
        }
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                {
                    typeof accounts !== "string" ? accounts?.map((acc) => <AccountCard account={acc}/>) :
                        <p>none</p>
                }
            </Grid>
        </div>
    );
}