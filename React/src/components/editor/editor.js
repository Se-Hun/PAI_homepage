import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import {Button} from '@material-ui/core';
import {Row, Col, Label, Input} from 'reactstrap';

class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content : '',
            title : ''
        }

        this.modules = {
            toolbar: [
	            [{ 'font': [] }],
	            [{ 'size': ['small', false, 'large', 'huge'] }],
	            ['bold', 'italic', 'underline'],
	            [{'list': 'ordered'}, {'list': 'bullet'}],
	            [{ 'align': [] }],
	            [{ 'color': [] }, { 'background': [] }],
	            ['clean']
	        ]
        }

        this.formats = [
            'font',
            'size',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'align',
            'color', 'background'
  	    ];

        this.rteChange = this.rteChange.bind(this);
    }

    rteChange = (content, delta, source, editor) => {
        // console.log(editor.getHTML())
        // console.log(editor.getText())
        // console.log(editor.getLength())
        // console.log(this.state.comments)

        this.setState({
            content: editor.getHTML()
        })
    }

    _handleSubmit = () => {
        // console.log(this.state.content)

        let notice_url = "http://localhost:5000/admin/insert/notice"
        // let notice_url = "http://168.188.128.40:/admin/insert/notice"

        let freeboard_url = "http://localhost:5000/user/insert/freeboard"
        // let freeboard_url = "http://168.188.128.40:/user/insert/freeboard"

        let tutorial_url = "http://localhost:5000/admin/insert/tutorial"
        // let tutorial_url = "http://168.188.128.40:/admin/insert/tutorial"

        const username = sessionStorage.getItem('username')
        const role = sessionStorage.getItem('role')

        const formData = new FormData()
        const title = this.state.title
        const content = this.state.content

        formData.append('username', username)
        formData.append('title', title)
        formData.append('content', content)
        formData.append('role', role)

        // console.log(this.props.location.state.board_type)
        if(this.props.board_type === "Notice") {
            // console.log("ddd")
            return fetch(notice_url, {
                method: "POST",
                body: formData
            }).then( res => res.json())
            .then(data => {
                window.location.replace("/notice")
                return (data['message'] ? alert(data['message']) : alert("오류입니다."))
            }).catch(err => console.log(err))
        }
        else if(this.props.board_type === "FreeBoard") {
            return fetch(freeboard_url, {
                method: "POST",
                body: formData
            }).then( res => res.json())
            .then(data => {
                window.location.replace("/freeboard")
                return (data['message'] ? alert(data['message']) : alert("오류입니다."))
            }).catch(err => console.log(err))
        }
        else if(this.props.board_type === "Tutorial") {
            return fetch(tutorial_url, {
                method: "POST",
                body: formData
            }).then( res => res.json())
            .then(data => {
                window.location.replace("/tutorial")
                return (data['message'] ? alert(data['message']) : alert("오류입니다."))
            }).catch(err => console.log(err))
        }
        else {
            alert("잘못된 타입입니다.")
            window.location.reload()
        }
    }

    _handleTitleChange = (event) => {
        event.preventDefault()
        const name = event.target.name
        const value = event.target.value
        // console.log(name)
        // console.log(value)
        this.setState({
            [name] : value
        })
        console.log(this.state)
    }

    render() {
        return(
            <div>
                <Label for="Title"><h3>제목</h3></Label>
                <Input type="title" name="title" id="title" onChange={this._handleTitleChange} style={{marginBottom: "20px"}}/>

                <Label for="Content"><h3>내용</h3></Label>
                <ReactQuill theme="snow"
                            modules={this.modules}
                            formats={this.formats}
                            onChange={this.rteChange}
                            value={this.state.content}/>
                <Row>
                    <Col md={11}/>
                    <Col>
                        <Button variant="contained"
                            color="primary"
                            size="medium"
                            onClick={this._handleSubmit}
                            style={{marginBottom: "10px", marginTop: "10px"}}>제출</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Editor;