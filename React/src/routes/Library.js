import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Notice from "./Notice";

import List from "../containers/List";
import {Button, Row, Col} from 'reactstrap';





class Library extends Component {


    render() {
        return (

            <div>



                 <div>

<Router>
    <Route render={({ location, history }) => (
        <React.Fragment>
            <SideNav
                onSelect={(selected) => {
                    const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="Notice">
                        <NavIcon>
                            <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Devices
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
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
                    <Col xs="2" style={{marginBottom: "10px"}}>
                        <Link to = "/library/write"><Button color="primary" >글쓰기</Button></Link>
                    </Col>
                </Row>
                </div>






            </div>



        );
    }















}

export default Library;
