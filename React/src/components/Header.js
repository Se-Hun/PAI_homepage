
import React, { Component } from 'react';
import './Header.css';
import logo from './PaiLogo.PNG';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';






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


                    <NavbarBrand href="https://naver.com/">
                        <img src={logo} alt="logo" />
                    </NavbarBrand>                    

                    <NavbarToggler onClick={this.toggle} />

                    <Collapse isOpen={this.state.isOpen} navbar>


                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">About</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/components/">Notice</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/components/">FreeBoard</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/components/">Info</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/components/">Library</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/components/">Gallery</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/components/">Calendar</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">Login</NavLink>
                            </NavItem>

                           
                        </Nav>
                    </Collapse>
                </Navbar>
              

            </div>
           

            )
    }
}


export default Header;