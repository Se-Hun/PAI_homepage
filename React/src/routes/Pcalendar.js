
import React, { Component } from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "./events";
import axios from "axios";
import "./events.json"
import moment from 'moment'


import {
  Calendar, Views, momentLocalizer
} from 'react-big-calendar'





const localizer = momentLocalizer(moment)


moment.locale("en-GB");


class Pcalendar extends Component {

    //new Date() 하면 당일로 설정.
    // /new Date(moment().add(2, "days"))

    state = {
        events: []
  };

    getEvents = async () => {
        const events = await axios.get("events.json");

    }

    async componentDidMount() {
        this.getEvents();
    }




    render() {



        return (



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



        );
    }







}



export default Pcalendar;
