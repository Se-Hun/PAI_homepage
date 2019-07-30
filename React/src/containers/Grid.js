
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

                        <thead>

                            <tr>
                                <th>Notice</th>
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

                        <thead>

                            <tr>
                                <th>FreeBoard</th>
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

                        <thead>

                            <tr>
                                <th>Information</th>
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