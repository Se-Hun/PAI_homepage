import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Input, InputGroup, InputGroupAddon, Row, Col} from "reactstrap";
import {isLoggedIn} from "../login/auth";
import {Button} from "@material-ui/core";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';


class Article extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data : ""
        }
    }

    componentDidMount() {
        this._getArticle()
    }

    _getArticle = async() => {

        const data = await this._callApi()
        // console.log(data)

        if(!data) {
            return
        }
        if(data.error) {
            console.log(data.error)
            return
        }

        this.setState({
            data : data.result
        })
    }

    _callApi = () => {
        let url = "http://localhost:5000/get/article"
        // let url = "http://168.188.128.40:5202/get/article"

        const formData = new FormData()
        formData.append('board_type', this.props.location.state.board_type)
        formData.append('_id', this.props.location.state._id)

        return fetch(url, {
            method: "POST",
            body: formData
        }).then( res => res.json())
            .then(data => {
                return data
            })
            .catch(err=>console.log(err))
    }

    _handleChange = (event) => {
        event.preventDefault()

        const value = event.target.value

        this.setState({
            user_reply : value
        })
    }

    _handleSubmit = async() => {
        if(!this.state.user_reply) {
            alert("내용이 없습니다.")
            window.location.reload()
            return
        }
        const data = await this._callSubmit()

        // console.log(data)

        if(!data) {
            return
        }
        if(data.error) {
            alert(data.error)
            window.location.reload()
        }
        alert(data.message)
        window.location.reload()
    }

    _callSubmit = () => {
        let url = "http://localhost:5000/submit/reply"
        // let url = "http://168.188.128.40:5202/submit/reply"

        const formData = new FormData()
        formData.append('name', sessionStorage.getItem('username'))
        formData.append('content', this.state.user_reply)
        formData.append('board_type', this.props.location.state.board_type)
        formData.append('_id', this.props.location.state._id)

        return fetch(url,{
            method: "POST",
            body: formData
        }).then( res => res.json())
            .then(data => {
                // console.log(data)
                return data
            })
            .catch(err=>console.log(err))
    }

    _handleLikes = async() => {
        const data = await this._callLikes()

        // console.log(data)

        if(!data) {
            return
        }
        if(data.error) {
            alert(data.error)
            window.location.reload()
        }
        alert(data.message)
        window.location.reload()
    }

    _callLikes = () => {
        let url = "http://localhost:5000/plus/likes"
        // let url = "http://168.188.128.40:5202/plus/likes"

        const formData = new FormData()
        formData.append('board_type', this.props.location.state.board_type)
        formData.append('_id', this.props.location.state._id)

        return fetch(url,{
            method: "POST",
            body: formData
        }).then( res => res.json())
            .then(data => {
                // console.log(data)
                return data
            })
            .catch(err=>console.log(err))
    }

    _renderReply = () => {
        const reply = this.state.data.reply.map((re, idx) => {
            return(
                <Card key={idx} style={{marginBottom: "5px"}}>
                    <CardHeader>{re.name}</CardHeader>
                    <CardBody>{re.content}</CardBody>
                </Card>
            )
        })

        if(reply.length == 0) {
            return "등록된 댓글이 없습니다."
        }

        return reply
    }

    render() {
        return(
            <div>
                <hr style={{border: "1px #e0e0e0 solid"}}/>
                <Row>
                    <Col md={11}>
                    <h1>
                        {this.state.data.title}
                    </h1>
                    </Col>
                    <Col>
                        {
                            isLoggedIn() ? (
                                <div>
                                    <Button variant="contained"
                                            color="primary"
                                            size="medium"
                                            style={{backgroundColor: "green"}}
                                            onClick={this._handleLikes}>추천</Button>
                                </div>): ("")
                        }
                    </Col>
                </Row>
                <hr style={{border: "2px #e0e0e0 solid"}}/>
                <h6>{this.state.data.writer}</h6>
                <h6>{this.state.data.date}</h6>
                <h6>추천수 : {this.state.data.likes}</h6>
                <h6>조회수 : {this.state.data.views}</h6>
                <hr style={{border: "2px #e0e0e0 solid"}}/>
                <ReactQuill value={this.state.data.content} readOnly={true} theme="bubble"/>
                {/*<div dangerouslySetInnerHTML={{__html: this.state.data.content}}/>*/}
                <hr style={{border: "1px #e0e0e0 solid"}}/>
                {/*<br/>*/}
                <br/>
                <h2>댓글</h2>
                <hr style={{border: "1px solid"}}/>
                <div style={{marginBottom: "10px"}}>
                    {this.state.data ? (this._renderReply()) : ("...loading")}
                </div>
                <hr style={{border: "1px solid"}}/>
                <div style={{marginBottom: "15px"}}>
                    {isLoggedIn() ? (
                        <InputGroup>
                            <InputGroupAddon>{sessionStorage.getItem('username')}</InputGroupAddon>
                            <Input name="user_reply"
                                   placeholder="댓글을 입력해주세요."
                                   value={this.state.user_reply}
                                   onChange={this._handleChange}
                                   style={{marginRight: "2%"}}/>
                            <Button variant="contained"
                                    color="primary"
                                    size="medium"
                                    onClick={this._handleSubmit}>등록</Button>
                        </InputGroup>
                    ) : ("로그인 후에 댓글을 남길 수 있습니다.")}
                </div>
            </div>
        )
    }
}
export default Article;