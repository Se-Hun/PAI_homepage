import React, {Component} from 'react';

class Article extends Component {
    render() {
        return(
            <div>
                title : {this.props.location.state.title}

                <p>writer : {this.props.location.state.writer}</p>
                <p>{this.props.location.state.content}</p>
                <h6 className="text-center ">
                    <p>views: {this.props.location.state.views}</p>
                </h6>
            </div>

        )
    }
}

export default Article