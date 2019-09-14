import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import {Button} from '@material-ui/core';

import { isAdmin } from '../login/auth';

class About extends Component {

    state = {
        currentText:"",
        onEdit : false
    }

      componentDidMount() {
        this._getAbout()
    }

     _callApi = () => {
        let url = "http://localhost:5000/about"
        // let url = "http://168.188.128.40:/user/get/about"

        return fetch(url,{
            method: "GET"
        }).then( res => res.json())
            .then(data => {
                console.log(data)
                return data.result
            })
            .catch(err=>console.log(err))
    }

     _getAbout = async() => {
        const about = await this._callApi()

        this.setState({
            currentText : about[0].text
        })



    }


     _handleClick = (e) => { //제출 버튼 눌렀을 때
         e.preventDefault();

         let url = "http://localhost:5000/about/admin/update"
         let formData  = new FormData()

          // this.setState({
          //    currentText: text
         // });


         const text = this.state.currentText

         formData.append("role" ,sessionStorage.getItem("role"))
         formData.append("writer" ,sessionStorage.getItem("username"))
         formData.append("text", text)

        return fetch(url, {
            method: "POST",
            body: formData
        }).then( res => res.json())
            .then(data => {
                window.location.reload()
                return (data['error'] ? (alert(data['error'])) : (alert(data['message'])))
            })
            .catch(err=>console.log(err))
     }


     _renderAbout = () => {

        const currentText = this.state.currentText.split('\n').map(line => {
            return <span>{line}<br/></span>
        })
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

        // console.log(this.state.currentText)
    }


    render() {

        console.log(this.state.currentText)
        return (
            <div>
                <Col style={{marginLeft: "90%"}}>
                    {
                        isAdmin() ? (
                            this.state.onEdit ? (
                                <Button variant="contained" color="primary" size="large" onClick={e => this._handleClick(e)}>완료</Button>
                            ) : (<Button variant="contained" color="secondary" size="large" onClick={this._handleEdit}>수정</Button>)
                        ) : ("")
                    }
                </Col>
                <div style={{textAlign: "center", marginTop: "100px", marginBottom: "100px", fontWeight: "bold", fontSize: "1.5em"}}>
                    <div>{this.state.currentText ? (
                        this.state.onEdit ? (<Input type="textarea"  cols="40" rows="5" value={this.state.currentText}
                                                    onChange={this._handleChange}/>) : (this._renderAbout())
                    ) : "loading..."}</div>
                </div>
            </div>
        );
    }


}

export default About;
