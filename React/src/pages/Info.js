import React, { Component } from 'react';

import {Link} from "react-router-dom";
import { Row, Col, Table, Pagination, PaginationLink, PaginationItem, Badge} from 'reactstrap';
import {Button} from '@material-ui/core';

import { isLoggedIn } from '../login/auth';

import './table.css';

class Info extends Component {

    state = {
        info : "",
        currentPage : 0

    }

    componentDidMount() {
        this._getInfo()
    }

    _callApi = () => {
        let url = "http://localhost:5000/user/get/info"
        // let url = "http://168.188.128.40:/user/get/info"

        return fetch(url,{
            method: "GET"
        }).then( res => res.json())
            .then(data => {
                return data
                console.log(data)
            })
            .catch(err=>console.log(err))
    }

    _getInfo = async() => {
        const info = await this._callApi()
        this.setState({
            "info" : info.result
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
        const obj_length = Object.keys(this.state.info).length


        this.pageSize = 10;
        this.pageCount = Math.ceil(obj_length/this.pageSize)


    return (

        <Pagination className = "Pagination">

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

    _renderInfo = () => {


        const info = this.state.info.reverse()
            .slice(
                this.state.currentPage * this.pageSize,
                (this.state.currentPage + 1) * this.pageSize
            )
            .map((article, index) => {

                // console.log(this.state.info.reverse())


            // const date = article.date.split("-")
            // console.log(date)
            //const id = article.id

            return (
                <tr key={index} align="center" className="Row">
                    <td><Badge><h3>D-1</h3></Badge></td> {/*뱃지 고르는거 날짜에 따라 다르게 나오도록 할것!!*/}
                    <td>{article.writer}</td>
                    <td><Link style={{textDecoration: "none", color: "black"}} to = {{pathname : `/info/${article._id}`,
                        state : {
                            board : "Info",
                            title : article.title,
                            content : article.content,
                            _id : article._id,
                            date : article.date,
                            views : article.views,
                            likes : article.likes,
                            writer : article.writer,
                            reply : article.reply

                    }}}><strong>{article.title}</strong></Link></td>
                    <td>{article.views}</td>
                    <td>{article.likes}</td>
                    <td>{article.date}</td>
                </tr>

            )
        })
        return info
    }

    render() {
        return (
             <div>
                 <div>
                     <div className = "List" >
                         <Table>
                             <thead align="center">
                                <tr>
                                    <th>D-X</th>
                                    <th>글쓴이</th>
                                    <th>제목</th>
                                    <th>조회수</th>
                                    <th>추천수</th>
                                    <th>날짜</th>
                                </tr>
                             </thead>
                                <tbody>
                                    {this.state.info ? this._renderInfo() : "loading..."}
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
                        {isLoggedIn()? (
                            <Link to = "/info/write"><Button variant="contained" size="large" color="primary" >글쓰기</Button></Link>
                        ) : (
                            <Button disabled variant="contained" size="large" color="primary">글쓰기</Button>
                        )}
                    </Col>
                    </Row>
                </div>
             </div>
        );
    }
}

export default Info;
