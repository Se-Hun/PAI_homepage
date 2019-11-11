import React, {Component, Suspense} from 'react';
import {
    Container
} from 'reactstrap';
import {Redirect, Route, Switch} from 'react-router-dom';
// import * as router from 'react-router-dom';

import {
    AppHeader,
    AppFooter
} from '@coreui/react';

import routes from '../routes';

// import Header from "../components/Header";
// import Footer from "../components/Footer";

const Header = React.lazy(() => import('../components/Layout/Header'));
const Footer = React.lazy(() => import('../components/Layout/Footer'));

class DefaultLayout extends Component {

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {
        return(
            <div className="app">
                <AppHeader fixed>
                    <Suspense fallback={this.loading()}>
                        <Header/>
                    </Suspense>
                </AppHeader>
                <hr style={{marginBottom: "20px"}}/>
                <main className="main" style={{marginLeft: "10%", marginRight: "10%"}}>
                    <Container fluid>
                        <Suspense fallback={this.loading()}>
                            <Switch>
                                {routes.map((route, idx) => {
                                    // console.log(route)
                                    return route.component ? (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={props => (
                                                <route.component {...props} page={route.page}/>
                                            )}/>
                                    ) : (null);
                                })}
                                <Redirect from="/" to="/home"/>
                            </Switch>
                        </Suspense>
                    </Container>
                </main>
                <AppFooter>
                    <Suspense fallback={this.loading()}>
                        <Footer/>
                    </Suspense>
                </AppFooter>
            </div>
        )
    }
}

export default DefaultLayout