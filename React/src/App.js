
import React, { Component } from 'react';
import Header from './components/Header';
import Header2 from './components/Header2';
import Grid from './containers/Grid';
import Grid2 from './containers/Grid2';
import Footer from './components/Footer';



import './components/Header.css';






class App extends Component {

   
    render() {
        return (

            <div>

                <div>
               
                    <Header />

                </div>

                

                <div>
                
                    <Header2 />

                </div>


                <div>
                    <Grid />
                </div>



                <div>
                    <Grid2 />
                </div>


                <div>
                    <Footer />


                </div>
                
                
               

            </div>

           

        );
    }













   
 
}

export default App;
