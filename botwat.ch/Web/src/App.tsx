import './App.css';
import NavigationBar from "./components/NavigationBar";
import React from "react";
import {createMuiTheme, CssBaseline, Grid, MuiThemeProvider} from "@material-ui/core";

function App() {

    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });

    return (
        <MuiThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <NavigationBar/>
            <Grid container spacing={2} justify="center">
                <img src={require('./resources/logo.png')} alt="Logo"/>
            </Grid>
        </MuiThemeProvider>
    );

}


export default App;
