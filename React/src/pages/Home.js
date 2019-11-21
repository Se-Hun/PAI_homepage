import React, { Component } from 'react';
import {Row, Col} from 'reactstrap';

import HomePicture from "../components/home/HomePicture";
import Grid from '../components/home/Grid';

class Home extends Component {

    render() {
        return (
            <div>
                <div style={{marginTop: "10px", marginBottom: "40px"}}>
                    <HomePicture/>
                    {/*<Pictures />*/}
                </div>
                <div style={{marginBottom: "20px"}}>
                    <Row>
                        <Col md={4}>
                            <Grid board_type="Notice"/>
                        </Col>
                        <Col md={4}>
                            <Grid board_type="FreeBoard"/>
                        </Col>
                        <Col md={4}>
                            <Grid board_type="Tutorial"/>
                        </Col>
                    </Row>

                    {/*<Grid />*/}
                </div>
                <div>
                    {/*<Grid2 />*/}
                </div>
            </div>
        );
    }
}

export default Home;
