
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
                                <NavLink href="/notice/">Notice</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/freeboard/">FreeBoard</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/info/">Info</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/library/">Library</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/gallery/">Gallery</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/calendar/">Calendar</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink href="/login/">Login</NavLink>
                            </NavItem>

                           
                        </Nav>
                    </Collapse>
                </Navbar>
              

            </div>
           

            )
    }
}


export default Header;