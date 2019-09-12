
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import { Jumbotron } from 'reactstrap';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';


import Home from "./routes/Home";
import About from "./routes/About";
import Notice from "./routes/Notice";
import FreeBoard from "./routes/FreeBoard";
import Info from "./routes/Info";
import Library from "./routes/Library";
import Gallery from "./routes/Gallery";
import SourceCode from "./routes/SourceCode";

import WriteFreeBoard from "./containers/WriteFreeBoard";
import WriteNotice from "./containers/WriteNotice";
import WriteInfo from "./containers/WriteInfo";
import WriteCode from "./containers/WriteCode";



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




class Article extends Component {
    render() {
        return(
            <div>


                         title : {this.props.location.state.title}

                        <p>writer : {this.props.location.state.writer}</p>
                        <p>{this.props.location.state.content}</p>
                        <h6 className="text-center ">
                            <p>views: {this.props.location.state.views}</p>
                        </h6>








            </div>

        )
    }
}



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
                            <DefaultLayout exact path="/notice/write" component={WriteNotice} />
                            <DefaultLayout exact path="/notice/:id" component={Article} />

                            <DefaultLayout exact path="/freeboard" component={FreeBoard} />
                            <DefaultLayout exact path="/freeboard/write" component={WriteFreeBoard} />
                            <DefaultLayout exact path="/freeboard/:id" component={Article} />

                            <DefaultLayout exact path="/info" component={Info} />
                            <DefaultLayout path="/info/write" component={WriteInfo} />
                            <DefaultLayout exact path="/info/:id" component={Article} />


                            <DefaultLayout exact path="/library/ppt" component={Library} />  /* ppt용 컴포넌트로 고쳐야함 */
                            <DefaultLayout exact path="/library/code" component={SourceCode} />

                            {/*<DefaultLayout path="/library/ppt/write" component={} />*/}
                            <DefaultLayout path="/library/code/write" component={WriteCode} />


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
