import React, { Component } from 'react';

import {Link} from "react-router-dom";
import {Row, Col, Table, Pagination, PaginationLink, PaginationItem} from 'reactstrap';
import {Button} from '@material-ui/core';
import {isAdmin, isLoggedIn} from "../login/auth";

import './table.css';

class Tutorial extends Component {

    // state = {
    //     kinds : "",
    //     paperList : ""
    // }
    //
    // componentDidMount() {
    //     this._getCategories()
    // }
    //
    // _getCategories = async() => {
    //     const categories = await this._callApi()
    //
    //     this.setState({
    //         kinds : categories.result.kinds,
    //         paperList : categories.result.paperList
    //     })
    //
    // }
    //
    // _callApi = () => {
    //     let url = "http://localhost:5000/user/get/category/tutorial"
    //     // let url = "http://168.188.128.40:/user/get/category/tutorial"
    //
    //     return fetch(url,{
    //         method: "GET"
    //     }).then( res => res.json())
    //         .then(data => {
    //             // console.log(data)
    //             return data
    //             // console.log(data)
    //         })
    //         .catch(err=>console.log(err))
    // }
    //
    // _renderCategories = () => {
    //     const render_categories = this.state.kinds.map((name, idx) => {
    //         return(
    //             <div key={idx}>
    //                 <h3>{name}</h3>
    //             </div>
    //         )
    //     })
    //     return render_categories
    // }
    //
    // render() {
    //     return(
    //         <div>
    //             <h1>인공지능 Tutorial</h1>
    //             <div>
    //                 {this.state.kinds ? this._renderCategories : ("...loading")}
    //             </div>
    //         </div>
    //     )
    // }

    state = {
        tutorial : "",
        currentPage : 0

    }

    componentDidMount() {
        this._getTutorial()
    }

    _callApi = () => {
        let url = "http://localhost:5000/user/get/tutorial"
        // let url = "http://168.188.128.40:/user/get/tutorial"

        return fetch(url,{
            method: "GET"
        }).then( res => res.json())
            .then(data => {
                console.log(data)
                return data
                // console.log(data)
            })
            .catch(err=>console.log(err))
    }

    _getTutorial = async() => {
        const tutorial = await this._callApi()
        this.setState({
            "tutorial" : tutorial.result
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
        const obj_length = Object.keys(this.state.tutorial).length
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

    _renderTutorial = () => {


        const tutorial = this.state.tutorial.reverse()
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
                    <td><Link style={{textDecoration: "none", color: "black"}} to = {{pathname : `/tutorial/${article._id}`,
                        state : {
                            board_type : "Tutorial",
                            _id : article._id,
                        }
                    }}><strong>{article.title}</strong></Link></td>
                    <td>{article.views}</td>
                    <td>{article.likes}</td>
                    <td>{article.date}</td>
                </tr>
            )
        })
        return tutorial
    }

    render() {
        return (
             <div>
                <div>
                    <h2 style={{marginBottom: "10px"}}>인공지능 Tutorial</h2>
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
                                    {this.state.tutorial ? this._renderTutorial() : "loading..."}
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
                                <Link to = {{
                                    pathname: "/tutorial/write",
                                    // state : {
                                    //     board_type: "Notice"
                                    // }
                                }}>
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

export default Tutorial;
