import React, {Component} from 'react';
import {Table, Input, InputGroupAddon, InputGroup, Card, CardBody, CardHeader} from 'reactstrap';
import {Button} from '@material-ui/core';

class Article extends Component {

    state = {
        user_reply : ""
    }

    _handleChange = (event) => {
        event.preventDefault()

        const value = event.target.value

        this.setState({
            user_reply : value
        })
    }

    _handleSubmit = () => {
        //API요청하기
    }

    _renderReply = () => {
        const reply = this.props.location.state.reply.map((re, idx) => {
            return(
                <Card key={idx} style={{marginBottom: "10px"}}>
                    <CardHeader>{re.name}</CardHeader>
                    <CardBody>{re.content}</CardBody>
                </Card>
            )
        })

        return reply
    }

    render() {
        return(
            <div>
                <div style={{marginLeft: "10%", marginRight: "10%", marginBottom: "20px", textAlign: "center"}}>
                    <h1><strong>{this.props.location.state.title}</strong></h1>
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "10%", marginRight: "10%"}}>
                    <Table responsive bordered>
                        <tbody>
                            {/*<tr>*/}
                            {/*    <td class="b-title-box b-no-right" colspan="6" style={{textAlign : "center"}}>*/}
                            {/*        <strong>{this.props.location.state.title}</strong>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            <tr>
                                <th scope="row" style={{backgroundColor: "lightgray"}}>작성자</th>
                                <td colspan="3">{this.props.location.state.writer}</td>
                                <th scope="row" style={{backgroundColor: "lightgray"}}>등록일</th>
                                <td className="b-no-right" colSpan="2">{this.props.location.state.date}</td>
                            </tr>
                            <tr>
                                <th scope="row" style={{backgroundColor: "lightgray"}}>조회수</th>
                                <td colSpan="3">{this.props.location.state.views}</td>
                                <th scope="row" style={{backgroundColor: "lightgray"}}>추천수</th>
                                <td className="b-no-right" colSpan="2">{this.props.location.state.likes}</td>
                            </tr>
                            <tr>
                                <td class="b-no-right" colspan="6" style={{textAlign : "center"}}>
                                    {this.props.location.state.content}
                                    <br/>
                                    <br/>
                                    <br/>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div style={{marginLeft: "10%", marginRight: "10%", marginBottom: "10px", marginTop: "20px"}}>
                    <h3>Comment</h3>
                </div>
                <div style={{marginLeft: "10%", marginRight: "10%", marginBottom: "10px"}}>
                    {this.props.location.state.reply === null ? ("") : (this._renderReply())}
                </div>
                <div style={{marginLeft: "10%", marginRight: "10%", marginBottom: "10px"}}>
                    <InputGroup>
                        <InputGroupAddon>{sessionStorage.getItem('username')}</InputGroupAddon>
                        <Input name="user_reply"
                               placeholder="댓글을 입력해주세요."
                               value={this.state.user_reply}
                               onChange={this._handleChange}/>
                    </InputGroup>
                </div>
                <div style={{marginLeft: "70%", marginRight: "10%", marginBottom: "10px"}}>
                    <Button variant="contained" color="primary" size="large" style={{marginRight: "20px"}}>추천</Button>
                    <Button variant="contained" color="primary" size="large" onClick={this._handleSubmit}>등록</Button>
                </div>
            </div>
        )
    }
}

export default Article