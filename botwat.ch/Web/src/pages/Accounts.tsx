import {
    Avatar, Button,
    Checkbox, Container,
    CssBaseline, FormControlLabel,
    Grid, Snackbar, TextField,
    Typography
} from "@material-ui/core";
import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {authenticationService} from "../services/authentication.service";
import {currentHistory} from "../services/CurrentHistory";
import {Alert} from "@material-ui/lab";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {accountService} from "../services/account.service";
import {IOldSchoolAccount} from "../data/dto/account/IOldSchoolAccount";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(15),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        avatar: {
            margin: theme.spacing(1),
            color: theme.palette.secondary.contrastText,
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

export default function Accounts() {
    const [alias, setAlias] = React.useState("");
    const [error, setError] = React.useState<null | string>(null);
    const classes = useStyles();
    const [accounts, setAccounts] = React.useState<string | IOldSchoolAccount[]>("NONE");

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setError(null);
    };

    useEffect(() => {
        ValidatorForm.addValidationRule('isPassword', value => value.length > 6);
        accountService.getAccounts().then(a => setAccounts(a));
        let user = authenticationService.currentUserValue;
        if (user != null) {
            if (user.token != null) {
                authenticationService.login(user.name, user.token).then(user => {
                    currentHistory.push('/');
                });
            }
        }
    }, []);

    async function handleSubmit() {
        let response = await accountService.createAccount(alias);
        if (typeof response === "string") setError(response as string);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Snackbar open={error != null} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create Account
                </Typography>
                <ValidatorForm
                    className={classes.form}
                    onSubmit={handleSubmit}
                    onError={errors => console.log(errors)}
                >
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={alias}
                        onChange={(event: any) => setAlias(event.target.value)}
                        id="user"
                        label="Username"
                        name="user"
                        autoComplete="user"
                        autoFocus
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create Account
                    </Button>
                </ValidatorForm>
            </div>
            {
                typeof accounts !== "string" ? accounts?.map((acc) => <p>{acc.alias}</p>) : <p>none</p>
            }
        </Container>
    );
}