// import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Notice from "./Notice";

import List from "../containers/List";
import {Button, Row, Col} from 'reactstrap';
import {isLoggedIn} from "../login/auth";





class Library extends Component {


    render() {
        return (

            <div>



                 <div>

<Router>
    <Route render={({ location, history }) => (
        <React.Fragment>

            <main>
                <Route exact path="/" exact component={props => <Home />} />

                <Route path="/notice" component={props => <Notice/>} />
            </main>
        </React.Fragment>
    )}
    />
</Router>





                </div>



     <div>

                    <List/>

                </div>

                <div>
                 <Row>
                    <Col xs="9"/>
                    <Col xs="2" style={{marginBottom: "10px"}}>\
                        {isLoggedIn() ? (<Link to = "/freeboard/write"><Button color="primary" >글쓰기</Button></Link>):("")}
                    </Col>
                </Row>
                </div>






            </div>



        );
    }















}

export default Library;
