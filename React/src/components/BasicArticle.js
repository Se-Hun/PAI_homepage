import React, {Component} from 'react';
import {Table, Input, InputGroupAddon, InputGroup, Card, CardBody, CardHeader, Row, Col} from 'reactstrap';
import {Button, Icon} from '@material-ui/core';
import {isLoggedIn} from "../login/auth";

class BasicArticle extends Component {

    state = {
        user_reply : "",
        data : ""
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
        formData.append('board', this.props.location.state.board)
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
        formData.append('board', this.props.location.state.board)
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
        formData.append('board', this.props.location.state.board)
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
                <Card key={idx} style={{marginBottom: "10px"}}>
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
                <div style={{marginLeft: "10%", marginRight: "10%", marginBottom: "20px", textAlign: "center"}}>
                    <Row>
                        <Col md={11}>
                            <h1 style={{textAlign : "left"}}><strong>{this.state.data ? (this.state.data.title) : ("...loading")}</strong></h1>
                        </Col>
                        <Col md={1}>
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
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "10%", marginRight: "10%"}}>
                    <Table responsive bordered>
                        <tbody>
                            <tr>
                                <th scope="row" style={{backgroundColor: "lightgray"}}>작성자</th>
                                <td colspan="3">{this.state.data ? (this.state.data.writer) : ("...loading")}</td>
                                <th scope="row" style={{backgroundColor: "lightgray"}}>등록일</th>
                                <td className="b-no-right" colSpan="2">{this.state.data ? (this.state.data.date) : ("...loading")}</td>
                            </tr>
                            <tr>
                                <th scope="row" style={{backgroundColor: "lightgray"}}>조회수</th>
                                <td colSpan="3">{this.state.data ? (this.state.data.views) : ("...loading")}</td>
                                <th scope="row" style={{backgroundColor: "lightgray"}}>추천수</th>
                                <td className="b-no-right" colSpan="2">
                                    {this.state.data ? (this.state.data.likes) : ("...loading")}
                                </td>
                            </tr>
                            <tr>
                                <td class="b-no-right" colspan="6" style={{textAlign : "center"}}>
                                    {this.state.data ? (this.state.data.content) : ("...loading")}
                                    <br/>
                                    <br/>
                                    <br/>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div style={{marginLeft: "10%", marginRight: "10%", marginBottom: "10px", marginTop: "20px"}}>
                    <h3>댓글</h3>
                </div>
                <div style={{marginLeft: "10%", marginRight: "10%", marginBottom: "10px"}}>
                    {this.state.data ? (this._renderReply()) : ("...loading")}
                </div>
                <div style={{marginLeft: "10%", marginRight: "10%", marginBottom: "10px", marginTop: "20px"}}>
                    <h3>댓글 달기</h3>
                </div>
                <div style={{marginLeft: "10%", marginRight: "10%", marginBottom: "10px"}}>
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
                                    size="large"
                                    onClick={this._handleSubmit}>등록</Button>
                        </InputGroup>
                    ) : ("로그인 후에 Comment를 남길 수 있습니다.")}
                </div>
            </div>
        )
    }
}

export default BasicArticle