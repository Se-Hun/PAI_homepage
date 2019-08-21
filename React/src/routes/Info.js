
import React, { Component } from 'react';
import List from '../containers/List';
import {Button, Row, Col} from 'reactstrap';
import {Link} from "react-router-dom";








class Info extends Component {


    render() {
        return (

             <div>
                     <div>

                         <List/>

                     </div>


                 <div>
                        <Row>
                         <Col xs="9"/>
                         <Col xs="2" style={{marginBottom: "10px"}}>
                             <Link to = "/info/write"><Button color="primary" >글쓰기</Button></Link>
                         </Col>
                         </Row>
                </div>

          </div>



        );
    }















}

export default Info;
