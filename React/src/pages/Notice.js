
import React, { Component } from 'react';

import {Link} from "react-router-dom";
import {Row, Col, Table, Pagination, PaginationLink, PaginationItem} from 'reactstrap';
import {Button} from '@material-ui/core';
import {isAdmin, isLoggedIn} from "../login/auth";

import './table.css';

class Notice extends Component {

    state = {
        notice : "",
        currentPage : 0

    }

    componentDidMount() {
        this._getNotice()
    }

    _callApi = () => {
        let url = "http://localhost:5000/user/get/notice"
        // let url = "http://168.188.128.40:/user/get/notice"

        return fetch(url,{
            method: "GET"
        }).then( res => res.json())
            .then(data => {
                return data
                console.log(data)
            })
            .catch(err=>console.log(err))
    }

    _getNotice = async() => {
        const notice = await this._callApi()
        this.setState({
            "notice" : notice.result
        })

        //console.log(this.state)
    }

    handleClick(e, index) {

         e.preventDefault();

        this.setState({
            currentPage: index
        });
    }

    _renderPagination = () => {
        const obj_length = Object.keys(this.state.notice).length
        this.pageSize = 10;
        this.pageCount = Math.ceil(obj_length/this.pageSize)

        return (
            <Pagination>
                        <PaginationItem disabled={this.state.currentPage <= 0}>
                            <PaginationLink
                                onClick ={e => this.handleClick(e, 0)}
                                first
                                href="#"
                            />
                        </PaginationItem>

                        <PaginationItem disabled={this.state.currentPage <= 0}>
                            <PaginationLink
                                onClick = {e => this.handleClick(e, this.state.currentPage-1)}
                                previous
                                href="#" />
                        </PaginationItem>

                {[...Array(this.pageCount)].map((page, i) =>

                        <PaginationItem active={i === this.state.currentPage} key={i}>
                            <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                              {i+1}
                            </PaginationLink>
                         </PaginationItem>
                )}

                        <PaginationItem disabled={this.state.currentPage+1 === this.pageCount}>
                            <PaginationLink
                                onClick = {e => this.handleClick(e, this.state.currentPage+1)}
                                next
                                href="#" />
                        </PaginationItem>

                        <PaginationItem disabled={this.state.currentPage+1 === this.pageCount}>
                            <PaginationLink
                                onClick = {e => this.handleClick(e, this.pageCount-1)}
                                last
                                href="#" />
                        </PaginationItem>

            </Pagination>
        )
    }

    _renderNotice = () => {


        const notice = this.state.notice.reverse()
            .slice(
                this.state.currentPage * this.pageSize,
                (this.state.currentPage + 1) * this.pageSize
            )
            .map((article, index) => {

                console.log(this.state.currentPage)


            // const date = article.date.split("-")
            // console.log(date)
            //const id = article.id

            return (
                <tr key={index} align="center" className="Row">
                    <td>{article.writer}</td>
                    <td><Link style={{textDecoration: "none", color: "black"}} to = {{pathname : `/notice/${article._id}`,
                        state : {
                            title : article.title,
                            content : article.content,
                            _id : article._id,
                            date : article.date,
                            views : article.views,
                            likes : article.likes,
                            writer : article.writer,
                            reply : article.reply
                        }
                    }}><strong>{article.title}</strong></Link></td>
                    <td>{article.views}</td>
                    <td>{article.likes}</td>
                    <td>{article.date}</td>
                </tr>
            )
        })
        return notice
    }

    render() {
        return (
             <div>
                <div>
                    <div className = "List" >
                        <Table>
                            <thead align="center">
                                <tr>
                                    <th>글쓴이</th>
                                    <th>제목</th>
                                    <th>조회수</th>
                                    <th>추천수</th>
                                    <th>등록일</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {this.state.notice ? this._renderNotice() : "loading..."}
                                </tbody>
                        </Table>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        {this.state.currentPage >= 0 ? this._renderPagination() : "loading..."}
                    </div>
                </div>
                <div>
                    <Row>
                        <Col xs="10"/>
                        <Col xs="2" style={{marginBottom: "10px"}}>
                            {isAdmin() ? (
                                <Link to = "/notice/write">
                                    <Button variant="contained" size="large" color="primary" >글쓰기</Button>
                                </Link>):("")
                            }
                        </Col>
                    </Row>
                </div>
             </div>
        );
    }
}

export default Notice;
