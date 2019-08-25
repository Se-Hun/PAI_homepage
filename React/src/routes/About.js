
import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';



import { isAdmin } from '../login/auth';

class About extends Component {

    state = {
        currentText:"",
        onEdit : false
    }

      componentDidMount() {
        // this._getAbout()
    }

     _callApi = () => {
        let url = "http://localhost:5000/about"
        // let url = "http://168.188.128.40:/user/get/about"

        return fetch(url,{
            method: "GET"
        }).then( res => res.json())
            .then(data => {
                return data
            })
            .catch(err=>console.log(err))
    }

     _getAbout = async() => {
        const about = await this._callApi()
        this.setState({
            "currentText" : about.result
        })

        // console.log(this.state.about)
    }


     _handleClick() { //제출 버튼 눌렀을 때
         // e.preventDefault();

         let url = "http:localhost:5000/about/admin/update"
         let formData  = new FormData()

          // this.setState({
          //    currentText: text
         // });

         formData.append("text", this.state.currentText)
         formData.append("role" ,sessionStorage.getItem("role"))
         formData.append("username" ,sessionStorage.getItem("username"))

        return fetch(url, {
            method: "POST",
            body: formData
        }).then( res => res.json())
            .then(data => {
                return data
            })
            .catch(err=>console.log(err))
     }


     _renderAbout = () => {

        const currentText = this.state.currentText
         return currentText
     }


     _handleEdit = () => {
        // event.preventDefault()

         this.setState({
             onEdit : true
         })
         // console.log(this.state.onEdit)
     }

    _handleChange = (event) => {
        event.preventDefault()

        const value = event.target.value

        this.setState({
            currentText : value
        })

        console.log(this.state.currentText)
    }


    render() {
        return (
            <div>


                <div class="first">

                    <h3>{this.state.currentText ? (
                        this.state.onEdit ? (<Input value={this.state.currentText} onChange={this._handleChange}/>) : (this._renderAbout())
                        ) : "loading..."}</h3>

                </div>

                <div class="second">

                    {/*<InputGroup>*/}
                    {/*     <InputGroupAddon addonType="prepend">@</InputGroupAddon>*/}
                    {/*     <Input placeholder="username" />*/}
                    {/*</InputGroup>*/}


                </div>

                <Col xs="2" style={{marginBottom: "100px"}}>
                    {
                        isAdmin() ? (
                            this.state.onEdit ? (
                                <Button onClick={this._handleClick}>완료</Button>
                            ) : (<Button onClick={this._handleEdit}>수정</Button>)
                        ) : ("")
                    }
                </Col>






            </div>




        );
    }


}

export default About;
