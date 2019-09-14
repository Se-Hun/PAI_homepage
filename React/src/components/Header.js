import React, { Component } from 'react';
import './Header.css';
import LibraryDropdown from './LibraryDropdown'
import PaiCalendar from '../routes/PaiCalendar'
import logo from '../assets/img/PaiLogo.PNG';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    // Button,
} from 'reactstrap';
import {Button} from '@material-ui/core';

import UserInfo from './UserInfo';

import { deleteTokens, isLoggedIn } from '../login/auth';

class Header extends Component {

    constructor(props) {
        super(props);

        // this.toggle = this.toggle.bind(this);
        // this.state = {
        //     isOpen: false
        // };
    }
    // toggle() {
    //     this.setState({
    //         isOpen: !this.state.isOpen
    //     });
    // }

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
                    {/*<NavbarToggler onClick={this.toggle} />*/}
                    {/*<Collapse isOpen={this.state.isOpen} navbar>*/}
                        <Nav navbar>
                            <NavItem className="px-3" style={{marginLeft: "30px", marginTop: "10px", fontSize: "18px", fontWeight: "bold"}}>
                                <NavLink href="/about/">동아리 소개</NavLink>
                            </NavItem>
                            <NavItem className="px-3" style={{marginTop: "10px", fontSize: "18px", fontWeight: "bold"}}>
                                <NavLink href="/notice/">공지사항</NavLink>
                            </NavItem>
                            <NavItem className="px-3" style={{marginTop: "10px", fontSize: "18px", fontWeight: "bold"}}>
                                <NavLink href="/freeboard/">자유게시판</NavLink>
                            </NavItem>
                            <NavItem className="px-3" style={{marginTop: "10px", fontSize: "18px", fontWeight: "bold"}}>
                                <NavLink href="/info/">정보</NavLink>
                            </NavItem>
                            <NavItem className="px-3" style={{marginTop: "10px", fontSize: "18px", fontWeight: "bold"}}>
                                {/*<NavLink href="/library/">자료실</NavLink>*/}
                                {/*<LibraryDropdown/>*/}
                                <NavLink href="/library/ppt">PPT 자료실</NavLink>
                            </NavItem>
                            <NavItem className="px-3" style={{marginTop: "10px", fontSize: "18px", fontWeight: "bold"}}>
                                <NavLink href="/library/code">소스코드 자료실</NavLink>
                            </NavItem>
                            <NavItem className="px-3" style={{marginTop: "10px", fontSize: "18px", fontWeight: "bold"}}>
                                <NavLink href="/gallery/">갤러리</NavLink>
                            </NavItem>
                            <NavItem className="px-3" style={{marginTop: "10px", fontSize: "18px", fontWeight: "bold"}}>
                                {/*<PaiCalendar/>*/}
                                <NavLink href="/">일정</NavLink>
                            </NavItem>
                            <div className="px-3" style={{marginLeft: "40px", marginTop: "10px"}}>
                                {
                                    isLoggedIn() ? (<UserInfo/>) : (
                                        <Button variant="contained" color="primary" onClick={this._signIn} style={{fontSize: "15px"}}>로그인</Button>
                                    )
                                }
                            </div>
                            {/*<div className="ml-3">*/}
                            {/*    {isLoggedIn() ? sessionStorage.getItem("username") + "님, 환영합니다." : ""}*/}
                            {/*</div>*/}
                            {/*<NavItem style={{marginLeft: "30px"}}>*/}
                            {/*    <LogButton/>*/}
                            {/*</NavItem>*/}
                            {/*<NavItem>*/}
                            {/*    <NavLink href="/login/">Login</NavLink>*/}
                            {/*</NavItem>*/}
                        </Nav>
                    {/*</Collapse>*/}
                </Navbar>
            </div>
        )
    }
}

// class LogButton extends Component {
//     _signOut(e) {
//         e.preventDefault()
//         deleteTokens()
//         window.location.replace("/")
//         //this.props.history.push('/login')
//     }
//
//     _signIn(e) {
//         e.preventDefault()
//         window.location.href = "/login" //뒤로가기 가능하게 하려면 이렇게 해야함!
//         //window.location.replace("/login")
//         //this.props.history.push("/")
//     }
//
//     render() {
//         if(isLoggedIn()) return (<Button color="Transparent" onClick={this._signOut}>LogOut</Button>)
//         else return (<Button color="Transparent" onClick={this._signIn}>LogIn</Button>)
//     }
// }

export default Header;