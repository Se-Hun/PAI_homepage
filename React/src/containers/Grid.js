
import React, { Component } from 'react';
import { Container, Table, Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './Grid.css';





class Grid extends Component {


    render() {
        return (

            <div className = "Grid">

            <Container>

                <Row>


                    <Col>
                        <Table>

                        <thead align="center">

                            <tr>
                                <th >공지사항</th>
                            </tr>

                            </thead>


                            <tbody>
                                <tr>
                                    
                                        <td> The Notice of PAI </td>



                                </tr>
                                <tr>
                                    <td> The Notice of PAI </td>

                                </tr>
                                <tr>
                                    <td> The Notice of PAI </td>

                                </tr>
                                <tr>
                                    <td> The Notice of PAI </td>

                                </tr>
                                <tr>
                                    <td> The Notice of PAI </td>

                                </tr>


                            </tbody>


                        </Table>


                    </Col>

                    <Col>
                        <Table>

                        <thead align="center">

                            <tr>
                                <th>자유 게시판</th>
                            </tr>

                            </thead>

                            <tbody>
                                <tr>

                                    <td> The FreeBoard of PAI </td>



                                </tr>
                                <tr>
                                    <td> The FreeBoard of PAI </td>

                                </tr>
                                <tr>
                                    <td> The FreeBoard of PAI </td>

                                </tr>
                                <tr>
                                    <td> The FreeBoard of PAI </td>

                                </tr>
                                <tr>
                                    <td> The FreeBoard of PAI </td>

                                </tr>


                            </tbody>

                        </Table>

                    </Col>


                    <Col>
                        <Table>

                        <thead align="center">

                            <tr>
                                <th >정보 게시판</th>
                            </tr>

                            </thead>

                            <tbody>
                                <tr>

                                    <td> The Information of PAI </td>



                                </tr>
                                <tr>
                                    <td> The Information of PAI </td>

                                </tr>
                                <tr>
                                    <td> The Information of PAI </td>

                                </tr>
                                <tr>
                                    <td> The Information of PAI </td>

                                </tr>
                                <tr>
                                    <td> The Information of PAI </td>

                                </tr>


                            </tbody>

                        </Table>

                    </Col>
                   
                </Row>

               

                
                
                </Container>

                </div>
        );
    }



}




export default Grid;