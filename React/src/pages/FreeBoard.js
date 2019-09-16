
import React, { Component } from 'react';

import {Link} from "react-router-dom";
import {Row, Col, Table, Pagination, PaginationLink, PaginationItem} from 'reactstrap';
import {Button} from '@material-ui/core';

import './table.css';
import {isLoggedIn} from "../login/auth";

class FreeBoard extends Component {

    state = {
        freeboard : "",
        currentPage : 0

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

    handleClick(e, index) {

         e.preventDefault();

        this.setState({
          currentPage: index


    });
  }

  _renderPagination = () => {
        const obj_length = Object.keys(this.state.freeboard).length


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

    _renderFreeBoard = () => {

        const board = this.state.freeboard.reverse()

        const freeboard = board
            .slice(
                this.state.currentPage * this.pageSize,
                (this.state.currentPage + 1) * this.pageSize
            )
            .map((article, index) => {

                // console.log(this.state.currentPage)


            // const date = article.date.split("-")
            // console.log(date)
            //const id = article.id

            return (
                <tr key={index} align="center" className="Row">
                    <td>{article.writer}</td>
                    <td><Link style={{textDecoration: "none", color: "black"}} to = {{pathname : `/freeboard/${article._id}`,
                        state : {
                            board : "FreeBoard",
                            title : article.title,
                            content : article.content,
                            _id : article._id,
                            date : article.date,
                            views : article.views,
                            likes : article.likes,
                            writer : article.writer,
                            reply : article.reply
                        }}}> <strong>{article.title}</strong></Link></td>
                    <td>{article.views}</td>
                    <td>{article.likes}</td>
                    <td>{article.date}</td>
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

                                    {this.state.freeboard ? this._renderFreeBoard() : "loading..."}

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
                            {isLoggedIn() ? (
                                <Link to = "/freeboard/write"><Button variant="contained" size="large" color="primary" >글쓰기</Button></Link>
                                ) : (
                                    <Button disabled variant="contained" size="large" color="primary">글쓰기</Button>
                                )
                            }
                        </Col>
                    </Row>
                </div>
             </div>
        );
    }

}

export default FreeBoard;
