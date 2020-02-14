import './App.css';
import NavigationBar from "./components/NavigationBar";
import React from "react";
import {createMuiTheme, CssBaseline, Grid, MuiThemeProvider} from "@material-ui/core";
import Login from "./pages/Login";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Register from "./pages/Register";


function App() {

    const darkTheme = createMuiTheme({
        palette: {
            type: 'light',
            primary: {
                main: '#3F51B5',
            },
            secondary: {
                main: '#3F51B5',
            }
        }
    });

    return (
        <MuiThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <NavigationBar/>
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                </Switch>
            </Router>
        </MuiThemeProvider>
    );

}


export default App;
