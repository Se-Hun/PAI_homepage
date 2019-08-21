
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
import WriteForm1 from "./containers/WriteForm1";



import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import Page500 from "./pages/Page500";
import Register from "./pages/Register";


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

                            <DefaultLayout exact path="/notice" component={Notice} />
                            <DefaultLayout path="/notice/write" component={WriteForm1} />

                            <DefaultLayout exact path="/freeboard" component={FreeBoard} />
                            <DefaultLayout path="/freeboard/write" component={WriteForm1} />

                            <DefaultLayout exact path="/info" component={Info} />
                            <DefaultLayout path="/info/write" component={WriteForm1} />


                            <DefaultLayout exact path="/library" component={Library} />
                            <DefaultLayout path="/library/write" component={WriteForm1} />

                            <DefaultLayout path="/gallery" component={Gallery} />






                            <Route exact path="/login" name="Login Page" component={Login} />
                            <Route exact path="/page404" name="404 Page" component={Page404} />
                            <Route exact path="/page500" name="500 Page" component={Page500} />
                            <Route exact path="/Register" name="Register Page" component={Register} />

                        </Switch>



                  </div>


                </div>
            </Router>
                    

            
            
           

        );
    }













   
 
}

export default App;
