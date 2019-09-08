import { isAdmin } from '../login/auth';
import React, { Component } from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'
import
{
    Calendar, momentLocalizer
} from 'react-big-calendar'
import {

    Button,
    Modal, ModalHeader, ModalBody, ModalFooter, Input, Label,Form, FormGroup


} from 'reactstrap';




const localizer = momentLocalizer(moment)


moment.locale("en-GB");


class PaiCalendar extends React.Component {



    constructor(props) {
    super(props);

    this.state = {
        modal: false,
        nestedModal: false,
        closeAll: false,
        events: [],
        title:"" ,
        start:"",
        end:"",

    };

    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.toggle = this.toggle.bind(this);
  }

   componentDidMount() {
        this._getEvent()
    }


    _callApi = () => {
        let url = "http://localhost:5000/user/get/event"
        // let url = "http://168.188.128.40:/user/get/event"


        return fetch(url,{
            method: "GET"
        }).then( res => res.json())
            .then(data => {
                // console.log(data)
                return data.result
            })
            .catch(err=>console.log(err))
    }


      _getEvent = async() => {
        const event = await this._callApi()
        this.setState({
            events: event
        })

        // console.log(this.state)
    }


  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

   toggleNested() {

    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

   toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

   _handleChange = (event) => {
        event.preventDefault()

        const name = event.target.name
        const value = event.target.value
        // console.log(name)
        // console.log(value)


        this.setState({
            [name] : value
        })

    }



  _AddEvent = () => {

        let url = "http://localhost:5000/user/insert/event"
        // let url = "http://168.188.128.40:/user/insert/event"

        const formData = new FormData()


        const start = this.state.start
        const end = this.state.end
        const title = this.state.title


        formData.append('start', start)
        formData.append('end', end)
        formData.append('title', title)
        // formData.append("role" ,sessionStorage.getItem("role"))
        // formData.append("writer" ,sessionStorage.getItem("username"))



        return fetch(url, {
            method: "POST",
            body: formData
        }).then( res => res.json())
      .then(data => {
          // window.location.replace("/notice")
          alert(data['message'])
          this._getEvent()
          this.toggleNested()
          return (data['message'] ? (data['message']) : "오류입니다.")
      }).catch(err => console.log(err))
    }





   render() {
    return (

      <div>
        <Button color="Transparent" onClick={this.toggle}>일정</Button>
        <Modal style={{ maxWidth: "95vw"}}  isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader
              toggle={this.toggle}>PAI 동아리 일정
              {isAdmin()? (<Button color="success" onClick={this.toggleNested}>일정 추가</Button>) : ("")}

                    <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                              <ModalHeader>일정 추가 </ModalHeader>
                              <ModalBody>
                                  <Form>
                                        <FormGroup>
                                            <Label for="EventName">활동 내용</Label>
                                            <Input type="text" name="title" id="exampleEvent" onChange={this._handleChange}/>

                                            <Label for="StartDate">시작일</Label>
                                            <Input type="text" name="start" id="exampleStart" placeholder="YYYY-MM-DD" onChange={this._handleChange}/>

                                            <Label for="EndDate">종료일</Label>
                                            <Input type="text" name="end" id="exampleEnd" placeholder="YYYY-MM-DD" onChange={this._handleChange}/>

                                        </FormGroup>

                                  </Form>

                              </ModalBody>
                              <ModalFooter>
                                <Button color="primary" onClick={this._AddEvent}>확인</Button>{' '}
                                <Button color="secondary" onClick={this.toggleNested}>취소</Button>

                              </ModalFooter>
                    </Modal>

          </ModalHeader>

          <ModalBody>

               <div style={{ height: 700 }}>
                    <Calendar


                        localizer={localizer}
                        culture='en-GB'
                        events={this.state.events}
                        step={60}

                        views={['month','week','day']}
                        defaultDate={new Date()}

                    />
                 </div>


          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </Modal>
      </div>
    );
  }
}










export default PaiCalendar;
