
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';

import Home from "./routes/Home";
import About from "./routes/About";
import Notice from "./routes/Notice";
import FreeBoard from "./routes/FreeBoard";
import Info from "./routes/Info";
import Library from "./routes/Library";
import Gallery from "./routes/Gallery";
import Calendar from "./routes/Calendar";
import Login from "./routes/Login";





const DefaultLayout = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <div className="DefaultLayout">
                <div className="Header">
                    <Header/>
                </div>
                <Component {...matchProps} />
                <div className="Footer">
                    <Footer/>
                </div>
            </div>
        )} />
    )
};





class App extends Component {

   
    render() {
        return (
            <Router>
                <div>
                 
                    <div>
                        <Switch>


                            <DefaultLayout exact path="/" component={Home} />
                            <DefaultLayout path="/about" component={About} />
                            <DefaultLayout path="/notice" component={Notice} />
                            <DefaultLayout path="/freeboard" component={FreeBoard} />
                            <DefaultLayout path="/info" component={Info} />
                            <DefaultLayout path="/library" component={Library} />
                            <DefaultLayout path="/gallery" component={Gallery} />
                            <DefaultLayout path="/calendar" component={Calendar} />
                            <DefaultLayout path="/login" component={Login} />

                        </Switch>
                            

                  </div>


                </div>
            </Router>
                    

            
            
           

        );
    }













   
 
}

export default App;
