import React, { Component } from 'react';
import './Header.css';
import logo from '../../assets/img/PaiLogo.PNG';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import {Button} from '@material-ui/core';

import UserFunction from '../user/UserFunction';

import { isLoggedIn } from '../../login/auth';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen : false,
        }
    }

    _openModal = () => {
        this.setState({
            isModalOpen: true,
        });
    }

    _closeModal() {
        this.setState({
            isModalOpen: false
        });
    }

    _signIn(e) {
        e.preventDefault()
        window.location.href = "/login" //뒤로가기 가능하게 하려면 이렇게 해야함!
        //window.location.replace("/login")
        //this.props.history.push("/")
    }

    render() {
        return (
            <div className="Header">
                <Navbar color="white" light expand="md">
                    <NavbarBrand href="/">
                        <img src={logo} alt="logo" height="90"/>
                    </NavbarBrand>
                        <Nav navbar>
                            <NavItem className="px-3" style={{marginLeft: "30px", marginTop: "10px", fontSize: "18px", fontWeight: "bold"}}>
                                <NavLink href="/about/">동아리 소개</NavLink>
                            </NavItem>
                            <NavItem className="px-3" style={{marginTop: "10px", fontSize: "18px", fontWeight: "bold"}}>
                                <NavLink href="/notice/">공지사항</NavLink>
                            </NavItem>
                            <NavItem className="px-3" style={{marginTop: "10px", fontSize: "18px", fontWeight: "bold"}}>
                                <NavLink href="/freeboard/">게시판</NavLink>
                            </NavItem>
                            <NavItem className="px-3" style={{marginTop: "10px", fontSize: "18px", fontWeight: "bold"}}>
                                <NavLink href="/">인공지능 Tutorial</NavLink>
                            </NavItem>
                            <NavItem className="px-3" style={{marginTop: "10px", fontSize: "18px", fontWeight: "bold"}}>
                                <NavLink href="/gallery/">활동 사진</NavLink>
                            </NavItem>
                            <div className="px-3" style={{marginLeft: "40px", marginTop: "10px"}}>
                                {
                                    isLoggedIn() ? (<UserFunction/>) : (
                                        <Button variant="contained" color="primary" onClick={this._signIn} style={{fontSize: "15px"}}>로그인</Button>
                                    )
                                }
                            </div>
                        </Nav>
                </Navbar>
            </div>
        )
    }
}




export default Header;