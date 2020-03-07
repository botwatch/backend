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
import {IClient} from "../data/dto/client/IClient";

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

export default function Clients() {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [authors, setAuthors] = React.useState<string>("");
    
    const [error, setError] = React.useState<null | string>(null);
    const classes = useStyles();
    
    const [clients, setClients] = React.useState<string | IClient[]>("NONE");

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setError(null);
    };

    useEffect(() => {
        ValidatorForm.addValidationRule('isPassword', value => value.length > 6);
        accountService.getClients().then(a => setClients(a));
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
        let response = await accountService.createClient(name, description, url, authors);
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
                    Create Client
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
                        value={name}
                        onChange={(event: any) => setName(event.target.value)}
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={description}
                        onChange={(event: any) => setDescription(event.target.value)}
                        id="desc"
                        label="Description"
                        name="desc"
                        autoComplete="desc"
                        autoFocus
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={url}
                        onChange={(event: any) => setUrl(event.target.value)}
                        id="url"
                        label="url"
                        name="url"
                        autoComplete="url"
                        autoFocus
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={authors}
                        onChange={(event: any) => setAuthors(event.target.value)}
                        id="authors"
                        label="authors"
                        name="authors"
                        autoComplete="authors"
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
                        Create Client
                    </Button>
                </ValidatorForm>
            </div>
            {
                typeof clients !== "string" ? clients?.map((client) => <p>{client.name}</p>) : <p>none</p>
            }
        </Container>
    );
}