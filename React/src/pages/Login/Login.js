import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';

import { isLoggedIn } from '../../login/auth';

class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
      userId : "",
      password : "",
    }
  }

  _handleChange = (event) =>{
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    });
  }

  _handleLogin = (event) => {
    event.preventDefault()

    let url = "http://localhost:5000/login"
    // let url = "http://168.188.128.40:5402/login"
    let formData  = new FormData()
    let data = this.state
    for(let name in data) {
      formData.append(name, data[name])
    }

    fetch(url, {
      method: 'POST',
      body: formData
    }).then( res => res.json())
    .then(data => {
      console.log(data)
      sessionStorage.setItem('access_token', data.access_token)
      sessionStorage.setItem('refresh_token', data.refresh_token)
      sessionStorage.setItem('username', data.username)
      sessionStorage.setItem('userId', data.userId)
      sessionStorage.setItem('role', data.role)

      if (isLoggedIn()) {
        window.location.replace("/") // Redirect랑 같은 기능함
        //this.render(<Redirect to="/"/>) // 이게 안됨..
      }else{
          alert(data.error);
      }
    }).catch(err => console.log(err))
  }

  _validate = (userId, password) => {
    var email_identifier = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    return {
      userId : (userId.length === 0) || !(email_identifier.test(userId)),
      password : password.length === 0
    }
  }

  render() {

    const errors = this._validate(this.state.userId, this.state.password)
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col>
              <CardGroup>
                <Card>
                  <CardBody>
                    <Form>
                      <h1>로그인</h1>
                      <br/>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                               name="userId"
                               placeholder="아이디를 입력하세요.(이메일)"
                               autoComplete="userId"
                               value={this.state.userId}
                               onChange={this._handleChange}/>
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="glyphicon">&#xe033;</i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password"
                               name="password"
                               placeholder="비밀번호를 입력하세요."
                               autoComplete="current-password"
                               value={this.state.password}
                               onChange={this._handleChange}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary"
                                  className="px-4"
                                  disabled={isDisabled}
                                  onClick={this._handleLogin}>로그인</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0" disabled>비밀번호 찾기</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>회원 가입</h2>
                      <br/>
                      <br/>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>회원 가입하기</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
