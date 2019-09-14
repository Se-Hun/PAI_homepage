
import React, { Component } from 'react';
import Pictures from '../components/Pictures';
import Grid from '../containers/Grid';
import Grid2 from '../containers/Grid2';

class Home extends Component {

    render() {
        return (
            <div>
                <div>
                    <Pictures />
                </div>
                <div>
                    <Grid />
                </div>
                <div>
                    <Grid2 />
                </div>
            </div>
        );
    }
}

export default Home;
