import './App.css';
import NavigationBar from "./components/NavigationBar";
import React, {useEffect} from "react";
import {createMuiTheme, CssBaseline, Grid, MuiThemeProvider} from "@material-ui/core";
import Login from "./pages/Login";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import AnonymousRoute from "./components/AnonymousRoute";
import Home from "./components/Home";
import {authenticationService} from "./services/authentication.service";


function App() {
    const [currentUser, setCurrentUser] = React.useState(null);
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
    
    useEffect(() => {
        authenticationService.currentUser.subscribe(x => setCurrentUser(x));
    }, []);

    return (
        <MuiThemeProvider theme={darkTheme}>
            <Router>
            <CssBaseline/>
            <NavigationBar/>           
                <Switch>
                    <AnonymousRoute path="/login" component={Login}/>
                    <AnonymousRoute path="/register" component={Register}/>
                    <PrivateRoute path="/" component={Home}/>
                </Switch>
            </Router>
        </MuiThemeProvider>
    );

}


export default App;
