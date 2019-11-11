import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import {isAdmin, isLoggedIn} from '../login/auth';
// import UserManagement from "./UserManagement";
// import AdminHome from "../AdminHome";

import Editor from "./editor/editor";

class RestrictAdmin extends Component{
    state = {
        isLoggedIn : isLoggedIn(),
        isAdmin : isAdmin()
    }

    // _debug = () => {
    //     console.log(this.props.page)
    // }

    render() {
        if(this.props.page === "FreeBoardWrite") {
            return(
                this.state.isLoggedIn ? (<Editor board_type="FreeBoard"/>) : (<Redirect to="/"/>)
            )
        }

        if(this.props.page === 'NoticeWrite') {
            return(
                this.state.isAdmin ? (<Editor board_type="Notice"/>) : (<Redirect to="/"/>)
            )
        }
        else if(this.props.page === 'TutorialWrite') {
            return(
                this.state.isAdmin ? (<Editor board_type="Tutorial"/>) : (<Redirect to="/"/>)
            )
        }
        else {
            return(
                <Redirect to="/404"/>
            )
        }
    }
}
export default RestrictAdmin
