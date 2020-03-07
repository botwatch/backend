import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {FaDiscord} from "react-icons/fa";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {authenticationService} from "../services/authentication.service";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

export default function Register() {
    const [email, setEmail] = React.useState("");
    const [user, setUser] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState<null | string>(null);

    async function handleSubmit() {
        let response = await authenticationService.create(user, email, password);
        if (typeof response === "string") setError(response as string);
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPassword', value => value.length > 6)
    }, []);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setError(null);
    };
    const classes = useStyles();
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
                    Sign up
                </Typography>
                <ValidatorForm
                    className={classes.form}
                    onSubmit={handleSubmit}
                    onError={errors => console.log(errors)}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextValidator
                                variant="outlined"
                                required
                                onChange={(event: any) => setUser(event.target.value)}
                                fullWidth
                                id="user"
                                label="Username"
                                name="user"
                                autoComplete="user"
                                value={user}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                variant="outlined"
                                required
                                onChange={(event: any) => setEmail(event.target.value)}
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                variant="outlined"
                                required
                                onChange={(event: any) => setPassword(event.target.value)}
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                validators={['required', 'isPassword']}
                                errorMessages={['this field is required', 'Password must be at least 7 characters']}
                            />
                        </Grid>
                    {/*    <Grid item xs={12}>
                            <a href={"https://discordapp.com/api/oauth2/authorize?client_id=683318843434991617&redirect_uri=https%3A%2F%2Flocalhost%2Fsignin-discord&response_type=code&scope=identify%20email%20guilds"}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="secondary">
                                    <FaDiscord/>
                                    Register with Discord
                                </Button>
                            </a>
                        </Grid>*/}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" to="login">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </div>
        </Container>
    );
}
