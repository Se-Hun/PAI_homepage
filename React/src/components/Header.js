
import React, { Component } from 'react';
import './Header.css';
import Pcalendar from '../routes/Pcalendar'

import logo from './PaiLogo.PNG';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter


} from 'reactstrap';

import { deleteTokens, isLoggedIn } from '../login/auth';






class Header extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    render() {
        return (

            <div className="Header">
                <Navbar color="white" light expand="md">


                    <NavbarBrand href="/">
                        <img src={logo} alt="logo" />
                    </NavbarBrand>                    

                    <NavbarToggler onClick={this.toggle} />

                    <Collapse isOpen={this.state.isOpen} navbar>


                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/about/">About</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/notice/">공지사항</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/freeboard/">자유게시판</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/info/">정보</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/library/">자료실</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/gallery/">갤러리</NavLink>
                            </NavItem>
                            <NavItem>
                                <CalendarModal/>
                            </NavItem>

                            <NavItem>


                            <LogButton/>

                            </NavItem>



                            <div className="ml-3">
                                {isLoggedIn() ? sessionStorage.getItem("username") + "님, 환영합니다." : ""}
                            </div>
                            {/*<NavItem>*/}
                            {/*    <NavLink href="/login/">Login</NavLink>*/}
                            {/*</NavItem>*/}

                           
                        </Nav>
                    </Collapse>
                </Navbar>


            </div>
           

            )
    }
}

class LogButton extends Component {
    _signOut(e) {
        e.preventDefault()
        deleteTokens()
        window.location.replace("/")
        //this.props.history.push('/login')
    }

    _signIn(e) {
        e.preventDefault()
        window.location.href = "/login" //뒤로가기 가능하게 하려면 이렇게 해야함!
        //window.location.replace("/login")
        //this.props.history.push("/")
    }

    render() {
        if(isLoggedIn()) return (<Button color="Transparent" onClick={this._signOut}>LogOut</Button>)
        else return (<Button color="Transparent" onClick={this._signIn}>LogIn</Button>)
    }
}


class CalendarModal extends React.Component {


    constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

   render() {
    return (
      <div>
        <Button color="Transparent" onClick={this.toggle}>일정</Button>
        <Modal style={{ maxWidth: "90vw"}}  isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>PAI 동아리 일정</ModalHeader>
          <ModalBody>

              <Pcalendar/>

          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </Modal>
      </div>
    );
  }
}




export default Header;