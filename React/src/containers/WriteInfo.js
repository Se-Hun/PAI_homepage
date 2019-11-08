import React, { Component } from 'react';
import {Row, Col, Form, FormGroup, Label, Input, Card} from 'reactstrap';
import {Button} from '@material-ui/core';
// import Notifications, { notify } from 'react-notify-toast'
// import Spinner from '../components/Spinner'
// import Images from '../components/Images'
// import Buttons from '../components/Buttons'
// import WakeUp from '../components/WakeUp'

// const toastColor = {
//     background: '#505050',
//     text: '#fff'
// }

class WriteInfo extends Component {

    state = {
        title : "",
        content : "",
        // imageURL: '',
        // loading: true,
        // uploading: false,
        // images: []
    }

    // componentDidMount() {
    //     let url = "http://localhost:5000/wake-up"
    //     fetch(url)
    //         .then(res => {
    //             if (res.ok) {
    //                 return this.setState({ loading: false })
    //             }
    //         const msg = 'Something is went wrong with Heroku'
    //         this.toast(msg, 'custom', 2000, toastColor)
    //     })
    // }

    _handleChange = (event) => {
        event.preventDefault()
        const name = event.target.name
        const value = event.target.value
        // console.log(name)
        // console.log(value)
        this.setState({
            [name] : value
        })
        // console.log(this.state)
    }

    _handleSubmit = (event) => {
        event.preventDefault()

        let url = "http://localhost:5000/user/insert/info"
        // let url = "http://168.188.128.40:/user/insert/info"

        const username = sessionStorage.getItem('username')

        const formData = new FormData()
        const title = this.state.title
        const content = this.state.content

        formData.append('username', username)
        formData.append('title', title)
        formData.append('content', content)

        return fetch(url, {
            method: "POST",
            body: formData
        }).then( res => res.json())
      .then(data => {
          window.location.replace("/info")
          return (data['message'] ? alert(data['message']) : "오류입니다.")
      }).catch(err => console.log(err))

    }

    //For Images-Uploader
    // toast = notify.createShowQueue() //큐잉을 하는거 같음
    //
    // onChange = e => {
    //     const errs = []
    //     const files = Array.from(e.target.files)
    //
    //     if (files.length > 3) {
    //         const msg = 'Only 3 images can be uploaded at a time'
    //         return this.toast(msg, 'custom', 2000, toastColor)
    //     }
    //
    //     const formData = new FormData()
    //     const types = ['image/png', 'image/jpeg', 'image/gif'] //type은 png, jpeg, gif밖에 안됨
    //
    //     files.forEach((file, i) => {
    //
    //         if (types.every(type => file.type !== type)) {
    //             errs.push(`'${file.type}' is not a supported format`)
    //         }
    //
    //         if (file.size > 150000) {
    //             errs.push(`'${file.name}' is too large, please pick a smaller file`)
    //         }
    //
    //         formData.append(i, file)
    //     })
    //
    //     if (errs.length) {
    //         return errs.forEach(err => this.toast(err, 'custom', 2000, toastColor))
    //     }
    //
    //     this.setState({ uploading: true })
    //
    //     let url = "http://localhost:5000/image-upload"
    //
    //     fetch(url, {
    //         method: 'POST',
    //         body: formData
    //     })
    //     .then(res => {
    //         if (!res.ok) {
    //             throw res
    //         }
    //         return res.json()
    //     })
    //     .then(images => {
    //         this.setState({
    //             uploading: false,
    //             images
    //         })
    //     })
    //     .catch(err => {
    //         err.json().then(e => {
    //             this.toast(e.message, 'custom', 2000, toastColor)
    //             this.setState({ uploading: false })
    //         })
    //     })
    // }
    //
    // filter = id => {
    //     return this.state.images.filter(image => image.public_id !== id)
    // }
    //
    // removeImage = id => {
    //     this.setState({ images: this.filter(id) })
    // }
    //
    // onError = id => {
    //     this.toast('Oops, something went wrong', 'custom', 2000, toastColor)
    //     this.setState({ images: this.filter(id) })
    // }

    handleUploadImage(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        // data.append('filename', this.fileName.value);

        fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                console.log(body)
                // this.setState({ imageURL: `http://localhost:5000/view/images/${body}` });
            });
        });
    }



    render() {
        // For images - uploader
        // const { loading, uploading, images } = this.state
        //
        // const content = () => {
        //     switch(true) {
        //         case loading:
        //             return <WakeUp />
        //         case uploading:
        //             return <Spinner />
        //         case images.length > 0:
        //             return <Images
        //                 images={images}
        //                 removeImage={this.removeImage}
        //                 onError={this.onError}
        //                 />
        //         default:
        //         return <Buttons onChange={this.onChange} />
        //     }
        // }

        this.handleUploadImage = this.handleUploadImage.bind(this);

        return (
            <div>
                <Form>
                    <Row form>
                        <Col md={4}/>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleTitle"
                                       style={{fontSize: "20px"}}>제목<strong>(<span style={{color: "red"}}>*</span>)</strong>
                                </Label>
                                <Input type="title" name="title" id="exampleTitle" onChange={this._handleChange}/>
                            </FormGroup>
                         </Col>
                    </Row>
                    <Row form>
                        <Col md={4}/>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="author" style={{fontSize: "20px"}}>
                                    작성자<strong>(<span style={{color: "red"}}>*</span>)</strong>
                                </Label>
                                <Card style={{padding: "10px"}}>{sessionStorage.getItem('username')}</Card>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={4}/>
                        <Col md={4}>
                            <FormGroup>
                                 <Label for="exampleText"
                                        style={{fontSize: "20px"}}>내용<strong>(<span style={{color: "red"}}>*</span>)</strong>
                                 </Label>
                                 <Input style = {{ height: "400px"}}
                                        type="textarea"
                                        name="content"
                                        id="exampleText"
                                        bsSize="xl"
                                        onChange={this._handleChange}/>
                             </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={4}/>
                        <Col md={4}>
                            <form onSubmit={this.handleUploadImage}>
                                <div>
                                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                                </div>
                                {/*<div>*/}
                                {/*    <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />*/}
                                {/*</div>*/}
                                <br />
                                <div>
                                    <button>Upload</button>
                                </div>
                                    {/*<img src={this.state.imageURL} alt="img" />*/}
                            </form>
                            {/*<FormGroup>*/}
                            {/*    <Label for="image" style={{fontSize: "20px"}}>이미지 첨부</Label>*/}
                            {/*</FormGroup>*/}
                            {/*<Notifications />*/}
                            {/*<div className='buttons'>*/}
                            {/*    {content()}*/}
                            {/*</div>*/}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6"/>
                        <Col xs="2" style={{marginBottom: "100px"}}>
                            <Button variant="contained" color="secondary" size="large">취소</Button>
                            <Button variant="contained"
                                    color="primary"
                                    size="large"
                                    style={{marginLeft:"10px"}}
                                    onClick={this._handleSubmit}>등록</Button>
                        </Col>
                    </Row>
                 </Form>
            </div>
        );
    }
}

export default WriteInfo;
