
import React, { Component } from 'react';
import List from '../containers/List';
import {Link} from "react-router-dom";
import {Button, Row, Col, Table, Pagination, PaginationLink, PaginationItem} from 'reactstrap';










class FreeBoard extends Component {

    state = {
        freeboard : ""
    }

    componentDidMount() {
        this._getFreeBoard()
    }

    _callApi = () => {
        let url = "http://localhost:5000/user/get/freeboard"
        // let url = "http://168.188.128.40:/user/get/freeboard"

        return fetch(url,{
            method: "GET"
        }).then( res => res.json())
            .then(data => {
                return data
            })
            .catch(err=>console.log(err))
    }

    _getFreeBoard = async() => {
        const freeboard = await this._callApi()
        this.setState({
            "freeboard" : freeboard.result
        })

        // console.log(this.state.freeboard)
    }

    _renderFreeBoard = () => {
        const freeboard = this.state.freeboard.map((article, index) => {
            // const date = article.date.split("-")
            // console.log(date)
            return (
                <tr>
                    <td>{article.writer}</td>
                    <td>{article.title}</td>
                    <td style={{textAlign : "center"}}>{article.views}</td>
                    <td style={{textAlign : "center"}}>{article.likes}</td>
                    <td style={{textAlign : "center"}}>{article.date}</td>
                </tr>
            )
        })
        return freeboard
    }


    render() {
        return (

             <div>

                <div>
                    <div className = "List" >
                        <Table striped>
                            <thead align="center">
                                <tr>
                                    <th>글쓴이</th>
                                    <th>제목</th>
                                    <th>조회수</th>
                                    <th>추천수</th>
                                    <th>날짜</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {this.state.freeboard ? this._renderFreeBoard() : "loading..."}
                                </tbody>
                        </Table>
                        <Pagination className = "Pagination">
                            <PaginationItem>
                                <PaginationLink first href="#" />
                             </PaginationItem>
                        </Pagination>
                    </div>

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
