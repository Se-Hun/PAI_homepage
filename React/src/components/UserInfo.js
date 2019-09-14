import React, {Component} from 'react';
import {Avatar} from '@material-ui/core';
import {DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown} from 'reactstrap';

import {deleteTokens} from "../login/auth";

class UserInfo extends Component {

    _signOut(e) {
        e.preventDefault()
        deleteTokens()
        window.location.replace("/")
        //this.props.history.push('/login')
    }

    render() {
        return(
            <UncontrolledDropdown direction="down">
                <DropdownToggle nav>
                    <Avatar style={{backgroundColor: "purple", fontSize: "15px"}}>
                        {sessionStorage.getItem("username").substr(sessionStorage.getItem("username").length - 2)}
                    </Avatar>
                    <DropdownMenu right>
                        <DropdownItem onClick={this._signOut}>로그아웃</DropdownItem>
                    </DropdownMenu>
                </DropdownToggle>
            </UncontrolledDropdown>
        )
    }
}

export default UserInfo