
import React, { Component } from 'react';
import './Gallery.css';
import {Button, Container, Row, Col } from 'reactstrap';
import logo from '../components/PaiLogo.PNG';
import {Link} from "react-router-dom";




class Gallery extends Component {


    render() {
        return (




            <div>



                <div>

              <Container className="wrapper">
                <Row>
                    <Col>

                      <p>

                      <a href="#">
                           <img src={logo} alt="logo"/>
                       </a>

                      </p>

                      <a href="#">
                        <strong>제목부분</strong>
                      </a>

                      <p>2019-08-09</p>


                    </Col>

                   <Col>

                      <p>

                      <a href="#">
                           <img src={logo} alt="logo"/>
                       </a>

                      </p>

                      <a href="#">
                        <strong>제목부분</strong>
                      </a>

                      <p>2019-08-09</p>


                    </Col>

                    <Col>

                      <p>

                      <a href="#">
                           <img src={logo} alt="logo"/>
                       </a>

                      </p>

                      <a href="#">
                        <strong>제목부분</strong>
                      </a>

                      <p>2019-08-09</p>


                    </Col>

                </Row>

                <Row>
                    <Col>

                      <p>

                      <a href="#">
                           <img src={logo} alt="logo"/>
                       </a>

                      </p>

                      <a href="#">
                        <strong>제목부분</strong>
                      </a>

                      <p>2019-08-09</p>


                    </Col>

                   <Col>

                      <p>

                      <a href="#">
                           <img src={logo} alt="logo"/>
                       </a>

                      </p>

                      <a href="#">
                        <strong>제목부분</strong>
                      </a>

                      <p>2019-08-09</p>


                    </Col>

                    <Col>

                      <p>

                      <a href="#">
                           <img src={logo} alt="logo"/>
                       </a>

                      </p>

                      <a href="#">
                        <strong>제목부분</strong>
                      </a>

                      <p>2019-08-09</p>


                    </Col>

                </Row>


                <Row>
                    <Col>

                      <p>

                      <a href="#">
                           <img src={logo} alt="logo"/>
                       </a>

                      </p>

                      <a href="#">
                        <strong>제목부분</strong>
                      </a>

                      <p>2019-08-09</p>


                    </Col>

                   <Col>

                      <p>

                      <a href="#">
                           <img src={logo} alt="logo"/>
                       </a>

                      </p>

                      <a href="#">
                        <strong>제목부분</strong>
                      </a>

                      <p>2019-08-09</p>


                    </Col>

                    <Col>

                      <p>

                      <a href="#">
                           <img src={logo} alt="logo"/>
                       </a>

                      </p>

                      <a href="#">
                        <strong>제목부분</strong>
                      </a>

                      <p>2019-08-09</p>


                    </Col>

                </Row>



              </Container>

            </div>

               <div>
                <Row>
                    <Col xs="9"/>
                    <Col xs="2" style={{marginBottom: "10px"}}>
                        <Link to = "/notice/write"><Button color="primary" >글쓰기</Button></Link>
                    </Col>
                </Row>
                </div>


                </div>

    );
    }

}

export default Gallery;
