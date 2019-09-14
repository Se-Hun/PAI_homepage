import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Page404 = React.lazy(() => import('./pages/Page404'));
const Page500 = React.lazy(() => import('./pages/Page500'));

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>

class App extends Component {
   
    render() {
        return (
            <Router>
                <React.Suspense fallback={loading()}>
                    <Switch>
                        <Route exact path="/login" name="Login Page" component={Login} />
                        <Route exact path="/page404" name="404 Page" component={Page404} />
                        <Route exact path="/page500" name="500 Page" component={Page500} />
                        <Route exact path="/register" name="Register Page" component={Register} />
                        <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>}/>
                    </Switch>
                </React.Suspense>
            </Router>
        );
    }
}

export default App;