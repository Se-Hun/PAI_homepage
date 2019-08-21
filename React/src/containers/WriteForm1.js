
import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {Link} from "react-router-dom";

class WriteForm1 extends Component {

    state = {
        title : "",
        content : "",
    }

    _handleChange = (event) => {
        event.preventDefault()
        const name = event.target.name
        const value = event.target.value
        // console.log(name)
        // console.log(value)
        this.setState({
            [name] : value
        })
        // console.log(this.state)
    }

    _handleSubmit = (event) => {
        event.preventDefault()

        let url = "http://localhost:5000/user/insert/freeboard"
        // let url = "http://168.188.128.40:/user/insert/freeboard"

        const username = sessionStorage.getItem('username')

        const formData = new FormData()
        const title = this.state.title
        const content = this.state.content

        formData.append('username', username)
        formData.append('title', title)
        formData.append('content', content)

        return fetch(url, {
            method: "POST",
            body: formData
        }).then( res => res.json())
      .then(data => {
          window.location.replace("/freeboard")
          return (data['message'] ? alert(data['message']) : "오류입니다.")
      }).catch(err => console.log(err))

    }


    render() {
        return (

            <div>

                <Form>

                    <Row form>
                        <Col md={4}/>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleTitle">제목</Label>
                                <Input type="title" name="title" id="exampleTitle" onChange={this._handleChange}/>
                            </FormGroup>
                         </Col>

                    </Row>



                <Row form>
                    <Col md={4}/>
                    <Col md={4}>
                        <FormGroup>
                             <Label for="exampleText">내용</Label>
                             <Input style = {{ height: "400px"}}
                                    type="textarea"
                                    name="content"
                                    id="exampleText"
                                    bsSize="xl"
                                    onChange={this._handleChange}/>
                         </FormGroup>

                    </Col>
                </Row>



                     <Row>
                        <Col xs="7"/>

                        <Col xs="2" style={{marginBottom: "100px"}}>
                            <Button>취소</Button>
                            <Button style={{marginLeft:"2px"}} onClick={this._handleSubmit}>등록</Button>
                        </Col>


                    </Row>



                 </Form>
            </div>



        );
    }















}

export default WriteForm1;
