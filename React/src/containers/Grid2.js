
import React, { Component } from 'react';
import { Container, Table, Row, Col } from 'reactstrap';
import './Grid2.css';





class Grid2 extends Component {


    render() {
        return (

            <div className="Grid2">

                <Container>

                    <Row>

                        <Col>
                        </Col>

                        

                        <Col>
                            <Table>

                                <thead align="center">

                                    <tr>
                                        <th>자료실</th>
                                    </tr>

                                </thead>


                                <tbody>
                                    <tr>

                                            <td> The Library of PAI </td>



                                    </tr>
                                    <tr>
                                            <td> The Library of PAI </td>

                                    </tr>
                                    <tr>
                                            <td> The Library of PAI </td>

                                    </tr>
                                    <tr>
                                            <td> The Library of PAI </td>

                                    </tr>
                                    <tr>
                                            <td> The Library of PAI </td>

                                    </tr>


                                </tbody>


                            </Table>


                        </Col>

                        <Col>
                            <Table>

                                <thead align="center">

                                    <tr>
                                        <th>갤러리</th>
                                    </tr>

                                </thead>

                                <tbody>
                                    <tr>

                                            <td> The Gallery of PAI </td>



                                    </tr>
                                    <tr>
                                            <td> The Gallery of PAI </td>

                                    </tr>
                                    <tr>
                                            <td> The Gallery of PAI </td>

                                    </tr>
                                    <tr>
                                            <td> The Gallery of PAI </td>

                                    </tr>
                                    <tr>
                                            <td> The Gallery of PAI </td>

                                    </tr>


                                </tbody>

                            </Table>

                        </Col>

                        <Col>
                        </Col>
                        
                        

                       

                    </Row>





                </Container>

            </div>
        );
    }



}




export default Grid2;