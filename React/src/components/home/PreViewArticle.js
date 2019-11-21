import React, {Component} from 'react';
import {Link} from "react-router-dom";

const pathname_converter = {
    "Notice" : "/notice/",
    "Tutorial" : "/tutorial/",
    "FreeBoard" : "/freeboard/"
}

class PreViewArticle extends Component {
    render() {
        return(
            <div style={{marginLeft: "20px"}}>
                <Link style={{textDecoration: "none", color: "black"}}
                      to={{
                          pathname: pathname_converter[this.props.board_type] + `${this.props._id}`,
                          state : {
                              board_type : this.props.board_type,
                              _id : this.props._id,
                          }}}>
                    [{this.props.writer}]{this.props.title}
                </Link>
            </div>
        )
    }
}

export default PreViewArticle;


{/*<Link style={{textDecoration: "none", color: "black"}} to = {{pathname : `/notice/${article._id}`,*/}
{/*                        state : {*/}
{/*                            board_type : "Notice",*/}
{/*                            _id : article._id,*/}
{/*                        }*/}