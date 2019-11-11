import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';

import {Icon} from 'semantic-ui-react';
//import Pcalendar from 'react-input-calendar'
import DatePicker from 'react-date-picker';

import { Redirect } from 'react-router-dom';
import { isLoggedIn } from "../../login/auth";


const options = [
  { value: '남성', label: '남성' },
  { value: '여성', label: '여성' },
]

class Register extends Component {
  constructor(props){
    super(props);

    this.state = {
      userId : "",
      username : "",
      studentId : "",
      birth_DateObject : new Date(), // Date 객체로 일단 다룸.
      birth : "",
      sex : "남성",
      phonenumber : "",
      major : "",
      registrationData : "",
      password : "",
      repeat_password : "",
      role : "", // role은 admin이 정해주어야 한다. 그래서 처음에는 role이 공백문자로 들어감!
      //isCompleted : false
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

  _handleChangeDate = (date) => {
    if(date === null) {
      this.setState({
        birth_DateObject : new Date(),
        birth: ""
      })
    }
    else {
      this.setState({
        birth_DateObject: date,
        birth: this._dateToString(date)
      })
    }
  }

  _dateToString = (dateObject) => {
    var year = dateObject.getFullYear()
    var month = dateObject.getMonth() + 1
    var date = dateObject.getDate()
    return year + "-" + month + "-" + date
  }

  _handleRegister = (event) => {
    event.preventDefault()

    this.setState({
      registrationDate : this._dateToString(new Date)
    })

    let url = "http://localhost:5000/register"
    // let url = "http://168.188.128.40:5402/register" // 연구실 서버임 => 잠깐만 이렇게 해두자!
    let formData  = new FormData() // dictionary 같은 역활을 하는 객체임. 하지만 보안상으로 정말 좋음!
    let data = this.state
    for(let name in data) {
      if(name !== "repeat_password") formData.append(name, data[name])
    }

    for (var key of formData.keys()) {
      console.log(key);
    }
    for (var value of formData.values()) {
      console.log(value);
    }

    fetch(url, {
      method: 'POST',
      body: formData
    }).then( res => res.json())
    .then(data => {
      sessionStorage.setItem('access_token', data.access_token)
      sessionStorage.setItem('refresh_token', data.refresh_token)
      sessionStorage.setItem('username', data.username)
      sessionStorage.setItem('userId', data.userId)
      sessionStorage.setItem('role', data.role)

      /*
      * 1. 회원가입 성공이면 로그인하는 페이지로 넘겨주고
      * 2. 실패하면 실패한 이유 보여주게 만들것!!
      *
      * */

      if(isLoggedIn()) {
        window.location.replace("/") // Redirect와 같은 역활을 함!
        //return <Redirect to="/"/> // 이게 안된다..
      }
      else {
        alert(data.error)
      }

      // localStorage.setItem('access_token', data.access_token)
      //
      // localStorage.setItem('userId', data.userId)
      //
      // if (isLoggedIn()) {
      //   window.location.replace("/") // Link랑 같은 기능함?
      //   //일단 확인해볼것!
      // }else{
      //     alert(data.error);
      // }
    }).catch(err => console.log(err))
  }

  _validate = (userId, password, username, studentId, repeat_password, birth, phonenumber, major) => {
  // true means invalid, so our conditions got reversed
    var email_identifier = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/; // dkalskd@naver.com
    var date_identifier =  /^(19|20)\d{2}-([1-9]|1[012])-([1-9]|[12][0-9]|3[0-1])$/; // 2013-02-11
    var phonenumber_identifier = /^\d{3}-\d{3,4}-\d{4}$/; // 010-4444-3333
    return {
      userId: (userId.length === 0) || !(email_identifier.test(userId)),
      password: password.length === 0,
      username : username.length === 0,
      studentId : studentId.length === 0,
      repeat_password : repeat_password.length === 0,
      difference : password !== repeat_password,
      birth : (birth.length === 0) || !(date_identifier.test(birth)),
      phonenumber : (phonenumber.length === 0) || !(phonenumber_identifier.test(phonenumber)),
      major : major.length === 0
    };
  }

  _comparePW = (password, repeat_password) => {
    return {
      difference : password !== repeat_password
    }
  }

  // _debug = (event) => {
  //   event.preventDefault()
  //   console.log(this.state)
  // }

  render() {
    const errors = this._validate(this.state.userId,
        this.state.password, this.state.username, this.state.studentId, this.state.repeat_password,
        this.state.birth, this.state.phonenumber, this.state.major);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    // 어느 하나라도 칸이 비어있으면 true가 된다.

    const pw_errors = this._comparePW(this.state.password, this.state.repeat_password); // pw와 repeat_pw 같은지 확인
    const isDifferent = Object.keys(pw_errors).some(x => pw_errors[x]);

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>회원가입</h1>
                    <p className="text-muted">다음을 입력해주세요.</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Icon name="at"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                             name="userId"
                             placeholder="아이디를 입력해주세요.(이메일이어야 합니다.)"
                             autoComplete="userId"
                             value={this.state.userId}
                             onChange={this._handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Icon name="user"></Icon>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                             name="username"
                             placeholder="이름을 입력해주세요."
                             autoComplete="username"
                             value={this.state.username}
                             onChange={this._handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Icon name="tag"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                             name="studentId"
                             placeholder="학번을 입력해주세요."
                             autoComplete="studentId"
                             value={this.state.studentId}
                             onChange={this._handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Icon name="phone"></Icon>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                             name="phonenumber"
                             placeholder="전화번호를 입력해주세요.(010-xxxx-xxxx)"
                             autoComplete="phonenumber"
                             value={this.state.phonenumber}
                             onChange={this._handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Icon name="pencil alternate"></Icon>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                             name="major"
                             placeholder="전공을 입력해주세요."
                             autoComplete="major"
                             value={this.state.major}
                             onChange={this._handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Icon name="lock"></Icon>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                             name="password"
                             placeholder="비밀번호를 입력해주세요."
                             autoComplete="password"
                             value={this.state.password}
                             onChange={this._handleChange}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Icon name="lock"></Icon>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                             name="repeat_password"
                             placeholder="비밀번호를 다시 한번 입력해주세요."
                             autoComplete="repeat_password"
                             value={this.state.repeat_password}
                             onChange={this._handleChange}
                             invalid = {isDifferent}/>
                             {/*invalid = {this._checkRepeatPW}*/}
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupText>성별을 선택해주세요.</InputGroupText>
                      <Input type="select" name="gender" onChange={this._handleChange}>
                      {options.map((option, index) => {
                        return <option key={index}>{option["value"]}</option>
                      })}
                      </Input>
                    </InputGroup>
                    <InputGroup className="mb-2">
                      {/*<Pcalendar format='DD-MM-YYYY' date='4-12-2014' />*/}
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupText>생년월일을 선택해주세요.</InputGroupText>
                      <DatePicker onChange={this._handleChangeDate} name="birth" value={this.state.birth_DateObject} clearAriaLabel="Clear value"/>
                    </InputGroup>
                    {/*{this._handleChangeDate}*/}
                    {/*this.state.birth_DateObject*/}
                    <Button color="warning"
                            block
                            disabled={isDisabled}
                            onClick={this._handleRegister}>계정 생성</Button>
                    {/*<Button onClick={this._debug}>Debug</Button>*/}
                  </Form>
                </CardBody>
                {/*<CardFooter className="p-4">*/}
                  {/*<Row>*/}
                  {/*  <Col xs="12" sm="6">*/}
                  {/*    <Button className="btn-facebook mb-1" block><span>facebook</span></Button>*/}
                  {/*  </Col>*/}
                  {/*  <Col xs="12" sm="6">*/}
                  {/*    <Button className="btn-twitter mb-1" block><span>twitter</span></Button>*/}
                  {/*  </Col>*/}
                  {/*</Row>*/}
                {/*</CardFooter>*/}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
