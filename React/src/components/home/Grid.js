import React, {Component} from 'react';

import PreViewArticle from "./PreViewArticle";

const API_list = {
    "Notice" : "http://localhost:5000/user/get/notice",
    // "Notice" : "http://168.188.128.40:5202/user/get/notice",
    "FreeBoard" : "http://localhost:5000/user/get/freeboard",
    // "FreeBoard" : "http://168.188.128.40:5202/user/get/freeboard",
    "Tutorial" : "http://localhost:5000/user/get/tutorial",
    // "Tutorial" : "http://168.188.128.40:5202/user/get/tutorial",
}

const Board_name_converter = {
    "Notice" : "공지사항",
    "FreeBoard" : "게시판",
    "Tutorial" : "인공지능 Tutorial"
}

class Grid extends Component {

    state = {
        data : ""
    }

    componentDidMount() {
        this._getPreview()
    }

    _getPreview = async () => {
        const preview = await this._callApi()

        if(!preview) {
            return
        }
        if(preview.error) {
            console.log(preview.error)
            return
        }

        this.setState({
            data : preview.result
        })
    }

    _callApi = () => {
        let url = API_list[this.props.board_type]

        return fetch(url,{
            method: "GET"
        }).then( res => res.json())
            .then(data => {
                // console.log(data)
                return data
            })
            .catch(err=>console.log(err))
    }

    _renderPreview = () => {
        let data = this.state.data.reverse()
        const number_of_preview = 5

        data = data.map((article, index) => {
            console.log(article)
            return(
                <PreViewArticle
                    _id={article._id}
                    title={article.title}
                    writer={article.writer}
                    key={index}
                    board_type={this.props.board_type}/>
            )
        })

        const render = []
        for(let i = 0; i < number_of_preview; i++) {
            render.push(data[i])
        }
        return render
    }

    render() {
        return(
            <div>
                <h5>{Board_name_converter[this.props.board_type]}</h5>
                <hr style={{backgroundColor: "black", border: "1px solid", marginRight: "10px"}}/>
                {this.state.data ? this._renderPreview() : ("loading")}
            </div>
        )
    }
}

export default Grid