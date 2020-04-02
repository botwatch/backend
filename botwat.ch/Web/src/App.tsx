import NavigationBar from "./components/NavigationBar";
import React, {useEffect} from "react";
import {createMuiTheme, CssBaseline, MuiThemeProvider} from "@material-ui/core";
import Login from "./pages/Login";
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {authenticationService} from "./services/authentication.service";
import PrivateRoute from "./components/routing/PrivateRoute";
import AnonymousRoute from "./components/routing/AnonymousRoute";

function App() {
    const [currentUser, setCurrentUser] = React.useState(null);
    const muiTheme = createMuiTheme({
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
        <MuiThemeProvider theme={muiTheme}>
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
