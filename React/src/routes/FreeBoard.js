
import React, { Component } from 'react';
import List from '../containers/List';
import {Link} from "react-router-dom";
import {Button, Row, Col} from 'reactstrap';










class FreeBoard extends Component {


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
                        <Link to = "/freeboard/write"><Button color="primary" >글쓰기</Button></Link>
                    </Col>
                    </Row>
                </div>


             </div>


        );
    }















}

export default FreeBoard;
