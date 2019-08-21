
import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {Link} from "react-router-dom";

class WriteForm1 extends Component {




    render() {
        return (

            <div>

                <Form>

                    <Row form>
                        <Col md={4}/>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleTitle">제목</Label>
                                <Input type="title" name="title" id="exampleTitle"/>
                            </FormGroup>
                         </Col>

                    </Row>



                <Row form>
                    <Col md={4}/>
                    <Col md={4}>
                        <FormGroup>
                             <Label for="exampleText">내용</Label>
                             <Input style = {{ height: "400px"}} type="textarea" name="text" id="exampleText" bsSize="xl" />
                         </FormGroup>

                    </Col>
                </Row>



                     <Row>
                        <Col xs="7"/>

                        <Col xs="2" style={{marginBottom: "100px"}}>
                            <Button>취소</Button>
                            <Button style={{marginLeft:"2px"}}>등록</Button>
                        </Col>


                    </Row>



                 </Form>
            </div>



        );
    }















}

export default WriteForm1;
