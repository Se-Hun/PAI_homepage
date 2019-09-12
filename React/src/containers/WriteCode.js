'use strict';
import React, { Component } from 'react';
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import {Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';


const MOCK_DATA = "Programming Artificial Intelligence.\n----------\n * 파이\n * 동아리\n * 홈페이지"

class WriteCode extends Component {


     mdParser = null
          constructor(props) {
            super(props);

            this.mdParser = new MarkdownIt(/* Markdown-it options */)
          }

      handleEditorChange ({html, text}) {
        console.log('handleEditorChange', html, text)
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

        let url = "http://localhost:5000/user/insert/code"
        // let url = "http://168.188.128.40:/user/insert/code"

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
          window.location.replace("/library/code")
          return (data['message'] ? alert(data['message']) : "오류입니다.")
      }).catch(err => console.log(err))

    }



    render() {




        return (

            <div>

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
                        </Form>
                 </div>


                   <div style={{ height: 600 }}>
                    <MdEditor
                      value={MOCK_DATA}
                      renderHTML={(text) => this.mdParser.render(text)}
                      onChange={this.handleEditorChange}

                    />
                  </div>





                <div>

                <Form>
                     <Row>
                        <Col xs="7"/>

                        <Col xs="2" style={{marginBottom: "100px"}}>
                            <Button>취소</Button>
                            <Button style={{marginLeft:"2px"}} onClick={this._handleSubmit}>등록</Button>
                        </Col>
                    </Row>
                 </Form>
                </div>
            </div>


        );
    }
}

export default WriteCode;
